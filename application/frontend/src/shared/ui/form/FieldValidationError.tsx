import type { AnyFieldApi } from '@tanstack/react-form';
import { Typography } from '../Typography/Typography';
import classes from './FieldValidationError.module.scss';

type Props = {
  field: AnyFieldApi;
};

export function FieldValidationError(props: Props) {
  const { field } = props;

  if (field.state.meta.isTouched && !field.state.meta.isValid) {
    return (
      <Typography
        component="em"
        className={classes.root}
        color="var(--color-destructive)"
        size="small"
      >
        {field.state.meta.errors.join(', ')}
      </Typography>
    );
  }

  return null;
}
