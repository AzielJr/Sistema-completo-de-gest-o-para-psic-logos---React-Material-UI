import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  Fab,
  InputAdornment
} from '@mui/material';
import {
  Assignment,
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  Person,
  DateRange,
  ThumbUp,
  ThumbDown,
  Visibility,
  Clear
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const Experiencias = () => {
  const theme = useTheme();
  const [experiencias, setExperiencias] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [editingExperiencia, setEditingExperiencia] = useState(null);
  const [viewingExperiencia, setViewingExperiencia] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Estados para filtros
  const [filtros, setFiltros] = useState({
    cliente_id: '',
    data_inicio: '',
    data_fim: '',
    busca: ''
  });

  // Estado do formulário
  const [formData, setFormData] = useState({
    cliente_id: '',
    positiva: '',
    negativa: ''
  });



  useEffect(() => {
    // Carregar dados mockados
    const experienciasMockData = [
      {
        id: 1,
        cliente_id: 1,
        cliente_nome: 'Ana Silva',
        criado_em: '2024-01-15 10:30:00',
        positiva: 'Paciente demonstrou grande evolução na autoestima e conseguiu expressar melhor seus sentimentos durante a sessão.',
        negativa: 'Ainda apresenta resistência para falar sobre traumas do passado.'
      },
      {
        id: 2,
        cliente_id: 2,
        cliente_nome: 'Carlos Santos',
        criado_em: '2024-01-10 14:00:00',
        positiva: 'Excelente progresso no controle da ansiedade. Técnicas de respiração estão funcionando muito bem.',
        negativa: 'Dificuldade em manter a regularidade dos exercícios em casa.'
      },
      {
        id: 3,
        cliente_id: 3,
        cliente_nome: 'Maria Oliveira',
        criado_em: '2024-01-08 16:15:00',
        positiva: 'Conseguiu identificar padrões de pensamento negativos e aplicar técnicas de reestruturação cognitiva.',
        negativa: 'Ainda tem episódios de recaída em momentos de maior estresse.'
      },
      {
        id: 4,
        cliente_id: 1,
        cliente_nome: 'Ana Silva',
        criado_em: '2024-01-05 09:45:00',
        positiva: 'Primeira sessão muito produtiva. Paciente se mostrou aberta e colaborativa.',
        negativa: 'Sinais evidentes de depressão que precisam ser trabalhados com cuidado.'
      }
    ];

    const clientesMockData = [
      { id: 1, nome: 'Ana Silva' },
      { id: 2, nome: 'Carlos Santos' },
      { id: 3, nome: 'Maria Oliveira' },
      { id: 4, nome: 'João Pereira' },
      { id: 5, nome: 'Lucia Costa' }
    ];

    setExperiencias(experienciasMockData);
    setClientes(clientesMockData);
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const limparFiltros = () => {
    setFiltros({
      cliente_id: '',
      data_inicio: '',
      data_fim: '',
      busca: ''
    });
  };

  const experienciasFiltradas = experiencias.filter(exp => {
    // Filtro por cliente
    if (filtros.cliente_id && exp.cliente_id !== parseInt(filtros.cliente_id)) {
      return false;
    }

    // Filtro por período
    if (filtros.data_inicio) {
      const dataExp = new Date(exp.criado_em);
      const dataInicio = new Date(filtros.data_inicio);
      if (dataExp < dataInicio) return false;
    }

    if (filtros.data_fim) {
      const dataExp = new Date(exp.criado_em);
      const dataFim = new Date(filtros.data_fim);
      dataFim.setHours(23, 59, 59); // Incluir o dia todo
      if (dataExp > dataFim) return false;
    }

    // Filtro por busca textual
    if (filtros.busca) {
      const busca = filtros.busca.toLowerCase();
      return (
        exp.cliente_nome.toLowerCase().includes(busca) ||
        exp.positiva.toLowerCase().includes(busca) ||
        exp.negativa.toLowerCase().includes(busca)
      );
    }

    return true;
  });

  const abrirDialog = (experiencia = null) => {
    if (experiencia) {
      setEditingExperiencia(experiencia);
      setFormData({
        cliente_id: experiencia.cliente_id,
        positiva: experiencia.positiva,
        negativa: experiencia.negativa
      });
    } else {
      setEditingExperiencia(null);
      setFormData({
        cliente_id: '',
        positiva: '',
        negativa: ''
      });
    }
    setOpenDialog(true);
  };

  const fecharDialog = () => {
    setOpenDialog(false);
    setEditingExperiencia(null);
    setFormData({
      cliente_id: '',
      positiva: '',
      negativa: ''
    });
  };

  const abrirVisualizacao = (experiencia) => {
    setViewingExperiencia(experiencia);
    setOpenViewDialog(true);
  };

  const fecharVisualizacao = () => {
    setOpenViewDialog(false);
    setViewingExperiencia(null);
  };

  const salvarExperiencia = () => {
    setLoading(true);
    setError('');

    try {
      const clienteSelecionado = clientes.find(c => c.id === parseInt(formData.cliente_id));
      
      if (editingExperiencia) {
        // Editar
        const experienciasAtualizadas = experiencias.map(exp =>
          exp.id === editingExperiencia.id
            ? {
                ...exp,
                cliente_id: parseInt(formData.cliente_id),
                cliente_nome: clienteSelecionado.nome,
                positiva: formData.positiva,
                negativa: formData.negativa
              }
            : exp
        );
        setExperiencias(experienciasAtualizadas);
        setSuccess('Experiência atualizada com sucesso!');
      } else {
        // Criar nova
        const novaExperiencia = {
          id: Math.max(...experiencias.map(e => e.id)) + 1,
          cliente_id: parseInt(formData.cliente_id),
          cliente_nome: clienteSelecionado.nome,
          criado_em: new Date().toISOString().slice(0, 19).replace('T', ' '),
          positiva: formData.positiva,
          negativa: formData.negativa
        };
        setExperiencias([novaExperiencia, ...experiencias]);
        setSuccess('Experiência criada com sucesso!');
      }

      fecharDialog();
    } catch (error) {
      setError('Erro ao salvar experiência: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const excluirExperiencia = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta experiência?')) {
      setExperiencias(experiencias.filter(exp => exp.id !== id));
      setSuccess('Experiência excluída com sucesso!');
    }
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const truncarTexto = (texto, limite = 100) => {
    return texto.length > limite ? texto.substring(0, limite) + '...' : texto;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Assignment sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Experiências
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Gerencie as experiências positivas e negativas dos atendimentos aos clientes.
        </Typography>
      </Box>

      {/* Alertas */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Filtros */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterList color="primary" />
            Filtros
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Cliente</InputLabel>
                <Select
                  name="cliente_id"
                  value={filtros.cliente_id}
                  onChange={handleFiltroChange}
                  label="Cliente"
                >
                  <MenuItem value="">Todos os clientes</MenuItem>
                  {clientes.map(cliente => (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField
                fullWidth
                size="small"
                label="Data Início"
                type="date"
                name="data_inicio"
                value={filtros.data_inicio}
                onChange={handleFiltroChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={2.5}>
              <TextField
                fullWidth
                size="small"
                label="Data Fim"
                type="date"
                name="data_fim"
                value={filtros.data_fim}
                onChange={handleFiltroChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Buscar"
                name="busca"
                value={filtros.busca}
                onChange={handleFiltroChange}
                placeholder="Cliente, experiência positiva ou negativa..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                fullWidth
                variant="outlined"
                onClick={limparFiltros}
                startIcon={<Clear />}
                size="small"
              >
                Limpar
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {experienciasFiltradas.length} experiência(s) encontrada(s)
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Tabela de Experiências */}
      <Card elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Lista de Experiências
            </Typography>
          </Box>

          <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Cliente</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Data/Hora</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Experiência Positiva</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Experiência Negativa</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {experienciasFiltradas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Nenhuma experiência encontrada
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  experienciasFiltradas.map((experiencia) => (
                    <TableRow key={experiencia.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person color="action" />
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {experiencia.cliente_nome}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <DateRange color="action" />
                          <Typography variant="body2">
                            {formatarData(experiencia.criado_em)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <ThumbUp color="success" sx={{ fontSize: 16, mt: 0.5 }} />
                          <Typography variant="body2" sx={{ color: 'success.main' }}>
                            {truncarTexto(experiencia.positiva)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <ThumbDown color="error" sx={{ fontSize: 16, mt: 0.5 }} />
                          <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {truncarTexto(experiencia.negativa)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Visualizar">
                            <IconButton
                              size="small"
                              onClick={() => abrirVisualizacao(experiencia)}
                              color="info"
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <IconButton
                              size="small"
                              onClick={() => abrirDialog(experiencia)}
                              color="primary"
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton
                              size="small"
                              onClick={() => excluirExperiencia(experiencia.id)}
                              color="error"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* FAB para adicionar */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => abrirDialog()}
      >
        <Add />
      </Fab>

      {/* Dialog de Formulário */}
      <Dialog open={openDialog} onClose={fecharDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingExperiencia ? 'Editar Experiência' : 'Nova Experiência'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Cliente *</InputLabel>
                <Select
                  name="cliente_id"
                  value={formData.cliente_id}
                  onChange={handleFormChange}
                  label="Cliente *"
                  required
                >
                  {clientes.map(cliente => (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Experiência Positiva"
                name="positiva"
                value={formData.positiva}
                onChange={handleFormChange}
                placeholder="Descreva os aspectos positivos observados durante o atendimento..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Experiência Negativa"
                name="negativa"
                value={formData.negativa}
                onChange={handleFormChange}
                placeholder="Descreva os aspectos que precisam ser trabalhados ou melhorados..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharDialog}>Cancelar</Button>
          <Button
            onClick={salvarExperiencia}
            variant="contained"
            disabled={loading || !formData.cliente_id}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Visualização */}
      <Dialog open={openViewDialog} onClose={fecharVisualizacao} maxWidth="md" fullWidth>
        <DialogTitle>
          Visualizar Experiência
        </DialogTitle>
        <DialogContent>
          {viewingExperiencia && (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Person color="primary" />
                  <Typography variant="h6">{viewingExperiencia.cliente_nome}</Typography>
                  <Chip 
                    label={formatarData(viewingExperiencia.criado_em)} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'success.main', mb: 1 }}>
                  <ThumbUp sx={{ fontSize: 16, mr: 1 }} />
                  Experiência Positiva:
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'success.50' }}>
                  <Typography variant="body2">
                    {viewingExperiencia.positiva || 'Nenhuma experiência positiva registrada.'}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'error.main', mb: 1 }}>
                  <ThumbDown sx={{ fontSize: 16, mr: 1 }} />
                  Experiência Negativa:
                </Typography>
                <Paper sx={{ p: 2, bgcolor: 'error.50' }}>
                  <Typography variant="body2">
                    {viewingExperiencia.negativa || 'Nenhuma experiência negativa registrada.'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharVisualizacao}>Fechar</Button>
          <Button
            onClick={() => {
              fecharVisualizacao();
              abrirDialog(viewingExperiencia);
            }}
            variant="contained"
            startIcon={<Edit />}
          >
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Experiencias;