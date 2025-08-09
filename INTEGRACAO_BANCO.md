# 🗄️ Guia de Integração com Banco de Dados MySQL

## 📋 **Visão Geral**

Este guia detalha os passos para integrar a aplicação React com um banco de dados MySQL usando Node.js + Express como backend.

## 🏗️ **Arquitetura Proposta**

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    SQL    ┌─────────────────┐
│                 │ ◄─────────────────► │                 │ ◄────────► │                 │
│   React App     │                     │  Node.js API    │            │   MySQL DB      │
│   (Frontend)    │                     │   (Backend)     │            │                 │
└─────────────────┘                     └─────────────────┘            └─────────────────┘
```

## 🚀 **Passo 1: Configuração do Backend**

### **1.1 Criar estrutura do backend**

Crie uma nova pasta para o backend:
```bash
mkdir backend
cd backend
npm init -y
```

### **1.2 Instalar dependências**

```bash
# Dependências principais
npm install express mysql2 sequelize cors dotenv bcryptjs jsonwebtoken

# Dependências de desenvolvimento
npm install --save-dev nodemon sequelize-cli
```

### **1.3 Estrutura de pastas**

```
backend/
├── config/
│   ├── database.js
│   └── auth.js
├── controllers/
│   ├── authController.js
│   ├── clienteController.js
│   ├── experienciaController.js
│   └── agendamentoController.js
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Cliente.js
│   ├── Experiencia.js
│   └── Agendamento.js
├── routes/
│   ├── auth.js
│   ├── clientes.js
│   ├── experiencias.js
│   └── agendamentos.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── migrations/
├── .env
├── .gitignore
├── package.json
└── server.js
```

## 🗄️ **Passo 2: Configuração do Banco de Dados**

### **2.1 Arquivo .env**

```env
# Configurações do Banco
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gestao_psi
DB_USER=seu_usuario
DB_PASS=sua_senha

# Configurações da API
PORT=5000
JWT_SECRET=seu_jwt_secret_muito_seguro

# Ambiente
NODE_ENV=development
```

### **2.2 Configuração do Sequelize**

**config/database.js:**
```javascript
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log,
    timezone: '-03:00'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
    timezone: '-03:00'
  }
};
```

## 📊 **Passo 3: Modelos do Banco**

### **3.1 Exemplo de Model - Cliente**

**models/Cliente.js:**
```javascript
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Cliente = sequelize.define('Cliente', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome_completo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    genero: {
      type: DataTypes.ENUM('masculino', 'feminino', 'outro', 'prefiro_nao_dizer'),
      allowNull: true
    },
    estado_civil: {
      type: DataTypes.ENUM('solteiro', 'casado', 'divorciado', 'viuvo', 'uniao_estavel'),
      allowNull: true
    },
    escolaridade: {
      type: DataTypes.ENUM('fundamental', 'medio', 'superior', 'pos_graduacao', 'mestrado', 'doutorado'),
      allowNull: true
    },
    abordagem: {
      type: DataTypes.ENUM('cognitivo_comportamental', 'psicanalitica', 'humanistica', 'sistemica'),
      allowNull: true
    },
    foto_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'clientes',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });

  return Cliente;
};
```

### **3.2 Exemplo de Model - Experiencia**

**models/Experiencia.js:**
```javascript
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Experiencia = sequelize.define('Experiencia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    positiva: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    negativa: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'experiencias',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
  });

  return Experiencia;
};
```

## 🛣️ **Passo 4: Rotas da API**

### **4.1 Exemplo de Controller - Cliente**

**controllers/clienteController.js:**
```javascript
const { Cliente } = require('../models');

class ClienteController {
  // Listar todos os clientes
  async index(req, res) {
    try {
      const clientes = await Cliente.findAll({
        where: { ativo: true },
        order: [['criado_em', 'DESC']]
      });
      
      res.json({
        success: true,
        data: clientes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar clientes',
        error: error.message
      });
    }
  }

  // Criar novo cliente
  async store(req, res) {
    try {
      const cliente = await Cliente.create(req.body);
      
      res.status(201).json({
        success: true,
        data: cliente,
        message: 'Cliente criado com sucesso'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar cliente',
        error: error.message
      });
    }
  }

