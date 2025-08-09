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
  Chip,
  Avatar,
  InputAdornment,
  Toolbar,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert
} from '@mui/material';
import {
  Search,
  Add,
  Edit,
  Delete,
  Phone,
  Email,
  Person,
  FilterList
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ClientesList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, cliente: null });

  // Dados mockados dos clientes
  const [clientes] = useState([
    {
      id: 1,
      nome: 'Maria Silva Santos',
      foto: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iMzUiIHI9IjE1IiBmaWxsPSIjOTc5Nzk3Ii8+CjxwYXRoIGQ9Ik0yNSA4NUMyNSA3MCAzNi4xOTI5IDU4IDUwIDU4QzYzLjgwNzEgNTggNzUgNzAgNzUgODVINzVIMjVaIiBmaWxsPSIjOTc5Nzk3Ii8+Cjwvc3ZnPgo=',
      email: 'maria.silva@email.com',
      celular: '(81) 99999-1111',
      idade: '35',
      genero: 'Feminino',
      estado_civil: 'Casada',
      tipo_cliente: 'Individual',
      valor_atendimento: 150.00,
      dia_atendimento: 'Segunda-feira',
      hora_atendimento: '09:00',
      ativo: true,
      ultima_consulta: '2024-01-15'
    },
    {
      id: 2,
      nome: 'João Carlos Oliveira',
      foto: '',
      email: 'joao.carlos@email.com',
      celular: '(81) 99999-2222',
      idade: '42',
      genero: 'Masculino',
      estado_civil: 'Divorciado',
      tipo_cliente: 'Individual',
      valor_atendimento: 150.00,
      dia_atendimento: 'Terça-feira',
      hora_atendimento: '14:00',
      ativo: true,
      ultima_consulta: '2024-01-14'
    },
    {
      id: 3,
      nome: 'Ana Paula Costa',
      foto: '',
      email: 'ana.paula@email.com',
      celular: '(81) 99999-3333',
      idade: '28',
      genero: 'Feminino',
      estado_civil: 'Solteira',
      tipo_cliente: 'Individual',
      valor_atendimento: 150.00,
      dia_atendimento: 'Quarta-feira',
      hora_atendimento: '10:30',
      ativo: false,
      ultima_consulta: '2024-01-10'
    },
    {
      id: 4,
      nome: 'Roberto e Fernanda Lima',
      foto: '',
      email: 'casal.lima@email.com',
      celular: '(81) 99999-4444',
      idade: '30/32',
      genero: 'Casal',
      estado_civil: 'Casados',
      tipo_cliente: 'Casal',
      valor_atendimento: 200.00,
      dia_atendimento: 'Quinta-feira',
      hora_atendimento: '16:00',
      ativo: true,
      ultima_consulta: '2024-01-13'
    }
  ]);

  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.celular.includes(searchTerm)
  );

  const handleEdit = (clienteId) => {
    navigate(`/clientes/editar/${clienteId}`);
  };

  const handleDelete = (cliente) => {
    setDeleteDialog({ open: true, cliente });
  };

  const confirmDelete = () => {
    // Aqui você implementaria a lógica de exclusão
    console.log('Deletando cliente:', deleteDialog.cliente);
    setDeleteDialog({ open: false, cliente: null });
  };

  const getStatusColor = (ativo) => {
    return ativo ? 'success' : 'error';
  };

  const getStatusText = (ativo) => {
    return ativo ? 'Ativo' : 'Inativo';
  };

  const getInitials = (nome) => {
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Clientes
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie os clientes do seu consultório
        </Typography>
      </Box>

      {/* Toolbar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Toolbar sx={{ px: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <TextField
                placeholder="Buscar por nome, email ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ minWidth: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ minWidth: 120 }}
              >
                Filtros
              </Button>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate('/clientes/novo')}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              Novo Cliente
            </Button>
          </Toolbar>
        </CardContent>
      </Card>

      {/* Tabela de Clientes */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'background.default' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Cliente</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Contato</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Informações</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Atendimento</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Última Consulta</TableCell>
                  <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow 
                    key={cliente.id}
                    sx={{ 
                      '&:hover': { bgcolor: 'action.hover' },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={cliente.foto}
                          sx={{
                            bgcolor: theme.palette.primary.main,
                            width: 40,
                            height: 40,
                          }}
                        >
                          {!cliente.foto && getInitials(cliente.nome)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {cliente.nome}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {cliente.idade} anos • {cliente.genero}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{cliente.celular}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {cliente.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          <strong>Estado Civil:</strong> {cliente.estado_civil}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Tipo:</strong> {cliente.tipo_cliente}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          {cliente.dia_atendimento} às {cliente.hora_atendimento}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          R$ {cliente.valor_atendimento.toFixed(2)}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        label={getStatusText(cliente.ativo)}
                        color={getStatusColor(cliente.ativo)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(cliente.ultima_consulta).toLocaleDateString('pt-BR')}
                      </Typography>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(cliente.id)}
                          sx={{ color: theme.palette.primary.main }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(cliente)}
                          sx={{ color: theme.palette.error.main }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredClientes.length === 0 && (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Person sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Nenhum cliente encontrado
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm ? 'Tente ajustar os filtros de busca' : 'Comece adicionando seu primeiro cliente'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Confirmação de Exclusão */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, cliente: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Esta ação não pode ser desfeita!
          </Alert>
          <Typography>
            Tem certeza que deseja excluir o cliente <strong>{deleteDialog.cliente?.nome}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Todos os dados relacionados a este cliente serão permanentemente removidos.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, cliente: null })}>
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientesList;