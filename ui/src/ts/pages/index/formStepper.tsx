import * as React from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

import Form from '../../form/form';
import FormInput from '../../form/formInput';

import {required, integer, email} from '../../form/validation/validations';

const styles = ({}: Theme) => createStyles({
    hiddenContent: {
        display: "none",
    }
})

interface IFormStepperState {
    activeStep: number
    steps: string[],
    formValid: boolean
}

interface IFormStepperProps {
    classes: any
}

export class FormStepper extends React.Component<IFormStepperProps, IFormStepperState> {
    private submitRef: React.RefObject<Form>

    constructor(props: any) {
        super(props)
        this.submitRef = React.createRef<Form>();

        this.state = {
            activeStep: 0,
            steps: ["Preferences", "My Room", "Contact"],
            formValid: false
        }

    }

    handleNext() {
        this.setState({
            activeStep: this.state.activeStep + 1,
        });
    };

    handleBack() {
        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    };

    handleSubmit(data: any) {
        console.log(data)
    }

    handleOnValidate(valid: boolean) {
        this.setState({
            formValid: valid,
        });
    }

    render() {
        let {classes} = this.props
        return (
            <div>
                <Stepper activeStep={this.state.activeStep} >
                    {this.state.steps.map((s, i) =>(
                        <Step key={i}>
                            <StepLabel key={i}>{s}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <Form
                        ref={this.submitRef}
                        handleSubmit={(data) => this.handleSubmit(data)}
                        handleOnValidate={(valid) => this.handleOnValidate(valid)}
                        showButton={false}>
                        <FormInput
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="rent"
                            defaultValue=""
                            label="Rent"
                            rules={[required()]} />
                        <FormInput
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="roomMates"
                            defaultValue=""
                            label="Maximum roommates"
                            rules={[required(), integer()]} />
                        <FormInput
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="bla"
                            defaultValue="yes"
                            label="other things"
                            rules={[required()]} />

                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="rent"
                            defaultValue=""
                            label="Rent"
                            rules={[required()]} />
                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="roomMates"
                            defaultValue=""
                            label="Maximum roommates"
                            rules={[required(), integer()]} />
                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="bla"
                            defaultValue="yes"
                            label="other things"
                            rules={[required()]} />


                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id="rent"
                            defaultValue=""
                            label="Rent"
                            rules={[required()]} />
                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id="roomMates"
                            defaultValue=""
                            label="Maximum roommates"
                            rules={[required(), integer()]} />
                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id=""
                            defaultValue=""
                            label=""
                            rules={[required()]} />
                    </Form>
                </div>
                <div>
                    {this.renderBack()}
                    {this.renderNext()}
                    {this.renderSubmit()}
                </div>
            </div>
        )
    }

    renderBack(): React.ReactNode {
        if (this.state.activeStep === 0) {
            return (<></>)
        }

        return (
            <Button
                onClick={() => this.handleBack()}
                variant={"contained"}>
                {'Back'}
            </Button>
        )
    }

    renderNext(): React.ReactNode {
        if (this.state.activeStep > this.state.steps.length-2) {
            return (<></>)
        }

        return (
            <Button
                onClick={() => this.handleNext()}
                variant={"contained"}>
                {'Next'}
            </Button>
        )
    }

    renderSubmit(): React.ReactNode {
        if (this.state.activeStep < this.state.steps.length-1) {
            return (<></>)
        }

        return (
            <Button
                disabled={!this.state.formValid}
                onClick={() => this.submitRef.current.onSubmit()}
                variant={"contained"}>
                {'Submit'}
            </Button>
        )
    }

}

export default withStyles(styles)(FormStepper)
