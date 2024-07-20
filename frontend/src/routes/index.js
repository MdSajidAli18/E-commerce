import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import AddressPage from '../pages/AddressPage';
import PaymentPage from '../pages/paymentPage';
import ForgotPasswordRequest from '../pages/ForgotPasswordRequest';
import ResetPassword from '../pages/ResetPassword';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPasswordRequest/>
            },
            {
                path: "reset-password",
                element: <ResetPassword/>
            },
            {
                path: "sign-up",
                element: <SignUp/>
            },
            {
                path: "product-category",
                element: <CategoryProduct/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            },
            {
                path: "search",
                element: <SearchProduct/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "address",
                element: <AddressPage/>
            },
            {
                path: "payment",
                element: <PaymentPage/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers/>
                    },
                    {
                        path: "all-products",
                        element: <AllProducts/>
                    }
                ]
            }
        ]
    }
]);

export default router;