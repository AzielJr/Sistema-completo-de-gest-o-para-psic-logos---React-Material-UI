import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  AutoAwesome,
  CalendarMonth,
  Schedule,
  Person,
  Refresh,
  Download,
  Visibility
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const GerarAgenda = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear()
  });
  const [agendaGerada, setAgendaGerada] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');



  useEffect(() => {
    // Mock de clientes com horários de atendimento
    const clientesMockData = [
      {
        id: 1,
        nome: 'Ana Silva',
        dia_semana: 'Segunda-feira',
        hora_atendimento: '09:00',
        duracao: 50,
        ativo: true
      },
      {
        id: 2,
        nome: 'Carlos Santos',
        dia_semana: 'Terça-feira',
        hora_atendimento: '14:00',
        duracao: 50,
        ativo: true
      },
      {
        id: 3,
        nome: 'Maria Oliveira',
        dia_semana: 'Quarta-feira',
        hora_atendimento: '10:30',
        duracao: 50,
        ativo: true
      },
      {
        id: 4,
        nome: 'João Pereira',
        dia_semana: 'Quinta-feira',
        hora_atendimento: '16:00',
        duracao: 50,
        ativo: true
      },
      {
        id: 5,
        nome: 'Lucia Costa',
        dia_semana: 'Sexta-feira',
        hora_atendimento: '08:30',
        duracao: 50,
        ativo: true
      }
    ];
    setClientes(clientesMockData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getDiasDoMes = (mes, ano) => {
    const diasSemana = {
      'Segunda-feira': 1,
      'Terça-feira': 2,
      'Quarta-feira': 3,
      'Quinta-feira': 4,
      'Sexta-feira': 5,
      'Sábado': 6,
      'Domingo': 0
    };

    const ultimoDia = new Date(ano, mes, 0);
    const dias = [];

    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      const data = new Date(ano, mes - 1, dia);
      const diaSemana = data.getDay();
      
      // Encontrar nome do dia da semana
      const nomeDiaSemana = Object.keys(diasSemana).find(
        key => diasSemana[key] === diaSemana
      );

      dias.push({
        data: data,
        dia: dia,
        diaSemana: nomeDiaSemana,
        dataFormatada: data.toLocaleDateString('pt-BR')
      });
    }

    return dias;
  };

  const gerarAgenda = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const diasDoMes = getDiasDoMes(formData.mes, formData.ano);
      const agendaTemp = [];

      // Para cada cliente ativo
      clientes.filter(cliente => cliente.ativo).forEach(cliente => {
        // Encontrar todos os dias do mês que correspondem ao dia da semana do cliente
        const diasCliente = diasDoMes.filter(dia => 
          dia.diaSemana === cliente.dia_semana
        );

        // Criar agendamentos para cada dia
        diasCliente.forEach(dia => {
          agendaTemp.push({
            id: `${cliente.id}-${dia.dia}`,
            cliente_id: cliente.id,
            cliente_nome: cliente.nome,
            data: dia.dataFormatada,
            dia_semana: dia.diaSemana,
            hora: cliente.hora_atendimento,
            duracao: cliente.duracao,
            status: 'Agendado'
          });
        });
      });

      // Ordenar por data e hora
      agendaTemp.sort((a, b) => {
        const dataA = new Date(a.data.split('/').reverse().join('-') + 'T' + a.hora);
        const dataB = new Date(b.data.split('/').reverse().join('-') + 'T' + b.hora);
        return dataA - dataB;
      });

      setAgendaGerada(agendaTemp);
      setSuccess(`Agenda gerada com sucesso! ${agendaTemp.length} agendamentos criados.`);
    } catch (error) {
      setError('Erro ao gerar agenda: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const limparAgenda = () => {
    setAgendaGerada([]);
    setSuccess('');
    setError('');
  };

  const meses = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' }
  ];

  const anos = [];
  const anoAtual = new Date().getFullYear();
  for (let i = anoAtual - 1; i <= anoAtual + 2; i++) {
    anos.push(i);
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AutoAwesome sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Typography variant="h4" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
            Gerar Agenda Automática
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Gere automaticamente a agenda mensal com base nos horários de atendimento cadastrados para cada cliente.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Formulário de Geração */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonth color="primary" />
                Parâmetros da Agenda
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Mês</InputLabel>
                    <Select
                      name="mes"
                      value={formData.mes}
                      onChange={handleChange}
                      label="Mês"
                    >
                      {meses.map(mes => (
                        <MenuItem key={mes.value} value={mes.value}>
                          {mes.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Ano</InputLabel>
                    <Select
                      name="ano"
                      value={formData.ano}
                      onChange={handleChange}
                      label="Ano"
                    >
                      {anos.map(ano => (
                        <MenuItem key={ano} value={ano}>
                          {ano}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={gerarAgenda}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
                    sx={{ mt: 2 }}
                  >
                    {loading ? 'Gerando...' : 'Gerar Agenda'}
                  </Button>
                </Grid>

                {agendaGerada.length > 0 && (
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={limparAgenda}
                      startIcon={<Refresh />}
                    >
                      Limpar Agenda
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Clientes Ativos */}
          <Card elevation={2} sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="primary" />
                Clientes Ativos ({clientes.filter(c => c.ativo).length})
              </Typography>
              
              {clientes.filter(cliente => cliente.ativo).map(cliente => (
                <Box key={cliente.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {cliente.nome}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {cliente.dia_semana} às {cliente.hora_atendimento}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Resultado da Agenda */}
        <Grid item xs={12} md={8}>
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {agendaGerada.length > 0 && (
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Schedule color="primary" />
                    Agenda Gerada - {meses.find(m => m.value === formData.mes)?.label} {formData.ano}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Visualizar Agenda">
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Exportar Agenda">
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'divider' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'grey.50' }}>
                        <TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Dia da Semana</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Horário</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Cliente</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Duração</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agendaGerada.map((agendamento) => (
                        <TableRow key={agendamento.id} hover>
                          <TableCell>{agendamento.data}</TableCell>
                          <TableCell>{agendamento.dia_semana}</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>{agendamento.hora}</TableCell>
                          <TableCell>{agendamento.cliente_nome}</TableCell>
                          <TableCell>{agendamento.duracao} min</TableCell>
                          <TableCell>
                            <Chip 
                              label={agendamento.status} 
                              size="small" 
                              color="success" 
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
                  <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                    📊 Resumo: {agendaGerada.length} agendamentos gerados para {meses.find(m => m.value === formData.mes)?.label} de {formData.ano}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}

          {agendaGerada.length === 0 && !loading && (
            <Card elevation={2}>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <AutoAwesome sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  Nenhuma agenda gerada
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Selecione o mês e ano desejados e clique em "Gerar Agenda" para criar automaticamente os agendamentos.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GerarAgenda;