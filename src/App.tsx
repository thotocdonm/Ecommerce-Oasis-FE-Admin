import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.scss'
import AdminPage from "./screens/admin.screen";
import UserTable from "./components/users/user.table";
import UsersPage from "./screens/user.screen";
import DashboardPage from "./screens/dashboard.screen";
import ProductsPage from "./screens/product.screen";
import ReviewsPage from "./screens/review.screen";
import OrdersPage from "./screens/order.screen";
import SubscribersPage from "./screens/subscribers.screen";

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
      },
      {
        path: '/products',
        element: <ProductsPage />
      },
      {
        path: '/reviews',
        element: <ReviewsPage />
      },
      {
        path: '/orders',
        element: <OrdersPage />
      },
      {
        path: '/subscribers',
        element: <SubscribersPage />
      },
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
