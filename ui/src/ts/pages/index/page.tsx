import * as React from 'react';


import Page from '../page/page';

import Welcome from './parts/welcome'
import About from './parts/about'
import Mission from './parts/mission'
import Form from './parts/form'

interface IIndexPageProps {}

export class IndexPage extends React.Component<IIndexPageProps> {
    render() {
        let navButtons = [
            {href: "#about_us", text: "About"},
            {href: "#our_mission", text: "Our mission"}
        ]

        return (
            <Page navButtons={navButtons}>
                <Welcome />
                <About />
                <Mission />
                <Form />
            </Page>
        );
    }
};

export default (IndexPage);
