import React, { useState } from 'react';
import './index.css'; 

import { 
  Users, 
  FileSpreadsheet, 
  LayoutDashboard, 
  Search, 
  Filter, 
  UserPlus, 
  ArrowUpRight, 
  MoreHorizontal,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Building2,
  LogOut,
  Bell
} from 'lucide-react';

// --- DADOS DE EXEMPLO (MOCK DATA) ---
const INITIAL_EMPLOYEES = [
  { id: 1, name: 'Ana Souza Silva', cpf: '001.***.***-01', role: 'Professor AD-4', sector: 'Escola Estadual A', status: 'Ativo', lastUpdate: '06/12/2023' },
  { id: 2, name: 'Carlos Eduardo Lima', cpf: '002.***.***-02', role: 'Técnico Admin', sector: 'Sede - RH', status: 'Férias', lastUpdate: '01/12/2023' },
  { id: 3, name: 'Maria de Fátima Oliveira', cpf: '003.***.***-03', role: 'Merendeira', sector: 'Escola Estadual B', status: 'Afastado', lastUpdate: '10/11/2023' },
  { id: 4, name: 'João Pedro Santos', cpf: '004.***.***-04', role: 'Professor AD-2', sector: 'Escola Estadual A', status: 'Ativo', lastUpdate: '05/12/2023' },
  { id: 5, name: 'Lúcia Ferreira', cpf: '005.***.***-05', role: 'Coordenação', sector: 'URE 01', status: 'Pendente', lastUpdate: '06/12/2023' },
  { id: 6, name: 'Roberto Almeida', cpf: '006.***.***-06', role: 'Vigia', sector: 'Escola C', status: 'Ativo', lastUpdate: '02/12/2023' },
];

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-emerald-500 font-medium flex items-center">
        <ArrowUpRight size={16} className="mr-1" />
        {trend}
      </span>
      <span className="text-slate-400 ml-2">vs. mês passado</span>
    </div>
  </div>
);

const Badge = ({ status }) => {
  const styles = {
    'Ativo': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Férias': 'bg-blue-100 text-blue-700 border-blue-200',
    'Afastado': 'bg-red-100 text-red-700 border-red-200',
    'Pendente': 'bg-amber-100 text-amber-700 border-amber-200',
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex shadow-xl z-20">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/30">S</div>
            <span className="text-xl font-bold tracking-tight">SEDUC<span className="text-blue-500">Gestão</span></span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Sistema Integrado de RH</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={LayoutDashboard} label="Visão Geral" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={Users} label="Colaboradores" active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} />
          <SidebarItem icon={FileSpreadsheet} label="Importar Excel" active={activeTab === 'import'} onClick={() => setActiveTab('import')} />
          <SidebarItem icon={Building2} label="Lotações" active={activeTab === 'sectors'} onClick={() => setActiveTab('sectors')} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2 hover:bg-slate-800 rounded-lg">
            <LogOut size={18} />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {activeTab === 'dashboard' ? 'Painel de Controle' : 
               activeTab === 'employees' ? 'Gerenciamento de Pessoal' :
               activeTab === 'import' ? 'Importação de Dados' : 'Lotações'}
            </h1>
            <p className="text-sm text-slate-500">Bem-vindo(a), Gestora.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 relative transition-colors rounded-full hover:bg-slate-50">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-md cursor-pointer hover:bg-blue-200 transition-colors">G</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Colaboradores" value="1,248" icon={Users} color="bg-blue-500" trend="+12%" />
                <StatCard title="Aguardando Ação" value="23" icon={AlertCircle} color="bg-amber-500" trend="-5%" />
                <StatCard title="Processos Finalizados" value="156" icon={CheckCircle2} color="bg-emerald-500" trend="+8%" />
                <StatCard title="Cargos Ativos" value="42" icon={Briefcase} color="bg-purple-500" trend="0%" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-800">Movimentações Recentes</h3>
                    <button className="text-sm text-blue-600 font-medium hover:underline">Ver todas</button>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm border border-slate-100"><Users size={18} /></div>
                          <div><p className="font-medium text-slate-800">Transferência de Lotação</p><p className="text-xs text-slate-500">Ana Souza • Solicitado há 2 horas</p></div>
                        </div>
                        <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded">Pendente</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Acesso Rápido</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-3 rounded-lg flex items-center space-x-3 transition-all"><UserPlus size={18} /><span className="font-medium">Novo Contrato</span></button>
                    <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 p-3 rounded-lg flex items-center space-x-3 transition-all"><FileSpreadsheet size={18} /><span className="font-medium">Relatório Mensal</span></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-full max-w-7xl mx-auto">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium"><Filter size={18} /><span>Filtros</span></button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"><UserPlus size={18} /><span>Adicionar Novo</span></button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Colaborador</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Cargo</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Lotação</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 mr-3">{emp.name.charAt(0)}</div>
                            <div><p className="text-sm font-medium text-slate-900">{emp.name}</p><p className="text-xs text-slate-500">{emp.cpf}</p></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{emp.role}</td>
                        <td className="px-6 py-4 text-sm text-slate-600"><div className="flex items-center space-x-2"><Building2 size={14} className="text-slate-400" /><span>{emp.sector}</span></div></td>
                        <td className="px-6 py-4"><Badge status={emp.status} /></td>
                        <td className="px-6 py-4 text-sm text-slate-500">{emp.lastUpdate}</td>
                        <td className="px-6 py-4 text-right"><button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-blue-600 transition-colors"><MoreHorizontal size={18} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] bg-white rounded-xl border-2 border-dashed border-slate-300 mx-auto max-w-4xl">
              <div className="p-6 bg-blue-50 rounded-full mb-6 animate-pulse"><FileSpreadsheet size={64} className="text-blue-500" /></div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Importar planilha legada</h3>
              <p className="text-slate-500 mb-8 text-center max-w-md text-lg">Arraste o arquivo "Monstro" (.xlsx) ou CSV do sistema antigo aqui para processamento automático.</p>
              <button className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105">Selecionar Arquivo</button>
            </div>
          )}

          {activeTab === 'sectors' && (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-slate-400">
              <Building2 size={64} className="mb-4 opacity-50" />
              <p className="text-lg">Módulo de Lotações em desenvolvimento...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}