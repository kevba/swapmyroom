import * as React from 'react';

import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PartBody from './part/partBody'

const styles = () => createStyles({
    body: {
        background: "rgba(0, 0, 0, 0)",
        padding: "10vh 0 12vh 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    button: {
        height: "100%",
        width: "22vw",
        flex: 1,
        fontSize: "1.5em",
        fontWeight: 550,
        padding: "1.3em"
    },

    button1: {
        marginLeft: "30px",
        marginRight: "15px",
    },

    button2: {
        marginLeft: "15px",
        marginRight: "30px",
    },

    '@media (max-width: 800px)': {
        body: {
            padding: "5vh 0 6vh 0",
        },
        button: {
            width: "25vw",
            fontSize: "0.9em"
        },
    },
})

interface IWelcomePart {
    classes: any;
}

export class WelcomePart extends React.Component<IWelcomePart>{
    render() {
        let {classes} = this.props
        return (
            <div className={classes.body}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={`${classes.button} ${classes.button1}`}>
                    Ik wil Swappen!
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={`${classes.button} ${classes.button2}`}>
                    Hoe werkt het?
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(WelcomePart)
