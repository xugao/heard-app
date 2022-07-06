import {
  INavLinkGroup,
  INavStyles,
  initializeIcons,
  mergeStyleSets,
  Nav,
  PrimaryButton,
  ThemeProvider,
} from '@fluentui/react';
import React from 'react';
import { dummySlice, fetchDummyData } from '../redux/slices/dummy';
import { useAppDispatch, useAppSelector } from '../redux/store';

initializeIcons();

const NAV_WIDTH = 300;
const navStyles: Partial<INavStyles> = {
  root: {
    width: NAV_WIDTH,
    boxSizing: 'border-box',
    overflowY: 'auto',
    height: '100%',
    background: 'lightgray',
  },
};

const styles = mergeStyleSets({
  navContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    '> div': {
      height: '100%',
    },
  },
  mainPageContainer: {
    ':global(body)': {
      margin: 0,
    },
    position: 'absolute',
    left: NAV_WIDTH,
    right: 0,
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    img: {
      position: 'absolute',
      zIndex: -1,
    },
  },
});

const NavigationPanel: React.FunctionComponent = () => {
  const navLinkGroups: INavLinkGroup[] = [
    {
      links: [
        {
          name: 'Foo',
          url: '/foo',
          key: 'foo',
        },
      ],
    },
  ];

  return (
    <div className={styles.navContainer}>
      <Nav
        ariaLabel="Navigation panel"
        styles={navStyles}
        groups={navLinkGroups}
      />
    </div>
  );
};

function MainPageContent() {
  const dispatch = useAppDispatch();

  const onSayHi = () => {
    dispatch(dummySlice.actions.increment());
  };

  const onSayBye = () => {
    dispatch(dummySlice.actions.decrement());
  };

  const count = useAppSelector((state) => state.dummy.counter);
  const dummyData = useAppSelector((state) => state.dummy.dummyData);

  const hiEmoji = Array.from({ length: count }, (_, i) => (
    <span key={i}>👋</span>
  ));

  React.useEffect(() => {
    if (!dummyData) {
      dispatch(fetchDummyData());
    }
  }, []);

  return (
    <ThemeProvider className={styles.mainPageContainer}>
      <h1>Hi 👋</h1>
      <div>
        <PrimaryButton style={{ marginRight: 8 }} onClick={onSayHi}>
          Say Hi
        </PrimaryButton>
        <PrimaryButton onClick={onSayBye}>Say Bye</PrimaryButton>
      </div>
      <div style={{ fontSize: '20px', marginTop: '12px' }}>{hiEmoji}</div>
      {dummyData && (
        <div>
          Dummy API data: <br />
          {JSON.stringify(dummyData)}
        </div>
      )}
    </ThemeProvider>
  );
}

export const Home = () => {
  return (
    <>
      <NavigationPanel />
      <MainPageContent />
    </>
  );
};
