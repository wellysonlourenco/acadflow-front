import { Certificates } from "@/pages/app/certificates/certificates";
import { Events } from "@/pages/app/events/events";
import { Participations } from "@/pages/app/participations/participations";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../pages/_layouts/app";
import { AuthLayout } from "../pages/_layouts/auth";
import { Dashboard } from "../pages/app/dashboard/dashboards";
import { Orders } from "../pages/app/orders/orders";
import { SignIn } from "../pages/auth/sign-in";
import { SignUp } from "../pages/auth/sign-up";

export const router = createBrowserRouter([

  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
      { path: "/events", element: <Events /> },
      { path: "/participations", element: <Participations /> },
      { path: "/certificates", element: <Certificates /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/sign-in", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> }
    ],
  }


  //{ path: "/", element: <Dashboard /> },
  //{ path: "/sing-in", element: <SignIn /> }
]);
