
import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import Home from '@/app/page'
import About from '@/app/about/page'
import Services from '@/app/services/page'
import Portfolio from '@/app/portfolio/page'
import Contact from '@/app/contact/page'
import AdminLogin from '@/app/admin/login/page'
import AdminDashboard from '@/app/admin/dashboard/page'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
