import * as React from 'react';

import { withStyles, createStyles } from '@material-ui/core/styles';

import PartHeader from './part/partHeader'
import PartBody from './part/partBody'
import {Info, Feedback} from '@material-ui/icons'

const styles = () => createStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        padding: "10px 0"
    },

    item: {
        margin: "0 5px"
    },

    icon: {
        width: "100%",
        height: "auto",
    }

})

interface IWelcomePart {
    classes: any;
}

export class WelcomePart extends React.Component<IWelcomePart>{
    render() {
        let {classes} = this.props
        return (
            <PartBody>
                <PartHeader title={"Welcome"} />
                <div className={classes.root}>
                    {this.renderAboutButton()}
                    {this.renderMissionButton()}
                    {this.renderFormButton()}
                </div>
            </PartBody>
        )
    }

    renderAboutButton() {
        let {classes} = this.props

        return (
            <div className={classes.item}>
                <Info className={classes.icon}/>
                <div> What's this about </div>
            </div>
        )
    }

    renderMissionButton() {
        let {classes} = this.props

        return (
            <div className={classes.item}>
                <Info className={classes.icon} color="primary"/>
                <div> Other thing </div>
            </div>
        )
    }

    renderFormButton() {
        let {classes} = this.props

        return (
            <div className={classes.item}>
                <Feedback className={classes.icon} color="secondary"/>
                <div> Sign me up! </div>
            </div>
        )
    }
}

export default withStyles(styles)(WelcomePart)
