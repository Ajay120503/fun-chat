import { useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router"
import Home from "./Pages/Home.jsx"
import Signup from "./Pages/Signup.jsx"
import Login from "./Pages/Login.jsx"
import Notifications from "./Pages/Notifications.jsx"
import Call from "./Pages/Call.jsx"
import Chat from "./Pages/Chat.jsx"
import Onboarding from "./Pages/Onboarding.jsx"
import { Toaster } from "react-hot-toast"
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx'
import { useThemeStore } from './store/useThemeStore.js'

function App() {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = !!authUser;
  const isOnboarded = authUser?.isOnboarded;
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (isLoading) return <PageLoader />;

  return (
    <>
      <div className='h-screen'>
        <Routes>
          <Route path="/" element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Home />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          } />
          
          <Route path="*" element={
            <Navigate to={isAuthenticated ? "/" : "/login"} />
          } />
          
          <Route path="/signup" element={
            !isAuthenticated ? (
              <Signup />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          } />
          
          <Route path="/login" element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          } />
          
          <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Notifications />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
          
          <Route
            path="/call/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Call />
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <Chat />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          
          <Route path="/onboarding" element={
            isAuthenticated ? (
              !isOnboarded ? <Onboarding /> : <Navigate to="/" />
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
