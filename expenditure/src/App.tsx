import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TODAY, dateToISOString } from './helpers/dateHelpers';
import ExpenditurePage from './pages/ExpenditurePage';

export default function App() {
  const month = dateToISOString(TODAY).substring(0, 7);
  return (
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
  );
}
