import * as React from 'react';
import {every} from 'lodash';

import Button from '@material-ui/core/Button';
import {IFormInput} from './baseInput'

export type SubmitCallback = (values: any) => void

interface IFormProps {
    handleSubmit: SubmitCallback
    children: React.ReactElement<IFormInput>[]
    button: React.ReactElement<any>
    disableButton: boolean
}

interface IFormState {
    values: any
    validation: any
}

class Form extends React.Component<IFormProps, IFormState> {
    static defaultProps = {
        handleSubmit: (values: any) => { return },
        button: <Button variant="raised"> {'Submit'}</Button>,
        disableButton: false
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

    isFormValid() {
        let {validation} = this.state;
        return every(validation, v => (v));
    }

    handleChange(k: string | number, v: any) {
        let {values} = this.state;
        values[k] = v;
        this.setState({values: values});
    }

    handleValidation(k: string | number, v: any) {
        let {validation} = this.state;
        validation[k] = v;
        this.setState({validation: validation});
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

        return React.Children.map(children, (child: React.ReactElement<IFormInput>)  =>
            React.cloneElement(
                child, {
                    onValidate: (k: any, v: any) => this.handleValidation(k, v),
                    onChange: (k: any, v: any) => this.handleChange(k, v)
                }
            )
        );
    }

    renderButton() {
        let {button, disableButton} = this.props;
        return React.cloneElement(
            button,
            {
                disabled: !this.isFormValid() || disableButton,
                onClick: () => this.onSubmit(),
            }
        );
    }
}

export default Form;
