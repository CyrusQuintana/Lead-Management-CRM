import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/leads/leadsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditLeads = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    first_name: '',

    last_name: '',

    email: '',

    phone: '',

    status: '',

    assigned_to: '',

    organization: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { leads } = useAppSelector((state) => state.leads);

  const { currentUser } = useAppSelector((state) => state.auth);

  const { leadsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: leadsId }));
  }, [leadsId]);

  useEffect(() => {
    if (typeof leads === 'object') {
      setInitialValues(leads);
    }
  }, [leads]);

  useEffect(() => {
    if (typeof leads === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = leads[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [leads]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: leadsId, data }));
    await router.push('/leads/leads-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit leads')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit leads'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='FirstName'>
                <Field name='first_name' placeholder='FirstName' />
              </FormField>

              <FormField label='LastName'>
                <Field name='last_name' placeholder='LastName' />
              </FormField>

              <FormField label='Email'>
                <Field name='email' placeholder='Email' />
              </FormField>

              <FormField label='Phone'>
                <Field name='phone' placeholder='Phone' />
              </FormField>

              <FormField label='Status' labelFor='status'>
                <Field name='Status' id='Status' component='select'>
                  <option value='New'>New</option>

                  <option value='Contacted'>Contacted</option>

                  <option value='Qualified'>Qualified</option>

                  <option value='Converted'>Converted</option>
                </Field>
              </FormField>

              <FormField label='AssignedTo' labelFor='assigned_to'>
                <Field
                  name='assigned_to'
                  id='assigned_to'
                  component={SelectField}
                  options={initialValues.assigned_to}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              {hasPermission(currentUser, 'READ_ORGANIZATIONS') && (
                <FormField label='Organization' labelFor='organization'>
                  <Field
                    name='organization'
                    id='organization'
                    component={SelectField}
                    options={initialValues.organization}
                    itemRef={'organizations'}
                    showField={'name'}
                  ></Field>
                </FormField>
              )}

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/leads/leads-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditLeads.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_LEADS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditLeads;
