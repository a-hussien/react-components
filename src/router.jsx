import { createBrowserRouter, Navigate } from "react-router-dom";
import AutoCompletePage from "./pages/AutoCompletePage";
import TextEditorPage from "./pages/TextEditorPage";
import DefaultLayout from "./Layoutes/DefaultLayout";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <DefaultLayout />,
            children:
            [
                {
                    path: '/',
                    element: <Navigate to="/auto-complete" />
                },
                {
                    path: '/auto-complete',
                    element: <AutoCompletePage />
                },
                {
                    path: '/text-editor',
                    element: <TextEditorPage />
                },
            ]
        },
    ]
  );

export default router;
