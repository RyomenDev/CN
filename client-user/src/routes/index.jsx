import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout";
import {
  LoginPage,
  NotFoundPage,
  DockerEventPage,
  HomePage,
} from "../pages/index.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/schedule-interview" element={<DockerEventPage />} />
        {/* <Route path="userProfile" element={<ProfilePage />} /> */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
