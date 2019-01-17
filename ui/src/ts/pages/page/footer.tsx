import * as React from 'react'

import {withStyles, createStyles, Theme} from '@material-ui/core/styles';

const styles = ({palette}: Theme) => createStyles({
  root: {
    backgroundColor: palette.grey[900],
    color: palette.grey[400],
    padding: "1em 5em 2em",
  },

  logoWrapper: {
      display: "flex",
      alignItems: "center",
  },
  logo: {
      marginLeft: "5px",
      flexGrow: 0
  },
  link: {
      textDecoration: "underline",
      flexGrow: 1
  },
});

interface IFooterProps {
    classes: any;
}

class Footer extends React.Component<IFooterProps & React.HTMLAttributes<HTMLDivElement>> {
    render() {
        let {classes} = this.props
        return (
            <div className={`${this.props.classes.root} ${this.props.className}`}>
                <br />
                <h4> Contact </h4>
                    <div className={classes.logoWrapper}>
                        Vind ons op&nbsp;<a className={classes.link} href="https://www.facebook.com/swapmyroom"> Facebook</a>
                    </div>
                    <div className={classes.logoWrapper}>
                        Vind ons op&nbsp;<a className={classes.link} href="https://www.instagram.com/swapmyroom.nl"> Instagram</a>
                    </div>
                <br />
            </div>
        )
    }
}

export default withStyles(styles)(Footer);
