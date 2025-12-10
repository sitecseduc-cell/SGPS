import React, { useState } from 'react';
import './index.css'; 
import { 
  LayoutDashboard, Users, KanbanSquare, FileSpreadsheet, 
  GitCommit, AlertTriangle, CheckCircle, Clock, 
  Search, Filter, MoreHorizontal, User, FileText,
  TrendingUp, Map, Bell, LogOut, Upload, Zap,
  ChevronRight, Mail, Phone
} from 'lucide-react';

// --- MOCK DATA (Simulando o Backend) ---
const KPIS = {
  activeProcesses: 14,
  totalCandidates: 28450,
  vacanciesFilled: "85%",
  delayedProcesses: 2
};

const KANBAN_DATA = {
  planejamento: [{ id: 1, title: 'PSS Matemática 2025', due: '2024-12-20' }],
  publicado: [{ id: 2, title: 'PSS Merendeiras', due: '2024-12-15' }],
  inscricoes: [{ id: 3, title: 'Vigia Escolar Zona Rural', due: '2024-12-18' }],
  analise: [{ id: 4, title: 'Prof. Língua Portuguesa', due: '2024-12-10' }],
  preliminar: [],
  recursos: [{ id: 5, title: 'Coordenação Pedagógica', due: '2024-12-05', delay: true }],
  homologacao: [{ id: 6, title: 'Psicólogos Escolares', due: '2024-11-30' }]
};

const CANDIDATES_MOCK = [
  { id: 1, name: 'Ana Souza Silva', cpf: '001.***.***-01', history: '3 Inscrições', status: 'Aprovado', warnings: 0 },
  { id: 2, name: 'Carlos Eduardo Lima', cpf: '002.***.***-02', history: '1 Inscrição', status: 'Em Análise', warnings: 0 },
  { id: 3, name: 'Maria Fátima Oliveira', cpf: '003.***.***-03', history: '5 Inscrições', status: 'Bloqueado', warnings: 1 }, // Bloqueio administrativo
];

// --- COMPONENTES UI ---

