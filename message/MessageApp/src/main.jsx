import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Login from './pages/login.jsx'
import Registeration from './pages/register.jsx'
import Inbox from './pages/inbox.jsx'
import Chat from './pages/chat.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
import Messages from './components/Messages.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  useParams
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Registeration />,
  },
  {
    path: "inbox",
    element: <Inbox />,
  },
  {
    path: "chat/:slug",
    element: <Messages />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>,
)
