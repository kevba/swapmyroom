import * as React from 'react';
import every from 'lodash/every';

import Button from 'material-ui/Button';

class Form extends React.Component {
    constructor(props) {
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

    handleChange(k, v) {
        let {values} = this.state;
        values[k] = v;
        this.setState({values: values});
    }

    handleValidation(k, v) {
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

        return React.Children.map(children, child =>
            React.cloneElement(
                child, {
                    onValidate: (k, v) => this.handleValidation(k, v),
                    onChange: (k, v) => this.handleChange(k, v)
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

Form.defaultProps = {
    handleSubmit: () => {
        return;
    },
    button: (
        <Button
            variant="raised">
            {'Submit'}
        </Button>
    ),
    disableButton: false
};

export default Form;
