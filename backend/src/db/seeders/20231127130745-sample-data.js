const db = require('../models');
const Users = db.users;

const Interactions = db.interactions;

const Leads = db.leads;

const Organizations = db.organizations;

const Reports = db.reports;

const Tasks = db.tasks;

const Organization = db.organization;

const InteractionsData = [
  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    interaction_date: new Date('2023-10-01T10:00:00Z'),

    type: 'Email',

    notes: 'Sent introductory email.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    interaction_date: new Date('2023-10-02T11:00:00Z'),

    type: 'Call',

    notes: 'Discussed product features.',

    // type code here for "relation_one" field
  },

  {
    // type code here for "relation_one" field

    // type code here for "relation_one" field

    interaction_date: new Date('2023-10-03T12:00:00Z'),

    type: 'Meeting',

    notes: 'In-person meeting to demo product.',

    // type code here for "relation_one" field
  },
];

const LeadsData = [
  {
    first_name: 'John',

    last_name: 'Doe',

    email: 'john.doe@example.com',

    phone: '111-222-3333',

    status: 'New',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Jane',

    last_name: 'Smith',

    email: 'jane.smith@example.com',

    phone: '444-555-6666',

    status: 'Qualified',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    first_name: 'Alice',

    last_name: 'Johnson',

    email: 'alice.johnson@example.com',

    phone: '777-888-9999',

    status: 'Converted',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Tech Solutions Inc.',

    address: '123 Tech Street, Silicon Valley, CA',

    phone: '123-456-7890',
  },

  {
    name: 'Innovatech LLC',

    address: '456 Innovation Drive, Austin, TX',

    phone: '987-654-3210',
  },

  {
    name: 'Future Enterprises',

    address: '789 Future Lane, New York, NY',

    phone: '555-123-4567',
  },
];

const ReportsData = [
  {
    title: 'Monthly Sales Report',

    content: 'This is the monthly sales report for October.',

    // type code here for "relation_one" field
  },

  {
    title: 'Lead Conversion Analysis',

    content: 'Analysis of lead conversion rates for Q3.',

    // type code here for "relation_one" field
  },

  {
    title: 'Performance Metrics',

    content: 'Detailed performance metrics for the sales team.',

    // type code here for "relation_one" field
  },
];

const TasksData = [
  {
    title: 'Follow up with John Doe',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    due_date: new Date('2023-10-06T10:00:00Z'),

    completed: true,

    // type code here for "relation_one" field
  },

  {
    title: 'Send proposal to Jane Smith',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    due_date: new Date('2023-10-07T11:00:00Z'),

    completed: false,

    // type code here for "relation_one" field
  },

  {
    title: 'Prepare demo for Alice Johnson',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    due_date: new Date('2023-10-08T12:00:00Z'),

    completed: false,

    // type code here for "relation_one" field
  },
];

const OrganizationData = [
  {
    name: 'Michael Faraday',
  },

  {
    name: 'Werner Heisenberg',
  },

  {
    name: 'Albert Einstein',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }
}

async function associateInteractionWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Interaction0 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Interaction0?.setLead) {
    await Interaction0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Interaction1 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Interaction1?.setLead) {
    await Interaction1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Interaction2 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Interaction2?.setLead) {
    await Interaction2.setLead(relatedLead2);
  }
}

async function associateInteractionWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Interaction0 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Interaction0?.setUser) {
    await Interaction0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Interaction1 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Interaction1?.setUser) {
    await Interaction1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Interaction2 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Interaction2?.setUser) {
    await Interaction2.setUser(relatedUser2);
  }
}

async function associateInteractionWithOrganization() {
  const relatedOrganization0 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Interaction0 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Interaction0?.setOrganization) {
    await Interaction0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Interaction1 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Interaction1?.setOrganization) {
    await Interaction1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Interaction2 = await Interactions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Interaction2?.setOrganization) {
    await Interaction2.setOrganization(relatedOrganization2);
  }
}

async function associateLeadWithAssigned_to() {
  const relatedAssigned_to0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setAssigned_to) {
    await Lead0.setAssigned_to(relatedAssigned_to0);
  }

  const relatedAssigned_to1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setAssigned_to) {
    await Lead1.setAssigned_to(relatedAssigned_to1);
  }

  const relatedAssigned_to2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setAssigned_to) {
    await Lead2.setAssigned_to(relatedAssigned_to2);
  }
}

async function associateLeadWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setOrganization) {
    await Lead0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setOrganization) {
    await Lead1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setOrganization) {
    await Lead2.setOrganization(relatedOrganization2);
  }
}

async function associateReportWithOrganization() {
  const relatedOrganization0 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Report0 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Report0?.setOrganization) {
    await Report0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Report1 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Report1?.setOrganization) {
    await Report1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Report2 = await Reports.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Report2?.setOrganization) {
    await Report2.setOrganization(relatedOrganization2);
  }
}

async function associateTaskWithAssigned_to() {
  const relatedAssigned_to0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setAssigned_to) {
    await Task0.setAssigned_to(relatedAssigned_to0);
  }

  const relatedAssigned_to1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setAssigned_to) {
    await Task1.setAssigned_to(relatedAssigned_to1);
  }

  const relatedAssigned_to2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setAssigned_to) {
    await Task2.setAssigned_to(relatedAssigned_to2);
  }
}

async function associateTaskWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setLead) {
    await Task0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setLead) {
    await Task1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setLead) {
    await Task2.setLead(relatedLead2);
  }
}

async function associateTaskWithOrganization() {
  const relatedOrganization0 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setOrganization) {
    await Task0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setOrganization) {
    await Task1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organization.findOne({
    offset: Math.floor(Math.random() * (await Organization.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setOrganization) {
    await Task2.setOrganization(relatedOrganization2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Interactions.bulkCreate(InteractionsData);

    await Leads.bulkCreate(LeadsData);

    await Organizations.bulkCreate(OrganizationsData);

    await Reports.bulkCreate(ReportsData);

    await Tasks.bulkCreate(TasksData);

    await Organization.bulkCreate(OrganizationData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateInteractionWithLead(),

      await associateInteractionWithUser(),

      await associateInteractionWithOrganization(),

      await associateLeadWithAssigned_to(),

      await associateLeadWithOrganization(),

      await associateReportWithOrganization(),

      await associateTaskWithAssigned_to(),

      await associateTaskWithLead(),

      await associateTaskWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('interactions', null, {});

    await queryInterface.bulkDelete('leads', null, {});

    await queryInterface.bulkDelete('organizations', null, {});

    await queryInterface.bulkDelete('reports', null, {});

    await queryInterface.bulkDelete('tasks', null, {});

    await queryInterface.bulkDelete('organization', null, {});
  },
};
