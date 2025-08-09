import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Alert,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar,
  Divider
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Person,
  AccessTime,
  Phone,
  Email,
  Close,
  CalendarToday,
  Schedule,
  CheckCircle,
  Cancel as CancelIcon,
  Warning
} from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useAuth } from '../../contexts/AuthContext';

dayjs.locale('pt-br');

const Agendamento = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useAuth();
  
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dados do formulário
  const [formData, setFormData] = useState({
    cliente_id: '',
    data: '',
    hora: '',
    duracao: 50,
    tipo: 'consulta',
    status: 'agendado',
    observacoes: '',
    valor: '',
    confirmado: false
  });

  // Mock data - em produção viria da API
  const [clientes] = useState([
    { id: 1, nome: 'Maria Silva Santos', telefone: '(81) 99999-1111', email: 'maria@email.com' },
    { id: 2, nome: 'João Pedro Oliveira', telefone: '(81) 99999-2222', email: 'joao@email.com' },
    { id: 3, nome: 'Ana Carolina Lima', telefone: '(81) 99999-3333', email: 'ana@email.com' },
    { id: 4, nome: 'Carlos Eduardo Santos', telefone: '(81) 99999-4444', email: 'carlos@email.com' },
  ]);

  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      cliente_id: 1,
      cliente_nome: 'Maria Silva Santos',
      data: dayjs().format('YYYY-MM-DD'),
      hora: '09:00',
      duracao: 50,
      tipo: 'consulta',
      status: 'agendado',
      valor: '150.00',
      confirmado: true,
      observacoes: 'Primeira consulta'
    },
    {
      id: 2,
      cliente_id: 2,
      cliente_nome: 'João Pedro Oliveira',
      data: dayjs().format('YYYY-MM-DD'),
      hora: '10:00',
      duracao: 50,
      tipo: 'retorno',
      status: 'confirmado',
      valor: '120.00',
      confirmado: true,
      observacoes: ''
    },
    {
      id: 3,
      cliente_id: 3,
      cliente_nome: 'Ana Carolina Lima',
      data: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      hora: '14:00',
      duracao: 50,
      tipo: 'consulta',
      status: 'agendado',
      valor: '150.00',
      confirmado: false,
      observacoes: 'Avaliação inicial'
    }
  ]);

  const tiposConsulta = [
    { value: 'consulta', label: 'Consulta' },
    { value: 'retorno', label: 'Retorno' },
    { value: 'avaliacao', label: 'Avaliação' },
    { value: 'terapia_casal', label: 'Terapia de Casal' },
    { value: 'terapia_familia', label: 'Terapia Familiar' }
  ];

  const statusOptions = [
    { value: 'agendado', label: 'Agendado', color: 'primary' },
    { value: 'confirmado', label: 'Confirmado', color: 'success' },
    { value: 'realizado', label: 'Realizado', color: 'info' },
    { value: 'cancelado', label: 'Cancelado', color: 'error' },
    { value: 'faltou', label: 'Faltou', color: 'warning' }
  ];

  const horariosDisponiveis = [
    '08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  useEffect(() => {
    if (openDialog && editingAppointment) {
      setFormData({
        cliente_id: editingAppointment.cliente_id,
        data: editingAppointment.data,
        hora: editingAppointment.hora,
        duracao: editingAppointment.duracao,
        tipo: editingAppointment.tipo,
        status: editingAppointment.status,
        observacoes: editingAppointment.observacoes || '',
        valor: editingAppointment.valor || '',
        confirmado: editingAppointment.confirmado
      });
    } else if (openDialog) {
      setFormData({
        cliente_id: '',
        data: selectedDate.format('YYYY-MM-DD'),
        hora: '',
        duracao: 50,
        tipo: 'consulta',
        status: 'agendado',
        observacoes: '',
        valor: '',
        confirmado: false
      });
    }
  }, [openDialog, editingAppointment, selectedDate]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleOpenDialog = (appointment = null) => {
    setEditingAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAppointment(null);
    setFormData({
      cliente_id: '',
      data: '',
      hora: '',
      duracao: 50,
      tipo: 'consulta',
      status: 'agendado',
      observacoes: '',
      valor: '',
      confirmado: false
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const cliente = clientes.find(c => c.id === formData.cliente_id);
      
      if (editingAppointment) {
        // Atualizar agendamento
        setAgendamentos(prev => prev.map(ag => 
          ag.id === editingAppointment.id 
            ? { 
                ...ag, 
                ...formData, 
                cliente_nome: cliente?.nome,
                id_usuario: user.id 
              }
            : ag
        ));
      } else {
        // Criar novo agendamento
        const newAppointment = {
          id: Date.now(),
          ...formData,
          cliente_nome: cliente?.nome,
          id_usuario: user.id
        };
        setAgendamentos(prev => [...prev, newAppointment]);
      }
      
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (appointmentId) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      setAgendamentos(prev => prev.filter(ag => ag.id !== appointmentId));
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAgendamentos(prev => prev.map(ag => 
      ag.id === appointmentId 
        ? { ...ag, status: newStatus }
        : ag
    ));
  };

  const getAgendamentosData = (date) => {
    return agendamentos.filter(ag => ag.data === date.format('YYYY-MM-DD'));
  };

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : 'default';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmado':
        return <CheckCircle fontSize="small" />;
      case 'cancelado':
        return <CancelIcon fontSize="small" />;
      case 'faltou':
        return <Warning fontSize="small" />;
      default:
        return <Schedule fontSize="small" />;
    }
  };

  const agendamentosHoje = getAgendamentosData(selectedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Agendamento
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie os agendamentos e consultas dos seus clientes
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Calendário */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">
                    Calendário
                  </Typography>
                </Box>
                
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  sx={{
                    width: '100%',
                    '& .MuiPickersDay-root': {
                      fontSize: '0.875rem',
                    },
                    '& .MuiPickersDay-today': {
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    },
                  }}
                />
                
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => handleOpenDialog()}
                  sx={{
                    mt: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  }}
                >
                  Novo Agendamento
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Lista de Agendamentos do Dia */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6">
                      Agendamentos - {selectedDate.format('DD/MM/YYYY')}
                    </Typography>
                  </Box>
                  <Chip 
                    label={`${agendamentosHoje.length} agendamento(s)`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                {agendamentosHoje.length === 0 ? (
                  <Alert severity="info" sx={{ textAlign: 'center' }}>
                    Nenhum agendamento para esta data.
                  </Alert>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {agendamentosHoje
                      .sort((a, b) => a.hora.localeCompare(b.hora))
                      .map((agendamento) => (
                        <Paper
                          key={agendamento.id}
                          sx={{
                            p: 2,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 2,
                            '&:hover': {
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                                  <Person fontSize="small" />
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {agendamento.cliente_nome}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {tiposConsulta.find(t => t.value === agendamento.tipo)?.label}
                                  </Typography>
                                </Box>
                              </Box>
                            </Grid>
                            
                            <Grid item xs={12} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <AccessTime fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body2">
                                  {agendamento.hora} ({agendamento.duracao}min)
                                </Typography>
                              </Box>
                              {agendamento.valor && (
                                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                                  R$ {agendamento.valor}
                                </Typography>
                              )}
                            </Grid>
                            
                            <Grid item xs={12} sm={3}>
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Chip
                                  icon={getStatusIcon(agendamento.status)}
                                  label={statusOptions.find(s => s.value === agendamento.status)?.label}
                                  color={getStatusColor(agendamento.status)}
                                  size="small"
                                />
                                
                                <Box>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleOpenDialog(agendamento)}
                                    sx={{ mr: 1 }}
                                  >
                                    <Edit fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleDelete(agendamento.id)}
                                    color="error"
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                          
                          {agendamento.observacoes && (
                            <>
                              <Divider sx={{ my: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                <strong>Observações:</strong> {agendamento.observacoes}
                              </Typography>
                            </>
                          )}
                        </Paper>
                      ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Dialog para Novo/Editar Agendamento */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          fullScreen={isMobile}
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">
              {editingAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </DialogTitle>
          
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Cliente</InputLabel>
                  <Select
                    value={formData.cliente_id}
                    onChange={(e) => handleChange('cliente_id', e.target.value)}
                    label="Cliente"
                  >
                    {clientes.map(cliente => (
                      <MenuItem key={cliente.id} value={cliente.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'primary.main' }}>
                            <Person fontSize="small" />
                          </Avatar>
                          <Box>
                            <Typography variant="body2">{cliente.nome}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {cliente.telefone}
                            </Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleChange('data', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Horário</InputLabel>
                  <Select
                    value={formData.hora}
                    onChange={(e) => handleChange('hora', e.target.value)}
                    label="Horário"
                  >
                    {horariosDisponiveis.map(hora => (
                      <MenuItem key={hora} value={hora}>
                        {hora}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Duração (minutos)"
                  type="number"
                  value={formData.duracao}
                  onChange={(e) => handleChange('duracao', e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Tipo de Consulta</InputLabel>
                  <Select
                    value={formData.tipo}
                    onChange={(e) => handleChange('tipo', e.target.value)}
                    label="Tipo de Consulta"
                  >
                    {tiposConsulta.map(tipo => (
                      <MenuItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    label="Status"
                  >
                    {statusOptions.map(status => (
                      <MenuItem key={status.value} value={status.value}>
                        <Chip
                          icon={getStatusIcon(status.value)}
                          label={status.label}
                          color={status.color}
                          size="small"
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Valor"
                  type="number"
                  value={formData.valor}
                  onChange={(e) => handleChange('valor', e.target.value)}
                  InputProps={{
                    startAdornment: 'R$ ',
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Observações"
                  multiline
                  rows={3}
                  value={formData.observacoes}
                  onChange={(e) => handleChange('observacoes', e.target.value)}
                  placeholder="Observações sobre o agendamento..."
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseDialog} disabled={loading}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !formData.cliente_id || !formData.data || !formData.hora}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              }}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Agendamento;