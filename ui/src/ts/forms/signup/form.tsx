import * as React from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Form, {SubmitCallback} from '../../form/form';
import FormInput from '../../form/formInput';
import FormSelect from '../../form/formSelect';

import { required, integer, email, postalCode } from '../../form/validation/validations';

const styles = ({ palette }: Theme) => createStyles({
    hiddenContent: {
        display: "none",
    },
    noteText: {
        color: palette.text.disabled,
        textAlign: "left"
    },
    formButtons: {
        marginTop: "10px",
    },

    formButton: {
        marginRight: "10px",
    },
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
            steps: ["Voorkeuren", "Mijn kamer", "Contact"],
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
                            id="want_size"
                            defaultValue=""
                            label="Gewenste kameroppervlakte"
                            placeholder="oppervlakte in m&#178;"
                            inputProps={{
                                endAdornment: <InputAdornment position="start">m<sup>2</sup></InputAdornment>
                            }}
                            rules={[required(), integer()]} />

                        <FormSelect
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="want_rent"
                            label="Maximale huurbedrag"
                            defaultValue={300}
                            rules={[required()]} >
                            <MenuItem value={300}>{"Maximaal \u20AC 300"}</MenuItem>
                            <MenuItem value={400}>{"Maximaal \u20AC 400"}</MenuItem>
                            <MenuItem value={500}>{"Maximaal \u20AC 500"}</MenuItem>
                            <MenuItem value={600}>{"Maximaal \u20AC 600"}</MenuItem>
                            <MenuItem value={700}>{"Maximaal \u20AC 700"}</MenuItem>
                            <MenuItem value={800}>{"Maximaal \u20AC 800"}</MenuItem>
                            <MenuItem value={900}>{"Maximaal \u20AC 900"}</MenuItem>
                            <MenuItem value={1000}>{"Geld speelt geen rol"}</MenuItem>
                        </FormSelect>

                        <FormInput
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="want_postal_code"
                            defaultValue=""
                            label="Voorkeur wijk"
                            placeholder="Postcode van de wijk waar je graag in wilt wonen;"
                            rules={[postalCode()]} />

                        <FormSelect
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="want_toilet"
                            label="Toilet"
                            defaultValue={0}
                            rules={[required()]} >
                            <MenuItem value={0}>{"Maakt mij niet uit"}</MenuItem>
                            <MenuItem value={1}>{"Ik wil een eigen toilet"}</MenuItem>
                        </FormSelect>

                        <FormSelect
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="want_bathroom"
                            label="Badkamer"
                            defaultValue={0}
                            rules={[required()]} >
                            <MenuItem value={0}>{"Maakt mij niet uit"}</MenuItem>
                            <MenuItem value={1}>{"Ik wil een eigen badkamer"}</MenuItem>
                        </FormSelect>

                        <FormSelect
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="want_living_room"
                            label="Woonkamer"
                            defaultValue={0}
                            rules={[required()]} >
                            <MenuItem value={0}>{"Maakt mij niet uit"}</MenuItem>
                            <MenuItem value={1}>{"Ik wil een gedeelde woonkamer"}</MenuItem>
                        </FormSelect>

                        <FormSelect
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="want_personal_spaces"
                            label="Voorkeur aantal ruimtes"
                            defaultValue={1}
                            rules={[required()]} >
                            <MenuItem value={1}>{"Ik wil minimaal 1 eigen ruimte"}</MenuItem>
                            <MenuItem value={2}>{"Ik wil minimaal 2 eigen ruimtes"}</MenuItem>
                            <MenuItem value={3}>{"Ik wil minimaal 3 eigen ruimtes"}</MenuItem>
                            <MenuItem value={4}>{"Ik wil minimaal 4 eigen ruimtes"}</MenuItem>
                            <MenuItem value={5}>{"Ik wil meer dan 4 eigen ruimtes"}</MenuItem>
                        </FormSelect>

                        <FormInput
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="want_floor"
                            defaultValue=""
                            label="Op welke hoogte woon je het liefst?"
                            placeholder="Je favoriete verdieping"
                            rules={[required(), integer()]} />

                        <FormSelect
                            className={this.state.activeStep !== 0 ? classes.hiddenContent : ""}
                            id="want_landlord"
                            label="Voorkeur soort verhuurder"
                            defaultValue={"huisbaas"}
                            rules={[required()]} >
                            <MenuItem value={"huisbaas"}>{"Huisbaas"}</MenuItem>
                            <MenuItem value={"makelaar"}>{"Makelaar"}</MenuItem>
                            <MenuItem value={"woning_corporatie"}>{"Woning Corporatie"}</MenuItem>
                        </FormSelect>

                        {/* Second page of the form */}
                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_size"
                            defaultValue=""
                            label="Huidig kameroppervlak van je kamer"
                            placeholder="oppervlakte in m&#178;"
                            inputProps={{
                                endAdornment: <InputAdornment position="start">m<sup>2</sup></InputAdornment>
                            }}
                            rules={[required(), integer()]} />

                        <FormSelect
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_rent"
                            label="Jouw huidige huur (inclusief)"
                            defaultValue={300}
                            rules={[required()]} >
                            <MenuItem value={300}>{"Lager dan \u20AC 300"}</MenuItem>
                            <MenuItem value={400}>{"Tussen de \u20AC 300 en \u20AC 400"}</MenuItem>
                            <MenuItem value={500}>{"Tussen de \u20AC 400 en \u20AC 500"}</MenuItem>
                            <MenuItem value={600}>{"Tussen de \u20AC 500 en \u20AC 600"}</MenuItem>
                            <MenuItem value={700}>{"Tussen de \u20AC 600 en \u20AC 700"}</MenuItem>
                            <MenuItem value={800}>{"Tussen de \u20AC 700 en \u20AC 800"}</MenuItem>
                            <MenuItem value={900}>{"Tussen de \u20AC 800 en \u20AC 900"}</MenuItem>
                            <MenuItem value={1000}>{"Meer dan \u20AC 900"}</MenuItem>
                        </FormSelect>

                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_postal_code"
                            defaultValue=""
                            label="Je huidige postcode"
                            placeholder="Jouw postcode;"
                            rules={[required(), postalCode()]} />

                        <FormSelect
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_toilet"
                            label="Toilet"
                            defaultValue={0}
                            rules={[required()]} >
                            <MenuItem value={0}>{"Ik deel het toilet"}</MenuItem>
                            <MenuItem value={1}>{"Ik heb een eigen toilet"}</MenuItem>
                        </FormSelect>

                        <FormSelect
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_bathroom"
                            label="Badkamer"
                            defaultValue={0}
                            rules={[required()]} >
                            <MenuItem value={0}>{"Ik deel de badkamer"}</MenuItem>
                            <MenuItem value={1}>{"Ik heb een eigen badkamer"}</MenuItem>
                        </FormSelect>

                        <FormSelect
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_living_room"
                            label="Woonkamer"
                            defaultValue={0}
                            rules={[required()]} >
                            <MenuItem value={0}>{"Ik deel de woonkamer"}</MenuItem>
                            <MenuItem value={1}>{"Ik heb een eigen woonkamer"}</MenuItem>
                        </FormSelect>

                        <FormSelect
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_personal_spaces"
                            label="Aantal eigen ruimtes"
                            defaultValue={1}
                            rules={[required()]} >
                            <MenuItem value={1}>{"Ik heb 1 eigen ruimte"}</MenuItem>
                            <MenuItem value={2}>{"Ik heb 2 eigen ruimtes"}</MenuItem>
                            <MenuItem value={3}>{"Ik heb 3 eigen ruimtes"}</MenuItem>
                            <MenuItem value={4}>{"Ik heb 4 eigen ruimtes"}</MenuItem>
                            <MenuItem value={5}>{"Ik heb meer dan 4 eigen ruimtes"}</MenuItem>
                        </FormSelect>

                        <FormInput
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_floor"
                            defaultValue=""
                            label="De verdieping waarop je kamer zich bevindt"
                            placeholder=""
                            rules={[required(), integer()]} />

                        <FormSelect
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_hospice"
                            label="Hospice"
                            defaultValue={0}
                            rules={[required()]} >
                            <MenuItem value={0}>{"Er is geen sprake van een hospice"}</MenuItem>
                            <MenuItem value={1}>{"Er is sprake van een hospice"}</MenuItem>
                        </FormSelect>

                        <FormSelect
                            className={this.state.activeStep !== 1 ? classes.hiddenContent : ""}
                            id="own_landlord"
                            label="Soort verhuurder"
                            defaultValue={"huisbaas"}
                            rules={[required()]} >
                            <MenuItem value={"huisbaas"}>{"Huisbaas"}</MenuItem>
                            <MenuItem value={"makelaar"}>{"Makelaar"}</MenuItem>
                            <MenuItem value={"woning_corporatie"}>{"Woning Corporatie"}</MenuItem>
                        </FormSelect>

                        {/* Third and last page of the form */}
                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id="email"
                            defaultValue=""
                            label="E-mail"
                            rules={[required(), email()]} />
                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id="firstName"
                            defaultValue=""
                            label="Voornaam"
                            rules={[required()]} />
                        <FormInput
                            className={this.state.activeStep !== 2 ? classes.hiddenContent : ""}
                            id="lastName"
                            defaultValue=""
                            label="Achternaam"
                            rules={[required()]} />
                    </Form>
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
                className={this.props.classes.formButton}
                onClick={() => this.handleBack()}
                variant={"contained"}>
                {'Terug'}
            </Button>
        )
    }

    renderNext(): React.ReactNode {
        if (this.state.activeStep > this.state.steps.length - 2) {
            return (<></>)
        }

        return (
            <Button
                className={this.props.classes.formButton}
                onClick={() => this.handleNext()}
                variant={"contained"}>
                {'Volgende'}
            </Button>
        )
    }

    renderSubmit(): React.ReactNode {
        if (this.state.activeStep < this.state.steps.length - 1) {
            return (<></>)
        }

        return (
            <Button
                className={this.props.classes.formButton}
                disabled={!this.state.formValid}
                onClick={() => this.submitRef.current.onSubmit()}
                color="secondary"
                variant={"contained"}>
                {'Verstuur'}
            </Button>
        )
    }

}

export default withStyles(styles)(FormStepper)
