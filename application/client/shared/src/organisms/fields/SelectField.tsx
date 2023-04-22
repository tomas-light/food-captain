import { ReactNode, useMemo } from 'react';
import Select, {
  Props as SelectProps,
  StylesConfig,
  components,
} from 'react-select';
import { Icon } from '../../atoms';
import { theme } from '../../theme';
import { Option } from './Option';
import classes from './SelectField.module.scss';

type StyleVariants = 'default' | 'tiny-flushed';

type Props<TOption extends Option> = SelectProps<TOption, false> & {
  styleVariant?: StyleVariants;
};

function SelectField<TOption extends Option>(props: Props<TOption>) {
  const { styleVariant = 'default', ...selectProps } = props;

  const overriddenComponents = useMemo(() => {
    const style = {
      ...components,
    };

    if (styleVariant === 'tiny-flushed') {
      style.IndicatorSeparator = () => null as any;
      style.DropdownIndicator = (indicatorProps) => (
        <div className={classes.chevronContainer}>
          <Icon
            height={16}
            viewBox={'3 3 16 16'}
            color={
              indicatorProps.selectProps.menuIsOpen
                ? theme.colors.primary.main
                : theme.colors.default.main
            }
            variant={
              indicatorProps.selectProps.menuIsOpen
                ? 'chevronUp'
                : 'chevronDown'
            }
          />
        </div>
      );
    }

    return style;
  }, [styleVariant]);

  return (
    <Select
      {...selectProps}
      styles={variantStyles[styleVariant]}
      components={overriddenComponents}
    />
  );
}

const variantStyles: {
  [variant in StyleVariants]: StylesConfig<any, false, any>;
} = {
  default: {},
  'tiny-flushed': {
    control: (base) => ({
      ...base,
      border: 'none',
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.colors.default.main,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,

      minHeight: 'unset',
      fontSize: '16px',
      lineHeight: '16px',

      ':hover': {
        borderColor: theme.colors.primary.main,
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '0px 8px',
      minHeight: 'unset',
      fontSize: '16px',
      lineHeight: '16px',
    }),
    input: (base) => ({
      ...base,
      minHeight: 'unset',
      fontSize: '16px',
      lineHeight: '16px',
      margin: 0,
      padding: 0,
    }),
    container: (base) => ({
      ...base,
      minHeight: 'unset',
      fontSize: '16px',
      lineHeight: '16px',
    }),
    placeholder: (base) => ({
      ...base,
    }),
  },
};

export { SelectField };
export type { Props as SelectFieldProps };
