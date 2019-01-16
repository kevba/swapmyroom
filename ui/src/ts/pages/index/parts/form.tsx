import * as React from 'react';

import { withStyles, createStyles } from '@material-ui/core/styles';

import SignupForm from '../../../forms/signup/signup'

import PartHeader from './part/partHeader'
import PartBody from './part/partBody'


const styles = () => createStyles({
    body: {
        display: "flex",
        justifyContent: "center",
    },

    form: {
        width: "100%",
        maxWidth: "30em",
        flexGrow: 1
    },
})

interface IFormPartProps {
    classes: any;
}

export class FormPart extends React.Component<IFormPartProps> {
    render() {
        return (
            <>
                <PartHeader title={"Meld je aan"} />
                <PartBody className={this.props.classes.body}>
                    <div className={this.props.classes.form}>
                        <SignupForm />
                    </div>
                </PartBody>
            </>
        )
    }
}

export default withStyles(styles)(FormPart)