const StatCard = ({ title, value, subtext, icon: Icon, color, delay }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-sm border ${delay ? 'border-red-200 bg-red-50' : 'border-slate-100'} transition-all hover:shadow-md`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wide">{title}</p>
        <h3 className={`text-3xl font-bold ${delay ? 'text-red-600' : 'text-slate-800'}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
        <Icon size={24} className={delay ? 'text-red-600' : 'text-slate-700'} />
      </div>
    </div>
    {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
  </div>
);

const FunnelChart = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><Filter size={18} className="mr-2"/> Funil de Seleção</h3>
    <div className="space-y-3">
      {[
        { label: 'Inscritos', val: '100%', count: 28450, color: 'bg-blue-500' },
        { label: 'Habilitados', val: '80%', count: 22760, color: 'bg-blue-400' },
        { label: 'Títulos Validados', val: '45%', count: 12800, color: 'bg-indigo-400' },
        { label: 'Classificados', val: '20%', count: 5690, color: 'bg-purple-500' },
        { label: 'Convocados', val: '5%', count: 1422, color: 'bg-emerald-500' }
      ].map((step, idx) => (
        <div key={idx} className="relative group">
          <div className="flex justify-between text-xs mb-1 font-medium text-slate-600">
            <span>{step.label}</span>
            <span>{step.count}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div className={`h-full ${step.color} rounded-full`} style={{ width: step.val }}></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HeatMap = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><Map size={18} className="mr-2"/> Mapa de Calor (Demandas)</h3>
    <div className="grid grid-cols-2 gap-4 h-48">
      {/* Mock visual do mapa */}
      <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center items-center border border-slate-200">
        <span className="text-2xl font-bold text-red-500">Belém</span>
        <span className="text-xs text-slate-500">Alta Demanda (Matemática)</span>
      </div>
      <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center items-center border border-slate-200">
        <span className="text-2xl font-bold text-amber-500">Santarém</span>
        <span className="text-xs text-slate-500">Média Demanda (Pedagogia)</span>
      </div>
      <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center items-center border border-slate-200">
        <span className="text-2xl font-bold text-green-500">Marabá</span>
        <span className="text-xs text-slate-500">Demanda Controlada</span>
      </div>
      <div className="bg-slate-50 rounded-lg p-4 flex flex-col justify-center items-center border border-slate-200">
        <span className="text-2xl font-bold text-red-500">Ananindeua</span>
        <span className="text-xs text-slate-500">Alta Demanda (Vigias)</span>
      </div>
    </div>
  </div>
);

const KanbanColumn = ({ title, items, color }) => (
  <div className="min-w-[280px] bg-slate-100 rounded-xl p-3 flex flex-col h-full mx-2">
    <div className={`flex items-center justify-between mb-3 px-2 py-1 ${color} bg-opacity-10 rounded-lg`}>
      <h4 className={`font-bold text-sm ${color.replace('bg-', 'text-').replace('100', '700')}`}>{title}</h4>
      <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">{items.length}</span>
    </div>
    <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
      {items.map(item => (
        <div key={item.id} className={`bg-white p-3 rounded-lg shadow-sm border-l-4 ${item.delay ? 'border-red-500' : 'border-blue-500'} hover:shadow-md cursor-pointer transition-all`}>
          <div className="flex justify-between items-start">
            <p className="font-semibold text-slate-700 text-sm leading-tight">{item.title}</p>
            <MoreHorizontal size={14} className="text-slate-400" />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className={`text-xs flex items-center ${item.delay ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
              <Clock size={12} className="mr-1" /> {item.due}
            </span>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px]">AS</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- COMPONENTES DAS PÁGINAS ---

const DashboardView = () => (
  <div className="space-y-6 animate-fadeIn">
    {/* KPIs */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard title="Processos Ativos" value={KPIS.activeProcesses} icon={GitCommit} color="bg-blue-100 text-blue-600" />
      <StatCard title="Candidatos Totais" value={KPIS.totalCandidates.toLocaleString()} icon={Users} color="bg-purple-100 text-purple-600" subtext="+12% essa semana" />
      <StatCard title="Vagas Preenchidas" value={KPIS.vacanciesFilled} icon={CheckCircle} color="bg-emerald-100 text-emerald-600" />
      <StatCard title="Atrasos Críticos" value={KPIS.delayedProcesses} icon={AlertTriangle} color="bg-red-100 text-red-600" delay={true} subtext="Requer atenção imediata" />
    </div>

    {/* Gráficos e Mapas */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
      <div className="lg:col-span-1">
        <FunnelChart />
      </div>
      <div className="lg:col-span-2">
        <HeatMap />
      </div>
    </div>
  </div>
);

const WorkflowView = () => (
  <div className="h-[calc(100vh-140px)] flex overflow-x-auto pb-4 animate-fadeIn">
    <KanbanColumn title="Planejamento" items={KANBAN_DATA.planejamento} color="bg-gray-200" />
    <KanbanColumn title="Edital Publicado" items={KANBAN_DATA.publicado} color="bg-blue-100" />
    <KanbanColumn title="Inscrições Abertas" items={KANBAN_DATA.inscricoes} color="bg-emerald-100" />
    <KanbanColumn title="Análise Títulos" items={KANBAN_DATA.analise} color="bg-indigo-100" />
    <KanbanColumn title="Resultado Preliminar" items={KANBAN_DATA.preliminar} color="bg-purple-100" />
    <KanbanColumn title="Fase de Recursos" items={KANBAN_DATA.recursos} color="bg-amber-100" />
    <KanbanColumn title="Homologação" items={KANBAN_DATA.homologacao} color="bg-green-100" />
  </div>
);

const CandidateCRMView = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col animate-fadeIn">
    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
      <h2 className="text-xl font-bold text-slate-800 flex items-center"><User size={24} className="mr-2 text-blue-600"/> Candidato 360º</h2>
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
        <input type="text" placeholder="Buscar por CPF ou Nome..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>
    
    <div className="flex-1 overflow-auto p-6">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 sticky top-0">
          <tr>
            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Candidato</th>
            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Histórico</th>
            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Status Geral</th>
            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Pendências</th>
            <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {CANDIDATES_MOCK.map((cand) => (
            <tr key={cand.id} className={`hover:bg-slate-50 transition-colors ${cand.warnings > 0 ? 'bg-red-50/30' : ''}`}>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 mr-3">{cand.name.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-slate-800">{cand.name}</p>
                    <p className="text-xs text-slate-500 font-mono">{cand.cpf}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 flex items-center">
                <FileText size={16} className="mr-1 text-blue-500"/> {cand.history}
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  cand.status === 'Bloqueado' ? 'bg-red-100 text-red-700' : 
                  cand.status === 'Aprovado' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {cand.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm">
                {cand.warnings > 0 ? (
                  <span className="flex items-center text-red-600 font-bold"><AlertTriangle size={16} className="mr-1"/> Processo Adm.</span>
                ) : (
                  <span className="flex items-center text-emerald-600"><CheckCircle size={16} className="mr-1"/> Nada consta</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end space-x-2">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Enviar Mensagem"><Mail size={18} /></button>
                  <button className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg" title="WhatsApp"><Phone size={18} /></button>
                  <button className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg" title="Ver Perfil Completo"><ChevronRight size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AutomationView = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
    {/* Card de Importação */}
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl mr-4"><Upload size={24}/></div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Ingestão de Dados (Crawler)</h3>
          <p className="text-sm text-slate-500">Importe planilhas antigas ou conecte ao banco legado.</p>
        </div>
      </div>
      <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
        <FileSpreadsheet size={48} className="text-slate-400 mb-4"/>
        <p className="font-medium text-slate-700">Arraste seu arquivo .CSV ou .XLSX aqui</p>
        <p className="text-xs text-slate-400 mt-2">Validação automática de duplicidade e formatação de CPF</p>
      </div>
    </div>

    {/* Card de Simulação */}
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl mr-4"><Zap size={24}/></div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">Simulador de Convocação</h3>
          <p className="text-sm text-slate-500">Calcule impacto e gere a lista automaticamente.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Cargo / Função</label>
          <select className="w-full p-2 border border-slate-200 rounded-lg"><option>Professor de Matemática - Belém</option></select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade de Vagas</label>
          <input type="number" className="w-full p-2 border border-slate-200 rounded-lg" placeholder="Ex: 50" />
        </div>
        <div className="p-4 bg-slate-50 rounded-lg mt-4">
          <p className="text-sm text-slate-600 flex justify-between"><span>Impacto Financeiro Est.:</span> <span className="font-bold">R$ 245.000,00</span></p>
          <p className="text-sm text-slate-600 flex justify-between mt-1"><span>Próximo do Ranking:</span> <span className="font-bold">105º ao 155º</span></p>
        </div>
        <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg">
          Gerar Minuta de Convocação
        </button>
      </div>
    </div>
  </div>
);

// --- APP PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const SidebarItem = ({ icon: Icon, label, id }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1 ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col hidden md:flex shadow-2xl z-50">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/30">S</div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-none">SGPS</span>
              <span className="text-xs text-blue-400 font-medium tracking-widest">SAGEP 2.0</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Estratégico</p>
          <SidebarItem icon={LayoutDashboard} label="Dashboard KPI" id="dashboard" />
          <SidebarItem icon={KanbanSquare} label="Fluxo de Trabalho" id="workflow" />
          
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-3 px-2">Operacional</p>
          <SidebarItem icon={Users} label="Candidato 360º" id="candidates" />
          <SidebarItem icon={Zap} label="Automação & IA" id="automation" />
          <SidebarItem icon={FileText} label="Auditoria & Logs" id="audit" />
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-3 hover:bg-slate-800 rounded-xl">
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-40">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {activeTab === 'dashboard' && 'Visão Estratégica'}
              {activeTab === 'workflow' && 'Gestão de Processos (Kanban)'}
              {activeTab === 'candidates' && 'CRM de Candidatos'}
              {activeTab === 'automation' && 'Automação Inteligente'}
              {activeTab === 'audit' && 'Logs de Auditoria'}
            </h1>
            <p className="text-sm text-slate-500 font-medium">Sistema de Gestão de Processos Seletivos</p>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-2 text-slate-400 hover:text-blue-600 relative transition-colors rounded-full hover:bg-blue-50">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700">Gestora SAGEP</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:shadow-lg transition-all">G</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'workflow' && <WorkflowView />}
          {activeTab === 'candidates' && <CandidateCRMView />}
          {activeTab === 'automation' && <AutomationView />}
          {activeTab === 'audit' && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <FileText size={64} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">Módulo de Auditoria em desenvolvimento...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}