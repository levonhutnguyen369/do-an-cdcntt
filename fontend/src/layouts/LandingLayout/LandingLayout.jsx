import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import { useAuth } from '@/contexts/AuthContext'
import { AuthModal } from '@/components/AuthModal'

const LandingLayout = ({children}) => {
  const { authModalOpen, setAuthModalOpen } = useAuth();

  return (
    <div>
      <Header />
      <div>
        {/* Main content */}
        <div>{children}</div>
      </div>
      <Footer />
      {/* Global auth modal for landing */}
      <AuthModal isOpen={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  )
}

export default LandingLayout;
