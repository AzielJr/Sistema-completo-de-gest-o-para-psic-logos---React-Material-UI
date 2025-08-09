# 🔄 Exemplo de Migração de Componente para API Real

## 📋 **Antes vs Depois**

### **❌ ANTES (com dados mockados):**

```javascript
// Experiencias.js - VERSÃO MOCKADA
import React, { useState, useEffect } from 'react';

const Experiencias = () => {
  const [experiencias, setExperiencias] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dados mockados hardcoded
    const experienciasMockData = [
      {
        id: 1,
        cliente_id: 1,
        cliente_nome: 'Ana Silva',
        criado_em: '2024-01-15 10:30:00',
        positiva: 'Paciente demonstrou grande evolução...',
        negativa: 'Ainda apresenta resistência...'
      }
      // ... mais dados mockados
    ];

    const clientesMockData = [
      { id: 1, nome: 'Ana Silva' },
      { id: 2, nome: 'Carlos Santos' }
      // ... mais dados mockados
    ];

    setExperiencias(experienciasMockData);
    setClientes(clientesMockData);
  }, []);

  const salvarExperiencia = () => {
    // Lógica local sem persistência real
    if (editingExperiencia) {
      const experienciasAtualizadas = experiencias.map(exp =>
        exp.id === editingExperiencia.id ? { ...exp, ...formData } : exp
      );
      setExperiencias(experienciasAtualizadas);
    } else {
      const novaExperiencia = {
        id: Math.max(...experiencias.map(e => e.id)) + 1,
        ...formData,
        criado_em: new Date().toISOString()
      };
      setExperiencias([novaExperiencia, ...experiencias]);
    }
  };

  // ... resto do componente
};
```

### **✅ DEPOIS (com API real):**

```javascript
// Experiencias.js - VERSÃO COM API
import React, { useState, useEffect } from 'react';
import { experienciaService, clienteService } from '../../services/api';

const Experiencias = () => {
  const [experiencias, setExperiencias] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError('');

      // Carregar dados em paralelo
      const [experienciasResponse, clientesResponse] = await Promise.all([
        experienciaService.listar(),
        clienteService.listar({ ativo: true })
      ]);

      if (experienciasResponse.success) {
        setExperiencias(experienciasResponse.data);
      }

      if (clientesResponse.success) {
        setClientes(clientesResponse.data);
      }

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError(error.message || 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const salvarExperiencia = async () => {
    try {
      setLoading(true);
      setError('');

      let response;

      if (editingExperiencia) {
        // Atualizar experiência existente
        response = await experienciaService.atualizar(editingExperiencia.id, formData);
        setSuccess('Experiência atualizada com sucesso!');
      } else {
        // Criar nova experiência
        response = await experienciaService.criar(formData);
        setSuccess('Experiência criada com sucesso!');
      }

      if (response.success) {
        // Recarregar dados para refletir mudanças
        await carregarDados();
        fecharDialog();
      }

    } catch (error) {
      console.error('Erro ao salvar experiência:', error);
      setError(error.message || 'Erro ao salvar experiência');
    } finally {
      setLoading(false);
    }
  };

  const excluirExperiencia = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta experiência?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await experienciaService.excluir(id);

      if (response.success) {
        setSuccess('Experiência excluída com sucesso!');
        await carregarDados(); // Recarregar lista
      }

    } catch (error) {
      console.error('Erro ao excluir experiência:', error);
      setError(error.message || 'Erro ao excluir experiência');
    } finally {
      setLoading(false);
    }
  };

  // Filtros com API
  const aplicarFiltros = async (novosFiltros) => {
    try {
      setLoading(true);
      setError('');

      const response = await experienciaService.listar(novosFiltros);

      if (response.success) {
        setExperiencias(response.data);
      }

    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
      setError(error.message || 'Erro ao aplicar filtros');
    } finally {
      setLoading(false);
    }
  };

  // ... resto do componente
};
```

## 🔧 **Principais Mudanças**

### **1. Importações**
```javascript
// ANTES
// Sem importações de serviços

// DEPOIS
import { experienciaService, clienteService } from '../../services/api';
```

