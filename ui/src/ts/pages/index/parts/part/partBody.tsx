import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = () => createStyles({
    root: {
        padding: "20px",
        // All items are big, mostly for demo purposes
        minHeight: "40vh",
        textAlign: "center",
    },
})

interface IPartBodyProps {
    children: any;
    classes: any;
}

export class PartBody extends React.Component<IPartBodyProps> {
    render() {
        return (
            <Paper className={this.props.classes.root}>
                {this.props.children}
            </Paper>
        )
    }
}


export default withStyles(styles)(PartBody)
