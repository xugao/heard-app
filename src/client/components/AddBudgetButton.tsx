import {
  Dialog,
  DialogFooter,
  DialogType,
  IDialogProps,
  PrimaryButton,
  TextField,
} from '@fluentui/react';
import { useBoolean } from '@fluentui/react-hooks';
import React from 'react';

const dialogStyles = { main: { maxWidth: 450 } };

export interface AddBudgetButtonProps {
  onAddBudget: ({ name, amount }) => void;
}

export const AddBudgetButton: React.FunctionComponent<AddBudgetButtonProps> = (
  props
) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Add Budget',
  };

  const dialogProps: IDialogProps = {
    hidden: hideDialog,
    onDismiss: toggleHideDialog,
    dialogContentProps,
    modalProps: {
      styles: dialogStyles,
    },
  };

  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState<number | null>(null);

  const onAdd = () => {
    props.onAddBudget({ name, amount });
    toggleHideDialog();
    location.reload();
  };

  return (
    <div>
      <PrimaryButton onClick={toggleHideDialog}>Add Budget</PrimaryButton>
      <Dialog {...dialogProps}>
        <TextField
          label="Name"
          value={name}
          onChange={(_, val) => setName(val || '')}
        />
        <TextField
          label="Amount"
          value={amount ? String(amount) : undefined}
          onChange={(_, val) =>
            !!val && !isNaN(Number(val)) && setAmount(Number(val))
          }
        />
        <DialogFooter>
          <PrimaryButton onClick={onAdd} text="Add" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};
