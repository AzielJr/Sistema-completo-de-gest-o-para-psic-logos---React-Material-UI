# 🚀 Comandos Práticos para Implementação

## 📁 **1. Estrutura de Pastas**

```bash
# Navegar para o diretório pai do projeto
cd d:\Programas\React\gPsi

# Criar estrutura do backend
mkdir backend
cd backend

# Inicializar projeto Node.js
npm init -y

# Criar estrutura de pastas
mkdir config controllers models routes middleware migrations uploads

# Criar arquivos principais
touch server.js .env .gitignore
```

## 📦 **2. Instalação de Dependências**

```bash
# Dependências principais
npm install express mysql2 sequelize cors dotenv bcryptjs jsonwebtoken multer helmet express-rate-limit

# Dependências de desenvolvimento
npm install --save-dev nodemon sequelize-cli concurrently

# Instalar Sequelize CLI globalmente (opcional)
npm install -g sequelize-cli
```

## ⚙️ **3. Configuração do Package.json**

Editar `package.json` e adicionar scripts:

```json
{
  "name": "gestao-psi-backend",
  "version": "1.0.0",
  "description": "Backend para Sistema de Gestão Psicológica",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "dev:full": "concurrently \"npm run dev\" \"cd ../frontend && npm start\"",
    "migrate": "sequelize-cli db:migrate",
    "migrate:undo": "sequelize-cli db:migrate:undo",
    "seed": "sequelize-cli db:seed:all",
    "seed:undo": "sequelize-cli db:seed:undo:all",
    "db:reset": "sequelize-cli db:drop && sequelize-cli db:create && sequelize-cli db:migrate && sequelize-cli db:seed:all"
  },
  "keywords": ["gestao", "psicologia", "api", "nodejs"],
  "author": "Seu Nome",
  "license": "MIT"
}
```

## 🗄️ **4. Configuração do Banco de Dados**

### **4.1 Criar arquivo .env:**

```bash
# Criar arquivo .env
echo "# Configurações do Banco
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gestao_psi
DB_USER=root
DB_PASS=sua_senha

# Configurações da API
PORT=5000
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui

# Ambiente
NODE_ENV=development

# Upload de arquivos
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880" > .env
```

### **4.2 Criar banco no MySQL:**

```sql
-- Conectar no MySQL e executar:
CREATE DATABASE gestao_psi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### **4.3 Executar script de estrutura:**

```bash
# Executar o arquivo database_structure.sql no MySQL
mysql -u root -p gestao_psi < ../database_structure.sql
```

## 🔧 **5. Configuração do Sequelize**

```bash
# Inicializar Sequelize
sequelize-cli init

# Isso criará:
# - config/config.json
# - models/index.js
# - migrations/
# - seeders/
```

Editar `config/config.json`:

```json
{
  "development": {
    "username": "root",
    "password": "sua_senha",
    "database": "gestao_psi",
    "host": "localhost",
    "port": 3306,
    "dialect": "mysql",
    "timezone": "-03:00",
    "logging": console.log
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "mysql",
    "timezone": "-03:00",
    "logging": false
  }
}
```

## 📝 **6. Criar Arquivos Base**

### **6.1 server.js:**

```bash
cat > server.js << 'EOF'
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
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://seudominio.com'] 
    : ['http://localhost:3000'],
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

// Importar modelos
const db = require('./models');

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/experiencias', require('./routes/experiencias'));

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'API funcionando!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
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
    message: 'Rota não encontrada'
  });
});

// Sincronizar banco e iniciar servidor
db.sequelize.sync({ force: false }).then(() => {
  console.log('✅ Banco de dados conectado!');
  
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 API disponível em: http://localhost:${PORT}/api`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  });
}).catch(err => {
  console.error('❌ Erro ao conectar com o banco:', err);
  process.exit(1);
});
EOF
```

### **6.2 .gitignore:**

```bash
cat > .gitignore << 'EOF'
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
EOF
```

### **6.3 Criar pasta uploads:**

```bash
mkdir uploads
echo "# Pasta para uploads" > uploads/.gitkeep
```

## 🏃‍♂️ **7. Comandos para Executar**

### **7.1 Desenvolvimento:**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (em outra aba)
cd ../
npm start

# OU executar ambos juntos:
cd backend
npm run dev:full
```

### **7.2 Produção:**

```bash
# Backend
npm start

# Frontend (build)
npm run build
```

## 🧪 **8. Testes da API**

### **8.1 Testar conexão:**

```bash
# Usando curl
curl http://localhost:5000/api/health

# Usando PowerShell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET
```

### **8.2 Testar autenticação:**

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gestao-psi.com","senha":"admin123"}'
```

## 📊 **9. Monitoramento**

### **9.1 Logs em tempo real:**

```bash
# Backend
tail -f logs/app.log

# MySQL (se configurado)
tail -f /var/log/mysql/error.log
```

### **9.2 Verificar processos:**

```bash
# Verificar se a API está rodando
netstat -an | findstr :5000

# Verificar MySQL
netstat -an | findstr :3306
```

## 🔄 **10. Comandos de Manutenção**

### **10.1 Reset completo do banco:**

```bash
npm run db:reset
```

### **10.2 Backup do banco:**

```bash
mysqldump -u root -p gestao_psi > backup_$(date +%Y%m%d_%H%M%S).sql
```

### **10.3 Restaurar backup:**

```bash
mysql -u root -p gestao_psi < backup_20240115_143000.sql
```

## 📋 **11. Checklist de Implementação**

### **Fase 1 - Configuração Base:**
- [ ] Criar estrutura de pastas
- [ ] Instalar dependências
- [ ] Configurar banco de dados
- [ ] Criar arquivo .env
- [ ] Testar conexão com banco

### **Fase 2 - API Base:**
- [ ] Configurar servidor Express
- [ ] Implementar middleware de segurança
- [ ] Criar rota de health check
- [ ] Testar API básica

### **Fase 3 - Autenticação:**
- [ ] Implementar modelo User
- [ ] Criar controller de autenticação
- [ ] Implementar JWT
- [ ] Testar login/logout

### **Fase 4 - Módulos Principais:**
- [ ] Implementar CRUD de clientes
- [ ] Implementar CRUD de experiências
- [ ] Implementar CRUD de agendamentos
- [ ] Testar cada endpoint

### **Fase 5 - Frontend Integration:**
- [ ] Atualizar serviços do frontend
- [ ] Migrar componentes para API
- [ ] Testar integração completa
- [ ] Implementar tratamento de erros

### **Fase 6 - Deploy:**
- [ ] Configurar ambiente de produção
- [ ] Implementar CI/CD
- [ ] Configurar monitoramento
- [ ] Fazer deploy

## 🆘 **12. Solução de Problemas Comuns**

### **Erro de conexão com MySQL:**
```bash
# Verificar se MySQL está rodando
net start mysql

# Verificar credenciais no .env
# Verificar se o banco existe
```

### **Erro de porta em uso:**
```bash
# Verificar qual processo está usando a porta
netstat -ano | findstr :5000

# Matar processo se necessário
taskkill /PID <PID> /F
```

### **Erro de dependências:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

---

**🎯 Próximo Passo:** Execute os comandos da Fase 1 e me avise quando estiver pronto para continuar!