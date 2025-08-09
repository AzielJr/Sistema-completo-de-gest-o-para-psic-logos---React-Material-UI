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
  FormControlLabel,
  Checkbox,
  Grid,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
  AdminPanelSettings as AdminIcon,
  SupervisorAccount as SuperAdminIcon
} from '@mui/icons-material';

const GruposUsuarios = () => {
  const theme = useTheme();
  
  // Estados
  const [grupos, setGrupos] = useState([
    { 
      id: 1, 
      grupo: 'Administrador',
      adm: true,
      adm_super: true,
      cadastro: true,
      evolucao: true,
      experiencias: true,
      recebimentos: true,
      despesas: true,
      agenda: true,
      pdf: true,
      usuario: true,
      obs: 'Acesso total ao sistema'
    },
    { 
      id: 2, 
      grupo: 'Psicólogo',
      adm: false,
      adm_super: false,
      cadastro: true,
      evolucao: true,
      experiencias: true,
      recebimentos: false,
      despesas: false,
      agenda: true,
      pdf: true,
      usuario: false,
      obs: 'Acesso clínico'
    },
    { 
      id: 3, 
      grupo: 'Recepcionista',
      adm: false,
      adm_super: false,
      cadastro: true,
      evolucao: false,
      experiencias: false,
      recebimentos: true,
      despesas: false,
      agenda: true,
      pdf: false,
      usuario: false,
      obs: 'Acesso administrativo'
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    grupo: '',
    adm: false,
    adm_super: false,
    cadastro: false,
    evolucao: false,
    experiencias: false,
    recebimentos: false,
    despesas: false,
    agenda: false,
    pdf: false,
    usuario: false,
    obs: ''
  });
  const [error, setError] = useState('');

  // Handlers
  const handleOpen = (grupo = null) => {
    if (grupo) {
      setEditingId(grupo.id);
      setFormData({
        grupo: grupo.grupo,
        adm: grupo.adm,
        adm_super: grupo.adm_super,
        cadastro: grupo.cadastro,
        evolucao: grupo.evolucao,
        experiencias: grupo.experiencias,
        recebimentos: grupo.recebimentos,
        despesas: grupo.despesas,
        agenda: grupo.agenda,
        pdf: grupo.pdf,
        usuario: grupo.usuario,
        obs: grupo.obs || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        grupo: '',
        adm: false,
        adm_super: false,
        cadastro: false,
        evolucao: false,
        experiencias: false,
        recebimentos: false,
        despesas: false,
        agenda: false,
        pdf: false,
        usuario: false,
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
      grupo: '',
      adm: false,
      adm_super: false,
      cadastro: false,
      evolucao: false,
      experiencias: false,
      recebimentos: false,
      despesas: false,
      agenda: false,
      pdf: false,
      usuario: false,
      obs: ''
    });
    setError('');
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.grupo.trim()) {
      setError('Por favor, preencha o nome do grupo');
      return;
    }

    if (editingId) {
      // Editar
      setGrupos(grupos.map(grupo => 
        grupo.id === editingId 
          ? { 
              ...grupo, 
              grupo: formData.grupo.trim(),
              adm: formData.adm,
              adm_super: formData.adm_super,
              cadastro: formData.cadastro,
              evolucao: formData.evolucao,
              experiencias: formData.experiencias,
              recebimentos: formData.recebimentos,
              despesas: formData.despesas,
              agenda: formData.agenda,
              pdf: formData.pdf,
              usuario: formData.usuario,
              obs: formData.obs.trim()
            }
          : grupo
      ));
    } else {
      // Adicionar
      const newId = Math.max(...grupos.map(g => g.id), 0) + 1;
      setGrupos([...grupos, {
        id: newId,
        grupo: formData.grupo.trim(),
        adm: formData.adm,
        adm_super: formData.adm_super,
        cadastro: formData.cadastro,
        evolucao: formData.evolucao,
        experiencias: formData.experiencias,
        recebimentos: formData.recebimentos,
        despesas: formData.despesas,
        agenda: formData.agenda,
        pdf: formData.pdf,
        usuario: formData.usuario,
        obs: formData.obs.trim()
      }]);
    }
    
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este grupo?')) {
      setGrupos(grupos.filter(grupo => grupo.id !== id));
    }
  };

  const getPermissionsCount = (grupo) => {
    const permissions = [
      grupo.adm, grupo.adm_super, grupo.cadastro, grupo.evolucao,
      grupo.experiencias, grupo.recebimentos, grupo.despesas,
      grupo.agenda, grupo.pdf, grupo.usuario
    ];
    return permissions.filter(p => p).length;
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <GroupIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Grupos de Usuários
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
          Novo Grupo
        </Button>
      </Box>

      {/* Estatísticas */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              {grupos.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Grupos
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="warning.main" sx={{ fontWeight: 600 }}>
              {grupos.filter(g => g.adm).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Com Acesso Admin
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" color="error.main" sx={{ fontWeight: 600 }}>
              {grupos.filter(g => g.adm_super).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Super Administradores
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
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Grupo</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Tipo</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Permissões</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem' }}>Observações</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: '0.95rem', width: 120 }}>
                    Ações
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grupos.map((grupo) => (
                  <TableRow 
                    key={grupo.id}
                    sx={{ 
                      '&:hover': { backgroundColor: theme.palette.action.hover },
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {grupo.grupo}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {grupo.adm_super && (
                          <Chip 
                            icon={<SuperAdminIcon />}
                            label="Super Admin" 
                            size="small" 
                            color="error"
                            variant="outlined"
                          />
                        )}
                        {grupo.adm && !grupo.adm_super && (
                          <Chip 
                            icon={<AdminIcon />}
                            label="Admin" 
                            size="small" 
                            color="warning"
                            variant="outlined"
                          />
                        )}
                        {!grupo.adm && !grupo.adm_super && (
                          <Chip 
                            label="Usuário" 
                            size="small" 
                            color="default"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${getPermissionsCount(grupo)}/10 permissões`}
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {grupo.obs || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpen(grupo)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': { backgroundColor: `${theme.palette.primary.main}15` }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(grupo.id)}
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
                {grupos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Nenhum grupo cadastrado
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
            {editingId ? 'Editar Grupo' : 'Novo Grupo'}
          </Typography>
        </DialogTitle>
        
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
                {error}
              </Alert>
            )}
            
            <Grid container spacing={3}>
              {/* Nome do Grupo */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="grupo"
                  label="Nome do Grupo *"
                  value={formData.grupo}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Grid>

              {/* Permissões Administrativas */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Permissões Administrativas
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="adm"
                          checked={formData.adm}
                          onChange={handleChange}
                        />
                      }
                      label="Administrador"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="adm_super"
                          checked={formData.adm_super}
                          onChange={handleChange}
                        />
                      }
                      label="Super Administrador"
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Permissões de Módulos */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Permissões de Módulos
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="cadastro"
                          checked={formData.cadastro}
                          onChange={handleChange}
                        />
                      }
                      label="Cadastros"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="evolucao"
                          checked={formData.evolucao}
                          onChange={handleChange}
                        />
                      }
                      label="Evolução"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="experiencias"
                          checked={formData.experiencias}
                          onChange={handleChange}
                        />
                      }
                      label="Experiências"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="recebimentos"
                          checked={formData.recebimentos}
                          onChange={handleChange}
                        />
                      }
                      label="Recebimentos"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="despesas"
                          checked={formData.despesas}
                          onChange={handleChange}
                        />
                      }
                      label="Despesas"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="agenda"
                          checked={formData.agenda}
                          onChange={handleChange}
                        />
                      }
                      label="Agenda"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="pdf"
                          checked={formData.pdf}
                          onChange={handleChange}
                        />
                      }
                      label="PDF"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="usuario"
                          checked={formData.usuario}
                          onChange={handleChange}
                        />
                      }
                      label="Usuários"
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Observações */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="obs"
                  label="Observações"
                  value={formData.obs}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={3}
                  placeholder="Descrição adicional sobre o grupo..."
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

export default GruposUsuarios;