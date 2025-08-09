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
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';

const Usuarios = () => {
  const theme = useTheme();
  
  // Estados
  const [usuarios, setUsuarios] = useState([
    { 
      id: 1, 
      nm_usuario: 'Dr. João Silva', 
      email: 'joao@gestao-psi.com', 
      login: 'joao.silva',
      celular: '(11) 99999-9999',
      id_grupo: 1,
      foto: null
    },
    { 
      id: 2, 
      nm_usuario: 'Dra. Maria Santos', 
      email: 'maria@gestao-psi.com', 
      login: 'maria.santos',
      celular: '(11) 88888-8888',
      id_grupo: 2,
      foto: null
    }
  ]);

  const [grupos] = useState([
    { id: 1, grupo: 'Administrador' },
    { id: 2, grupo: 'Psicólogo' },
    { id: 3, grupo: 'Recepcionista' }
  ]);
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nm_usuario: '',
    email: '',
    login: '',
    celular: '',
    id_grupo: '',
    senha: '',
    foto: null
  });
  const [error, setError] = useState('');

  // Handlers
  const handleOpen = (usuario = null) => {
    if (usuario) {
      setEditingId(usuario.id);
      setFormData({
        nm_usuario: usuario.nm_usuario,
        email: usuario.email,
        login: usuario.login,
        celular: usuario.celular,
        id_grupo: usuario.id_grupo,
        senha: '',
        foto: usuario.foto
      });
    } else {
      setEditingId(null);
      setFormData({
        nm_usuario: '',
        email: '',
        login: '',
        celular: '',
        id_grupo: '',
        senha: '',
        foto: null
      });
    }
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData({
      nm_usuario: '',
      email: '',
      login: '',
      celular: '',
      id_grupo: '',
      senha: '',
      foto: null
    });
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          foto: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nm_usuario.trim() || !formData.email.trim() || !formData.login.trim() || !formData.id_grupo) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!editingId && !formData.senha.trim()) {
      setError('Por favor, defina uma senha para o novo usuário');
      return;
    }

    if (editingId) {
      // Editar
      setUsuarios(usuarios.map(usuario => 
        usuario.id === editingId 
          ? { 
              ...usuario, 
              nm_usuario: formData.nm_usuario.trim(),
              email: formData.email.trim(),
              login: formData.login.trim(),
              celular: formData.celular.trim(),
              id_grupo: formData.id_grupo,
              foto: formData.foto,
              ...(formData.senha.trim() && { senha: formData.senha })
            }
          : usuario
      ));
    } else {
      // Adicionar
      const newId = Math.max(...usuarios.map(u => u.id), 0) + 1;
      setUsuarios([...usuarios, {
        id: newId,
        nm_usuario: formData.nm_usuario.trim(),
        email: formData.email.trim(),
        login: formData.login.trim(),
        celular: formData.celular.trim(),
        id_grupo: formData.id_grupo,
        senha: formData.senha.trim(),
        foto: formData.foto
      }]);
    }
    
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    }
  };

  const getGrupoNome = (id_grupo) => {
    const grupo = grupos.find(g => g.id === id_grupo);
    return grupo ? grupo.grupo : 'N/A';
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <PersonIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Usuários
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
          Novo Usuário
        </Button>
      </Box>

      {/* Estatísticas */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              {usuarios.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Usuários
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="success.main" sx={{ fontWeight: 600 }}>
              {usuarios.filter(u => grupos.find(g => g.id === u.id_grupo)?.grupo === 'Administrador').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Administradores
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
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Usuário</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Login</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Celular</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Grupo</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.95rem', width: 120 }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow 
                    key={usuario.id}
                    sx={{ 
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          src={usuario.foto} 
                          sx={{ width: 40, height: 40 }}
                        >
                          {usuario.nm_usuario.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {usuario.nm_usuario}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {usuario.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={usuario.login} 
                        size="small" 
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {usuario.celular || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={getGrupoNome(usuario.id_grupo)} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(usuario)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': { backgroundColor: `${theme.palette.primary.main}15` }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(usuario.id)}
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
                {usuarios.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Nenhum usuário cadastrado
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
            {editingId ? 'Editar Usuário' : 'Novo Usuário'}
          </Typography>
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
                {error}
              </Alert>
            )}
            
            <Grid container spacing={2}>
              {/* Foto */}
              <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                <Avatar 
                  src={formData.foto} 
                  sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                >
                  {formData.nm_usuario.charAt(0)}
                </Avatar>
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<PhotoCameraIcon />}
                  sx={{ textTransform: 'none', borderRadius: 2 }}
                >
                  Alterar Foto
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </Grid>

              {/* Nome */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="nm_usuario"
                  label="Nome do Usuário *"
                  value={formData.nm_usuario}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email *"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Grid>

              {/* Login */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="login"
                  label="Login *"
                  value={formData.login}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Grid>

              {/* Celular */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="celular"
                  label="Celular"
                  value={formData.celular}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="(11) 99999-9999"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Grid>

              {/* Grupo */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Grupo *</InputLabel>
                  <Select
                    name="id_grupo"
                    value={formData.id_grupo}
                    onChange={handleChange}
                    label="Grupo *"
                    sx={{
                      borderRadius: 2
                    }}
                  >
                    {grupos.map((grupo) => (
                      <MenuItem key={grupo.id} value={grupo.id}>
                        {grupo.grupo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Senha */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="senha"
                  label={editingId ? "Nova Senha (deixe em branco para manter)" : "Senha *"}
                  type="password"
                  value={formData.senha}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Grid>
            </Grid>
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

export default Usuarios;