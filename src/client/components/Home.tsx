import {
  DefaultButton,
  initializeIcons,
  mergeStyleSets,
  ThemeProvider,
} from '@fluentui/react';
import React from 'react';
import { addBudget, fetchBudgets } from '../redux/slices';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { AddBudgetButton } from './AddBudgetButton';
import { Budgets } from './Budgets';

initializeIcons();

const styles = mergeStyleSets({
  mainPageContainer: {
    ':global(body)': {
      margin: 0,
    },
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    img: {
      position: 'absolute',
      zIndex: -1,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: '60px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0 8px',
  },
  hearderTitle: {
    fontSize: '22px',
    fontWeight: 600,
  },
});

function MainPageContent() {
  const dispatch = useAppDispatch();

  const budgets = useAppSelector((state) => state.budgets);

  React.useEffect(() => {
    dispatch(fetchBudgets());
  }, []);

  const onAddBudget = (budget) => {
    dispatch(addBudget(budget));
  };

  return (
    <ThemeProvider className={styles.mainPageContainer}>
      <div className={styles.header}>
        <div className={styles.hearderTitle}>Budgets</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <AddBudgetButton onAddBudget={onAddBudget} />
          <DefaultButton>Add Expense</DefaultButton>
        </div>
      </div>

      {budgets && <Budgets {...budgets} />}
    </ThemeProvider>
  );
}

export const Home = () => {
  return <MainPageContent />;
};
