import * as React from 'react';

import { MuiThemeProvider, } from '@material-ui/core/styles';

import Index from './pages/index/page';
import theme from './theme';

export class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Index />
            </MuiThemeProvider>
        );
    }
};

export default App;
