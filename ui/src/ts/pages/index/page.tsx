import * as React from 'react';


import Page from '../page/page';

// import Welcome from './parts/welcome'
import About from './parts/about'
import Organisation from './parts/organisation'
import Mission from './parts/mission'
import FiveSwapPlan from './parts/fiveSwapPlan'
import Lander from './parts/lander'
import Form from './parts/form'

import NavMenu from './menu'

interface IIndexPageProps {}

export class IndexPage extends React.Component<IIndexPageProps> {
    render() {
        return (
            <Page navButton={<NavMenu />}>
                <Lander />
                <Mission />
                <About />
                <Organisation />
                <FiveSwapPlan />
                <Form />
            </Page>
        );
    }
};

export default (IndexPage);