  // Buscar cliente por ID
  async show(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.params.id);
      
      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: 'Cliente não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: cliente
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar cliente',
        error: error.message
      });
    }
  }

  // Atualizar cliente
  async update(req, res) {
    try {
      const [updated] = await Cliente.update(req.body, {
        where: { id: req.params.id }
      });
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Cliente não encontrado'
        });
      }
      
      const cliente = await Cliente.findByPk(req.params.id);
      
      res.json({
        success: true,
        data: cliente,
        message: 'Cliente atualizado com sucesso'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar cliente',
        error: error.message
      });
    }
  }

  // Excluir cliente (soft delete)
  async destroy(req, res) {
    try {
      const [updated] = await Cliente.update(
        { ativo: false },
        { where: { id: req.params.id } }
      );
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: 'Cliente não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Cliente excluído com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir cliente',
        error: error.message
      });
    }
  }
}

module.exports = new ClienteController();
```

### **4.2 Exemplo de Rotas - Cliente**

**routes/clientes.js:**
```javascript
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const auth = require('../middleware/auth');

// Todas as rotas protegidas por autenticação
router.use(auth);

// GET /api/clientes - Listar clientes
router.get('/', clienteController.index);

// POST /api/clientes - Criar cliente
router.post('/', clienteController.store);

// GET /api/clientes/:id - Buscar cliente
router.get('/:id', clienteController.show);

// PUT /api/clientes/:id - Atualizar cliente
router.put('/:id', clienteController.update);

// DELETE /api/clientes/:id - Excluir cliente
router.delete('/:id', clienteController.destroy);

module.exports = router;
```

## 🔧 **Passo 5: Servidor Principal**

**server.js:**
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar modelos
const db = require('./models');

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/experiencias', require('./routes/experiencias'));
app.use('/api/agendamentos', require('./routes/agendamentos'));

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Sincronizar banco e iniciar servidor
db.sequelize.sync({ force: false }).then(() => {
  console.log('✅ Banco de dados conectado!');
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 API disponível em: http://localhost:${PORT}/api`);
  });
}).catch(err => {
  console.error('❌ Erro ao conectar com o banco:', err);
});
```

## ⚛️ **Passo 6: Integração no Frontend**

### **6.1 Criar serviço de API**

**src/services/api.js:**
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
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

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
```

### **6.2 Serviços específicos**

**src/services/clienteService.js:**
```javascript
import api from './api';

export const clienteService = {
  // Listar clientes
  async listar() {
    return await api.get('/clientes');
  },

  // Buscar cliente por ID
  async buscarPorId(id) {
    return await api.get(`/clientes/${id}`);
  },

  // Criar cliente
  async criar(dados) {
    return await api.post('/clientes', dados);
  },

  // Atualizar cliente
  async atualizar(id, dados) {
    return await api.put(`/clientes/${id}`, dados);
  },

  // Excluir cliente
  async excluir(id) {
    return await api.delete(`/clientes/${id}`);
  }
};
```

### **6.3 Atualizar componentes**

Exemplo de como atualizar o componente de clientes:

```javascript
// Em ClientesList.js
import { clienteService } from '../../services/clienteService';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      setLoading(true);
      const response = await clienteService.listar();
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  // ... resto do componente
};
```

## 📝 **Passo 7: Scripts de Desenvolvimento**

### **7.1 Package.json do Backend**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "migrate": "sequelize-cli db:migrate",
    "seed": "sequelize-cli db:seed:all"
  }
}
```

### **7.2 Package.json do Frontend**

Adicionar variável de ambiente:

```json
{
  "scripts": {
    "start": "REACT_APP_API_URL=http://localhost:5000/api react-scripts start"
  }
}
```

## 🚀 **Comandos para Executar**

### **Backend:**
```bash
cd backend
npm install
npm run dev
```

### **Frontend:**
```bash
cd frontend
npm start
```

## 📋 **Próximos Passos**

1. **Criar estrutura do backend** seguindo este guia
2. **Configurar banco MySQL** com as tabelas necessárias
3. **Implementar autenticação JWT**
4. **Migrar dados mockados** para o banco real
5. **Testar integração** endpoint por endpoint
6. **Deploy em produção**

## 🔒 **Considerações de Segurança**

- ✅ Validação de dados no backend
- ✅ Sanitização de inputs
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Senhas hasheadas
- ✅ JWT com expiração
- ✅ Logs de auditoria

---

**💡 Dica:** Comece implementando um endpoint por vez (ex: clientes) e teste completamente antes de partir para o próximo!