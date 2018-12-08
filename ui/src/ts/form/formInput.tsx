import * as React from 'react';

import TextField from '@material-ui/core/TextField';

import {BaseInput, IBaseInputProps, IBaseInputState} from './baseInput';

interface IFormInputProps extends IBaseInputProps{
    label: string
    type?: string
    className?: string
}

interface IFormInputState extends IBaseInputState {}

class FormInput extends BaseInput<IFormInputProps, IFormInputState> {
    render() {
        let {id, label, type} = this.props;
        let {errorText, value} = this.state;

        let error = (errorText !== '');

        return (
            <div>
                <TextField
                    className={this.props.className}
                    fullWidth
                    id={id}
                    label={label}
                    value={value}
                    helperText={errorText || " "}
                    type={type}
                    FormHelperTextProps={{
                        error: error
                    }}
                    onChange={e => this.handleChange(e.target.value)}
                    margin="normal" />
            </div>
        );
    }
}

export default FormInput;
