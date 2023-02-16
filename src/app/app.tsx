import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import style from './app.scss';
import UserList from '@pages/user-list';
import RefactorLogin from '@pages/refactor-class';
import Counter from '@pages/counter';

export const App = (): JSX.Element => (
  <div className={style.componentWrapper}>
    <h2>React assessment - Brian Nguyen Giang Nam</h2>
    <BrowserRouter>
      <nav className={style.routingWrapper}>
        <b>Routing: </b>
        <Link to="/user-list">Ex1 user list</Link>
        <Link to="/counter">Ex2 counter app</Link>
        <Link to="/login">Ex3 Refactor component</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<RefactorLogin />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  </div>
);
