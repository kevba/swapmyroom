import * as React from 'react';

import { withStyles, createStyles } from '@material-ui/core/styles';

import PartHeader from './part/partHeader'
import PartBody from './part/partBody'


const styles = () => createStyles({
    body: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },

    infoBox: {
        margin: "10px",
        padding: "10px",
        flexGrow: 1,
        width: "300px",
        borderStyle: "solid",
        borderWidth: "5px 0"
    },
})

interface IAboutPart {
    classes: any;
}

export class AboutPart extends React.Component<IAboutPart> {
    render() {
        let {classes} = this.props
        return (
            <>
                <PartHeader title={"Wie zijn wij?"} />
                <PartBody>
                    <div className={classes.body}>
                        <div className={classes.infoBox}>
                            <div><b>Robin Johnson</b></div>
                            <br />
                            <div>
                                Oprichter & eigenaar
                                <br />
                                Ik doe op dit moment nog de studie Industrieel
                                product design. Ik zet mijn kennis in om SwapMyRoom optimaal
                                te maken op gebied van user-interface en interactie.
                            </div>
                        </div>
                        <div className={classes.infoBox}>
                            <div><b>Martin Batema</b></div>
                            <br />
                            <div>
                                Oprichter & eigenaar
                                <br />
                                <br />
                                Ik ben op dit moment bezig met de opleding Commerciële economie.
                                Ik zorg er voor dat er zo veel mogelijk studenten
                                zich bij SwapMyRoom aanmelden zodat jij sneller
                                jouw perfecte kamer vindt.
                            </div>
                        </div>
                    </div>
                </PartBody>
            </>
        )
    }
}

export default withStyles(styles)(AboutPart);
