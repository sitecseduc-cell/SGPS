import React, { useState } from 'react';
import './index.css'; 
import { 
  LayoutDashboard, Users, FileSpreadsheet, 
  GitCommit, AlertTriangle, CheckCircle, Clock, 
  Search, Filter, MoreHorizontal, User, FileText,
  Map, Bell, LogOut, Upload, Zap,
  ChevronRight, Mail, Phone, Plus, Trash2, Edit,
  Settings, BookOpen, Shield, Layers, Calendar
} from 'lucide-react';

// --- MOCK DATA (Baseado na imagem enviada) ---
const PROCESSOS_MOCK = [
  { 
    id: 1, 
    nome: 'PSS 07/2025 - PROFESSOR NIVEL SUPERIOR', 
    periodo: '17/11/2025 - 14/12/2025', 
    fase_atual: 'Análise Documental',
    progresso: 45,
    permitir_alteracao: false 
  },
  { 
    id: 2, 
    nome: 'PSS Estagiários 06/2025', 
    periodo: '08/09/2025 - 10/09/2025', 
    fase_atual: 'Homologado',
    progresso: 100,
    permitir_alteracao: false 
  },
  { 
    id: 3, 
    nome: 'PSS Estagiários-Bolsistas - ARCON 01/2025', 
    periodo: '18/09/2025 - 23/09/2025', 
    fase_atual: 'Recursos',
    progresso: 80,
    permitir_alteracao: false 
  },
  { 
    id: 4, 
    nome: 'PSS ESTAGIÁRIOS - 05/2025', 
    periodo: '11/08/2025 - 17/08/2025', 
    fase_atual: 'Encerrado',
    progresso: 100,
    permitir_alteracao: false 
  },
  { 
    id: 5, 
    nome: 'PSS SIMPLIFICADO 04/2025 - SECTET', 
    periodo: '28/05/2025 - 08/06/2025', 
    fase_atual: 'Entrevistas',
    progresso: 60,
    permitir_alteracao: false 
  }
];

// --- COMPONENTES UI ---

const Badge = ({ status }) => {
  let colorClass = 'bg-slate-100 text-slate-700';
  if (status === 'Homologado' || status === 'Encerrado') colorClass = 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (status === 'Análise Documental') colorClass = 'bg-blue-100 text-blue-700 border-blue-200';
  if (status === 'Recursos') colorClass = 'bg-amber-100 text-amber-700 border-amber-200';

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colorClass} uppercase tracking-wider`}>
      {status}
    </span>
  );
};

// --- PÁGINA: GERENCIAMENTO DE PROCESSOS (Réplica Moderna) ---
// CORREÇÃO AQUI: Removi o espaço no nome do componente
const ProcessManagementView = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cabeçalho da Página com Ação Principal */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Gerenciamento dos Processos Seletivos</h2>
          <p className="text-slate-500 text-sm mt-1">Administre editais, prazos e fases de seleção.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105">
          <Plus size={20} />
          <span>Cadastrar Processo Seletivo</span>
        </button>
      </div>

      {/* Tabela de Processos */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Nome do Processo</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Período</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fase / Progresso</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Permitir Alteração</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PROCESSOS_MOCK.map((proc) => (
                <tr key={proc.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={18} />
                      </div>
                      <span className="font-semibold text-slate-700 text-sm">{proc.nome}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600 font-medium whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-slate-400"/>
                      {proc.periodo}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="w-full max-w-[140px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-600">{proc.fase_atual}</span>
                        <span className="text-slate-400">{proc.progresso}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${proc.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${proc.permitir_alteracao ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-500'}`}>
                      {proc.permitir_alteracao ? 'SIM' : 'NÃO'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar Fases">
                        <Layers size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Editar Processo">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- APP PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('processos'); // Padrão agora é a gestão

  // Componente de Item do Menu Lateral
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
      {/* Sidebar - Replicando os itens da imagem, mas organizados */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col hidden md:flex shadow-2xl z-50">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            {/* Logo Simplificado */}
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
            <SidebarItem icon={Users} label="Quantidade de Inscritos" id="qtd" />
          </SidebarGroup>

          <SidebarGroup title="Análise & Avaliação">
            <SidebarItem icon={FileText} label="Análise de Documentos" id="docs" />
            <SidebarItem icon={BookOpen} label="Análise de Plano de Aula" id="plano" />
            <SidebarItem icon={CheckCircle} label="Pré Avaliação" id="pre" />
            <SidebarItem icon={Phone} label="Entrevista" id="entrevista" />
          </SidebarGroup>

          <SidebarGroup title="Administrativo">
            <SidebarItem icon={Map} label="Vincular Localidades" id="local" />
            <SidebarItem icon={AlertTriangle} label="Formulário de Recursos" id="recursos" />
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
        {/* Topbar com Saudação do Usuário */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {activeTab === 'processos' ? 'Processo Seletivo Simplificado' : 'Painel Administrativo'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm text-slate-600 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              <span className="mr-2">Bem-vindo,</span>
              <strong className="text-slate-800 uppercase">LUAN GIULIANO ARAUJO FURTADO</strong>
            </div>
            
            <button className="p-2 text-slate-400 hover:text-blue-600 relative transition-colors rounded-full hover:bg-slate-50">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Área de Conteúdo */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'processos' ? (
            <ProcessManagementView />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-fadeIn">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Settings size={32} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-600">Módulo em Desenvolvimento</h3>
              <p className="text-sm">Acesse "Gestão de Processos" para ver a tela principal.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}