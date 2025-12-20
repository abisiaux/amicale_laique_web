import ActualiteDetail from '@pages/ActualiteDetail.tsx'
import Actualites from '@pages/Actualites.tsx'
import Administration from '@pages/Administration.tsx'
import APropos from '@pages/APropos.tsx'
import Contact from '@pages/Contact'
import Home from '@pages/Home'
import ProcesVerbaux from '@pages/ProcesVerbaux'
import ServiceDetail from '@pages/ServiceDetail.tsx'
import Services from '@pages/Services.tsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Layout from './layouts/Layout'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/proces-verbaux" element={<ProcesVerbaux />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/services" element={<Services />} />
          <Route path="/actualites/:id" element={<ActualiteDetail />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/admin" element={<Administration />} />
        </Routes>
        <div>
          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
      </Layout>
    </Router>
  )
}

export default App
