import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  Chip,
  Divider
} from '@mui/material';
import {
  Psychology,
  Schedule,
  People,
  Analytics,
  Security,
  CloudSync,
  TrendingUp,
  Login,
  Favorite
} from '@mui/icons-material';
import logoGestao from '../../assets/logo-gestao-psi.png';
// Usando imagens do Unsplash que sempre funcionam
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <Psychology sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Gestão Completa de Pacientes',
      description: 'Prontuários eletrônicos seguros, histórico detalhado de sessões, evolução do tratamento e relatórios personalizados para cada paciente.'
    },
    {
      icon: <Schedule sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Agendamento Inteligente',
      description: 'Sistema de agendamento online com confirmação automática, lembretes por WhatsApp e e-mail, e sincronização com Google Calendar.'
    },
    {
      icon: <Analytics sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Dashboard e Relatórios',
      description: 'Métricas em tempo real, relatórios financeiros, análise de produtividade e insights para crescimento da sua prática clínica.'
    },
    {
      icon: <Security sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Segurança e Conformidade',
      description: 'Criptografia de ponta a ponta, backup automático, conformidade com LGPD e CFP, garantindo total proteção dos dados.'
    },
    {
      icon: <People sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Gestão Financeira',
      description: 'Controle de receitas e despesas, emissão de recibos, relatórios fiscais e integração com sistemas de pagamento.'
    },
    {
      icon: <CloudSync sx={{ fontSize: 48, color: '#667eea' }} />,
      title: 'Acesso em Qualquer Lugar',
      description: 'Sistema 100% online, acesse de qualquer dispositivo, sincronização automática e funcionamento offline quando necessário.'
    }
  ];

  const testimonials = [
    {
      name: 'Patrícia Allgayer',
      role: 'Psicóloga Clínica - CRP 02/12345',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'O Gestão PSI revolucionou minha prática clínica. Economizo 3 horas por dia em tarefas administrativas e posso focar totalmente nos meus pacientes. O sistema é intuitivo e muito seguro.'
    },
    {
      name: 'Pedro Almeida',
      role: 'Psicólogo Organizacional - CRP 01/67890',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'Uso há 2 anos e não consigo mais trabalhar sem. Os relatórios são fantásticos e me ajudam muito nas supervisões. Recomendo para todos os colegas da área.'
    },
    {
      name: 'Fabíola Arruda',
      role: 'Neuropsicóloga - CRP 03/54321',
      avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: 'A funcionalidade de evolução dos pacientes é excepcional. Consigo acompanhar o progresso de cada caso de forma muito mais organizada e profissional.'
    }
  ];

  const stats = [
    { number: '2.000+', label: 'Psicólogos Ativos' },
    { number: '2.000+', label: 'Pacientes Atendidos' },
    { number: '98%', label: 'Satisfação' },
    { number: '24/7', label: 'Suporte' }
  ];



  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="header-content">
          <div className="logo-container">
              <img src={logoGestao} alt="Gestão PSI" />
            </div>
          <Button 
            className="login-button-discrete"
            onClick={handleLogin}
            variant="text"
            startIcon={<Login />}
            size="small"
          >
            Entrar no Sistema
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <div className="hero-content">
                <Chip 
                  label="✨ Mais de 2.000 psicólogos confiam em nós" 
                  className="hero-chip"
                  color="primary"
                />
                <Typography variant="h1" component="h1" className="hero-title">
                  A Plataforma Completa para
                  <span className="highlight"> Psicólogos Modernos</span>
                </Typography>
                <Typography variant="h5" component="p" className="hero-subtitle">
                  Transforme sua prática clínica com tecnologia de ponta. 
                  Gestão completa de pacientes, agendamento inteligente e relatórios profissionais.
                </Typography>
                <Box className="hero-buttons">
                  <Button 
                    className="cta-button-primary"
                    onClick={handleLogin}
                    variant="contained"
                    size="large"
                  >
                    Começar Gratuitamente
                  </Button>
                  <Button 
                    className="cta-button-secondary"
                    variant="outlined"
                    size="large"
                  >
                    Ver Demonstração
                  </Button>
                </Box>
                <Typography variant="body2" className="hero-note">
                  ✅ Teste grátis por 30 dias • ✅ Sem cartão de crédito • ✅ Suporte incluído
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="hero-image">
                <div className="dashboard-preview">
                  <div className="preview-header">
                    <div className="preview-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <Typography variant="caption">Gestão PSI - Dashboard</Typography>
                  </div>
                  <div className="preview-content">
                    <div className="preview-stats">
                      <div className="stat-card">
                        <TrendingUp color="primary" />
                        <Typography variant="h6">127</Typography>
                        <Typography variant="caption">Pacientes Ativos</Typography>
                      </div>
                      <div className="stat-card">
                        <Schedule color="primary" />
                        <Typography variant="h6">23</Typography>
                        <Typography variant="caption">Hoje</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <div className="stat-item">
                  <Typography variant="h3" component="div" className="stat-number">
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" className="stat-label">
                    {stat.label}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container maxWidth="lg">
          <div className="section-header">
            <Typography variant="h2" component="h2" className="section-title">
              Tudo que você precisa para uma prática de sucesso
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              Ferramentas profissionais desenvolvidas especificamente para psicólogos
            </Typography>
          </div>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card className="feature-card-modern">
                  <CardContent>
                    <div className="feature-icon-modern">
                      {feature.icon}
                    </div>
                    <Typography variant="h6" component="h3" className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="feature-description">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <Container maxWidth="lg">
          <div className="section-header">
            <Typography variant="h2" component="h2" className="section-title">
              Nossos Valores
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              Os princípios que guiam nossa missão de transformar a psicologia
            </Typography>
          </div>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card className="value-card">
                <CardContent>
                  <div className="value-icon">
                     <Favorite sx={{ fontSize: 48, color: '#e91e63' }} />
                   </div>
                  <Typography variant="h5" component="h3" className="value-title">
                    Cuidado Humano
                  </Typography>
                  <Typography variant="body1" className="value-description">
                    Priorizamos o bem-estar dos profissionais e pacientes, oferecendo ferramentas que humanizam o atendimento psicológico.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="value-card">
                <CardContent>
                  <div className="value-icon">
                    <Security sx={{ fontSize: 48, color: '#2196f3' }} />
                  </div>
                  <Typography variant="h5" component="h3" className="value-title">
                    Segurança Total
                  </Typography>
                  <Typography variant="body1" className="value-description">
                    Garantimos a máxima proteção dos dados sensíveis, seguindo rigorosamente as normas de privacidade e ética profissional.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className="value-card">
                <CardContent>
                  <div className="value-icon">
                    <TrendingUp sx={{ fontSize: 48, color: '#4caf50' }} />
                  </div>
                  <Typography variant="h5" component="h3" className="value-title">
                    Crescimento Contínuo
                  </Typography>
                  <Typography variant="body1" className="value-description">
                    Evoluímos constantemente nossa plataforma, incorporando as melhores práticas e inovações da área.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>

        {/* Pricing Section */}
        <section className="pricing-section">
          <Container maxWidth="lg">
            <div className="section-header">
              <Typography variant="h2" className="section-title">
                Nossos Preços
              </Typography>
              <Typography variant="h6" className="section-subtitle">
                Escolha o plano ideal para sua prática profissional
              </Typography>
            </div>
            <Grid container spacing={4} justifyContent="center">
              {/* Plano Básico */}
              <Grid item xs={12} md={4}>
                <Card className="pricing-card">
                  <CardContent className="pricing-content">
                    <Typography variant="h5" className="pricing-plan-name">
                      Básico
                    </Typography>
                    <Typography variant="body2" className="pricing-plan-subtitle">
                      Ideal para profissionais iniciantes
                    </Typography>
                    <div className="pricing-price">
                      <Typography variant="h3" className="pricing-amount">
                        R$ 29
                      </Typography>
                      <Typography variant="body2" className="pricing-period">
                        /mês
                      </Typography>
                    </div>
                    <div className="pricing-features">
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Até 50 pacientes</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Agendamento básico</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Prontuário eletrônico</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Relatórios simples</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Suporte por email</Typography>
                      </div>
                    </div>
                    <Button variant="outlined" className="pricing-button pricing-button-basic" fullWidth>
                      Teste Grátis por 30 dias
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Plano Profissional */}
              <Grid item xs={12} md={4}>
                <Card className="pricing-card pricing-card-popular">
                  <div className="pricing-popular-badge">
                    <Typography variant="caption">Mais Popular</Typography>
                  </div>
                  <CardContent className="pricing-content">
                    <Typography variant="h5" className="pricing-plan-name">
                      Profissional
                    </Typography>
                    <Typography variant="body2" className="pricing-plan-subtitle">
                      Para profissionais estabelecidos
                    </Typography>
                    <div className="pricing-price">
                      <Typography variant="h3" className="pricing-amount">
                        R$ 59
                      </Typography>
                      <Typography variant="body2" className="pricing-period">
                        /mês
                      </Typography>
                    </div>
                    <div className="pricing-features">
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Até 200 pacientes</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Agendamento avançado</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Prontuário completo</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Relatórios avançados</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Controle financeiro</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Suporte prioritário</Typography>
                      </div>
                    </div>
                    <Button variant="contained" className="pricing-button pricing-button-professional" fullWidth>
                      Teste Grátis por 14 dias
                    </Button>
                  </CardContent>
                </Card>
              </Grid>

              {/* Plano Premium */}
              <Grid item xs={12} md={4}>
                <Card className="pricing-card">
                  <CardContent className="pricing-content">
                    <Typography variant="h5" className="pricing-plan-name">
                      Premium
                    </Typography>
                    <Typography variant="body2" className="pricing-plan-subtitle">
                      Para clínicas e consultórios
                    </Typography>
                    <div className="pricing-price">
                      <Typography variant="h3" className="pricing-amount">
                        R$ 99
                      </Typography>
                      <Typography variant="body2" className="pricing-period">
                        /mês
                      </Typography>
                    </div>
                    <div className="pricing-features">
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Pacientes ilimitados</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Múltiplos profissionais</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Gestão completa</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Analytics avançados</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">API personalizada</Typography>
                      </div>
                      <div className="pricing-feature">
                        <CheckCircle className="pricing-feature-icon" />
                        <Typography variant="body2">Suporte 24/7</Typography>
                      </div>
                    </div>
                    <Button variant="outlined" className="pricing-button pricing-button-premium" fullWidth>
                      Falar com Vendas
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <Box className="pricing-guarantee">
              <Typography variant="body1" className="pricing-guarantee-text">
                ✅ Teste grátis por 30 dias • ✅ Sem compromisso • ✅ Cancele quando quiser
              </Typography>
            </Box>
          </Container>
        </section>

        {/* Benefits Section */}
        <section className="benefits-section">
          <Container maxWidth="lg">
            <div className="section-header">
              <Typography variant="h2" className="section-title">
                Por que escolher o Gestão PSI?
              </Typography>
              <Typography variant="h6" className="section-subtitle">
                Transforme sua prática psicológica com nossa plataforma completa
              </Typography>
            </div>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <div className="benefits-list">
                  <div className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <Typography variant="body1">
                      Interface intuitiva e fácil de usar
                    </Typography>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <Typography variant="body1">
                      Segurança total dos dados dos pacientes
                    </Typography>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <Typography variant="body1">
                      Relatórios detalhados e insights valiosos
                    </Typography>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <Typography variant="body1">
                      Suporte técnico especializado 24/7
                    </Typography>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <Typography variant="body1">
                      Economia de até 70% do tempo administrativo
                    </Typography>
                  </div>
                  <div className="benefit-item">
                    <CheckCircle className="benefit-icon" />
                    <Typography variant="body1">
                      Conformidade total com LGPD e CFP
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="benefits-image">
                  <div className="floating-card">
                    <Typography variant="h6" style={{ color: '#1e293b', marginBottom: '0.5rem' }}>
                      Economia de Tempo
                    </Typography>
                    <Typography variant="body2" style={{ color: '#64748b' }}>
                      Até 70% menos tempo em tarefas administrativas
                    </Typography>
                  </div>
                  <div className="floating-card">
                    <Typography variant="h6" style={{ color: '#1e293b', marginBottom: '0.5rem' }}>
                      Satisfação do Cliente
                    </Typography>
                    <Typography variant="body2" style={{ color: '#64748b' }}>
                      98% de aprovação dos profissionais
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Container>
        </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container maxWidth="lg">
          <div className="section-header">
            <Typography variant="h2" component="h2" className="section-title">
              O que nossos usuários dizem
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              Depoimentos reais de psicólogos que transformaram sua prática
            </Typography>
          </div>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card className="testimonial-card">
                  <CardContent>
                    <div className="testimonial-header">
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{
                          width: 60,
                          height: 60,
                          border: '3px solid #fff',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          bgcolor: '#667eea'
                        }}
                      >
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <div>
                        <Typography variant="h6" className="testimonial-name">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" className="testimonial-role">
                          {testimonial.role}
                        </Typography>
                        <Rating value={testimonial.rating} readOnly size="small" />
                      </div>
                    </div>
                    <Typography variant="body1" className="testimonial-text">
                      "{testimonial.text}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container maxWidth="md">
          <div className="cta-content">
            <Typography variant="h2" component="h2" className="cta-title">
              Pronto para transformar sua prática?
            </Typography>
            <Typography variant="h6" className="cta-subtitle">
              Junte-se a mais de 2.000 psicólogos que já revolucionaram seu atendimento
            </Typography>
            <Box className="cta-buttons">
              <Button 
                className="cta-button-primary"
                onClick={handleLogin}
                variant="contained"
                size="large"
              >
                Começar Agora - Grátis
              </Button>
            </Box>
            <Typography variant="body2" className="cta-note">
              30 dias grátis • Sem compromisso • Cancele quando quiser
            </Typography>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <div className="footer-brand">
                <img src={logoGestao} alt="Gestão PSI" className="footer-logo" />
                <Typography variant="body2" className="footer-description">
                  A plataforma completa para gestão de clínicas de psicologia. 
                  Tecnologia a serviço do cuidado humano.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={4}>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" className="footer-title">Produto</Typography>
                  <ul className="footer-links">
                    <li>Funcionalidades</li>
                    <li>Preços</li>
                    <li>Segurança</li>
                    <li>Integrações</li>
                  </ul>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" className="footer-title">Suporte</Typography>
                  <ul className="footer-links">
                    <li>Central de Ajuda</li>
                    <li>Treinamentos</li>
                    <li>Contato</li>
                    <li>Status</li>
                  </ul>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" className="footer-title">Empresa</Typography>
                  <ul className="footer-links">
                    <li>Sobre Nós</li>
                    <li>Blog</li>
                    <li>Carreiras</li>
                    <li>Imprensa</li>
                  </ul>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="h6" className="footer-title">Legal</Typography>
                  <ul className="footer-links">
                    <li>Privacidade</li>
                    <li>Termos</li>
                    <li>LGPD</li>
                    <li>Cookies</li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <div className="footer-bottom">
            <Typography variant="body2" className="footer-copyright">
              © 2024 Gestão PSI. Todos os direitos reservados.
            </Typography>
            <div className="footer-social">
              <Typography variant="body2">
                Desenvolvido com ❤️ para psicólogos brasileiros
              </Typography>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;