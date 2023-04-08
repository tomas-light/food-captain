const primary = {
  main: 'rgb(253, 237, 114)',
  hover: 'rgba(253, 237, 114, 0.80)',
  pressed: 'rgba(253, 237, 114, 0.60)',
  text: 'rgba(0, 0, 0, 0.87)',
  disabled: {
    main: 'rgba(253, 237, 114, 0.12)',
    text: 'rgba(0, 0, 0, 0.38)',
  },
  outline: {
    main: 'rgb(255, 255, 255)',
    hover: 'rgba(253, 237, 114, 0.08)',
    pressed: 'rgba(253, 237, 114, 0.20)',
  },
};

const secondary = {
  main: 'rgb(41, 182, 246)',
  hover: 'rgba(41, 182, 246, 0.80)',
  pressed: 'rgba(41, 182, 246, 0.60)',
  text: 'rgba(0, 0, 0, 0.87)',
  disabled: {
    main: 'rgba(41, 182, 246, 0.20)',
    text: 'rgba(0, 0, 0, 0.38)',
  },
  outline: {
    main: 'rgb(255, 255, 255)',
    hover: 'rgba(41, 182, 246, 0.08)',
    pressed: 'rgba(41, 182, 246, 0.20)',
  },
};

const destructive = {
  main: 'rgb(220, 0, 53)',
  hover: 'rgba(220, 0, 53, 0.80)',
  pressed: 'rgba(220, 0, 53, 0.60)',
  text: 'rgba(255, 255, 255, 0.87)',
  disabled: {
    main: 'rgba(220, 0, 53, 0.12)',
    text: 'rgba(220, 0, 53, 0.38)',
  },
  outline: {
    main: 'rgb(255, 255, 255)',
    hover: 'rgba(220, 0, 53, 0.08)',
    pressed: 'rgba(220, 0, 53, 0.20)',
  },
};

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
    default: {
      main: 'rgb(224, 224, 224)',
      hover: 'rgba(224, 224, 224, 0.80)',
      pressed: 'rgba(224, 224, 224, 0.60)',
      text: 'rgba(255, 255, 255, 0.87)',
      disabled: {
        main: 'rgba(224, 224, 224, 0.20)',
        text: 'rgba(224, 224, 224, 0.38)',
      },
      outline: {
        main: 'rgb(255, 255, 255)',
        hover: 'rgba(224, 224, 224, 0.08)',
        pressed: 'rgba(224, 224, 224, 0.20)',
      },
    },
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
