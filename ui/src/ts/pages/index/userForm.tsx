import * as React from 'react';

import Form from '../../form/form';
import FormInput from '../../form/formInput';
import {required, email} from '../../form/validation/validations';

export class UserForm extends React.Component {
    render() {
        return (
            <Form handleSubmit={(data: any) => console.log(data)}>
                <FormInput
                    id="email"
                    defaultValue=""
                    label="Email"
                    rules={[required(), email()]} />
                <FormInput
                    id="firstName"
                    defaultValue=""
                    label="First name"
                    rules={[required()]} />
                <FormInput
                    id="lastName"
                    defaultValue="aaa"
                    label="Last name"
                    rules={[required()]} />
            </Form>
        )
    }
}

export default UserForm;
