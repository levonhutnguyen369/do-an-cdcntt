
import { Lan } from '@mui/icons-material'
import LandingPage from '../pages/LandingPage'
import Register from '../pages/Register'
import Login from '../pages/Login'
import LandingLayout from '../layouts/LandingLayout/LandingLayout'
import { RequireAuth } from '@/components/RequireAuth'
import React from 'react'

const publicRoutes = [
  { path: "/", component: LandingPage, layout: LandingLayout, private: false },
  { path: "/register", component: Register, private: false },
  { path: "/login", component: Login, private: false },
  { path: "/plan", component: React.lazy(() => import('../pages/PlanPage')), private: true },
  { path: "/schedule", component: React.lazy(() => import('../pages/SchedulePage')), private: true },
  { path: "/schedule/:id", component: React.lazy(() => import('../pages/SchedulePageDetail')), private: true },
  { path: "/dashboard", component: React.lazy(() => import('../pages/DashboardPage')), private: true },
]

const privateRoutes = publicRoutes.filter(r => r.private);

export { publicRoutes, privateRoutes }