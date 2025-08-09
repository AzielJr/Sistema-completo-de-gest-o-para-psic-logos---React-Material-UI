import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  LinearProgress,
  useTheme,
  Paper,
  Divider
} from '@mui/material';
import {
  People,
  CalendarToday,
  TrendingUp,
  AttachMoney,
  MoreVert,
  PersonAdd,
  Event,
  Psychology,
  MonetizationOn,
  Schedule,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useAuth();

  // Dados mockados para demonstração
  const stats = [
    {
      title: 'Total de Clientes',
      value: '127',
      change: '+12%',
      changeType: 'positive',
      icon: <People />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Consultas Hoje',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: <CalendarToday />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Evolução Registrada',
      value: '45',
      change: '+5',
      changeType: 'positive',
      icon: <TrendingUp />,
      color: theme.palette.info.main,
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 12.500',
      change: '+8%',
      changeType: 'positive',
      icon: <AttachMoney />,
      color: theme.palette.success.main,
    },
  ];

  const recentClients = [
    {
      id: 1,
      nome: 'Maria Silva',
      ultimaConsulta: '2024-01-15',
      status: 'Ativo',
      proximaConsulta: '2024-01-22',
    },
    {
      id: 2,
      nome: 'João Santos',
      ultimaConsulta: '2024-01-14',
      status: 'Ativo',
      proximaConsulta: '2024-01-21',
    },
    {
      id: 3,
      nome: 'Ana Costa',
      ultimaConsulta: '2024-01-13',
      status: 'Pendente',
      proximaConsulta: '2024-01-20',
    },
  ];

  const todayAppointments = [
    {
      id: 1,
      cliente: 'Carlos Oliveira',
      horario: '09:00',
      tipo: 'Consulta Individual',
      status: 'Confirmado',
    },
    {
      id: 2,
      cliente: 'Fernanda Lima',
      horario: '10:30',
      tipo: 'Terapia de Casal',
      status: 'Confirmado',
    },
    {
      id: 3,
      cliente: 'Roberto Silva',
      horario: '14:00',
      tipo: 'Consulta Individual',
      status: 'Pendente',
    },
    {
      id: 4,
      cliente: 'Juliana Santos',
      horario: '15:30',
      tipo: 'Consulta Individual',
      status: 'Confirmado',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo':
      case 'Confirmado':
        return 'success';
      case 'Pendente':
        return 'warning';
      case 'Inativo':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Confirmado':
        return <CheckCircle fontSize="small" />;
      case 'Pendente':
        return <Warning fontSize="small" />;
      default:
        return <Schedule fontSize="small" />;
    }
  };

  return (
    <Box>
      {/* Header de Boas-vindas */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Bem-vindo, {user?.nome?.split(' ')[0]}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Aqui está um resumo das suas atividades hoje.
        </Typography>
      </Box>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                border: `1px solid ${stat.color}20`,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 25px ${stat.color}25`,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: stat.color,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {stat.value}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                
                <Chip
                  label={stat.change}
                  size="small"
                  color={stat.changeType === 'positive' ? 'success' : 'error'}
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Consultas de Hoje */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Consultas de Hoje
                </Typography>
                <Chip
                  icon={<Event />}
                  label={`${todayAppointments.length} agendadas`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
              
              <List>
                {todayAppointments.map((appointment, index) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        bgcolor: 'background.default',
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {appointment.cliente.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                              {appointment.cliente}
                            </Typography>
                            <Chip
                              icon={getStatusIcon(appointment.status)}
                              label={appointment.status}
                              size="small"
                              color={getStatusColor(appointment.status)}
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.horario} - {appointment.tipo}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < todayAppointments.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Clientes Recentes */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Clientes Recentes
                </Typography>
                <IconButton size="small">
                  <PersonAdd />
                </IconButton>
              </Box>
              
              <List>
                {recentClients.map((client, index) => (
                  <React.Fragment key={client.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                          {client.nome.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                            {client.nome}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              Última: {new Date(client.ultimaConsulta).toLocaleDateString('pt-BR')}
                            </Typography>
                            <br />
                            <Chip
                              label={client.status}
                              size="small"
                              color={getStatusColor(client.status)}
                              variant="outlined"
                              sx={{ mt: 0.5 }}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentClients.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Progresso Mensal */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Progresso Mensal
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                    <Psychology sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">85%</Typography>
                    <Typography variant="body2">Meta de Consultas</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={85} 
                      sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: 'white' } }}
                    />
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.main', color: 'white' }}>
                    <MonetizationOn sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">92%</Typography>
                    <Typography variant="body2">Meta Financeira</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={92} 
                      sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: 'white' } }}
                    />
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
                    <TrendingUp sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">78%</Typography>
                    <Typography variant="body2">Evoluções</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={78} 
                      sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: 'white' } }}
                    />
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                    <People sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6">95%</Typography>
                    <Typography variant="body2">Satisfação</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={95} 
                      sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.3)', '& .MuiLinearProgress-bar': { bgcolor: 'white' } }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;