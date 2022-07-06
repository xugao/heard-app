import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from '../redux/store';
import { Home } from './Home';

const OtherPageLazy = React.lazy(
  () => import(/* webpackChunkName: "otherpage" */ './OtherPage')
);

export const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <Home />
            </Provider>
          }
        />
        <Route path="foo" element={<OtherPageLazy />} />
      </Routes>
    </BrowserRouter>
  );
};
