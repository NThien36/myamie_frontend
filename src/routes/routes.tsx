import DefaultLayout from "@/layouts/DefaultLayout";
import Business from "@/pages/non-auth/Business/Business";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Business />,
      },
    ],
  },
]);

export default router;
