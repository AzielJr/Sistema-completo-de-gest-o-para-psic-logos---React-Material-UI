import React, { useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MonetizationOn as MonetizationOnIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';

const Despesas = () => {
  const theme = useTheme();
  
  // Estados
  const [despesas, setDespesas] = useState([
    { 
      id: 1, 
      data: '2024-01-15', 
      descricao: 'Material de escritório',
      valor: 150.50,
      tipo_despesa_id: 1,
      created_at: '2024-01-15 10:30:00'
    },
    { 
      id: 2, 
      data: '2024-01-20', 
      descricao: 'Aluguel do consultório',
      valor: 1200.00,
      tipo_despesa_id: 2,
      created_at: '2024-01-20 14:15:00'
    }
  ]);
  
  const [tiposDespesa] = useState([
    { id: 1, ds_tipo: 'Material' },
    { id: 2, ds_tipo: 'Aluguel' },
    { id: 3, ds_tipo: 'Equipamentos' },
    { id: 4, ds_tipo: 'Serviços' }
  ]);
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    data: '',
    descricao: '',
    valor: '',
    tipo_despesa_id: ''
  });
  const [error, setError] = useState('');

  // Handlers
  const handleOpen = (despesa = null) => {
    if (despesa) {
      setEditingId(despesa.id);
      setFormData({
        data: despesa.data,
        descricao: despesa.descricao,
        valor: despesa.valor.toString(),
        tipo_despesa_id: despesa.tipo_despesa_id
      });
    } else {
      setEditingId(null);
      setFormData({
        data: new Date().toISOString().split('T')[0],
        descricao: '',
        valor: '',
        tipo_despesa_id: ''
      });
    }
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      data: '',
      descricao: '',
      valor: '',
      tipo_despesa_id: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Formatação especial para o campo valor
    if (e.target.name === 'valor') {
      // Remove caracteres não numéricos exceto vírgula e ponto
      value = value.replace(/[^\d.,]/g, '');
      // Substitui vírgula por ponto para cálculos
      value = value.replace(',', '.');
    }
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.data || !formData.descricao || !formData.valor || !formData.tipo_despesa_id) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const valorNumerico = parseFloat(formData.valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setError('Por favor, insira um valor válido');
      return;
    }

    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

    if (editingId) {
      // Editar
      setDespesas(despesas.map(despesa => 
        despesa.id === editingId 
          ? { 
              ...despesa, 
              data: formData.data,
              descricao: formData.descricao.trim(),
              valor: valorNumerico,
              tipo_despesa_id: parseInt(formData.tipo_despesa_id)
            }
          : despesa
      ));
    } else {
      // Adicionar
      const newId = Math.max(...despesas.map(d => d.id), 0) + 1;
      setDespesas([...despesas, {
        id: newId,
        data: formData.data,
        descricao: formData.descricao.trim(),
        valor: valorNumerico,
        tipo_despesa_id: parseInt(formData.tipo_despesa_id),
        created_at: now
      }]);
    }
    
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
      setDespesas(despesas.filter(despesa => despesa.id !== id));
    }
  };

  const getTipoDespesaNome = (tipoId) => {
    const tipo = tiposDespesa.find(t => t.id === tipoId);
    return tipo ? tipo.ds_tipo : 'Tipo não encontrado';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTotalDespesas = () => {
    return despesas.reduce((total, despesa) => total + despesa.valor, 0);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <MonetizationOnIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Despesas
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
          Nova Despesa
        </Button>
      </Box>

      {/* Estatísticas */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              {despesas.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Despesas
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="error" sx={{ fontWeight: 600 }}>
              {formatCurrency(getTotalDespesas())}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Valor Total
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
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Data</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Descrição</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Tipo</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Valor</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.95rem', width: 120 }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {despesas.map((despesa) => (
                  <TableRow 
                    key={despesa.id}
                    sx={{ 
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Chip 
                        label={despesa.id} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(despesa.data)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {despesa.descricao}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getTipoDespesaNome(despesa.tipo_despesa_id)} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.error.main
                        }}
                      >
                        {formatCurrency(despesa.valor)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(despesa)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': { backgroundColor: `${theme.palette.primary.main}15` }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(despesa.id)}
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
                {despesas.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Nenhuma despesa cadastrada
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
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingId ? 'Editar Despesa' : 'Nova Despesa'}
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
              <TextField
                name="data"
                label="Data *"
                type="date"
                value={formData.data}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': { borderRadius: 2 }
                }}
              />
              
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Tipo de Despesa *</InputLabel>
                <Select
                  name="tipo_despesa_id"
                  value={formData.tipo_despesa_id}
                  onChange={handleChange}
                  label="Tipo de Despesa *"
                  sx={{ borderRadius: 2 }}
                >
                  {tiposDespesa.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.ds_tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <TextField
              fullWidth
              name="descricao"
              label="Descrição *"
              value={formData.descricao}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              placeholder="Ex: Material de escritório, Aluguel..."
              sx={{
                '& .MuiOutlinedInput-root': { borderRadius: 2 }
              }}
            />
            
            <TextField
              fullWidth
              name="valor"
              label="Valor *"
              value={formData.valor}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              placeholder="0,00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
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

export default Despesas;