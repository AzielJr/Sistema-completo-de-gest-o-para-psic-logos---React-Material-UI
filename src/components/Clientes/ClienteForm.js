import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Divider,
  Alert,
  Paper,
  useTheme,
  IconButton,
  InputAdornment,
  Avatar,
  Badge
} from '@mui/material';
import {
  Save,
  Cancel,
  Person,
  FamilyRestroom,
  Psychology,
  Info,
  ArrowBack,
  Phone,
  Email,
  Home,
  Work,
  PhotoCamera,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ClienteForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEdit = Boolean(id);
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Dados do formulário
  const [formData, setFormData] = useState({
    // Aba 1 - Dados
    nome: '',
    foto: '',
    genero_id: '',
    estado_civil_id: '',
    escolaridade_id: '',
    abordagem_id: '',
    tipo_cliente_id: '',
    idade: '',
    ocupacao: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    telefone_fixo: '',
    celular: '',
    email: '',
    emergencia_ligar_para: '',
    emergencia_fone: '',
    reside_com: '',
    nome_conjuge: '',
    idade_conjuge: '',
    escolaridade_conjuge: '',
    ocupacao_conjuge: '',
    filhos: '',
    
    // Aba 2 - Filiação
    nome_pai: '',
    idade_pai: '',
    ocupacao_pai: '',
    escolaridade_pai: '',
    nome_mae: '',
    idade_mae: '',
    escolaridade_mae: '',
    ocupacao_mae: '',
    
    // Aba 3 - Anamnese
    queixa_principal: '',
    mudancas_periodo: '',
    sintomas_sinais: '',
    acontecimento_marcante: '',
    relacionamento_familiar: '',
    outras_obs: '',
    tentativa_suicidio_sn: false,
    tentativa_suicidio: '',
    tratamento_psicologico_sn: false,
    tratamento_psicologico: '',
    alguma_doenca_sn: false,
    alguma_doenca: '',
    uso_medicamentos_sn: false,
    uso_medicamento: '',
    familiar_doenca_mental_sn: false,
    familiar_doenca_mental: '',
    abuso_alcool_sn: false,
    abuso_alcool: '',
    obs_geral: '',
    
    // Aba 4 - Outras Informações
    dia_atendimento: '',
    hora_atendimento: '',
    valor_atendimento: '',
    ativo: true,
    acessa_link_recadastro: false,
    acessa_link_experiencia: false,
  });

  // Dados para os selects (normalmente viriam da API)
  const [selectOptions] = useState({
    generos: [
      { id: 1, nome: 'Masculino' },
      { id: 2, nome: 'Feminino' },
      { id: 3, nome: 'Outro' }
    ],
    estadosCivis: [
      { id: 1, nome: 'Solteiro(a)' },
      { id: 2, nome: 'Casado(a)' },
      { id: 3, nome: 'Divorciado(a)' },
      { id: 4, nome: 'Viúvo(a)' },
      { id: 5, nome: 'União Estável' }
    ],
    escolaridades: [
      { id: 1, nome: 'Fundamental Incompleto' },
      { id: 2, nome: 'Fundamental Completo' },
      { id: 3, nome: 'Médio Incompleto' },
      { id: 4, nome: 'Médio Completo' },
      { id: 5, nome: 'Superior Incompleto' },
      { id: 6, nome: 'Superior Completo' },
      { id: 7, nome: 'Pós-graduação' }
    ],
    abordagens: [
      { id: 1, nome: 'Gestalt' },
      { id: 2, nome: 'TCC' },
      { id: 3, nome: 'Psicanálise' }
    ],
    tiposCliente: [
      { id: 1, nome: 'Individual' },
      { id: 2, nome: 'Casal' },
      { id: 3, nome: 'Família' },
      { id: 4, nome: 'Grupo' }
    ],
    diasSemana: [
      'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 
      'Sexta-feira', 'Sábado', 'Domingo'
    ],
    ufs: [
      'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
      'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ]
  });

  useEffect(() => {
    if (isEdit) {
      // Aqui você carregaria os dados do cliente da API
      // Por enquanto, vamos simular dados
      setFormData(prev => ({
        ...prev,
        nome: 'Maria Silva Santos',
        genero_id: 2,
        estado_civil_id: 2,
        tipo_cliente_id: 1,
        idade: '35',
        ocupacao: 'Professora',
        celular: '(81) 99999-1111',
        email: 'maria.silva@email.com',
        valor_atendimento: '150.00',
        dia_atendimento: 'Segunda-feira',
        hora_atendimento: '09:00',
        ativo: true
      }));
    }
  }, [isEdit]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validações obrigatórias
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.genero_id) newErrors.genero_id = 'Gênero é obrigatório';
    if (!formData.estado_civil_id) newErrors.estado_civil_id = 'Estado civil é obrigatório';
    if (!formData.tipo_cliente_id) newErrors.tipo_cliente_id = 'Tipo de cliente é obrigatório';
    
    // Validação de email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Aqui você faria a chamada para a API
      const clienteData = {
        ...formData,
        id_usuario: user.id
      };
      
      console.log('Salvando cliente:', clienteData);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/clientes');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }
      
      // Verificar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('foto', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    handleChange('foto', '');
  };

  const getInitials = (nome) => {
    if (!nome) return '';
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const renderDadosTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Informações Pessoais
        </Typography>
      </Grid>

      {/* Campo de Foto */}
      <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
        <Avatar 
          src={formData.foto} 
          sx={{ 
            width: 80, 
            height: 80, 
            mx: 'auto', 
            mb: 1,
            bgcolor: theme.palette.primary.main,
            fontSize: '1.5rem'
          }}
        >
          {!formData.foto && (formData.nome ? getInitials(formData.nome) : <PhotoCamera />)}
        </Avatar>
        <Button
          component="label"
          variant="outlined"
          startIcon={<PhotoCamera />}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          {formData.foto ? 'Alterar Foto' : 'Adicionar Foto'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handlePhotoUpload}
          />
        </Button>
        {formData.foto && (
          <Button
            variant="text"
            color="error"
            size="small"
            onClick={handleRemovePhoto}
            sx={{ ml: 1, textTransform: 'none' }}
          >
            Remover
          </Button>
        )}
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nome Completo *"
          value={formData.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
          error={!!errors.nome}
          helperText={errors.nome}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Idade"
          value={formData.idade}
          onChange={(e) => handleChange('idade', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={3}>
        <FormControl fullWidth error={!!errors.genero_id}>
          <InputLabel>Gênero *</InputLabel>
          <Select
            value={formData.genero_id}
            onChange={(e) => handleChange('genero_id', e.target.value)}
            label="Gênero *"
          >
            {selectOptions.generos.map(genero => (
              <MenuItem key={genero.id} value={genero.id}>
                {genero.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <FormControl fullWidth error={!!errors.estado_civil_id}>
          <InputLabel>Estado Civil *</InputLabel>
          <Select
            value={formData.estado_civil_id}
            onChange={(e) => handleChange('estado_civil_id', e.target.value)}
            label="Estado Civil *"
          >
            {selectOptions.estadosCivis.map(estado => (
              <MenuItem key={estado.id} value={estado.id}>
                {estado.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Escolaridade</InputLabel>
          <Select
            value={formData.escolaridade_id}
            onChange={(e) => handleChange('escolaridade_id', e.target.value)}
            label="Escolaridade"
          >
            {selectOptions.escolaridades.map(escolaridade => (
              <MenuItem key={escolaridade.id} value={escolaridade.id}>
                {escolaridade.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <InputLabel>Abordagem</InputLabel>
          <Select
            value={formData.abordagem_id}
            onChange={(e) => handleChange('abordagem_id', e.target.value)}
            label="Abordagem"
          >
            {selectOptions.abordagens.map(abordagem => (
              <MenuItem key={abordagem.id} value={abordagem.id}>
                {abordagem.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <FormControl fullWidth error={!!errors.tipo_cliente_id}>
          <InputLabel>Tipo de Cliente *</InputLabel>
          <Select
            value={formData.tipo_cliente_id}
            onChange={(e) => handleChange('tipo_cliente_id', e.target.value)}
            label="Tipo de Cliente *"
          >
            {selectOptions.tiposCliente.map(tipo => (
              <MenuItem key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Ocupação"
          value={formData.ocupacao}
          onChange={(e) => handleChange('ocupacao', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Work />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Contato
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Celular"
          value={formData.celular}
          onChange={(e) => handleChange('celular', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Telefone Fixo"
          value={formData.telefone_fixo}
          onChange={(e) => handleChange('telefone_fixo', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Endereço
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="CEP"
          value={formData.cep}
          onChange={(e) => handleChange('cep', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Endereço"
          value={formData.endereco}
          onChange={(e) => handleChange('endereco', e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Home />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Número"
          value={formData.numero}
          onChange={(e) => handleChange('numero', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Complemento"
          value={formData.complemento}
          onChange={(e) => handleChange('complemento', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Bairro"
          value={formData.bairro}
          onChange={(e) => handleChange('bairro', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Cidade"
          value={formData.cidade}
          onChange={(e) => handleChange('cidade', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={1}>
        <FormControl fullWidth>
          <InputLabel>UF</InputLabel>
          <Select
            value={formData.uf}
            onChange={(e) => handleChange('uf', e.target.value)}
            label="UF"
          >
            {selectOptions.ufs.map(uf => (
              <MenuItem key={uf} value={uf}>
                {uf}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Informações Adicionais
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Reside com"
          value={formData.reside_com}
          onChange={(e) => handleChange('reside_com', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Em caso de emergência, ligar para"
          value={formData.emergencia_ligar_para}
          onChange={(e) => handleChange('emergencia_ligar_para', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Telefone de emergência"
          value={formData.emergencia_fone}
          onChange={(e) => handleChange('emergencia_fone', e.target.value)}
        />
      </Grid>

      {/* Informações do Cônjuge */}
      {(formData.estado_civil_id === 2 || formData.estado_civil_id === 5) && (
        <>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Informações do Cônjuge
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome do Cônjuge"
              value={formData.nome_conjuge}
              onChange={(e) => handleChange('nome_conjuge', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Idade do Cônjuge"
              value={formData.idade_conjuge}
              onChange={(e) => handleChange('idade_conjuge', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Escolaridade do Cônjuge"
              value={formData.escolaridade_conjuge}
              onChange={(e) => handleChange('escolaridade_conjuge', e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Ocupação do Cônjuge"
              value={formData.ocupacao_conjuge}
              onChange={(e) => handleChange('ocupacao_conjuge', e.target.value)}
            />
          </Grid>
        </>
      )}
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Filhos"
          multiline
          rows={3}
          value={formData.filhos}
          onChange={(e) => handleChange('filhos', e.target.value)}
          placeholder="Descreva informações sobre os filhos (nomes, idades, etc.)"
        />
      </Grid>
    </Grid>
  );

  const renderFiliacaoTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Informações dos Pais
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nome do Pai"
          value={formData.nome_pai}
          onChange={(e) => handleChange('nome_pai', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Idade do Pai"
          value={formData.idade_pai}
          onChange={(e) => handleChange('idade_pai', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Ocupação do Pai"
          value={formData.ocupacao_pai}
          onChange={(e) => handleChange('ocupacao_pai', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Escolaridade do Pai"
          value={formData.escolaridade_pai}
          onChange={(e) => handleChange('escolaridade_pai', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nome da Mãe"
          value={formData.nome_mae}
          onChange={(e) => handleChange('nome_mae', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Idade da Mãe"
          value={formData.idade_mae}
          onChange={(e) => handleChange('idade_mae', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Ocupação da Mãe"
          value={formData.ocupacao_mae}
          onChange={(e) => handleChange('ocupacao_mae', e.target.value)}
        />
      </Grid>
      
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Escolaridade da Mãe"
          value={formData.escolaridade_mae}
          onChange={(e) => handleChange('escolaridade_mae', e.target.value)}
        />
      </Grid>
    </Grid>
  );

  const renderAnamneseTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Esta seção pode ser preenchida pelo próprio cliente através de um link personalizado.
        </Alert>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Queixa Principal"
          multiline
          rows={4}
          value={formData.queixa_principal}
          onChange={(e) => handleChange('queixa_principal', e.target.value)}
          placeholder="Descreva o motivo principal da busca por atendimento psicológico"
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Mudanças no Período"
          multiline
          rows={3}
          value={formData.mudancas_periodo}
          onChange={(e) => handleChange('mudancas_periodo', e.target.value)}
          placeholder="Descreva mudanças significativas ocorridas recentemente"
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Sintomas e Sinais"
          multiline
          rows={3}
          value={formData.sintomas_sinais}
          onChange={(e) => handleChange('sintomas_sinais', e.target.value)}
          placeholder="Descreva sintomas físicos e psicológicos observados"
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Acontecimento Marcante"
          multiline
          rows={3}
          value={formData.acontecimento_marcante}
          onChange={(e) => handleChange('acontecimento_marcante', e.target.value)}
          placeholder="Descreva eventos significativos na vida do cliente"
        />
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Relacionamento Familiar"
          multiline
          rows={3}
          value={formData.relacionamento_familiar}
          onChange={(e) => handleChange('relacionamento_familiar', e.target.value)}
          placeholder="Descreva a dinâmica e qualidade dos relacionamentos familiares"
        />
      </Grid>

      {/* Perguntas Sim/Não */}
      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Histórico Clínico
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.tentativa_suicidio_sn}
                onChange={(e) => handleChange('tentativa_suicidio_sn', e.target.checked)}
              />
            }
            label="Já teve tentativa de suicídio?"
          />
          {formData.tentativa_suicidio_sn && (
            <TextField
              fullWidth
              label="Descreva a tentativa de suicídio"
              multiline
              rows={2}
              value={formData.tentativa_suicidio}
              onChange={(e) => handleChange('tentativa_suicidio', e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.tratamento_psicologico_sn}
                onChange={(e) => handleChange('tratamento_psicologico_sn', e.target.checked)}
              />
            }
            label="Já fez tratamento psicológico anteriormente?"
          />
          {formData.tratamento_psicologico_sn && (
            <TextField
              fullWidth
              label="Descreva o tratamento psicológico anterior"
              multiline
              rows={2}
              value={formData.tratamento_psicologico}
              onChange={(e) => handleChange('tratamento_psicologico', e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.alguma_doenca_sn}
                onChange={(e) => handleChange('alguma_doenca_sn', e.target.checked)}
              />
            }
            label="Possui alguma doença?"
          />
          {formData.alguma_doenca_sn && (
            <TextField
              fullWidth
              label="Descreva as doenças"
              multiline
              rows={2}
              value={formData.alguma_doenca}
              onChange={(e) => handleChange('alguma_doenca', e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.uso_medicamentos_sn}
                onChange={(e) => handleChange('uso_medicamentos_sn', e.target.checked)}
              />
            }
            label="Faz uso de medicamentos?"
          />
          {formData.uso_medicamentos_sn && (
            <TextField
              fullWidth
              label="Descreva os medicamentos em uso"
              multiline
              rows={2}
              value={formData.uso_medicamento}
              onChange={(e) => handleChange('uso_medicamento', e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.familiar_doenca_mental_sn}
                onChange={(e) => handleChange('familiar_doenca_mental_sn', e.target.checked)}
              />
            }
            label="Há histórico de doença mental na família?"
          />
          {formData.familiar_doenca_mental_sn && (
            <TextField
              fullWidth
              label="Descreva o histórico familiar"
              multiline
              rows={2}
              value={formData.familiar_doenca_mental}
              onChange={(e) => handleChange('familiar_doenca_mental', e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.abuso_alcool_sn}
                onChange={(e) => handleChange('abuso_alcool_sn', e.target.checked)}
              />
            }
            label="Faz uso abusivo de álcool ou outras substâncias?"
          />
          {formData.abuso_alcool_sn && (
            <TextField
              fullWidth
              label="Descreva o uso de substâncias"
              multiline
              rows={2}
              value={formData.abuso_alcool}
              onChange={(e) => handleChange('abuso_alcool', e.target.value)}
              sx={{ mt: 2 }}
            />
          )}
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Observações Gerais"
          multiline
          rows={4}
          value={formData.obs_geral}
          onChange={(e) => handleChange('obs_geral', e.target.value)}
          placeholder="Outras informações relevantes"
        />
      </Grid>
    </Grid>
  );

  const renderOutrasInformacoesTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Configurações de Atendimento
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel>Dia de Atendimento</InputLabel>
          <Select
            value={formData.dia_atendimento}
            onChange={(e) => handleChange('dia_atendimento', e.target.value)}
            label="Dia de Atendimento"
          >
            {selectOptions.diasSemana.map(dia => (
              <MenuItem key={dia} value={dia}>
                {dia}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Horário de Atendimento"
          type="time"
          value={formData.hora_atendimento}
          onChange={(e) => handleChange('hora_atendimento', e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Valor do Atendimento"
          type="number"
          value={formData.valor_atendimento}
          onChange={(e) => handleChange('valor_atendimento', e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start">R$</InputAdornment>,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Configurações do Sistema
        </Typography>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.ativo}
                onChange={(e) => handleChange('ativo', e.target.checked)}
              />
            }
            label="Cliente Ativo"
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.acessa_link_recadastro}
                onChange={(e) => handleChange('acessa_link_recadastro', e.target.checked)}
              />
            }
            label="Permitir acesso ao link de recadastro"
          />
          {formData.acessa_link_recadastro && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Um link será gerado para que o cliente possa atualizar seus dados de anamnese.
            </Alert>
          )}
        </Paper>
      </Grid>
      
      <Grid item xs={12}>
        <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.acessa_link_experiencia}
                onChange={(e) => handleChange('acessa_link_experiencia', e.target.checked)}
              />
            }
            label="Permitir acesso ao link de experiências"
          />
          {formData.acessa_link_experiencia && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Um link será gerado para que o cliente possa registrar suas experiências diárias.
            </Alert>
          )}
        </Paper>
      </Grid>
    </Grid>
  );

  const tabs = [
    { label: 'Dados', icon: <Person />, content: renderDadosTab },
    { label: 'Filiação', icon: <FamilyRestroom />, content: renderFiliacaoTab },
    { label: 'Anamnese', icon: <Psychology />, content: renderAnamneseTab },
    { label: 'Outras Informações', icon: <Info />, content: renderOutrasInformacoesTab },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/clientes')}>
          <ArrowBack />
        </IconButton>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {isEdit ? 'Editar Cliente' : 'Novo Cliente'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isEdit ? 'Atualize as informações do cliente' : 'Cadastre um novo cliente no sistema'}
          </Typography>
        </Box>
      </Box>

      <Card>
        <CardContent>
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                icon={tab.icon}
                iconPosition="start"
                sx={{ minHeight: 60 }}
              />
            ))}
          </Tabs>

          {/* Tab Content */}
          <Box sx={{ mt: 3 }}>
            {tabs[activeTab].content()}
          </Box>

          {/* Actions */}
          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => navigate('/clientes')}
              disabled={loading}
            >
              Cancelar
            </Button>
            
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              {loading ? 'Salvando...' : 'Salvar Cliente'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClienteForm;