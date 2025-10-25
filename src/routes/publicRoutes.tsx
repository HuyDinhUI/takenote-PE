import {lazy} from 'react'

const Login = lazy(() => import('@/pages/auth/login'))
const Signup = lazy(() => import('@/pages/auth/signup'))
const Error429 = lazy(() => import('@/pages/error/429'))

export const publicRoutes = [
    {
        path: "/auth/login",
        element: <Login/>
    },
    {
        path: "/auth/signup",
        element: <Signup/>
    },
    {
        path: "/error/429",
        element: <Error429/>
    }
]