import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Criar instância do axios com configurações padrão
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => {
    // Retornar apenas os dados da resposta
    return response.data;
  },
  (error) => {
    // Tratar erro de autenticação
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Retornar erro formatado
    return Promise.reject(error.response?.data || { 
      success: false, 
      message: error.message || 'Erro de conexão' 
    });
  }
);

// =====================================================
// SERVIÇOS DE AUTENTICAÇÃO
// =====================================================
export const authService = {
  async login(email, senha) {
    const response = await api.post('/auth/login', { email, senha });
    
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  },

  async verificarToken() {
    return await api.get('/auth/verify');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};

// =====================================================
// SERVIÇOS DE CLIENTES
// =====================================================
export const clienteService = {
  async listar(filtros = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params.append(key, filtros[key]);
      }
    });
    
    return await api.get(`/clientes?${params.toString()}`);
  },

  async buscarPorId(id) {
    return await api.get(`/clientes/${id}`);
  },

  async criar(dados) {
    return await api.post('/clientes', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/clientes/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/clientes/${id}`);
  },

  async uploadFoto(id, arquivo) {
    const formData = new FormData();
    formData.append('foto', arquivo);
    
    return await api.post(`/clientes/${id}/foto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

// =====================================================
// SERVIÇOS DE EXPERIÊNCIAS
// =====================================================
export const experienciaService = {
  async listar(filtros = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params.append(key, filtros[key]);
      }
    });
    
    return await api.get(`/experiencias?${params.toString()}`);
  },

  async buscarPorId(id) {
    return await api.get(`/experiencias/${id}`);
  },

  async buscarPorCliente(clienteId) {
    return await api.get(`/experiencias/cliente/${clienteId}`);
  },

  async criar(dados) {
    return await api.post('/experiencias', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/experiencias/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/experiencias/${id}`);
  }
};

// =====================================================
// SERVIÇOS DE AGENDAMENTOS
// =====================================================
export const agendamentoService = {
  async listar(filtros = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params.append(key, filtros[key]);
      }
    });
    
    return await api.get(`/agendamentos?${params.toString()}`);
  },

  async buscarPorId(id) {
    return await api.get(`/agendamentos/${id}`);
  },

  async buscarPorPeriodo(dataInicio, dataFim) {
    return await api.get(`/agendamentos/periodo?inicio=${dataInicio}&fim=${dataFim}`);
  },

  async criar(dados) {
    return await api.post('/agendamentos', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/agendamentos/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/agendamentos/${id}`);
  },

  async alterarStatus(id, status) {
    return await api.patch(`/agendamentos/${id}/status`, { status });
  },

  async gerarAgenda(mes, ano) {
    return await api.post('/agendamentos/gerar-agenda', { mes, ano });
  }
};

