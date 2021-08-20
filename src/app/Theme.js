import { createMuiTheme } from '@material-ui/core/styles';

const darkBack = '#121212';
const darkPaper = '#303030';
const lightBack = '#EAEAEA';
const lightPaper = '#BBBBBB';
const isDark = true;
const blue = '#03508F';

export default createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: isDark ? darkBack : lightBack,
      paper: isDark ? darkPaper : lightPaper,
    },
    primary: {
      main: blue,
    },
  },
});

// default theme list
/*
  {
    palette: {
      common: {}, //this stores common colors for site
      type:, //"light" or "dark"
      [primary, secondary, error, warning, info, successs=]: { //color types
        light:
        main: // you can just set this, and material calculates the others
        dark:
        contrastText: //color you want the text to be for this color
      },
      grey: {
        // these are for styling elements consistent greys
      },
      text: { //colors for your text
        primary:
        secondary:
        disabled:
        hint:
      },
      divider: rgba(), //the color for your dividers
      background: {
        paper: #fff,     // the default style for the paper element
        default: #fafafa // the default background color
      },
      action: {
        // this has all the styles for each action you may want a 
        // component to perform
        active, hover, hoverOpacity, selected, selectedOpacity, disabled,
        disabledBackground, disabledOpacity, focus, focusOpacity, activatedOpacity
      }
    }
  }
*/
