// ... Mantenha o DASHBOARD_DATA e PROCESSOS_MOCK como estão ...

export const CANDIDATOS_MOCK = [
  { 
    id: 1, 
    nome: 'CARLOS OLIVEIRA DA SILVA', 
    cpf: '987.654.321-00', 
    email: 'carlos.silva@email.com', 
    telefone: '(91) 98877-6655', 
    nascimento: '15/05/1985',
    mae: 'Maria Oliveira da Silva',
    endereco: 'Av. Almirante Barroso, 1234, Marco',
    cidade: 'Belém - PA',
    processo: 'PSS 07/2025 - PROFESSOR NIVEL SUPERIOR', 
    cargo: 'Professor de Matemática',
    localidade: 'Escola Estadual A (Belém)',
    status: 'Classificado',
    perfil: 'Ampla Concorrência',
    data_inscricao: '20/11/2025',
    documentos: ['RG (Frente e Verso)', 'Diploma de Licenciatura', 'Histórico Escolar', 'Título de Eleitor', 'Comprovante de Residência'],
    historico: [
      { data: '22/11/2025 10:30', evento: 'Inscrição Confirmada', usuario: 'Sistema' },
      { data: '25/11/2025 14:15', evento: 'Documentação em Análise', usuario: 'Ana (RH)' },
      { data: '28/11/2025 09:00', evento: 'Documentação Aprovada', usuario: 'Ana (RH)' }
    ]
  },
  { 
    id: 2, 
    nome: 'ANA BEATRIZ SOUZA', 
    cpf: '123.456.789-11', 
    email: 'ana.bia@email.com', 
    telefone: '(91) 99111-2233', 
    nascimento: '20/10/2001',
    mae: 'Cláudia Souza',
    endereco: 'Rua da Providência, 55, Cidade Nova',
    cidade: 'Ananindeua - PA',
    processo: 'PSS Estagiários 06/2025', 
    cargo: 'Estagiário de Pedagogia',
    localidade: 'USE 04 (Ananindeua)',
    status: 'Em Análise',
    perfil: 'PCD',
    data_inscricao: '10/09/2025',
    documentos: ['RG', 'Declaração de Matrícula', 'Laudo Médico (CID 10)', 'Comprovante de Residência'],
    historico: [
      { data: '10/09/2025 11:00', evento: 'Inscrição Realizada', usuario: 'Sistema' }
    ]
  },
  { 
    id: 3, 
    nome: 'MARCOS VINICIUS COSTA', 
    cpf: '456.789.123-44', 
    email: 'marcos.v@email.com', 
    telefone: '(94) 98100-5544', 
    nascimento: '05/02/1990',
    mae: 'Joana Costa',
    endereco: 'Folha 28, Quadra 10, Nova Marabá',
    cidade: 'Marabá - PA',
    processo: 'PSS 07/2025 - PROFESSOR NIVEL SUPERIOR', 
    cargo: 'Professor de Física',
    localidade: 'Escola Rio Tocantins (Marabá)',
    status: 'Desclassificado',
    perfil: 'Cotista Racial',
    data_inscricao: '21/11/2025',
    documentos: ['RG', 'Diploma', 'Autodeclaração'],
    historico: [
      { data: '21/11/2025 08:45', evento: 'Inscrição Realizada', usuario: 'Sistema' },
      { data: '30/11/2025 16:20', evento: 'Documentação Reprovada (Falta de Diploma)', usuario: 'Roberto (Comissão)' }
    ]
  },
];