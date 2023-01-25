// library
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "redux/hooks";

// custom
import { ProtectedRoute } from "components";
import Layout from "components/ui-layout/Layout/Layout";
import { APP_ROUTES } from "constants/enum/app-route.enum";
import { RootState } from "redux/store";
import CreateUser from "./dashboard/createUser/CreateUser";

// render page
const NotfoundPage = React.lazy(() => import("pages/NotFound/NotFound"));
const Users = React.lazy(() => import("pages/dashboard/Users/Users"));
const TestPage = React.lazy(() => import("pages/testPage/TestPage"));
const LoginPage = React.lazy(() => import("pages/auth/Login/Login"));
const AddUserPage = React.lazy(
  () => import("pages/dashboard/AddUser/AddUserContainer")
);
const EditUserPage = React.lazy(
  () => import("pages/dashboard/EditUser/EditUser")
);

const Router = () => {
  const permission = useAppSelector((store: any) => store.auth.permissions);
  const isLogin = useAppSelector((store: RootState) => store.auth.isLogin);

  return (
    <Routes>
      <Route path="*" element={<NotfoundPage />} />
      {isLogin ? (
        <Route element={<Layout />}>
          <Route
            path={APP_ROUTES.ROOT}
            element={
              <ProtectedRoute permission={permission}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path={APP_ROUTES.MAIN_PAGE}
            element={
              <ProtectedRoute permission={permission}>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path={APP_ROUTES.TEST}
            element={
              <ProtectedRoute permission={permission}>
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={APP_ROUTES.ADD_USER_PAGE}
            element={
              <ProtectedRoute permission={permission}>
                <AddUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={APP_ROUTES.EDIT_USER_PAGE}
            element={
              <ProtectedRoute permission={permission}>
                <EditUserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={APP_ROUTES.CREATE_USER}
            element={
              <ProtectedRoute permission={permission}>
                <CreateUser />
              </ProtectedRoute>
            }
          />
        </Route>
      ) : (
        <Route path={APP_ROUTES.ROOT} element={<LoginPage />} />
      )}
    </Routes>
  );
};
export default Router;
