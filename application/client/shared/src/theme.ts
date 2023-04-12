const colorNumberMap = {
  white: 255,
  black: 0,
};

function makeColor(
  red: number,
  green: number,
  blue: number,
  text: keyof typeof colorNumberMap
) {
  const textNumber = colorNumberMap[text];

  return {
    main: `rgb(${red}, ${green}, ${blue})`,
    hover: `rgba(${red}, ${green}, ${blue}, 0.80)`,
    pressed: `rgba(${red}, ${green}, ${blue}, 0.60)`,
    text: `rgba(${textNumber}, ${textNumber}, ${textNumber}, 0.87)`,
    disabled: {
      main: `rgba(${red}, ${green}, ${blue}, 0.20)`,
      text: `rgba(${red}, ${green}, ${blue}, 0.38)`,
    },
    outline: {
      main: `rgb(${textNumber}, ${textNumber}, ${textNumber})`,
      hover: `rgba(${red}, ${green}, ${blue}, 0.08)`,
      pressed: `rgba(${red}, ${green}, ${blue}, 0.20)`,
    },
  };
}

const primary = makeColor(106, 27, 154, 'white');
const secondary = makeColor(49, 151, 149, 'white');
const destructive = makeColor(247, 203, 1, 'black');

const notify = {
  success: {
    main: 'rgb(67, 160, 71)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  info: {
    main: 'rgb(41, 121, 255)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
  warning: {
    main: 'rgb(255, 238, 88)',
    text: 'rgba(0, 0, 0, 0.87)',
  },
  error: {
    main: 'rgb(176, 0, 32)',
    text: 'rgba(255, 255, 255, 0.87)',
  },
};

const theme = {
  colors: {
    default: makeColor(63, 63, 68, 'white'),
    primary,
    secondary,
    destructive,
    text: {
      strong: 'rgba(0, 0, 0, 0.87)',
      medium: 'rgba(0, 0, 0, 0.60)',
      light: 'rgba(0, 0, 0, 0.38)',
      disabled: 'rgba(0, 0, 0, 0.12)',
    },
    notify,
    border: {
      main: 'rgb(117, 117, 117)',
      dark: 'rgb(33, 33, 33)',
      light: 'rgb(189, 189, 189)',
      disabled: 'rgba(0, 0, 0, 0.12)',

      primary: primary.main,
      secondary: secondary.main,
      destructive: destructive.main,
      error: notify.error.main,
    },
    background: 'rgb(255, 255, 255)',
    surface: 'rgb(250, 250, 250)',
  },
};
export { theme };
