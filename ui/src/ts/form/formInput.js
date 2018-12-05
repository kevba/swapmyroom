import * as React from 'react';

import TextField from 'material-ui/TextField';

import BaseInput from '../forms/baseInput';

class FormInput extends BaseInput {
    render() {
        let {id, label, type} = this.props;
        let {errorText, value} = this.state;

        let error = (errorText !== '');
        if (error) {
            label = errorText;
        }

        return (
            <div>
                <TextField
                    id={id}
                    error={error}
                    label={label}
                    value={value}
                    type={type}
                    onChange={e => this.handleChange(e.target.value)}
                    margin="normal" />
            </div>
        );
    }
}

export default FormInput;
