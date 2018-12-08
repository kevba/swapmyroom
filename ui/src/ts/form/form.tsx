import * as React from 'react';
import {every} from 'lodash';

import Button from '@material-ui/core/Button';
import {IBaseInput} from './baseInput'

export type SubmitCallback = (values: any) => void
export type OnValidCallback = (valid: boolean) => void

interface IFormProps {
    handleSubmit: SubmitCallback
    handleOnValidate: SubmitCallback
    children: React.ReactElement<IBaseInput>[]
    button: React.ReactElement<any>
    disableButton: boolean
    showButton: boolean
}

interface IFormState {
    values: any
    validation: any
}

class Form extends React.Component<IFormProps, IFormState> {
    static defaultProps = {
        handleSubmit: (values: any) => { return },
        handleOnValidate: (valid: boolean) => { return },
        button: <Button variant="contained"> {'Submit'}</Button>,
        disableButton: false,
        showButton: true
    };

    constructor(props: IFormProps) {
        super(props);

        this.state = {
            values: {},
            validation: {}
        };
    }

    onSubmit() {
        let {handleSubmit} = this.props;
        handleSubmit(this.state.values);
    }

    isFormValid(): boolean {
        let {validation} = this.state;
        let valid = every(validation, v => (v));
        return valid
    }

    handleChange(k: string | number, v: any) {
        let {values} = this.state;
        values[k] = v;
        this.setState({values: values});
    }

    handleValidation(k: string | number, v: any) {
        let {validation} = this.state;
        validation[k] = v;
        this.setState({validation: validation},
            () => this.props.handleOnValidate(this.isFormValid())
        );

    }

    render() {
        return (
            <div>
                {this.renderFormComponents()}
                <div style={{paddingBottom: '1.0em', paddingTop: '1.0em'}}>
                    {this.renderButton()}
                </div>
            </div>
        );
    }

    renderFormComponents() {
        let {children} = this.props;

        return React.Children.map(children, (child: React.ReactElement<IBaseInput>)  => (
            React.cloneElement(child, {
                onValidate: (k: any, v: any) => this.handleValidation(k, v),
                onChange: (k: any, v: any) => this.handleChange(k, v)
            })
        ))
    }

    renderButton() {
        let {button, disableButton} = this.props;
        if (this.props.showButton) {
            return React.cloneElement(
                button,
                {
                    disabled: !this.isFormValid() || disableButton,
                    onClick: () => this.onSubmit(),
                }
            );
        }
    }
}

export default Form;
