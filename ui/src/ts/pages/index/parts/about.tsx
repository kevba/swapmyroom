import * as React from 'react';

import PartHeader from './part/partHeader'
import PartBody from './part/partBody'

export class AboutPart extends React.Component {
    render() {
        return (
            <>
                <PartHeader title={"About us"} />
                <PartBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                </PartBody>
            </>
        )
    }
}

export default AboutPart