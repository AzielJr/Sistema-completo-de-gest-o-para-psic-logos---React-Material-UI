import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
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
  Alert,
  Chip,
  useTheme,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendingUpIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const Evolucao = () => {
  const theme = useTheme();
  
  // Estados
  const [evolucoes, setEvolucoes] = useState([
    { 
      id: 1, 
      cliente_id: 1, 
      data: '2024-01-15', 
      procedimento: 'Consulta inicial de avaliação psicológica',
      sintese: 'Paciente apresenta sintomas de ansiedade generalizada',
      conduta: 'Iniciar terapia cognitivo-comportamental',
      obs: 'Paciente colaborativo e motivado para o tratamento'
    }
  ]);
  
  const [clientes] = useState([
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Santos' },
    { id: 3, nome: 'Pedro Oliveira' }
  ]);
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    cliente_id: '',
    data: '',
    procedimento: '',
    sintese: '',
    conduta: '',
    obs: ''
  });
  const [error, setError] = useState('');
  
  // Estados para reconhecimento de voz
  const [isRecording, setIsRecording] = useState({
    procedimento: false,
    sintese: false,
    conduta: false
  });
  const [recognition, setRecognition] = useState(null);
  const [currentField, setCurrentField] = useState(null);

  // Inicializar reconhecimento de voz
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'pt-BR';
      
      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript && currentField) {
          setFormData(prev => ({
            ...prev,
            [currentField]: prev[currentField] + finalTranscript
          }));
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Erro no reconhecimento de voz:', event.error);
        setIsRecording({ procedimento: false, sintese: false, conduta: false });
        setCurrentField(null);
      };
      
      recognitionInstance.onend = () => {
        setIsRecording({ procedimento: false, sintese: false, conduta: false });
        setCurrentField(null);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [currentField]);

  // Handlers
  const handleOpen = (evolucao = null) => {
    if (evolucao) {
      setEditingId(evolucao.id);
      setFormData({
        cliente_id: evolucao.cliente_id,
        data: evolucao.data,
        procedimento: evolucao.procedimento,
        sintese: evolucao.sintese,
        conduta: evolucao.conduta,
        obs: evolucao.obs || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        cliente_id: '',
        data: new Date().toISOString().split('T')[0],
        procedimento: '',
        sintese: '',
        conduta: '',
        obs: ''
      });
    }
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      cliente_id: '',
      data: '',
      procedimento: '',
      sintese: '',
      conduta: '',
      obs: ''
    });
    setError('');
    // Parar gravação se estiver ativa
    if (recognition && currentField) {
      recognition.stop();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleVoiceToggle = (fieldName) => {
    if (!recognition) {
      alert('Reconhecimento de voz não suportado neste navegador');
      return;
    }

    if (isRecording[fieldName]) {
      // Parar gravação
      recognition.stop();
      setIsRecording(prev => ({ ...prev, [fieldName]: false }));
      setCurrentField(null);
    } else {
      // Iniciar gravação
      setCurrentField(fieldName);
      setIsRecording(prev => ({ ...prev, [fieldName]: true }));
      recognition.start();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.cliente_id || !formData.data || !formData.procedimento || !formData.sintese || !formData.conduta) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (editingId) {
      // Editar
      setEvolucoes(evolucoes.map(evolucao => 
        evolucao.id === editingId 
          ? { ...evolucao, ...formData }
          : evolucao
      ));
    } else {
      // Adicionar
      const newId = Math.max(...evolucoes.map(e => e.id), 0) + 1;
      setEvolucoes([...evolucoes, {
        id: newId,
        ...formData
      }]);
    }
    
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta evolução?')) {
      setEvolucoes(evolucoes.filter(evolucao => evolucao.id !== id));
    }
  };

  const getClienteNome = (clienteId) => {
    const cliente = clientes.find(c => c.id === clienteId);
    return cliente ? cliente.nome : 'Cliente não encontrado';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TrendingUpIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Evolução
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3
          }}
        >
          Nova Evolução
        </Button>
      </Box>

      {/* Estatísticas */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              {evolucoes.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Evoluções
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tabela */}
      <Card sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Cliente</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Data</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Procedimento</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.95rem', width: 120 }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {evolucoes.map((evolucao) => (
                  <TableRow 
                    key={evolucao.id}
                    sx={{ 
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Chip 
                        label={evolucao.id} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon fontSize="small" color="action" />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {getClienteNome(evolucao.cliente_id)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(evolucao.data)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {evolucao.procedimento}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(evolucao)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': { backgroundColor: `${theme.palette.primary.main}15` }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(evolucao.id)}
                          sx={{ 
                            color: theme.palette.error.main,
                            '&:hover': { backgroundColor: `${theme.palette.error.main}15` }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
                {evolucoes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Nenhuma evolução cadastrada
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Dialog de Formulário */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingId ? 'Editar Evolução' : 'Nova Evolução'}
          </Typography>
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Cliente *</InputLabel>
                <Select
                  name="cliente_id"
                  value={formData.cliente_id}
                  onChange={handleChange}
                  label="Cliente *"
                  sx={{ borderRadius: 2 }}
                >
                  {clientes.map((cliente) => (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                name="data"
                label="Data *"
                type="date"
                value={formData.data}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 }
                }}
              />
            </Box>
            
            <TextField
              fullWidth
              name="procedimento"
              label="Procedimento *"
              value={formData.procedimento}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={isRecording.procedimento ? "Parar gravação" : "Iniciar gravação de voz"}>
                      <IconButton
                        onClick={() => handleVoiceToggle('procedimento')}
                        sx={{ 
                          color: isRecording.procedimento ? theme.palette.error.main : theme.palette.primary.main,
                          '&:hover': { 
                            backgroundColor: isRecording.procedimento 
                              ? `${theme.palette.error.main}15` 
                              : `${theme.palette.primary.main}15` 
                          }
                        }}
                      >
                        {isRecording.procedimento ? <MicOffIcon /> : <MicIcon />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 2 }
              }}
            />
            
            <TextField
              fullWidth
              name="sintese"
              label="Síntese *"
              value={formData.sintese}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={isRecording.sintese ? "Parar gravação" : "Iniciar gravação de voz"}>
                      <IconButton
                        onClick={() => handleVoiceToggle('sintese')}
                        sx={{ 
                          color: isRecording.sintese ? theme.palette.error.main : theme.palette.primary.main,
                          '&:hover': { 
                            backgroundColor: isRecording.sintese 
                              ? `${theme.palette.error.main}15` 
                              : `${theme.palette.primary.main}15` 
                          }
                        }}
                      >
                        {isRecording.sintese ? <MicOffIcon /> : <MicIcon />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 2 }
              }}
            />
            
            <TextField
              fullWidth
              name="conduta"
              label="Conduta *"
              value={formData.conduta}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title={isRecording.conduta ? "Parar gravação" : "Iniciar gravação de voz"}>
                      <IconButton
                        onClick={() => handleVoiceToggle('conduta')}
                        sx={{ 
                          color: isRecording.conduta ? theme.palette.error.main : theme.palette.primary.main,
                          '&:hover': { 
                            backgroundColor: isRecording.conduta 
                              ? `${theme.palette.error.main}15` 
                              : `${theme.palette.primary.main}15` 
                          }
                        }}
                      >
                        {isRecording.conduta ? <MicOffIcon /> : <MicIcon />}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 2 }
              }}
            />
            
            <TextField
              fullWidth
              name="obs"
              label="Observações"
              value={formData.obs}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={2}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 2 }
              }}
            />
          </DialogContent>
          
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button 
              onClick={handleClose}
              sx={{ 
                textTransform: 'none',
                borderRadius: 2
              }}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              variant="contained"
              sx={{ 
                textTransform: 'none',
                borderRadius: 2,
                fontWeight: 600
              }}
            >
              {editingId ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Evolucao;