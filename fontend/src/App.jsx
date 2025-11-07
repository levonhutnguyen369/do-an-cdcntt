import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { RequireAuth } from "./components/RequireAuth";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Layout = DefaultLayout;

          if (route.layout === null) {
            Layout = React.Fragment;
          } else if (route.layout) {
            Layout = route.layout;
          }

          const Page = route.component;

          let element = null;
          if (route.private) {
            element = (
              <RequireAuth>
                <Page />
              </RequireAuth>
            );
          } else {
            // Public route; if already authenticated redirect to dashboard
            element = isAuthenticated ? <Navigate to="/dashboard" replace /> : <Page />;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  {element}
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
