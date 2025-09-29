import Parallax from '../pages/Parallax'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import { Layout } from '../components'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Parallax /> },
      { path: '/about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
