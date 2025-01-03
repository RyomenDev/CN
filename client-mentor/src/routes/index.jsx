import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout";
// import DockerEvent from "../DockerEvent/index.jsx";
import { LoginPage, NotFoundPage, DockerEventPage } from "../pages/index.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<DockerEventPage />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="userProfile" element={<ProfilePage />} /> */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
