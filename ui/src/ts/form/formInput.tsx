import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import { InputProps as StandardInputProps } from '@material-ui/core/Input';
import { InputLabelProps } from '@material-ui/core/InputLabel';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

import { BaseInput, IBaseInputProps, IBaseInputState } from './baseInput';

const styles = ({ }: Theme) => createStyles({
    labelRoot: {
        fontSize: "20px"
    }
})


interface IFormInputProps extends IBaseInputProps {
    label: string
    type?: string
    className?: string
    classes?: any
    placeholder?: string
    inputProps?: Partial<StandardInputProps>;
    InputLabelProps?: Partial<InputLabelProps>;
}

interface IFormInputState extends IBaseInputState { }

class FormInput extends BaseInput<IFormInputProps, IFormInputState> {
    render() {
        let { classes, id, label, type, inputProps, placeholder } = this.props;
        let { errorText, value } = this.state;

        let error = (errorText !== '');

        let formLabelClasses: any = {
            focused: classes.labelRoot,
            filled: classes.labelRoot
        }

        if (placeholder != undefined && placeholder != "") {
            formLabelClasses["root"] = classes.labelRoot
        }

        return (
            <div>
                <TextField
                    className={this.props.className}
                    fullWidth
                    id={id}
                    label={label}
                    InputProps={inputProps}
                    value={value}
                    helperText={errorText || " "}
                    type={type}
                    placeholder={placeholder}
                    FormHelperTextProps={{
                        error: error
                    }}
                    InputLabelProps={{
                        FormLabelClasses: formLabelClasses
                    }}
                    onChange={e => this.handleChange(e.target.value)}
                    margin="normal" />
            </div>
        );
    }
}

export default withStyles(styles)(FormInput);
