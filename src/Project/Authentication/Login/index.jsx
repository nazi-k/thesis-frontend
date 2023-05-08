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

const LoginForm = (props) => {
    const [{ isCreating }, doLogin] = useApi.post('/authentication/login');

    return (
        <Form
            enableReinitialize
            initialValues={{
                email: '',
                password: '',
            }}
            validations={{
                email: [Form.is.required(), Form.is.maxLength(200)],
                password: [Form.is.required(), Form.is.maxLength(200)],
            }}
            onSubmit={async (values, form) => {
                try {
                    const resp = await doLogin({
                        ...values,
                    });
                    if (resp.success) {
                        toast.success('Login successful!');
                        storeAuthToken(resp.authToken);

                        props.history.push('/');
                    } else {
                        toast.error(resp.message);
                    }
                } catch (error) {
                    Form.handleAPIError(error, form);
                }
            }}
        >
            <FormElement>
                <FormHeading>Login</FormHeading>
                <Form.Field.Input
                    name="email"
                    label="Email"
                />
                <Form.Field.Input
                    name="password"
                    label="Password"
                    type="password"
                />
                <Actions>

                    <Link to="/register">
                            <RegisterButton>Register</RegisterButton>
                    </Link>

                    <ActionButton type="submit" variant="primary" isWorking={isCreating}>
                        Login
                    </ActionButton>
                
                </Actions>
                
            </FormElement>
        </Form>
    );
}

export default LoginForm;
