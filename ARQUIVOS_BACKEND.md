# 📁 Arquivos para Criar no Backend

## 📍 Localização: `d:\Programas\React\gPsi\backend\`

---

## 🔧 **1. Arquivo: `.env`**

**Crie o arquivo `.env` na pasta backend e cole este conteúdo:**

```env
# =====================================================
# CONFIGURAÇÕES DO BANCO DE DADOS MYSQL (WEB)
# =====================================================
# SUBSTITUA PELOS SEUS DADOS REAIS DO MYSQL DA WEB:

DB_HOST=92.113.38.158
DB_PORT=3306
DB_NAME=gestao_psi
DB_USER=novo_usuario
DB_PASS=sua_senha

# =====================================================
# CONFIGURAÇÕES DA API
# =====================================================
PORT=5000
JWT_SECRET=gestao_psi_jwt_secret_muito_seguro_2024

# =====================================================
# AMBIENTE
# =====================================================
NODE_ENV=development

# =====================================================
# UPLOAD DE ARQUIVOS
# =====================================================
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# =====================================================
# CORS - FRONTEND URL
# =====================================================
FRONTEND_URL=http://localhost:3000
```

---

## 🚀 **2. Arquivo: `server.js`**

**Crie o arquivo `server.js` na pasta backend e cole este conteúdo:**

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
app.use('/api/', limiter);

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos
app.use('/uploads', express.static('uploads'));

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API Gestão PSI funcionando!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota de teste de conexão com banco
app.get('/api/test-db', (req, res) => {
  res.json({
    success: true,
    message: 'Teste de conexão com banco - implementar depois',
    database: {
      host: process.env.DB_HOST || 'não configurado',
      name: process.env.DB_NAME || 'não configurado',
      port: process.env.DB_PORT || 'não configurado'
    }
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Rota 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('🚀 Servidor Gestão PSI rodando na porta', PORT);
  console.log('📍 API disponível em: http://localhost:' + PORT + '/api');
  console.log('🏥 Health check: http://localhost:' + PORT + '/api/health');
  console.log('🔧 Ambiente:', process.env.NODE_ENV || 'development');
  console.log('💾 Banco configurado:', process.env.DB_HOST || 'não configurado');
});
```

---

## 📋 **3. Arquivo: `.gitignore`**

**Crie o arquivo `.gitignore` na pasta backend e cole este conteúdo:**

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Uploads
uploads/*
!uploads/.gitkeep

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build
dist/
build/
```

---

## 🗂️ **4. Arquivo: `uploads/.gitkeep`**

**Crie a pasta `uploads` dentro do backend e um arquivo `.gitkeep` dentro dela (arquivo vazio)**

---

## ⚙️ **Passos para Implementar:**

### **Passo 1: Criar os Arquivos**
1. Abra a pasta `d:\Programas\React\gPsi\backend\` no VS Code
2. Crie os 3 arquivos acima com o conteúdo exato
3. Crie a pasta `uploads` e o arquivo `.gitkeep` dentro dela

### **Passo 2: Configurar MySQL**
1. Edite o arquivo `.env`
2. Substitua pelos seus dados reais do MySQL da web:
   - `DB_HOST=` (seu host)
   - `DB_USER=` (seu usuário)
   - `DB_PASS=` (sua senha)
   - `DB_NAME=` (nome do banco, pode ser "gestao_psi")

### **Passo 3: Testar**
1. Abra terminal na pasta backend
2. Execute: `npm run dev`
3. Acesse: `http://localhost:5000/api/health`

---

## 🎯 **Próximos Passos Após Criar os Arquivos:**

1. ✅ **Testar servidor básico**
2. ✅ **Configurar conexão com MySQL**
3. ✅ **Criar modelos de dados**
4. ✅ **Implementar rotas da API**
5. ✅ **Integrar com frontend**

---

**🚨 IMPORTANTE:** Não esqueça de substituir os dados do MySQL no arquivo `.env` pelos seus dados reais!