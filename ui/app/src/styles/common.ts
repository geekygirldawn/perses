import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
// import { createTheme, ThemeOptions, alpha } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import merge from 'lodash/merge';
// import { BespokeGreys } from './bespoke-colors';

/**
 * Element ID used for the application root.
 */
export const ROOT_ID = 'root';

/**
 * Material UI theme used by all components. For more details, see:
 *   - defaults: https://material-ui.com/customization/default-theme/
 *   - variables: https://material-ui.com/customization/theming/#theme-configuration-variables
 *   - global overrides and default props: https://material-ui.com/customization/globals/#css
 */
export function getTheme(overrides: ThemeOptions = {}) {
  const palette: ThemeOptions['palette'] = {
    // primary: {
    //   main: '#1ED998',
    //   dark: '#0D8359',
    //   light: '#D1F5D8',
    // },

    // secondary: {
    //   main: BespokeGreys.SANTAS_GRAY,
    // },

    // background: {
    //   default: '#f0f2f5',
    //   paper: '#FFFFFF', // ...
    // },

    background: {
      default: blueGrey[50],
    },

    common: {
      white: '#FFFFFF',
      black: '#000000',
    },

    // text: {
    //   secondary: BespokeGreys.SANTAS_GRAY,
    // },

    // action: {
    //   disabledBackground: alpha(BespokeGreys.SANTAS_GRAY, 0.5),
    //   disabled: alpha(BespokeGreys.COMET, 0.6),
    //   hover: alpha(BespokeGreys.SANTAS_GRAY, 0.2),
    //   selected: alpha(BespokeGreys.SANTAS_GRAY, 0.35),
    // },
  };

  const chart: ThemeOptions['chart'] = {};

  const theme = createTheme({
    palette: merge(palette, overrides.palette),

    chart: merge(chart, overrides.chart),

    typography: {
      fontFamily: '"Lato", sans-serif',

      // Font weights need to correspond with the imports at the top of the file
      // (Lato supports 100, 300, 400, 700, 900)
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 700,
      fontWeightBold: 900,
    },

    mixins: {},
  });

  // Overrides for component default prop values and styles go here
  const components: ThemeOptions['components'] = {
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: 'small',
      },
    },
  };

  theme.components = merge(components, overrides.components);
  return theme;
}
