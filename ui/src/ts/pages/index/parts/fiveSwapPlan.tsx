import * as React from 'react';

import { withStyles, createStyles, Theme} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import PartHeader from './part/partHeader'
import PartBody from './part/partBody'

const styles = ({palette}: Theme) => createStyles({
    stepContainer: {
        display: "flex",
        marginBottom: "2em"
    },

    icon: {
        fontSize: "1em",
        fontWeight: "bolder",
        flexBasis: "auto",
        flexGrow: 1,
        height: "3em",
        width: "3em",
        maxHeight: "3em",
        maxWidth: "3em",
        backgroundColor: palette.secondary.light,
        color: palette.secondary.contrastText,
        marginRight: "15px"
    },

    step: {
        flexBasis: "auto",
        flexGrow: 1,
    },
    stepHeader: {
        fontSize: "1.2em",
        fontWeight: "bolder",
    },
})

interface IFiveSwapPlanPart {
    classes: any;
}

export class FiveSwapPlanPart extends React.Component<IFiveSwapPlanPart>{
    render() {
        let {classes} = this.props
        return (
            <>
                <PartHeader title={"5-Swappenplan"} />
                <PartBody>
                    <div className={classes.stepContainer}>
                        <Avatar className={classes.icon}>1</Avatar>
                        <div className={classes.step}>
                            <div className={classes.stepHeader}>Vul je gegevens in</div>
                            Om een match voor jou te vinden hebben we de nodige informatie nodig.
                            Via een formulier kan jij makkelijk invullen hoe jouw kamer er uit ziet
                            en welke eisen jij hebt.
                         </div>
                     </div>
                    <div className={classes.stepContainer}>
                        <Avatar className={classes.icon}>2</Avatar>
                        <div className={classes.step}>
                            <div className={classes.stepHeader}>Wacht op een match</div>
                            Nadat jij hebt ingevuld wat je hebt en wat je wenst gaan wij voor jou aan de
                            slag. Achter de schermen zoeken wij naar de beste match voor jou. Alles wat jij
                            hier hoeft te doen is wachten..
                         </div>
                     </div>
                    <div className={classes.stepContainer}>
                        <Avatar className={classes.icon}>3</Avatar>
                        <div className={classes.step}>
                            <div className={classes.stepHeader}>Kom in contact</div>
                            Er is een match! Je hebt een bericht van ons ontvangen en kan de match bekijken.
                            Ben je tevreden? Dan brengen wij jullie met elkaar in contact!
                            Is dit toch niet precies wat je zoekt? Dan zoeken wij voor je verder.
                         </div>
                     </div>
                    <div className={classes.stepContainer}>
                        <Avatar className={classes.icon}>4</Avatar>
                        <div className={classes.step}>
                            <div className={classes.stepHeader}>Swap!</div>
                            Jij en de ander zijn tevreden met de match! Je hebt elkaar gesproken en misschien zelfs
                            bij elkaar op bezoek geweest. De laatste stap is het contractueel ruilen; Dit kunnen wij
                            niet voor jullie doen. Wij raden jullie aan om samen naar de makelaar of huurbaas te
                            gaan om dit te regelen.
                        </div>
                     </div>
                    <div className={classes.stepContainer}>
                        <Avatar className={classes.icon}>5</Avatar>
                        <div className={classes.step}>
                            <div className={classes.stepHeader}>Laat het ons weten</div>
                            Hoe verliep jouw Swap? Ben je tevreden of was er iets niet
                            duidelijk? Wij horen het graag!
                         </div>
                     </div>
                </PartBody>
            </>
        )
    }
}

export default withStyles(styles)(FiveSwapPlanPart)
