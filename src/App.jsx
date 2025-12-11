import React, { useState } from 'react';
import './index.css'; 
import { 
  LayoutDashboard, Users, FileSpreadsheet, 
  GitCommit, AlertTriangle, CheckCircle, Clock, 
  Search, Filter, MoreHorizontal, User, FileText,
  Map, Bell, LogOut, Upload, Zap,
  ChevronRight, Mail, Phone, Plus, Trash2, Edit,
  Settings, BookOpen, Shield, Layers, Calendar,
  TrendingUp, Activity, MapPin, X, Save, Eye, FileCheck
} from 'lucide-react';

// --- MOCK DATA ---

const DASHBOARD_DATA = {
  kpis: {
    processos_ativos: 14,
    candidatos_total: 28450,
    vagas_preenchidas: "85%",
    alertas_criticos: 3
  },
  heatmap_dres: [
    { nome: 'DRE Belém', candidatos: 12500, status: 'crítico' },
    { nome: 'DRE Ananindeua', candidatos: 8200, status: 'alto' },
    { nome: 'DRE Castanhal', candidatos: 4500, status: 'medio' },
    { nome: 'DRE Marabá', candidatos: 3100, status: 'medio' },
  ],
  analises_criticas: [
    { id: 1, processo: 'PSS 07/2025', problema: 'Atraso na Análise Documental', setor: 'Comissão Avaliadora', tempo: '2 dias' },
    { id: 2, processo: 'PSS Estagiários', problema: 'Alto índice de recursos', setor: 'Jurídico', tempo: '5 horas' },
  ]
};

const PROCESSOS_MOCK = [
  { id: 1, nome: 'PSS 07/2025 - PROFESSOR NIVEL SUPERIOR', periodo: '17/11/2025 - 14/12/2025', fase_atual: 'Análise Documental', progresso: 45, permitir_alteracao: false },
  { id: 2, nome: 'PSS Estagiários 06/2025', periodo: '08/09/2025 - 10/09/2025', fase_atual: 'Homologado', progresso: 100, permitir_alteracao: false },
];

const CANDIDATOS_MOCK = [
  { 
    id: 1, 
    nome: 'CARLOS OLIVEIRA DA SILVA', 
    cpf: '987.654.321-00', 
    email: 'carlos.silva@email.com', 
    telefone: '(91) 98877-6655', 
    processo: 'PSS 07/2025 - PROFESSOR', 
    cargo: 'Professor de Matemática',
    localidade: 'Belém - Escola Estadual A',
    status: 'Classificado',
    perfil: 'Ampla Concorrência',
    data_inscricao: '20/11/2025',
    documentos: ['RG', 'Diploma', 'Histórico', 'Título de Eleitor'],
    historico: [
      { data: '22/11/2025', evento: 'Inscrição Confirmada' },
      { data: '25/11/2025', evento: 'Documentação em Análise' },
      { data: '28/11/2025', evento: 'Documentação Aprovada' }
    ]
  },
  { 
    id: 2, 
    nome: 'ANA BEATRIZ SOUZA', 
    cpf: '123.456.789-11', 
    email: 'ana.bia@email.com', 
    telefone: '(91) 99111-2233', 
    processo: 'PSS Estagiários 06/2025', 
    cargo: 'Estagiário de Pedagogia',
    localidade: 'Ananindeua - Sede',
    status: 'Em Análise',
    perfil: 'PCD',
    data_inscricao: '10/09/2025',
    documentos: ['RG', 'Declaração de Matrícula', 'Laudo Médico'],
    historico: [
      { data: '10/09/2025', evento: 'Inscrição Realizada' }
    ]
  },
  { 
    id: 3, 
    nome: 'MARCOS VINICIUS COSTA', 
    cpf: '456.789.123-44', 
    email: 'marcos.v@email.com', 
    telefone: '(94) 98100-5544', 
    processo: 'PSS 07/2025 - PROFESSOR', 
    cargo: 'Professor de Física',
    localidade: 'Marabá - Escola B',
    status: 'Desclassificado',
    perfil: 'Cotista Racial',
    data_inscricao: '21/11/2025',
    documentos: ['RG', 'Diploma'],
    historico: [
      { data: '21/11/2025', evento: 'Inscrição Realizada' },
      { data: '30/11/2025', evento: 'Documentação Reprovada (Falta de Diploma)' }
    ]
  },
];

// --- COMPONENTES VISUAIS ---

const StatCard = ({ title, value, icon: Icon, color, subtext, alert }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border ${alert ? 'border-red-200 bg-red-50' : 'border-slate-100'} hover:shadow-md transition-all`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className={`text-3xl font-extrabold ${alert ? 'text-red-600' : 'text-slate-800'}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon size={24} className={alert ? 'text-red-600' : 'text-slate-700'} />
      </div>
    </div>
    {subtext && (
      <div className="mt-3 flex items-center text-xs font-medium text-slate-500">
        {alert ? <AlertTriangle size={12} className="mr-1 text-red-500"/> : <TrendingUp size={12} className="mr-1 text-emerald-500"/>}
        {subtext}
      </div>
    )}
  </div>
);

