import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components";
import { LandingPage } from "./pages";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<LandingPage />}/>
            <Route path="landingpage" element={<LandingPage />} />
        </Route>
    )
);