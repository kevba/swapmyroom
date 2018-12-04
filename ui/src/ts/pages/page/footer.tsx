import * as React from 'react'

import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = ({palette}: Theme) => createStyles({
  root: {
    backgroundColor: palette.secondary.dark,
    color: palette.secondary.contrastText,
    padding: "1em 5em 2em",
  },
});

interface IFooterProps {
    classes: any;
}

class Footer extends React.Component<IFooterProps> {
    render() {
        return (
            <div className={this.props.classes.root}>
                This footer is a demo
            </div>
        )
    }
}

export default withStyles(styles)(Footer);
