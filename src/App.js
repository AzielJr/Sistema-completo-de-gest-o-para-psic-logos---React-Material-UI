import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';

// Componentes
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import ClientesList from './components/Clientes/ClientesList';
import ClienteForm from './components/Clientes/ClienteForm';
import Agendamento from './components/Agendamento/Agendamento';
import TiposCliente from './components/TiposCliente/TiposCliente';
import Evolucao from './components/Evolucao/Evolucao';
import Despesas from './components/Despesas/Despesas';
import TiposDespesa from './components/TiposDespesa/TiposDespesa';
import Usuarios from './components/Usuarios/Usuarios';
import GruposUsuarios from './components/GruposUsuarios/GruposUsuarios';
import LogSistema from './components/LogSistema/LogSistema';
import GerarAgenda from './components/GerarAgenda/GerarAgenda';
import Experiencias from './components/Experiencias/Experiencias';

// Componente para rotas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Componente para rotas públicas (quando já está logado, redireciona)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return !isAuthenticated ? children : <Navigate to="/app/dashboard" replace />;
};

function App() {
  return (
    <AuthProvider>
      <CssBaseline />
      <Routes>
        {/* Página inicial - Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Rotas públicas */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Rotas protegidas */}
        <Route 
          path="/app/*" 
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/clientes" element={<ClientesList />} />
                  <Route path="/clientes/novo" element={<ClienteForm />} />
                  <Route path="/clientes/editar/:id" element={<ClienteForm />} />
                  <Route path="/tipos-cliente" element={<TiposCliente />} />
                  <Route path="/agendamento" element={<Agendamento />} />
                  <Route path="/evolucao" element={<Evolucao />} />
                  <Route path="/experiencias" element={<Experiencias />} />
                  <Route path="/despesas" element={<Despesas />} />
                  <Route path="/tipos-despesa" element={<TiposDespesa />} />
                  <Route path="/gerar-agenda" element={<GerarAgenda />} />
                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route path="/grupos-usuarios" element={<GruposUsuarios />} />
                  <Route path="/logs" element={<LogSistema />} />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          } 
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;