import { Suspense } from "react";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <div className="min-h-full">
            <NavBar />
            <section className="w-full min-h-screen">
                <Outlet />
            </section>
        </div>
    </Suspense>
)

export default DefaultLayout