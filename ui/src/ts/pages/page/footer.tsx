import * as React from 'react'

import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = ({palette}: Theme) => createStyles({
  root: {
    backgroundColor: palette.grey[900],
    color: palette.grey[400],
    padding: "1em 5em 2em",
  },
});

interface IFooterProps {
    classes: any;
}

class Footer extends React.Component<IFooterProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        return (
            <div className={`${this.props.classes.root} ${this.props.className}`}>
                This footer is a demo
                <br />
                <br />
                Make by Kevba
            </div>
        )
    }
}

export default withStyles(styles)(Footer);
