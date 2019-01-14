import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = () => createStyles({
    root: {
        padding: "20px 20px 60px 20px",
        textAlign: "left",
    },
})

interface IPartBodyProps {
    children: any;
    classes: any;
    className?: string;
}

export class PartBody extends React.Component<IPartBodyProps> {
    render() {
        return (
            <Paper className={`${this.props.classes.root} ${this.props.className}`}>
                {this.props.children}
            </Paper>
        )
    }
}


export default withStyles(styles)(PartBody)
