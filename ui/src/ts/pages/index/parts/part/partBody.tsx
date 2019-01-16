import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = () => createStyles({
    root: {
        textAlign: "left",
        padding: "25px 25px 60px 25px",
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
            <Paper className={`${this.props.classes.root} ${this.props.className} ${this.props.classes.content}`}>
                {this.props.children}
            </Paper>
        )
    }
}


export default withStyles(styles)(PartBody)
