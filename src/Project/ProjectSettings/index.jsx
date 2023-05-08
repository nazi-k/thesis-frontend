import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ProjectCategory, ProjectCategoryCopy } from 'shared/constants/projects';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form, Breadcrumbs } from 'shared/components';

import { FormCont, FormHeading, FormElement, ActionButton,
  Divider,
  EmailListContainer,
  EmailContainer,
  EmailAddress,
  DeleteButton } from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
};

const ProjectSettings = ({ project, fetchProject }) => {
  const [{ isUpdating }, updateProject] = useApi.put(`/project/${project.id}`);

  const [{}, ] = useApi.put(`/project/${project.id}`)

  const [selectedEmails, setSelectedEmails] = useState([]);

  const handleEmailSelect = (email) => {
    if (selectedEmails.includes(email) || email === '') return;
    setSelectedEmails([...selectedEmails, email]);
  };

  const handleEmailDelete = (email) => {
    if (!selectedEmails.includes(email)) return;
    setSelectedEmails(selectedEmails.filter(e => e !== email));
  };

  return (
    <Form
      initialValues={Form.initialValues(project, get => ({
        name: get('name'),
        url: get('url'),
        category: get('category'),
        description: get('description'),
        email: '',
      }))}
      validations={{
        name: [Form.is.required(), Form.is.maxLength(100)],
        url: Form.is.url(),
        category: Form.is.required(),
        email: Form.is.email(),
      }}
      onSubmit={async (values, form) => {
        try {
          await updateProject({ ...values, emails: selectedEmails });
          await fetchProject();
          toast.success('Changes have been saved successfully.');
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      {({ values, errors }) => (
                <FormCont>
                <FormElement>
                  <FormHeading>Add Project</FormHeading>

                  <Form.Field.Input name="name" label="Name" />
                  <Form.Field.Input name="url" label="URL" />
                  <Form.Field.TextEditor
                    name="description"
                    label="Description"
                    tip="Describe the project in as much detail as you'd like."
                  />
                  <Form.Field.Select name="category" label="Project Category" options={categoryOptions} />
                  
                  <Form.Field.Input
                    name="email"
                    label="Participant emails"
                    validate={Form.is.email()}
                    tip="Enter the email of the user you want to add to the project."

                  />
                  {selectedEmails.length > 0 && (
                    <EmailListContainer>
                    {selectedEmails.map(emailInput => (
                      <EmailContainer key={emailInput}>
                        <EmailAddress>{emailInput}</EmailAddress>
                        <DeleteButton onClick={() => handleEmailDelete(emailInput)}>&#x2715;</DeleteButton>
                      </EmailContainer>
                    ))}
                  </EmailListContainer>
                  )}
                  <ActionButton type="button" variant="primary" disabled={!values.email} onClick={() => {
                    if (errors.email === 'Must be a valid email') return;
                    handleEmailSelect(values.email);
                    values.email = '';
                    }}>
                    Add user
                  </ActionButton>

                <Divider />

          <ActionButton type="submit" variant="primary" isWorking={isUpdating}>
            Save changes
          </ActionButton>
        </FormElement>
      </FormCont>
              )}
    </Form>
  );
};

const categoryOptions = Object.values(ProjectCategory).map(category => ({
  value: category,
  label: ProjectCategoryCopy[category],
}));

ProjectSettings.propTypes = propTypes;

export default ProjectSettings;
