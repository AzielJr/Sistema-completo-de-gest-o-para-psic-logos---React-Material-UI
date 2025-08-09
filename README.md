# Gestão Psi - Sistema de Gestão para Psicólogos

Um sistema completo e moderno para gestão de consultórios de psicologia, desenvolvido em React com Material-UI.

## 🚀 Funcionalidades

### ✅ Implementadas (MVP)
- **Login Responsivo**: Tela de autenticação moderna e totalmente responsiva
- **Dashboard**: Visão geral com estatísticas e informações importantes
- **Gestão de Clientes**: 
  - Lista de clientes com busca e filtros
  - Cadastro completo com 4 abas (Dados, Filiação, Anamnese, Outras Informações)
  - Edição e exclusão de clientes
- **Agendamento**: Interface de calendário moderna para gestão de consultas
- **Layout Responsivo**: Sidebar colapsível e design adaptativo
- **Tema Personalizado**: Cores harmoniosas com a logomarca

### 🔄 Em Desenvolvimento
- Evolução (com entrada de voz)
- Experiências
- Módulo Financeiro
- Cadastros auxiliares
- Utilidades do sistema

## 🛠️ Tecnologias Utilizadas

- **React 18**: Framework principal
- **Material-UI (MUI)**: Biblioteca de componentes
- **React Router**: Navegação entre páginas
- **Day.js**: Manipulação de datas
- **Context API**: Gerenciamento de estado
- **CSS-in-JS**: Estilização com emotion

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 16 ou superior)
- **npm** (geralmente vem com o Node.js)

### Verificar instalação:
```bash
node --version
npm --version
```

## 🚀 Como executar o projeto

### 1. Instalar dependências
Abra o terminal na pasta do projeto (`gestao-psi`) e execute:

```bash
npm install
```

Este comando irá instalar todas as dependências listadas no `package.json`.

### 2. Executar o projeto
Após a instalação das dependências, execute:

```bash
npm start
```

### 3. Acessar o sistema
O sistema será aberto automaticamente no seu navegador padrão em:
```
http://localhost:3000
```

Se não abrir automaticamente, digite este endereço no seu navegador.

## 🔐 Credenciais de Teste

Para acessar o sistema, use as seguintes credenciais:

- **Email**: `admin@gestaopsi.com`
- **Senha**: `123456`

## 📱 Responsividade

O sistema foi desenvolvido para funcionar perfeitamente em:
- 💻 **Desktop** (1200px+)
- 📱 **Tablet** (768px - 1199px)
- 📱 **Mobile** (até 767px)

## 🎨 Tema e Cores

O tema foi desenvolvido para harmonizar com a logomarca:
- **Primária**: Tons de marrom (#8B4513)
- **Secundária**: Verde das folhas (#7CB342)
- **Fundo**: Tons neutros claros
- **Tipografia**: Roboto (Google Fonts)

## 📁 Estrutura do Projeto

```
gestao-psi/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Agendamento/
│   │   ├── Clientes/
│   │   ├── Dashboard/
│   │   ├── Layout/
│   │   └── Login/
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── theme/
│   │   └── theme.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

- `npm start`: Executa o projeto em modo de desenvolvimento
- `npm run build`: Cria uma versão otimizada para produção
- `npm test`: Executa os testes
- `npm run eject`: Remove a abstração do Create React App (⚠️ irreversível)

## 🐛 Solução de Problemas

### Erro de dependências
Se encontrar erros durante a instalação:
```bash
npm cache clean --force
rm -rf node_modules
rm package-lock.json
npm install
```

### Porta já em uso
Se a porta 3000 estiver ocupada:
```bash
npm start
# Quando perguntado, digite 'y' para usar outra porta
```

### Problemas de permissão (Windows)
Execute o terminal como administrador.

## 🔄 Próximos Passos

1. **Integração com Backend**: Conectar com API real
2. **Autenticação JWT**: Implementar tokens de segurança
3. **Módulo de Evolução**: Com entrada de voz
4. **Relatórios**: Gerar PDFs e estatísticas
5. **Notificações**: Sistema de lembretes
6. **PWA**: Transformar em Progressive Web App

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique se seguiu todos os passos corretamente
2. Confirme se o Node.js está instalado
3. Certifique-se de estar na pasta correta do projeto
4. Verifique se não há erros no terminal

## 🎯 Características do Sistema

### Segurança
- Autenticação por usuário
- Dados isolados por psicólogo (id_usuario)
- Validação de formulários

### Usabilidade
- Interface intuitiva
- Feedback visual
- Carregamento otimizado
- Navegação fluida

### Performance
- Componentes otimizados
- Lazy loading
- Memoização
- Bundle otimizado

---

**Desenvolvido com ❤️ para profissionais da psicologia**