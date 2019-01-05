import * as React from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import Button from '@material-ui/core/Button';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

import Form, {SubmitCallback} from '../../form/form';
import FormInput from '../../form/formInput';

import { required, integer, email } from '../../form/validation/validations';

const styles = ({ palette }: Theme) => createStyles({
    hiddenContent: {
        display: "none",
    },
    noteText: {
        color: palette.text.disabled,
        textAlign: "left"
    },
    formButtons: {
        paddingTop: "10px",
    }
})

interface IFormStepperState {
    activeStep: number
    steps: string[],
    formValid: boolean
}

interface IFormStepperProps {
    classes: any
    onSubmit: SubmitCallback
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
        this.props.onSubmit(data)
    }

    handleOnValidate(valid: boolean) {
        this.setState({
            formValid: valid,
        });
    }

    render() {
        let { classes } = this.props
        return (
            <div>
                <Stepper activeStep={this.state.activeStep} >
                    {this.state.steps.map((s, i) => (
                        <Step key={i}>
                            <StepLabel key={i}>{s}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <Form
                        ref={this.submitRef}
                        handleSubmit={(data: any) => this.handleSubmit(data)}
                        handleOnValidate={(valid: any) => this.handleOnValidate(valid)}
                        showButton={false}>

                        {/* First page of the form */}
                        <FormInput
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="rent"
                            defaultValue=""
                            label="Rent*"
                            type="number"
                            placeholder="maximum amout of rent you're willing to pay"
                            inputProps={{
                                startAdornment: <InputAdornment position="start">€</InputAdornment>
                            }}
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

                        {/* Second page of the form */}
                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="rent"
                            defaultValue=""
                            label="My Rent"
                            type="number"
                            inputProps={{
                                startAdornment: <InputAdornment position="start">€</InputAdornment>
                            }}
                            rules={[required()]} />
                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="roomMates"
                            defaultValue=""
                            type="number"
                            label="Amount of roommates"
                            rules={[required(), integer()]} />
                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="bla"
                            defaultValue="yes"
                            label="other things"
                            rules={[required()]} />

                        {/* Third and last page of the form */}
                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id="email"
                            defaultValue=""
                            label="Email"
                            rules={[required(), email()]} />
                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id="firstName"
                            defaultValue=""
                            label="First name"
                            rules={[required()]} />
                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id="lastName"
                            defaultValue=""
                            label="Last name"
                            rules={[required()]} />
                    </Form>
                    <div className={`${classes.noteText} ${this.state.activeStep !== 0 ? classes.hiddenContent : ""}`}>
                        <span>*Inclusive service charges </span>
                    </div>
                </div>
                <div className={classes.formButtons}>
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
        if (this.state.activeStep > this.state.steps.length - 2) {
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
        if (this.state.activeStep < this.state.steps.length - 1) {
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
