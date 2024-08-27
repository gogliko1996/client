import React, { ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { screen } from "../routeName";
import { Home } from "../../page/Home/Home";

import { useSelector } from "react-redux";
import { SignIn } from "../../page/Auth/SignIn/SignIn";
import { SignUp } from "../../page/Auth/SignUp/SignUp";

interface ProtectedRouteProps {
  user: boolean;
  redirectPath?: string;
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, redirectPath = "/signin", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export const AppRouter = React.memo(() => {
  const user = useSelector((state: any) => state.createUser.user);

  return (
    <Routes>
      <Route
        path={screen.home}
        element={
          <ProtectedRoute user={!!user}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path={screen.signIn} element={<SignIn />} />
      <Route path={screen.signUp} element={<SignUp />} />
      <Route
        path="*"
        element={<Navigate to={user ? screen.home : screen.signIn} />}
      />
    </Routes>
  );
});
