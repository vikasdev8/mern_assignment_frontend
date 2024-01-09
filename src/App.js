import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>,
    },
  ]);
  return  <RouterProvider router={router} />;
}

export default App;
