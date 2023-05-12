import React, { useState } from 'react';
import { ProjectCategory, ProjectCategoryCopy } from 'shared/constants/projects';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form, PageLoader, PageError } from 'shared/components';
import { Link } from 'react-router-dom';
import { Modal } from 'shared/components';
import {
  ListCont,
  ListHeading,
  List,
  ListItem,
  ItemName,
  ItemCategory,
  ItemDescription,
  AddProjectButton,
  RightProjectButton,
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  Divider,
  EmailListContainer,
  EmailContainer,
  EmailAddress,
  DeleteButton,
} from './Styles';

const ProjectsList = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [{ isUpdating }, createProject] = useApi.post('/project/');

  const [{}, ] = useApi.post('/project');
  
  const [{ data, error, setLocalData }, fetchProjects] = useApi.get('/project/');

  const [selectedEmails, setSelectedEmails] = useState([]);

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const projects = data;

  const handleEmailSelect = (email) => {
    if (selectedEmails.includes(email) || email === '') return;
    setSelectedEmails([...selectedEmails, email]);
  };

  const handleEmailDelete = (email) => {
    if (!selectedEmails.includes(email)) return;
    setSelectedEmails(selectedEmails.filter(e => e !== email));
  };

  return (
    <>
      <ListCont>
        <ListHeading>Projects</ListHeading>
        <List>
          {projects && projects.map(project => (
            <Link key={project.id} to={`/project/${project.id}`}>
              <ListItem>
                <ItemName>{project.name}</ItemName>
                <ItemCategory>{ProjectCategoryCopy[project.category]}</ItemCategory>
                <ItemDescription dangerouslySetInnerHTML={{ __html: project.description.replace(/\n/g, ' ') }} />
              </ListItem>
            </Link>
          ))}
        </List>
        <AddProjectButton onClick={() => setIsCreating(true)}>Add Project</AddProjectButton>
        <Link to="/logout"><RightProjectButton>Logout</RightProjectButton></Link>
      </ListCont>

      {isCreating && (
        <Modal
          isOpen
          width={800}
          withCloseIcon={false}
          onClose={() => {setIsCreating(false);
          setSelectedEmails([]);}}
          renderContent={() => (
            <Form
              initialValues={{ name: '', url: '', category: '', description: '', email: '' }}
              validations={{
                name: [Form.is.required(), Form.is.maxLength(100)],
                url: Form.is.url(),
                category: Form.is.required(),
                email: Form.is.email(),
              }}
              onSubmit={async (values, form) => {
                try {
                  await createProject({ ...values, emails: selectedEmails });
                  await fetchProjects();
                  setIsCreating(false);
                  toast.success('Project has been created successfully.');
                  console.log('newProjectId', newProjectId);
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
                  <div>
                  &nbsp;
                  </div>
                  <ActionButton type="button" variant="primary" disabled={!values.email} onClick={() => {
                    if (errors.email === 'Must be a valid email') return;
                    handleEmailSelect(values.email);
                    values.email = '';
                    }}>
                    Add user
                  </ActionButton>

                <Divider />

                  <ActionButton type="submit" variant="primary" isWorking={isUpdating}>
                    Create Project
                  </ActionButton>
                </FormElement>
              </FormCont>
              )}
            </Form>
          )}
        />
      )}
    </>
  );
};

const categoryOptions = [
  ...Object.values(ProjectCategory).map(category => ({
    value: category,
    label: ProjectCategoryCopy[category],
  }))
];

export default ProjectsList;