import { Button } from '../button/Button';
import { useFormContext } from './appFormContext';

type Props = {
  label: string;
};

export function FormSubmitButton(props: Props) {
  const { label } = props;

  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
      children={([canSubmit, isSubmitting]) => (
        <Button
          variant="default"
          elevated
          loading={isSubmitting}
          onClick={() => {
            void form.handleSubmit();
          }}
          disabled={!canSubmit}
        >
          {label}
        </Button>
      )}
    />
  );
}
