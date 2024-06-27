const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class LeadsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const leads = await db.leads.create(
      {
        id: data.id || undefined,

        first_name: data.first_name || null,
        last_name: data.last_name || null,
        email: data.email || null,
        phone: data.phone || null,
        status: data.status || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await leads.setAssigned_to(data.assigned_to || null, {
      transaction,
    });

    await leads.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return leads;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const leadsData = data.map((item, index) => ({
      id: item.id || undefined,

      first_name: item.first_name || null,
      last_name: item.last_name || null,
      email: item.email || null,
      phone: item.phone || null,
      status: item.status || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const leads = await db.leads.bulkCreate(leadsData, { transaction });

    // For each item created, replace relation files

    return leads;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const leads = await db.leads.findByPk(id, {}, { transaction });

    await leads.update(
      {
        first_name: data.first_name || null,
        last_name: data.last_name || null,
        email: data.email || null,
        phone: data.phone || null,
        status: data.status || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await leads.setAssigned_to(data.assigned_to || null, {
      transaction,
    });

    await leads.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return leads;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const leads = await db.leads.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of leads) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of leads) {
        await record.destroy({ transaction });
      }
    });

    return leads;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const leads = await db.leads.findByPk(id, options);

    await leads.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await leads.destroy({
      transaction,
    });

    return leads;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const leads = await db.leads.findOne({ where }, { transaction });

    if (!leads) {
      return leads;
    }

    const output = leads.get({ plain: true });

    output.interactions_lead = await leads.getInteractions_lead({
      transaction,
    });

    output.tasks_lead = await leads.getTasks_lead({
      transaction,
    });

    output.assigned_to = await leads.getAssigned_to({
      transaction,
    });

    output.organization = await leads.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'assigned_to',
      },

      {
        model: db.organizations,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.first_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('leads', 'first_name', filter.first_name),
        };
      }

      if (filter.last_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('leads', 'last_name', filter.last_name),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('leads', 'email', filter.email),
        };
      }

      if (filter.phone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('leads', 'phone', filter.phone),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.status) {
        where = {
          ...where,
          status: filter.status,
        };
      }

      if (filter.assigned_to) {
        var listItems = filter.assigned_to.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assigned_toId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.leads.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.leads.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('leads', 'first_name', query),
        ],
      };
    }

    const records = await db.leads.findAll({
      attributes: ['id', 'first_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['first_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.first_name,
    }));
  }
};
