import React from 'react';
import { storeAuthToken } from 'shared/utils/authToken';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form } from 'shared/components';
import {
    FormHeading,
    FormElement,
    Actions,
    ActionButton,
    RegisterButton,
} from './Styles';
import { Link } from 'react-router-dom';

const RegistrationForm = (props) => {
    const [{ isCreating }, doRegister] = useApi.post('/authentication/register');

    return (
        <Form
            enableReinitialize
            initialValues={{
                email: '',
                name: '',
                password: '',
                password2: '',
            }}
            validations={{
                email: [Form.is.required(), Form.is.maxLength(200)],
                password: [Form.is.required(), Form.is.maxLength(200)],
                password2: [Form.is.required(), Form.is.maxLength(200)]
            }}
            onSubmit={async (values, form) => {
                try {
                    const resp = await doRegister({
                        ...values,
                    });
                    if (resp.success) {
                        toast.success('Registration successful! Please login');
                        props.history.push('/authenticate');
                    } else {
                        toast.error(resp.message);
                    }
                } catch (error) {
                    Form.handleAPIError(error, form);
                }
            }}
        >
            <FormElement>
                <FormHeading>Registration</FormHeading>
                <Form.Field.Input
                    name="email"
                    label="Email"
                />
                <Form.Field.Input
                    name="name"
                    label="Name"
                />
                <Form.Field.Input
                    name="password"
                    label="Password"
                    type="password"
                />
                <Form.Field.Input
                    name="password2"
                    label="Repeat password"
                    type="password"
                />
                <Actions>
                    <Link to="/authenticate">
                            <RegisterButton>Login</RegisterButton>
                    </Link>
                    <ActionButton type="submit" variant="primary" isWorking={isCreating}>
                        Register
                    </ActionButton>
                </Actions>
            </FormElement>
        </Form>
    );
}

export default RegistrationForm;