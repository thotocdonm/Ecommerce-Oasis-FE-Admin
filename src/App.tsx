import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.scss'
import AdminPage from "./screens/admin.screen";
import UserTable from "./components/users/user.table";
import UsersPage from "./screens/user.screen";
import DashboardPage from "./screens/dashboard.screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminPage />,
    children: [
      {
        path: '/users',
        element: <UsersPage />
      },
      {
        path: '/dashboard',
        element: <DashboardPage />
      }
    ]
  },
  {
    path: "/test",
    element: <div>Test</div>,
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