// --- VISÃO DASHBOARD ---
const DashboardView = () => (
  <div className="space-y-6 animate-fadeIn pb-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Processos Ativos" value={DASHBOARD_DATA.kpis.processos_ativos} icon={Layers} color="bg-blue-100 text-blue-600" />
      <StatCard title="Total de Candidatos" value={DASHBOARD_DATA.kpis.candidatos_total.toLocaleString()} icon={Users} color="bg-indigo-100 text-indigo-600" />
      <StatCard title="Vagas Preenchidas" value={DASHBOARD_DATA.kpis.vagas_preenchidas} icon={CheckCircle} color="bg-emerald-100 text-emerald-600" />
      <StatCard title="Pontos de Atenção" value={DASHBOARD_DATA.kpis.alertas_criticos} icon={AlertTriangle} color="bg-red-100 text-red-600" alert={true} />
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Mapa de Calor (DREs)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {DASHBOARD_DATA.heatmap_dres.map((dre, idx) => (
          <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-bold uppercase text-slate-500">{dre.nome}</span>
            <span className="block text-xl font-bold text-slate-800 mt-1">{dre.candidatos.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- VISÃO GESTÃO DE PROCESSOS ---
const ProcessManagementView = () => (
  <div className="space-y-6 animate-fadeIn">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Gerenciamento dos Processos</h2>
        <p className="text-slate-500 text-sm mt-1">Administre editais e fases de seleção.</p>
      </div>
      <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all">
        <Plus size={20} /><span>Cadastrar Processo</span>
      </button>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Nome do Processo</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Fase Atual</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {PROCESSOS_MOCK.map((proc) => (
            <tr key={proc.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-5 font-medium text-slate-700">{proc.nome}</td>
              <td className="px-6 py-5 text-sm text-blue-600 font-bold">{proc.fase_atual}</td>
              <td className="px-6 py-5 text-right">
                <button className="p-2 text-slate-400 hover:text-blue-600"><Edit size={18}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- VISÃO GESTÃO DE INSCRITOS (Candidato 360) ---
const CandidateManagementView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const filteredCandidates = CANDIDATOS_MOCK.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.cpf.includes(searchTerm) ||
    c.processo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setEditData(candidate);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Aqui viria a lógica de salvar no backend (Supabase/API)
    alert(`Dados de ${editData.nome} salvos com sucesso!`);
    setIsEditing(false);
    // Atualizar estado local se necessário
  };

  // Sub-componente: Detalhes do Candidato (360)
  if (selectedCandidate) {
    return (
      <div className="animate-fadeIn space-y-6">
        {/* Header do Perfil */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSelectedCandidate(null)} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
              <ChevronRight size={20} className="rotate-180 text-slate-600"/>
            </button>
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 border-2 border-white shadow-md">
              {selectedCandidate.nome.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{selectedCandidate.nome}</h2>
              <p className="text-sm text-slate-500 font-mono">CPF: {selectedCandidate.cpf}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                selectedCandidate.status === 'Classificado' ? 'bg-emerald-100 text-emerald-700' : 
                selectedCandidate.status === 'Desclassificado' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {selectedCandidate.status}
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-50">Cancelar</button>
                <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 flex items-center shadow-lg shadow-emerald-500/20">
                  <Save size={18} className="mr-2"/> Salvar Alterações
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center shadow-lg shadow-blue-500/20">
                <Edit size={18} className="mr-2"/> Editar Dados
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Dados Pessoais e Contato (Editável) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
              <User size={20} className="mr-2 text-blue-500"/> Dados Cadastrais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">E-mail</label>
                {isEditing ? (
                  <input type="email" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} className="w-full p-2 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                ) : (
                  <div className="flex items-center text-slate-800 font-medium p-2 bg-slate-50 rounded-lg border border-transparent"><Mail size={16} className="mr-2 text-slate-400"/> {selectedCandidate.email}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Telefone / WhatsApp</label>
                {isEditing ? (
                  <input type="text" value={editData.telefone} onChange={(e) => setEditData({...editData, telefone: e.target.value})} className="w-full p-2 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                ) : (
                  <div className="flex items-center text-slate-800 font-medium p-2 bg-slate-50 rounded-lg border border-transparent"><Phone size={16} className="mr-2 text-slate-400"/> {selectedCandidate.telefone}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Perfil de Inscrição</label>
                <div className="p-2 text-slate-800">{selectedCandidate.perfil}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1">Data Inscrição</label>
                <div className="p-2 text-slate-800">{selectedCandidate.data_inscricao}</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <MapPin size={20} className="mr-2 text-indigo-500"/> Processo e Localidade
              </h3>
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase">Processo Seletivo</span>
                    <p className="font-bold text-indigo-900">{selectedCandidate.processo}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase">Cargo Pretendido</span>
                    <p className="font-bold text-indigo-900">{selectedCandidate.cargo}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase">Lotação / Escola</span>
                    <p className="font-bold text-indigo-900">{selectedCandidate.localidade}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 2: Histórico e Documentos (Lateral) */}
          <div className="space-y-6">
            {/* Documentos */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <FileText size={20} className="mr-2 text-orange-500"/> Documentos
              </h3>
              <ul className="space-y-2">
                {selectedCandidate.documentos.map((doc, i) => (
                  <li key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-700 transition-colors cursor-pointer group">
                    <span className="flex items-center"><FileCheck size={16} className="mr-2 text-slate-400 group-hover:text-orange-500"/> {doc}</span>
                    <Eye size={16} className="opacity-0 group-hover:opacity-100"/>
                  </li>
                ))}
              </ul>
            </div>

            {/* Linha do Tempo */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-slate-500"/> Linha do Tempo
              </h3>
              <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pl-6 pb-2">
                {selectedCandidate.historico.map((hist, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm"></div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">{hist.data}</span>
                    <p className="text-sm font-medium text-slate-800">{hist.evento}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Visão Lista (Tabela de Busca)
  return (
    <div className="animate-fadeIn space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Gestão de Inscritos</h2>
            <p className="text-slate-500 text-sm mt-1">Pesquise, visualize e gerencie os candidatos.</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por Nome, CPF ou Processo..." 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Candidato / CPF</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Processo Seletivo</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cargo / Localidade</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCandidates.length > 0 ? filteredCandidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => handleSelectCandidate(cand)}>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-slate-800">{cand.nome}</p>
                      <p className="text-xs text-slate-500 font-mono">{cand.cpf}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{cand.processo}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="block font-medium">{cand.cargo}</span>
                    <span className="text-xs text-slate-400">{cand.localidade}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      cand.status === 'Classificado' ? 'bg-emerald-100 text-emerald-700' : 
                      cand.status === 'Desclassificado' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {cand.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Eye size={18}/>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-400">
                    Nenhum candidato encontrado para "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('inscritos'); // Aba padrão alterada para 'inscritos' para teste imediato

  const SidebarItem = ({ icon: Icon, label, id }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 mb-1 text-sm ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20 font-medium' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={18} />
      <span className="truncate">{label}</span>
    </button>
  );

  const SidebarGroup = ({ title, children }) => (
    <div className="mb-6">
      <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 opacity-80">{title}</p>
      {children}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col hidden md:flex shadow-2xl z-50">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-lg">P</div>
            <div className="leading-tight">
              <span className="text-lg font-bold block">SAGEP 2.0</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Gov. Pará</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <SidebarGroup title="Principal">
            <SidebarItem icon={LayoutDashboard} label="Bem-Vindo (Dashboard)" id="dashboard" />
            <SidebarItem icon={Layers} label="Gestão de Processos" id="processos" />
          </SidebarGroup>

          <SidebarGroup title="Inscrições & Candidatos">
            <SidebarItem icon={Users} label="Gestão de Inscritos" id="inscritos" />
            <SidebarItem icon={Search} label="Pesquisar Candidatos" id="pesquisa" />
            <SidebarItem icon={User} label="Visualizar Candidato" id="visualizar" />
          </SidebarGroup>

          <SidebarGroup title="Análise & Avaliação">
            <SidebarItem icon={FileText} label="Análise de Documentos" id="docs" />
            <SidebarItem icon={BookOpen} label="Análise de Plano" id="plano" />
            <SidebarItem icon={CheckCircle} label="Pré Avaliação" id="pre" />
          </SidebarGroup>

          <SidebarGroup title="Administrativo">
            <SidebarItem icon={Map} label="Vincular Localidades" id="local" />
            <SidebarItem icon={AlertTriangle} label="Recursos" id="recursos" />
            <SidebarItem icon={FileSpreadsheet} label="Relatórios" id="relatorios" />
            <SidebarItem icon={Shield} label="Segurança" id="seguranca" />
          </SidebarGroup>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center justify-center space-x-2 text-red-400 hover:text-white hover:bg-red-500/20 transition-colors w-full px-4 py-2 rounded-lg text-sm font-medium">
            <LogOut size={16} />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {activeTab === 'dashboard' ? 'Visão Estratégica' : 
               activeTab === 'processos' ? 'Processos Seletivos' : 
               activeTab === 'inscritos' ? 'Candidato 360º' : 'Painel Administrativo'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              <span className="mr-2 hidden sm:inline">Bem-vindo,</span>
              <strong className="text-slate-800 uppercase">LUAN GIULIANO</strong>
            </div>
            
            <button className="p-2 text-slate-400 hover:text-blue-600 relative transition-colors rounded-full hover:bg-slate-50">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          {activeTab === 'dashboard' ? (
            <DashboardView />
          ) : activeTab === 'processos' ? (
            <ProcessManagementView />
          ) : activeTab === 'inscritos' ? (
            <CandidateManagementView />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-fadeIn">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Settings size={32} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-600">Módulo em Desenvolvimento</h3>
              <p className="text-sm">Acesse "Bem-Vindo", "Gestão de Processos" ou "Gestão de Inscritos".</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}