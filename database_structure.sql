-- =====================================================
-- ESTRUTURA DO BANCO DE DADOS - GESTÃO PSI
-- =====================================================

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS gestao_psi 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE gestao_psi;

-- =====================================================
-- TABELA: usuarios
-- =====================================================
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    grupo_id INT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: grupos_usuarios
-- =====================================================
CREATE TABLE grupos_usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    -- Permissões
    clientes BOOLEAN DEFAULT FALSE,
    agendamentos BOOLEAN DEFAULT FALSE,
    evolucao BOOLEAN DEFAULT FALSE,
    experiencias BOOLEAN DEFAULT FALSE,
    despesas BOOLEAN DEFAULT FALSE,
    tipos_cliente BOOLEAN DEFAULT FALSE,
    tipos_despesa BOOLEAN DEFAULT FALSE,
    usuarios BOOLEAN DEFAULT FALSE,
    grupos_usuarios BOOLEAN DEFAULT FALSE,
    logs BOOLEAN DEFAULT FALSE,
    utilidades BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: tipos_cliente
-- =====================================================
CREATE TABLE tipos_cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    cor VARCHAR(7) DEFAULT '#1976d2',
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: clientes
-- =====================================================
CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(255) NOT NULL,
    idade INT,
    genero ENUM('masculino', 'feminino', 'outro', 'prefiro_nao_dizer'),
    estado_civil ENUM('solteiro', 'casado', 'divorciado', 'viuvo', 'uniao_estavel'),
    escolaridade ENUM('fundamental', 'medio', 'superior', 'pos_graduacao', 'mestrado', 'doutorado'),
    abordagem ENUM('cognitivo_comportamental', 'psicanalitica', 'humanistica', 'sistemica'),
    tipo_cliente_id INT,
    foto_url VARCHAR(500),
    telefone VARCHAR(20),
    email VARCHAR(255),
    endereco TEXT,
    observacoes TEXT,
    -- Configurações de atendimento
    dias_atendimento JSON, -- ['segunda', 'quarta', 'sexta']
    horarios_atendimento JSON, -- [{'inicio': '09:00', 'fim': '10:00'}, ...]
    duracao_sessao INT DEFAULT 50, -- em minutos
    valor_sessao DECIMAL(10,2),
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_cliente_id) REFERENCES tipos_cliente(id)
);

-- =====================================================
-- TABELA: agendamentos
-- =====================================================
CREATE TABLE agendamentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    duracao INT DEFAULT 50, -- em minutos
    status ENUM('agendado', 'confirmado', 'realizado', 'cancelado', 'faltou') DEFAULT 'agendado',
    observacoes TEXT,
    valor DECIMAL(10,2),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    INDEX idx_data_hora (data_hora),
    INDEX idx_cliente_data (cliente_id, data_hora)
);

-- =====================================================
-- TABELA: evolucao
-- =====================================================
CREATE TABLE evolucao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    agendamento_id INT,
    data_sessao DATE NOT NULL,
    conteudo TEXT NOT NULL,
    objetivos TEXT,
    tecnicas_utilizadas TEXT,
    observacoes TEXT,
    proximos_passos TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (agendamento_id) REFERENCES agendamentos(id),
    INDEX idx_cliente_data (cliente_id, data_sessao)
);

-- =====================================================
-- TABELA: experiencias
-- =====================================================
CREATE TABLE experiencias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cliente_id INT NOT NULL,
    positiva TEXT,
    negativa TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    INDEX idx_cliente (cliente_id)
);

-- =====================================================
-- TABELA: tipos_despesa
-- =====================================================
CREATE TABLE tipos_despesa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    cor VARCHAR(7) DEFAULT '#f44336',
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: despesas
-- =====================================================
CREATE TABLE despesas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_despesa_id INT NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_despesa DATE NOT NULL,
    observacoes TEXT,
    comprovante_url VARCHAR(500),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_despesa_id) REFERENCES tipos_despesa(id),
    INDEX idx_data (data_despesa),
    INDEX idx_tipo_data (tipo_despesa_id, data_despesa)
);

-- =====================================================
-- TABELA: logs_sistema
-- =====================================================
CREATE TABLE logs_sistema (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    acao VARCHAR(100) NOT NULL,
    tabela_afetada VARCHAR(50),
    registro_id INT,
    dados_anteriores JSON,
    dados_novos JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    INDEX idx_usuario (usuario_id),
    INDEX idx_acao (acao),
    INDEX idx_data (criado_em)
);

-- =====================================================
-- FOREIGN KEYS
-- =====================================================
ALTER TABLE usuarios 
ADD FOREIGN KEY (grupo_id) REFERENCES grupos_usuarios(id);

-- =====================================================
-- DADOS INICIAIS
-- =====================================================

-- Inserir grupo administrador
INSERT INTO grupos_usuarios (
    nome, descricao, clientes, agendamentos, evolucao, experiencias, 
    despesas, tipos_cliente, tipos_despesa, usuarios, grupos_usuarios, 
    logs, utilidades
) VALUES (
    'Administrador', 
    'Acesso total ao sistema',
    TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE
);

-- Inserir grupo psicólogo
INSERT INTO grupos_usuarios (
    nome, descricao, clientes, agendamentos, evolucao, experiencias, 
    despesas, tipos_cliente, tipos_despesa, usuarios, grupos_usuarios, 
    logs, utilidades
) VALUES (
    'Psicólogo', 
    'Acesso às funcionalidades clínicas',
    TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, FALSE, TRUE
);

