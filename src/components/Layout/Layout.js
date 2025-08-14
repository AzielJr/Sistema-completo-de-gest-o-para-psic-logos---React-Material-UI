import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Collapse,
  Chip
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Settings,
  People,
  CalendarToday,
  TrendingUp,
  Assignment,
  AttachMoney,
  Build,
  ExpandLess,
  ExpandMore,
  PersonAdd,
  Category,
  MonetizationOn,
  Receipt,
  Group,
  History,
  Dashboard as DashboardIcon,
  AutoAwesome
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import logoGestao from '../../assets/logo-gestao-psi.png';

const drawerWidth = 280;

const menuItems = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/app/dashboard'
  },
  {
    title: 'Cadastros',
    icon: <People />,
    children: [
      { title: 'Clientes', icon: <PersonAdd />, path: '/app/clientes' },
      { title: 'Tipos de Cliente', icon: <Category />, path: '/app/tipos-cliente' },
    ]
  },
  {
    title: 'Agendamento',
    icon: <CalendarToday />,
    path: '/app/agendamento'
  },
  {
    title: 'Evolução',
    icon: <TrendingUp />,
    path: '/app/evolucao'
  },
  {
    title: 'Experiências',
    icon: <Assignment />,
    path: '/app/experiencias'
  },
  {
    title: 'Financeiro',
    icon: <AttachMoney />,
    children: [
      { title: 'Despesas', icon: <MonetizationOn />, path: '/app/despesas' },
      { title: 'Tipos de Despesas', icon: <Category />, path: '/app/tipos-despesa' },
      { title: 'Recebimentos', icon: <Receipt />, path: '/app/recebimentos' },
    ]
  },
  {
    title: 'Utilidades',
    icon: <Build />,
    children: [
      { title: 'Gerar Agenda Automática', icon: <AutoAwesome />, path: '/app/gerar-agenda' },
      { title: 'Usuários', icon: <Group />, path: '/app/usuarios' },
      { title: 'Grupos de Usuários', icon: <Group />, path: '/app/grupos-usuarios' },
      { title: 'LOG do Sistema', icon: <History />, path: '/app/logs' },
    ]
  }
];

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
  };

  const handleExpandClick = (title) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const renderMenuItem = (item, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.title];
    const active = item.path && isActive(item.path);

    return (
      <React.Fragment key={item.title}>
        <ListItem disablePadding sx={{ pl: level * 2 }}>
          <ListItemButton
            onClick={() => {
              if (hasChildren) {
                handleExpandClick(item.title);
              } else if (item.path) {
                handleNavigation(item.path);
              }
            }}
            selected={active}
            sx={{
              borderRadius: 1,
              mx: 1,
              py: 0.5, // Reduzindo altura dos itens
              minHeight: 36, // Altura mínima menor
              '&.Mui-selected': {
                backgroundColor: `${theme.palette.primary.main}15`,
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}20`,
                },
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: active ? theme.palette.primary.main : 'inherit',
                minWidth: 36, // Reduzindo espaço do ícone
                '& .MuiSvgIcon-root': {
                  fontSize: '1.2rem' // Ícones um pouco menores
                }
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.title}
              sx={{
                '& .MuiListItemText-primary': {
                  fontWeight: active ? 600 : 400,
                  color: active ? theme.palette.primary.main : 'inherit',
                  fontSize: '0.875rem', // Fonte menor
                  lineHeight: 1.2
                }
              }}
            />
            {hasChildren && (
              isExpanded ? <ExpandLess sx={{ fontSize: '1.2rem' }} /> : <ExpandMore sx={{ fontSize: '1.2rem' }} />
            )}
          </ListItemButton>
        </ListItem>
        
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ '& .MuiListItem-root': { py: 0.25 } }}>
              {item.children.map(child => renderMenuItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo do Sidebar */}
      <Box sx={{ p: 2, textAlign: 'center', borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 1,
          }}
        >
          <img 
            src={logoGestao} 
            alt="Gestão PSI" 
            style={{ 
              width: '160px', 
              height: '80px',
              objectFit: 'contain'
            }} 
          />
        </Box>
        <Typography variant="caption" color="text.secondary">
          Sistema de Gestão para Psicólogos
        </Typography>
      </Box>

      {/* Menu Items */}
      <Box sx={{ flex: 1, overflow: 'auto', py: 1 }}>
        <List>
          {menuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      {/* User Info no Sidebar */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={user?.foto}
            sx={{
              width: 40,
              height: 40,
              bgcolor: theme.palette.primary.main,
            }}
          >
            {user?.nome?.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
              {user?.nome}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Sistema de Gestão para Psicólogos
          </Typography>

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label="Online"
              size="small"
              color="success"
              variant="outlined"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            />
            
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
              <Avatar
                src={user?.foto}
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                {user?.nome?.charAt(0)}
              </Avatar>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {user?.nome}
              </Typography>
            </Box>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Menu */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;