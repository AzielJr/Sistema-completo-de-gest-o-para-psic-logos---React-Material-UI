import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import logoGestao from '../../assets/logo-gestao-psi.png';

const Login = () => {
  const theme = useTheme();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.senha) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.senha);
      if (!result.success) {
        setError(result.message);
      }
    } catch (error) {
      setError('Erro interno do servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            {/* Logo e Título */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <img 
                  src={logoGestao} 
                  alt="Gestão PSI" 
                  style={{ 
                    width: '180px', 
                    height: '120px',
                    objectFit: 'contain'
                  }} 
                />
              </Box>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: '1.1rem' }}
              >
                Sistema de Gestão para Psicólogos
              </Typography>
            </Box>

            {/* Formulário */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    mb: 3,
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      fontSize: '0.95rem'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                name="senha"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                value={formData.senha}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: '0 4px 15px rgba(139, 69, 19, 0.3)',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    boxShadow: '0 6px 20px rgba(139, 69, 19, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                  '&:disabled': {
                    background: theme.palette.action.disabledBackground,
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Entrar'
                )}
              </Button>
            </Box>

            {/* Informações de teste */}
            <Box sx={{ mt: 4, p: 2, backgroundColor: 'rgba(139, 69, 19, 0.05)', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
                <strong>Dados para teste:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Email: admin@gestaopsi.com
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Senha: 123456
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;