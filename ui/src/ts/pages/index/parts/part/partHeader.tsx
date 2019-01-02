import * as React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = () => createStyles({
    root: {
        textAlign: "center",
    },
    anchor: {
        position: "absolute",
        marginTop: "-20vh",
        visibility: "hidden",
        display: "block",
    }
})

interface IPartHeaderProps {
    classes: any;
    title: string
}


export class PartHeader extends React.Component<IPartHeaderProps> {
    render() {
        let {classes} = this.props
        return (
            <div>
                <a id={this.props.title.replace(/\s+/g, '_').toLowerCase()} className={classes.anchor}></a>
                <h1 className={this.props.classes.root}> {this.props.title} </h1>
            </div>
        )
    }
}


export default withStyles(styles)(PartHeader)
