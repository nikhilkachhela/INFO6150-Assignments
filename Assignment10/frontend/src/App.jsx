import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import EmployeesPage from './pages/EmployeePage';  // ← Fixed: EmployeePage not EmployeesPage
import AddJobPage from './pages/AddJobPage';
import JobsPage from './pages/JobPage';  // ← Also check this matches your file name
import AdminRoute from './components/AdminRoute';
import EmployeeRoute from './components/EmployeeRoute';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to={user.type === 'admin' ? '/admin' : '/jobs'} />} 
        />
        <Route 
          path="/register" 
          element={!user ? <Register /> : <Navigate to={user.type === 'admin' ? '/admin' : '/jobs'} />} 
        />

        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/add-job" element={<AddJobPage />} />
        </Route>

        {/* Employee routes */}
        <Route element={<EmployeeRoute />}>
          <Route path="/jobs" element={<JobsPage />} />
        </Route>

        {/* Default redirect */}
        <Route 
          path="/" 
          element={
            user ? 
              <Navigate to={user.type === 'admin' ? '/admin' : '/jobs'} /> : 
              <Navigate to="/login" />
          } 
        />
        
        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;