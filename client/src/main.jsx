import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import LandingPage from './components/common/LandingPage.jsx'
import Signin from './components/common/Signin.jsx'
import Signup from './components/common/Signup.jsx'
import AboutUs from './components/common/AboutUs.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import Venues from './components/common/Venues.jsx'
import VenuesById from './components/common/VenuesById.jsx'
import Requests from './components/common/Requests.jsx'
import RequestsById from './components/common/RequestsById.jsx'
import MakeRequest from './components/user/MakeRequest.jsx'
import AdminProfile from './components/admin/AdminProfile.jsx'
import AddVenue from './components/admin/AddVenue.jsx'
import UserAdminContext from './contexts/UserAdminContext.jsx'


const browserRouterObj = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "venues",
            element: <Venues />
          },
          {
            path: ":venueId",
            element: <VenuesById />
          },
          {
            path: "",
            element: <LandingPage />
          }
        ]

      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path:"aboutus",
        element:<AboutUs/>
      },
      {
        path: "user-profile/:email",
        element: <UserProfile />,
        children: [
          {
            path: "requests",
            element: <Requests />
          },
          {
            path: ":requestId",
            element: <RequestsById />
          },
          {
            path: "",
            element: <Navigate to={"requests"} />
          }
        ]
      },
      {
        path: "admin-profile/:email",
        element: <AdminProfile />,
        children: [
          {
            path: "requests",
            element: <Requests />
          },
          {
            path: ":requestId",
            element: <RequestsById />
          },
          {
            path: "addvenue",
            element: <AddVenue />
          },
          {
            path: "",
            element: <Navigate to={"requests"} />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAdminContext>
      <RouterProvider router={browserRouterObj} />
    </UserAdminContext>
  </StrictMode>,
)
