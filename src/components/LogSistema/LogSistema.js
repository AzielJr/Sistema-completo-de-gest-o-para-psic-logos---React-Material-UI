import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  useTheme,
  Pagination,
  Button
} from '@mui/material';
import {
  History as HistoryIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const LogSistema = () => {
  const theme = useTheme();
  
  // Estados
  const [logs] = useState([
    {
      id: 1,
      data_hora: '2024-01-15 09:30:15',
      usuario: 'Dr. João Silva',
      acao: 'Login',
      modulo: 'Sistema',
      descricao: 'Login realizado com sucesso',
      ip: '192.168.1.100',
      nivel: 'info'
    },
    {
      id: 2,
      data_hora: '2024-01-15 09:35:22',
      usuario: 'Dr. João Silva',
      acao: 'Criação',
      modulo: 'Clientes',
      descricao: 'Cliente "Maria Santos" criado',
      ip: '192.168.1.100',
      nivel: 'info'
    },
    {
      id: 3,
      data_hora: '2024-01-15 10:15:45',
      usuario: 'Dr. João Silva',
      acao: 'Edição',
      modulo: 'Evolução',
      descricao: 'Evolução ID 15 editada para cliente "Maria Santos"',
      ip: '192.168.1.100',
      nivel: 'info'
    },
    {
      id: 4,
      data_hora: '2024-01-15 11:20:33',
      usuario: 'Dra. Maria Santos',
      acao: 'Login',
      modulo: 'Sistema',
      descricao: 'Login realizado com sucesso',
      ip: '192.168.1.105',
      nivel: 'info'
    },
    {
      id: 5,
      data_hora: '2024-01-15 11:45:12',
      usuario: 'Dra. Maria Santos',
      acao: 'Exclusão',
      modulo: 'Despesas',
      descricao: 'Despesa ID 8 excluída',
      ip: '192.168.1.105',
      nivel: 'warning'
    },
    {
      id: 6,
      data_hora: '2024-01-15 14:30:55',
      usuario: 'Sistema',
      acao: 'Erro',
      modulo: 'Backup',
      descricao: 'Falha no backup automático - espaço insuficiente',
      ip: 'localhost',
      nivel: 'error'
    },
    {
      id: 7,
      data_hora: '2024-01-15 15:10:18',
      usuario: 'Dr. João Silva',
      acao: 'Visualização',
      modulo: 'Relatórios',
      descricao: 'Relatório de evolução gerado em PDF',
      ip: '192.168.1.100',
      nivel: 'info'
    },
    {
      id: 8,
      data_hora: '2024-01-15 16:45:30',
      usuario: 'Dr. João Silva',
      acao: 'Logout',
      modulo: 'Sistema',
      descricao: 'Logout realizado',
      ip: '192.168.1.100',
      nivel: 'info'
    }
  ]);

  const [filtros, setFiltros] = useState({
    usuario: '',
    acao: '',
    modulo: '',
    nivel: '',
    data_inicio: '',
    data_fim: ''
  });

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Opções para filtros
  const acoes = ['Login', 'Logout', 'Criação', 'Edição', 'Exclusão', 'Visualização', 'Erro'];
  const modulos = ['Sistema', 'Clientes', 'Evolução', 'Despesas', 'Agendamento', 'Relatórios', 'Backup'];
  const niveis = ['info', 'warning', 'error'];
  const usuarios = [...new Set(logs.map(log => log.usuario))];

  // Handlers
  const handleFiltroChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
    setPage(1);
  };

  const limparFiltros = () => {
    setFiltros({
      usuario: '',
      acao: '',
      modulo: '',
      nivel: '',
      data_inicio: '',
      data_fim: ''
    });
    setPage(1);
  };

  // Filtrar logs
  const logsFiltrados = logs.filter(log => {
    return (
      (!filtros.usuario || log.usuario.toLowerCase().includes(filtros.usuario.toLowerCase())) &&
      (!filtros.acao || log.acao === filtros.acao) &&
      (!filtros.modulo || log.modulo === filtros.modulo) &&
      (!filtros.nivel || log.nivel === filtros.nivel) &&
      (!filtros.data_inicio || log.data_hora >= filtros.data_inicio) &&
      (!filtros.data_fim || log.data_hora <= filtros.data_fim)
    );
  });

  // Paginação
  const totalPages = Math.ceil(logsFiltrados.length / itemsPerPage);
  const logsExibidos = logsFiltrados.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getAcaoIcon = (acao) => {
    switch (acao) {
      case 'Login': return <LoginIcon fontSize="small" />;
      case 'Logout': return <LogoutIcon fontSize="small" />;
      case 'Criação': return <AddIcon fontSize="small" />;
      case 'Edição': return <EditIcon fontSize="small" />;
      case 'Exclusão': return <DeleteIcon fontSize="small" />;
      case 'Visualização': return <ViewIcon fontSize="small" />;
      case 'Erro': return <DeleteIcon fontSize="small" />;
      default: return <HistoryIcon fontSize="small" />;
    }
  };

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'info': return 'primary';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const formatarDataHora = (dataHora) => {
    const date = new Date(dataHora);
    return date.toLocaleString('pt-BR');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <HistoryIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            LOG do Sistema
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Exportar LOG
        </Button>
      </Box>

      {/* Estatísticas */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              {logs.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Registros
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="success.main" sx={{ fontWeight: 600 }}>
              {logs.filter(l => l.nivel === 'info').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Informações
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="warning.main" sx={{ fontWeight: 600 }}>
              {logs.filter(l => l.nivel === 'warning').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avisos
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="error.main" sx={{ fontWeight: 600 }}>
              {logs.filter(l => l.nivel === 'error').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Erros
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Filtros */}
      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <FilterIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filtros
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Usuário</InputLabel>
                <Select
                  name="usuario"
                  value={filtros.usuario}
                  onChange={handleFiltroChange}
                  label="Usuário"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {usuarios.map((usuario) => (
                    <MenuItem key={usuario} value={usuario}>
                      {usuario}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Ação</InputLabel>
                <Select
                  name="acao"
                  value={filtros.acao}
                  onChange={handleFiltroChange}
                  label="Ação"
                >
                  <MenuItem value="">Todas</MenuItem>
                  {acoes.map((acao) => (
                    <MenuItem key={acao} value={acao}>
                      {acao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Módulo</InputLabel>
                <Select
                  name="modulo"
                  value={filtros.modulo}
                  onChange={handleFiltroChange}
                  label="Módulo"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {modulos.map((modulo) => (
                    <MenuItem key={modulo} value={modulo}>
                      {modulo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Nível</InputLabel>
                <Select
                  name="nivel"
                  value={filtros.nivel}
                  onChange={handleFiltroChange}
                  label="Nível"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {niveis.map((nivel) => (
                    <MenuItem key={nivel} value={nivel}>
                      {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                size="small"
                name="data_inicio"
                label="Data Início"
                type="datetime-local"
                value={filtros.data_inicio}
                onChange={handleFiltroChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <TextField
                fullWidth
                size="small"
                name="data_fim"
                label="Data Fim"
                type="datetime-local"
                value={filtros.data_fim}
                onChange={handleFiltroChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={limparFiltros}
              sx={{ textTransform: 'none' }}
            >
              Limpar Filtros
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Data/Hora</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Usuário</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Ação</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Módulo</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Descrição</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>IP</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Nível</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logsExibidos.map((log) => (
                  <TableRow 
                    key={log.id}
                    sx={{ 
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {formatarDataHora(log.data_hora)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {log.usuario}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getAcaoIcon(log.acao)}
                        <Typography variant="body2">
                          {log.acao}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={log.modulo} 
                        size="small" 
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {log.descricao}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {log.ip}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={log.nivel.toUpperCase()} 
                        size="small" 
                        color={getNivelColor(log.nivel)}
                        variant="filled"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {logsExibidos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Nenhum registro encontrado
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Paginação */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default LogSistema;