// =====================================================
// SERVIÇOS DE EVOLUÇÃO
// =====================================================
export const evolucaoService = {
  async listar(filtros = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params.append(key, filtros[key]);
      }
    });
    
    return await api.get(`/evolucao?${params.toString()}`);
  },

  async buscarPorId(id) {
    return await api.get(`/evolucao/${id}`);
  },

  async buscarPorCliente(clienteId) {
    return await api.get(`/evolucao/cliente/${clienteId}`);
  },

  async criar(dados) {
    return await api.post('/evolucao', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/evolucao/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/evolucao/${id}`);
  }
};

// =====================================================
// SERVIÇOS DE DESPESAS
// =====================================================
export const despesaService = {
  async listar(filtros = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params.append(key, filtros[key]);
      }
    });
    
    return await api.get(`/despesas?${params.toString()}`);
  },

  async buscarPorId(id) {
    return await api.get(`/despesas/${id}`);
  },

  async criar(dados) {
    return await api.post('/despesas', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/despesas/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/despesas/${id}`);
  },

  async uploadComprovante(id, arquivo) {
    const formData = new FormData();
    formData.append('comprovante', arquivo);
    
    return await api.post(`/despesas/${id}/comprovante`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

// =====================================================
// SERVIÇOS DE TIPOS
// =====================================================
export const tipoClienteService = {
  async listar() {
    return await api.get('/tipos-cliente');
  },

  async criar(dados) {
    return await api.post('/tipos-cliente', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/tipos-cliente/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/tipos-cliente/${id}`);
  }
};

export const tipoDespesaService = {
  async listar() {
    return await api.get('/tipos-despesa');
  },

  async criar(dados) {
    return await api.post('/tipos-despesa', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/tipos-despesa/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/tipos-despesa/${id}`);
  }
};

// =====================================================
// SERVIÇOS DE USUÁRIOS E GRUPOS
// =====================================================
export const usuarioService = {
  async listar() {
    return await api.get('/usuarios');
  },

  async buscarPorId(id) {
    return await api.get(`/usuarios/${id}`);
  },

  async criar(dados) {
    return await api.post('/usuarios', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/usuarios/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/usuarios/${id}`);
  },

  async alterarSenha(id, senhaAtual, novaSenha) {
    return await api.patch(`/usuarios/${id}/senha`, {
      senha_atual: senhaAtual,
      nova_senha: novaSenha
    });
  }
};

export const grupoUsuarioService = {
  async listar() {
    return await api.get('/grupos-usuarios');
  },

  async buscarPorId(id) {
    return await api.get(`/grupos-usuarios/${id}`);
  },

  async criar(dados) {
    return await api.post('/grupos-usuarios', dados);
  },

  async atualizar(id, dados) {
    return await api.put(`/grupos-usuarios/${id}`, dados);
  },

  async excluir(id) {
    return await api.delete(`/grupos-usuarios/${id}`);
  }
};

// =====================================================
// SERVIÇOS DE RELATÓRIOS E DASHBOARD
// =====================================================
export const dashboardService = {
  async obterEstatisticas() {
    return await api.get('/dashboard/stats');
  },

  async obterAgendamentosHoje() {
    return await api.get('/dashboard/agendamentos-hoje');
  },

  async obterReceitaMensal(mes, ano) {
    return await api.get(`/dashboard/receita-mensal?mes=${mes}&ano=${ano}`);
  },

  async obterDespesasMensais(mes, ano) {
    return await api.get(`/dashboard/despesas-mensais?mes=${mes}&ano=${ano}`);
  }
};

export const relatorioService = {
  async agendamentosPorPeriodo(dataInicio, dataFim) {
    return await api.get(`/relatorios/agendamentos?inicio=${dataInicio}&fim=${dataFim}`);
  },

  async despesasPorPeriodo(dataInicio, dataFim) {
    return await api.get(`/relatorios/despesas?inicio=${dataInicio}&fim=${dataFim}`);
  },

  async receitaPorPeriodo(dataInicio, dataFim) {
    return await api.get(`/relatorios/receita?inicio=${dataInicio}&fim=${dataFim}`);
  },

  async exportarPDF(tipo, filtros) {
    const response = await api.post(`/relatorios/exportar/${tipo}`, filtros, {
      responseType: 'blob'
    });
    
    // Criar URL para download
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `relatorio_${tipo}_${new Date().toISOString().split('T')[0]}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
};

// =====================================================
// SERVIÇOS DE LOGS
// =====================================================
export const logService = {
  async listar(filtros = {}) {
    const params = new URLSearchParams();
    
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params.append(key, filtros[key]);
      }
    });
    
    return await api.get(`/logs?${params.toString()}`);
  },

  async buscarPorId(id) {
    return await api.get(`/logs/${id}`);
  }
};

// =====================================================
// UTILITÁRIOS
// =====================================================
export const utilService = {
  async testarConexao() {
    return await api.get('/health');
  },

  async backup() {
    return await api.post('/utils/backup');
  },

  async importarDados(arquivo) {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    
    return await api.post('/utils/importar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

// Exportar instância do axios para uso direto se necessário
export default api;