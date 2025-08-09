import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage
    const savedUser = localStorage.getItem('gestaopsi_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('gestaopsi_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      // Simulação de login - aqui você conectaria com sua API
      // Por enquanto, vamos usar dados mockados
      const mockUser = {
        id: 1,
        nome: 'Dr. João Silva',
        email: email,
        foto: null, // Aqui viria a foto do usuário
        id_grupo: 1,
        celular: '(81) 99999-9999'
      };

      // Simular validação
      if (email === 'admin@gestaopsi.com' && senha === '123456') {
        setUser(mockUser);
        localStorage.setItem('gestaopsi_user', JSON.stringify(mockUser));
        return { success: true };
      } else {
        return { success: false, message: 'Email ou senha inválidos' };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, message: 'Erro interno do servidor' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gestaopsi_user');
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('gestaopsi_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};