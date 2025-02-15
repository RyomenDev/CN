import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { router } from "./routes";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/store.js";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store.js";
import { login } from "./store/authSlice";
// import { useNavigate } from "react-router-dom";
// const navigate = useNavigate();
// navigate;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem("firebase_token") ||
      sessionStorage.getItem("firebase_token");

    // if (token) {
    //   try {
    //     const decodedToken = jwtDecode(token);
    //     dispatch(login({ email: decodedToken.email, name: decodedToken.name }));
    //   } catch (error) {
    //     console.error("Invalid token or token expired", error);
    //   }
    // }
  }, [dispatch]);

  return (
    <Provider store={store}>
      {/* PersistGate will delay the rendering until the redux state is rehydrated */}
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
