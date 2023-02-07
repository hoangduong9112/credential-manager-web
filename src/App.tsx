import React, { FC } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListFamily from './pages/ListFamily/ListFamily';
import FamilyDetail from './pages/FamilyDetail/FamilyDetail';
import PersonDetail from './pages/PersonDetail/PersonDetail';
import ListPeople from './pages/ListPeople/ListPeople';
import ListEventFunding from './pages/ListEventFunding/ListEventFunding';
import EventDetail from './pages/EventDetail/EventDetail';
import LoginForm from './pages/Login/LoginForm';
import SignupForm from './pages/Signup/SignupForm';
import TamTruForm from './pages/DKTamTru/TamTruForm';
import TamVangForm from './pages/DKTamVang/TamVangForm';
import HistoryFamily from './pages/HistoryFamily/HistoryFamily';
import Sidebar from './components/Navbar/Sidebar';
const App: FC = () => {
  return (
    <Router>
      <Sidebar />

      <Routes>
        <Route path="/family" element={<ListFamily />}></Route>
        <Route path="/people" element={<ListPeople />}></Route>
        <Route path="/funding" element={<ListEventFunding />}></Route>F
        <Route path="/familyDetail/:id" element={<FamilyDetail />}></Route>
        <Route path="/personDetail/:id" element={<PersonDetail />}></Route>
        <Route path="/fundingDetail/:id" element={<EventDetail />}></Route>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/signupForm" element={<SignupForm />}></Route>
        <Route path="/tamtru" element={<TamTruForm />}></Route>
        <Route path="/tamvang" element={<TamVangForm />}></Route>
        <Route path="/history/:idSHK" element={<HistoryFamily />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