### **2. Carregamento de Dados**
```javascript
// ANTES
useEffect(() => {
  // Dados hardcoded
  setExperiencias(dadosMockados);
}, []);

// DEPOIS
useEffect(() => {
  carregarDados();
}, []);

const carregarDados = async () => {
  try {
    setLoading(true);
    const response = await experienciaService.listar();
    if (response.success) {
      setExperiencias(response.data);
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### **3. Operações CRUD**
```javascript
// ANTES - Manipulação local do estado
const salvarExperiencia = () => {
  if (editingExperiencia) {
    setExperiencias(experiencias.map(exp => 
      exp.id === editingExperiencia.id ? { ...exp, ...formData } : exp
    ));
  } else {
    setExperiencias([novaExperiencia, ...experiencias]);
  }
};

// DEPOIS - Chamadas para API
const salvarExperiencia = async () => {
  try {
    setLoading(true);
    
    if (editingExperiencia) {
      await experienciaService.atualizar(editingExperiencia.id, formData);
    } else {
      await experienciaService.criar(formData);
    }
    
    await carregarDados(); // Recarregar dados atualizados
    setSuccess('Operação realizada com sucesso!');
    
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

### **4. Tratamento de Erros**
```javascript
// ANTES
// Sem tratamento de erros de rede

// DEPOIS
const [error, setError] = useState('');

// Em cada operação:
try {
  // ... operação
} catch (error) {
  setError(error.message || 'Erro inesperado');
}

// No JSX:
{error && (
  <Alert severity="error" onClose={() => setError('')}>
    {error}
  </Alert>
)}
```

### **5. Estados de Loading**
```javascript
// ANTES
// Loading apenas local

// DEPOIS
const [loading, setLoading] = useState(false);

// Em operações assíncronas:
setLoading(true);
try {
  // ... operação
} finally {
  setLoading(false);
}

// No JSX:
<Button disabled={loading}>
  {loading ? 'Salvando...' : 'Salvar'}
</Button>
```

## 📝 **Checklist de Migração**

### **✅ Para cada componente:**

1. **Importar serviços necessários**
   ```javascript
   import { servicoService } from '../../services/api';
   ```

2. **Adicionar estados de controle**
   ```javascript
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [success, setSuccess] = useState('');
   ```

3. **Criar função de carregamento**
   ```javascript
   const carregarDados = async () => {
     try {
       setLoading(true);
       const response = await servicoService.listar();
       setDados(response.data);
     } catch (error) {
       setError(error.message);
     } finally {
       setLoading(false);
     }
   };
   ```

4. **Atualizar operações CRUD**
   - Substituir manipulação local por chamadas de API
   - Adicionar try/catch
   - Recarregar dados após operações

5. **Adicionar feedback visual**
   ```javascript
   {error && <Alert severity="error">{error}</Alert>}
   {success && <Alert severity="success">{success}</Alert>}
   ```

6. **Atualizar filtros e buscas**
   ```javascript
   const aplicarFiltros = async (filtros) => {
     const response = await servicoService.listar(filtros);
     setDados(response.data);
   };
   ```

## 🚀 **Ordem de Migração Recomendada**

1. **Autenticação** (Login/Logout)
2. **Clientes** (base do sistema)
3. **Tipos de Cliente**
4. **Experiências**
5. **Agendamentos**
6. **Evolução**
7. **Despesas**
8. **Tipos de Despesa**
9. **Usuários**
10. **Grupos de Usuários**
11. **Dashboard**
12. **Relatórios**

## 💡 **Dicas Importantes**

1. **Teste cada componente** após a migração
2. **Mantenha backup** dos componentes originais
3. **Implemente loading states** em todas as operações
4. **Trate todos os erros** adequadamente
5. **Use Promise.all** para operações paralelas
6. **Implemente debounce** em buscas em tempo real
7. **Cache dados** quando apropriado
8. **Valide dados** antes de enviar para API

## 🔍 **Exemplo de Validação**

```javascript
const validarFormulario = () => {
  const erros = {};
  
  if (!formData.cliente_id) {
    erros.cliente_id = 'Cliente é obrigatório';
  }
  
  if (!formData.positiva && !formData.negativa) {
    erros.geral = 'Pelo menos uma experiência deve ser preenchida';
  }
  
  return erros;
};

const salvarExperiencia = async () => {
  const erros = validarFormulario();
  
  if (Object.keys(erros).length > 0) {
    setError(Object.values(erros).join(', '));
    return;
  }
  
  // ... continuar com salvamento
};
```

---

**🎯 Resultado:** Componentes totalmente integrados com backend, com tratamento robusto de erros, estados de loading e feedback adequado ao usuário!