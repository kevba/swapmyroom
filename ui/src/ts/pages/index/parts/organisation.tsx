import * as React from 'react';

import PartHeader from './part/partHeader'
import PartBody from './part/partBody'

export class OrgPart extends React.Component {
    render() {
        return (
            <>
                <PartHeader title={"Organisatie"} />
                <PartBody>
                    SwapMyRoom is ontstaan uit een groot tekort aan kamers voor studenten in
                    en rondom Groningen. De student die hier al woont en op zoek is naar een andere
                    kamer heeft vaak moeite met de zoektocht door de hoge vraag en het toetreden van
                    nieuwe studenten. Bij het verhuizen zit je vaak met dubbele huur en een kleine selectie
                    beschikbare (vaak onbetaalbare) kamers. Daarnaast worden er vaak absurde bedragen gevraagd
                    om te kunnen reageren op het aanbod.
                    <br />

                    Wij willen verandering in de markt brengen en de student meer kracht geven door transparantie en gemak te bieden.

                    <br />
                    <br />

                    Er is altijd wel iemand die zijn of haar kamer wil ruilen, die perfect voor jou zou zijn.
                    Wat als jij jouw kamer te ruil kan aanbieden, omdat je groter, goedkoper en/of in een andere omgeving
                    wilt wonen? Hierbij is dit natuurlijk wel een luxeprobleem en hoef je niet te ruilen als het aanbod
                    je (tot zover) niet aanstaat.
                </PartBody>
            </>
        )
    }
}

export default OrgPart
