import * as React from 'react';

import { withStyles, createStyles } from '@material-ui/core/styles';

import SignupForm from '../../../forms/signup'

import PartHeader from './part/partHeader'
import PartBody from './part/partBody'


const styles = () => createStyles({
    form: {
        width: "100%",
        maxWidth: "30em",
        display: "inline-block"
    },
})

interface IFormPartProps {
    classes: any;
}

export class FormPart extends React.Component<IFormPartProps> {
    render() {
        return (
            <>
                <PartHeader title={"Sign up"} />
                <PartBody>
                    Great! just a few things to fill in

                    <div>
                        <div className={this.props.classes.form}>
                            <SignupForm />
                        </div>
                    </div>

                </PartBody>
            </>
        )
    }
}

export default withStyles(styles)(FormPart)
