import * as React from 'react';

import PartHeader from './part/partHeader'
import PartBody from './part/partBody'

export class MissionPart extends React.Component {
    render() {
        return (
            <>
                <PartBody>
                    <PartHeader title={"Missie & Visie"} />
                    Onze missie is om studenten die al op kamers wonen de mogelijkheid
                    geven om door te groeien naar een kamer die bij hun wensen en behoeften past.
                    Wij willen dit proces zo eenvoudig mogelijk maken, zodat de verhuizing soepel
                    verloopt voor zowel de studenten als de pandeigenaren.
                    <br />
                    <br />
                    Onze visie is om de beschikbaarheid van studentenhuisvesting
                    in Groningen te vergroten. Dit willen wij doen door de doorstroming
                    van de studenten te vergemakkelijken en te versnellen. Wij willen af van
                    de eeuwige wachtrijen en het huren van een kamer die niet bij je past omdat
                    je anders niks kan krijgen.
                </PartBody>
            </>
        )
    }
}

export default MissionPart
