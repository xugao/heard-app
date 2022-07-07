import {
  ActionButton,
  mergeStyleSets,
  ProgressIndicator,
} from '@fluentui/react';

const styles = mergeStyleSets({
  budgets: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  container: {
    border: '1px solid #d2d0ce',
    margin: '8px',
    padding: '30px 20px 8px 20px',
    minWidth: '388px',
    borderRadius: '4px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: '20px',
  },
  amount: {
    fontSize: '20px',
  },
});

export const Budgets = (props) => {
  return (
    <div className={styles.budgets}>
      {props.budgets.map((p, i) => (
        <Budget key={i} {...p}></Budget>
      ))}
    </div>
  );
};

const Budget = (props: { name: string; amount: number; expense?: number }) => {
  const percentComplete = (props.expense || 0) / props.amount;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.amount}>
          ${props.expense || 0} / ${props.amount}
        </div>
      </div>

      <ProgressIndicator barHeight={8} percentComplete={percentComplete} />

      <div style={{ display: 'flex' }}>
        <ActionButton iconProps={{ iconName: 'Add' }}>Add Expense</ActionButton>
        <ActionButton iconProps={{ iconName: 'View' }}>
          View Expenses
        </ActionButton>

        <ActionButton iconProps={{ iconName: 'Delete' }}>
          Delete Budget
        </ActionButton>
      </div>
    </div>
  );
};
