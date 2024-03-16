import MainPage from "../pages/MainPage";
import UserPage from "../pages/UserPage";

export const routs = [
    {
        path: '/users',
        component: MainPage,
    },
    {
        path: '/',
        component: MainPage,
    },
    {
        path: '/users/:id',
        component: UserPage,
    }
];