import { createRoot } from "react-dom/client"
import { App } from "@/components/App/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Shop } from "@/pages/shop";
// import Shop  from "@/pages/shop/Shop";
import { LazyAbout } from "@/pages/about/About.lazy";
import { Suspense } from "react";
// import About from "@/pages/about/About";

const root = document.getElementById("root");

if (!root) {
    throw new Error("root not found");
} 

const container = createRoot(root);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/about',
                element: (
                    <Suspense fallback={<div>About loading...</div>}>
                        <LazyAbout />
                    </Suspense>
                ),
                // element: <About />,
            },
            {
                path: '/shop',
                element: (
                    <Suspense fallback={<div>Shop loading...</div>}>
                        <Shop />
                    </Suspense>
                ),
                // element: <Shop />,
            }
        ]
    }
]);

container.render(
    <RouterProvider router={router}></RouterProvider>
);