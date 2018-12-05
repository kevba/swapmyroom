import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
        light: indigo[500],
        main: indigo[700],
        dark: indigo[900],
    },
    secondary: amber,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0,
    background: {
        default: grey[300]
    }
  },
});

export default theme
