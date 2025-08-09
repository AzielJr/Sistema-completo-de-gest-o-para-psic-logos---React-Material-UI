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
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const TiposCliente = () => {
  const theme = useTheme();
  
  // Estados
  const [tipos, setTipos] = useState([
    { id: 1, ds_tipo_cliente: 'Particular' },
    { id: 2, ds_tipo_cliente: 'Convênio' },
    { id: 3, ds_tipo_cliente: 'Empresa' }
  ]);
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    ds_tipo_cliente: ''
  });
  const [error, setError] = useState('');

  // Handlers
  const handleOpen = (tipo = null) => {
    if (tipo) {
      setEditingId(tipo.id);
      setFormData({ ds_tipo_cliente: tipo.ds_tipo_cliente });
    } else {
      setEditingId(null);
      setFormData({ ds_tipo_cliente: '' });
    }
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({ ds_tipo_cliente: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.ds_tipo_cliente.trim()) {
      setError('Por favor, preencha o tipo de cliente');
      return;
    }

    if (editingId) {
      // Editar
      setTipos(tipos.map(tipo => 
        tipo.id === editingId 
          ? { ...tipo, ds_tipo_cliente: formData.ds_tipo_cliente.trim() }
          : tipo
      ));
    } else {
      // Adicionar
      const newId = Math.max(...tipos.map(t => t.id), 0) + 1;
      setTipos([...tipos, {
        id: newId,
        ds_tipo_cliente: formData.ds_tipo_cliente.trim()
      }]);
    }
    
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este tipo de cliente?')) {
      setTipos(tipos.filter(tipo => tipo.id !== id));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CategoryIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Tipos de Cliente
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
          Novo Tipo
        </Button>
      </Box>

      {/* Estatísticas */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              {tipos.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Tipos
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
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Tipo de Cliente</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.95rem', width: 120 }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tipos.map((tipo) => (
                  <TableRow 
                    key={tipo.id}
                    sx={{ 
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Chip 
                        label={tipo.id} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {tipo.ds_tipo_cliente}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(tipo)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': { backgroundColor: `${theme.palette.primary.main}15` }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(tipo.id)}
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
                {tipos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Nenhum tipo de cliente cadastrado
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
            {editingId ? 'Editar Tipo de Cliente' : 'Novo Tipo de Cliente'}
          </Typography>
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
                {error}
              </Alert>
            )}
            
            <TextField
              fullWidth
              name="ds_tipo_cliente"
              label="Tipo de Cliente"
              value={formData.ds_tipo_cliente}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              placeholder="Ex: Particular, Convênio, Empresa..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
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

export default TiposCliente;