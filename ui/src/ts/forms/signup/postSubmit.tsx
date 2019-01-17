import * as React from 'react';

import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = ({ palette }: Theme) => createStyles({
    root: {
        marginRight: "10px",
        textAlign: "center"
    },
})

interface IPostProps {
    classes: any
}

export class PostSubmit extends React.Component<IPostProps> {
    render() {
        let { classes } = this.props
        return (
            <div className={classes.root}>
                <h3> Bedank voor je aanmelding!</h3>
                Wij gaan je perfecte match proberen te vinden
                <br />
                je hoort weet van ons zodra we iets hebben.
            </div>
        )
    }
}

export default withStyles(styles)(PostSubmit)
