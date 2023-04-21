import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { theme } from './theme';

export const chakraTheme = extendTheme({
  colors: {
    ...theme.colors,
  },
  components: {
    IconButton: {
      baseStyle: {
        cursor: 'pointer',
      },
    },
    CloseButton: {
      baseStyle: {
        cursor: 'pointer',
      },
    },
    Button: {
      baseStyle: {
        cursor: 'pointer',
      },
      variants: {
        solid: (props: StyleFunctionProps) => {
          switch (props.colorScheme) {
            case 'secondary':
              return {
                bg: 'secondary.main',
                color: 'secondary.text',
                _active: {
                  bg: 'secondary.main',
                  disabled: {
                    bg: 'secondary.disabled.main',
                    color: 'secondary.disabled.text',
                  },
                },
                _hover: {
                  bg: 'secondary.hover',
                  disabled: {
                    bg: 'secondary.disabled.main',
                    color: 'secondary.disabled.text',
                  },
                },
              };

            case 'destructive':
              return {
                bg: 'destructive.main',
                color: 'destructive.text',
                _active: {
                  bg: 'destructive.main',
                  disabled: {
                    bg: 'destructive.disabled.main',
                    color: 'destructive.disabled.text',
                  },
                },
                _hover: {
                  bg: 'destructive.hover',
                  disabled: {
                    bg: 'destructive.disabled.main',
                    color: 'destructive.disabled.text',
                  },
                },
              };

            default:
              return {
                bg: 'default.main',
                color: 'default.text',
                _active: {
                  bg: 'default.main',
                  disabled: {
                    bg: 'default.disabled.main',
                    color: 'default.disabled.text',
                  },
                },
                _hover: {
                  bg: 'default.hover',
                  disabled: {
                    bg: 'default.disabled.main',
                    color: 'default.disabled.text',
                  },
                },
              };
          }
        },
      },
    },
  },
});
