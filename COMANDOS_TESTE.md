# 🧪 Comandos para Testar o Backend

## 📍 **Após criar os arquivos do backend:**

### **1. Testar Servidor Básico**

```bash
# Navegar para pasta backend
cd d:\Programas\React\gPsi\backend

# Iniciar servidor
npm run dev
```

**Resultado esperado:**
```
🚀 Servidor Gestão PSI rodando na porta 5000
📍 API disponível em: http://localhost:5000/api
🏥 Health check: http://localhost:5000/api/health
🔧 Ambiente: development
💾 Banco configurado: seu_host_mysql.com
```

### **2. Testar Rotas da API**

**No navegador ou Postman:**

- **Health Check:** `http://localhost:5000/api/health`
- **Teste DB:** `http://localhost:5000/api/test-db`

**Resposta esperada (health):**
```json
{
  "success": true,
  "message": "API Gestão PSI funcionando!",
  "timestamp": "2024-08-09T15:30:00.000Z",
  "version": "1.0.0",
  "environment": "development"
}
```

### **3. Testar com PowerShell**

```powershell
# Testar health check
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method GET

# Testar configuração do banco
Invoke-RestMethod -Uri "http://localhost:5000/api/test-db" -Method GET
```

### **4. Verificar Logs**

**No terminal onde o servidor está rodando, você deve ver:**
- ✅ Servidor iniciado
- ✅ Configurações carregadas
- ✅ Requests sendo processados

### **5. Testar Erro 404**

**Acesse uma rota que não existe:**
- `http://localhost:5000/api/rota-inexistente`

**Resposta esperada:**
```json
{
  "success": false,
  "message": "Rota não encontrada",
  "path": "/api/rota-inexistente"
}
```

---

## 🔧 **Solução de Problemas**

### **Erro: "Cannot find module"**
```bash
# Reinstalar dependências
npm install
```

### **Erro: "Port already in use"**
```bash
# Verificar qual processo está usando a porta
netstat -ano | findstr :5000

# Ou mudar a porta no .env
PORT=5001
```

### **Erro: "ENOENT .env"**
- Verificar se o arquivo `.env` foi criado na pasta backend
- Verificar se não tem extensão extra (como `.env.txt`)

### **Erro de conexão MySQL**
- Verificar dados no arquivo `.env`
- Testar conexão manual com o banco
- Verificar firewall/permissões

---

## 📊 **Status dos Serviços**

### **Frontend (já funcionando):**
- ✅ React rodando em `http://localhost:3000`
- ✅ Todas as telas implementadas
- ✅ Dados mockados funcionando

### **Backend (após implementar):**
- ⏳ Express rodando em `http://localhost:5000`
- ⏳ API básica funcionando
- ⏳ Conexão com MySQL configurada

### **Próximos Passos:**
1. ✅ Criar arquivos básicos
2. ⏳ Testar servidor
3. ⏳ Configurar banco de dados
4. ⏳ Implementar modelos
5. ⏳ Criar rotas CRUD
6. ⏳ Integrar frontend

---

**🎯 Quando terminar de criar os arquivos, execute os comandos de teste e me avise o resultado!**