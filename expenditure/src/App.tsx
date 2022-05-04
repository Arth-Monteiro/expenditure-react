import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import IUser from './interfaces/IUser';
import { authContext } from './contexts/authContext';

import LoginPage from './pages/LoginPage';
import ExpenditurePage from './pages/ExpenditurePage';

import { TODAY, dateToISOString } from './helpers/dateHelpers';
import { apiCheckAuthUser, apiMakeLogout } from './services/apiService';

export default function App() {
  const month = dateToISOString(TODAY).substring(0, 7);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    (async () => {
      const user = await apiCheckAuthUser();
      setUser(user);
    })();
  }, []);

  async function onSignOut() {
    if (await apiMakeLogout()) setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate key={month} to={'/expenditures/' + month} replace />
              }
            />
            <Route path="/expenditures/:month" element={<ExpenditurePage />} />
            {/* <Route path="users/*" element={<Users />} /> */}
          </Routes>
        </BrowserRouter>
      </authContext.Provider>
    );
  }
  return <LoginPage onSignIn={setUser} />;
}