-- Inserir grupo recepcionista
INSERT INTO grupos_usuarios (
    nome, descricao, clientes, agendamentos, evolucao, experiencias, 
    despesas, tipos_cliente, tipos_despesa, usuarios, grupos_usuarios, 
    logs, utilidades
) VALUES (
    'Recepcionista', 
    'Acesso limitado para agendamentos',
    TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE
);

-- Inserir usuário administrador padrão
-- Senha: admin123 (hash bcrypt)
INSERT INTO usuarios (nome, email, senha, grupo_id) VALUES (
    'Administrador',
    'admin@gestao-psi.com',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    1
);

-- Inserir tipos de cliente padrão
INSERT INTO tipos_cliente (nome, descricao, cor) VALUES 
('Adulto', 'Pacientes adultos', '#1976d2'),
('Adolescente', 'Pacientes adolescentes', '#388e3c'),
('Criança', 'Pacientes infantis', '#f57c00'),
('Idoso', 'Pacientes da terceira idade', '#7b1fa2'),
('Casal', 'Terapia de casal', '#d32f2f');

-- Inserir tipos de despesa padrão
INSERT INTO tipos_despesa (nome, descricao, cor) VALUES 
('Material de Escritório', 'Papéis, canetas, etc.', '#f44336'),
('Aluguel', 'Aluguel do consultório', '#e91e63'),
('Energia Elétrica', 'Conta de luz', '#9c27b0'),
('Internet', 'Provedor de internet', '#673ab7'),
('Telefone', 'Conta telefônica', '#3f51b5'),
('Limpeza', 'Produtos de limpeza', '#2196f3'),
('Manutenção', 'Reparos e manutenções', '#00bcd4'),
('Capacitação', 'Cursos e treinamentos', '#009688'),
('Software', 'Licenças de software', '#4caf50'),
('Marketing', 'Publicidade e marketing', '#8bc34a');

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para buscas frequentes
CREATE INDEX idx_clientes_nome ON clientes(nome_completo);
CREATE INDEX idx_clientes_ativo ON clientes(ativo);
CREATE INDEX idx_agendamentos_status ON agendamentos(status);
CREATE INDEX idx_despesas_valor ON despesas(valor);
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- =====================================================
-- VIEWS ÚTEIS
-- =====================================================

-- View para relatório de agendamentos
CREATE VIEW vw_agendamentos_completo AS
SELECT 
    a.id,
    a.data_hora,
    a.duracao,
    a.status,
    a.valor,
    c.nome_completo as cliente_nome,
    c.telefone as cliente_telefone,
    tc.nome as tipo_cliente
FROM agendamentos a
JOIN clientes c ON a.cliente_id = c.id
LEFT JOIN tipos_cliente tc ON c.tipo_cliente_id = tc.id
WHERE c.ativo = TRUE;

-- View para relatório de despesas
CREATE VIEW vw_despesas_completo AS
SELECT 
    d.id,
    d.descricao,
    d.valor,
    d.data_despesa,
    td.nome as tipo_despesa,
    td.cor as tipo_cor
FROM despesas d
JOIN tipos_despesa td ON d.tipo_despesa_id = td.id
WHERE td.ativo = TRUE;

-- View para dashboard
CREATE VIEW vw_dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM clientes WHERE ativo = TRUE) as total_clientes,
    (SELECT COUNT(*) FROM agendamentos WHERE DATE(data_hora) = CURDATE()) as agendamentos_hoje,
    (SELECT COUNT(*) FROM agendamentos WHERE status = 'agendado' AND data_hora > NOW()) as agendamentos_futuros,
    (SELECT SUM(valor) FROM despesas WHERE MONTH(data_despesa) = MONTH(CURDATE()) AND YEAR(data_despesa) = YEAR(CURDATE())) as despesas_mes,
    (SELECT SUM(valor) FROM agendamentos WHERE status = 'realizado' AND MONTH(data_hora) = MONTH(CURDATE()) AND YEAR(data_hora) = YEAR(CURDATE())) as receita_mes;

-- =====================================================
-- TRIGGERS PARA AUDITORIA
-- =====================================================

-- Trigger para log de alterações em clientes
DELIMITER $$
CREATE TRIGGER tr_clientes_update 
AFTER UPDATE ON clientes
FOR EACH ROW
BEGIN
    INSERT INTO logs_sistema (
        acao, tabela_afetada, registro_id, 
        dados_anteriores, dados_novos
    ) VALUES (
        'UPDATE', 'clientes', NEW.id,
        JSON_OBJECT(
            'nome_completo', OLD.nome_completo,
            'idade', OLD.idade,
            'ativo', OLD.ativo
        ),
        JSON_OBJECT(
            'nome_completo', NEW.nome_completo,
            'idade', NEW.idade,
            'ativo', NEW.ativo
        )
    );
END$$
DELIMITER ;

-- =====================================================
-- COMENTÁRIOS FINAIS
-- =====================================================

/*
INSTRUÇÕES DE USO:

1. Execute este script em seu MySQL para criar a estrutura completa
2. Ajuste as configurações conforme necessário
3. O usuário padrão é: admin@gestao-psi.com / admin123
4. Todas as tabelas têm timestamps automáticos
5. Logs de auditoria são gerados automaticamente
6. Views facilitam relatórios e consultas

PRÓXIMOS PASSOS:
- Configurar backup automático
- Implementar rotinas de limpeza de logs antigos
- Adicionar mais triggers conforme necessário
- Configurar usuários específicos do banco
*/