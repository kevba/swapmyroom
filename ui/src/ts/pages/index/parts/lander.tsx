import * as React from 'react';

import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PartBody from './part/partBody'

const styles = () => createStyles({
    body: {
        padding: "5px",
        opacity: 0,
    },
    button: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        opacity: 1
    },
})

interface IWelcomePart {
    classes: any;
}

export class WelcomePart extends React.Component<IWelcomePart>{
    render() {
        let {classes} = this.props
        return (
            <PartBody className={classes.body}>
                <Button className={classes.button}><h4> Ik wil Swappen! </h4></Button>
            </PartBody>
        )
    }
}

export default withStyles(styles)(WelcomePart)
