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
  Bell,
  Video,
  Calendar,
  Clock,
  Link as LinkIcon,
  Copy
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_EMPLOYEES = [
  { id: 1, name: 'Ana Souza Silva', cpf: '001.***.***-01', role: 'Professor AD-4', sector: 'Escola Estadual A', status: 'Ativo', lastUpdate: '06/12/2023' },
  { id: 2, name: 'Carlos Eduardo Lima', cpf: '002.***.***-02', role: 'Técnico Admin', sector: 'Sede - RH', status: 'Férias', lastUpdate: '01/12/2023' },
  { id: 3, name: 'Maria Fátima Oliveira', cpf: '003.***.***-03', role: 'Merendeira', sector: 'Escola Estadual B', status: 'Afastado', lastUpdate: '10/11/2023' },
  { id: 4, name: 'João Pedro Santos', cpf: '004.***.***-04', role: 'Professor AD-2', sector: 'Escola Estadual A', status: 'Ativo', lastUpdate: '05/12/2023' },
];

const INITIAL_MEETINGS = [
  { id: 1, title: 'Entrevista: Candidato João Silva', date: '2025-10-24', time: '14:00', link: 'https://meet.google.com/abc-defg-hij' },
  { id: 2, title: 'Alinhamento Pedagógico', date: '2025-10-25', time: '09:30', link: 'https://meet.google.com/xyz-woqm-pqr' },
];

// Componentes UI
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} className={active ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
    <span className="font-medium">{label}</span>
  </button>
);

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wide">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} shadow-lg shadow-blue-100`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-emerald-600 font-bold flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">
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
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-gray-100 text-gray-700'} uppercase tracking-wider`}>
      {status}
    </span>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', time: '' });

  const filteredEmployees = INITIAL_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSchedule = (e) => {
    e.preventDefault();
    const link = `https://meet.google.com/${Math.random().toString(36).substr(2, 3)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 3)}`;
    setMeetings([...meetings, { ...newMeeting, id: Date.now(), link }]);
    setNewMeeting({ title: '', date: '', time: '' });
    alert('Entrevista agendada com sucesso!');
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col hidden md:flex shadow-2xl z-20">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg shadow-blue-500/30">S</div>
            <div>
              <span className="text-xl font-bold tracking-tight block leading-none">SGPS</span>
              <span className="text-xs text-blue-400 font-medium tracking-widest">SAGEP</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Principal</p>
          <SidebarItem icon={LayoutDashboard} label="Visão Geral" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={Users} label="Colaboradores" active={activeTab === 'employees'} onClick={() => setActiveTab('employees')} />
          
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-2">Gestão</p>
          <SidebarItem icon={Video} label="Agendar Entrevista" active={activeTab === 'meet'} onClick={() => setActiveTab('meet')} />
          <SidebarItem icon={FileSpreadsheet} label="Importar Dados" active={activeTab === 'import'} onClick={() => setActiveTab('import')} />
          <SidebarItem icon={Building2} label="Lotações" active={activeTab === 'sectors'} onClick={() => setActiveTab('sectors')} />
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-3 hover:bg-slate-800 rounded-xl transition-all">
            <LogOut size={20} />
            <span className="font-medium">Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {activeTab === 'dashboard' && 'Painel de Controle'}
              {activeTab === 'employees' && 'Gestão de Pessoal'}
              {activeTab === 'meet' && 'Agendamento Google Meet'}
              {activeTab === 'import' && 'Importação de Dados'}
            </h1>
            <p className="text-sm text-slate-500 font-medium">Gestão de RH e Processos Seletivos</p>
          </div>
          <div className="flex items-center space-x-6">
            <button className="p-2 text-slate-400 hover:text-blue-600 relative transition-colors rounded-full hover:bg-blue-50">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700">Administrador</p>
                <p className="text-xs text-slate-500">Seduc HQ</p>
              </div>
              <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:shadow-lg transition-all">A</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 max-w-7xl mx-auto animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Ativos" value="1,248" icon={Users} color="bg-blue-500" trend="+12%" />
                <StatCard title="Pendências" value="23" icon={AlertCircle} color="bg-amber-500" trend="-5%" />
                <StatCard title="Entrevistas Hoje" value="4" icon={Video} color="bg-emerald-500" trend="+2" />
                <StatCard title="Cargos Vagos" value="12" icon={Briefcase} color="bg-purple-500" trend="0%" />
              </div>
              {/* Mais conteúdo do dashboard... */}
            </div>
          )}

          {activeTab === 'meet' && (
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
              {/* Formulário de Agendamento */}
              <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Calendar size={24} /></div>
                  <h3 className="text-lg font-bold text-slate-800">Nova Reunião</h3>
                </div>
                <form onSubmit={handleSchedule} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Título da Entrevista</label>
                    <input required type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="Ex: Entrevista João Silva" value={newMeeting.title} onChange={e => setNewMeeting({...newMeeting, title: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                      <input required type="date" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newMeeting.date} onChange={e => setNewMeeting({...newMeeting, date: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Hora</label>
                      <input required type="time" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newMeeting.time} onChange={e => setNewMeeting({...newMeeting, time: e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                    <Video size={20} />
                    <span>Gerar Link Google Meet</span>
                  </button>
                </form>
              </div>

              {/* Lista de Reuniões */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Próximas Entrevistas</h3>
                <div className="space-y-4">
                  {meetings.map((meet) => (
                    <div key={meet.id} className="group flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-blue-50/50 hover:border-blue-100 transition-all">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-white border border-slate-100 rounded-lg text-slate-500 font-bold flex flex-col items-center justify-center min-w-[60px]">
                          <span className="text-xs uppercase">{new Date(meet.date).toLocaleString('pt-PT', { month: 'short' })}</span>
                          <span className="text-xl text-slate-800">{new Date(meet.date).getDate() || 'DD'}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-lg">{meet.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                            <span className="flex items-center"><Clock size={14} className="mr-1" /> {meet.time}</span>
                            <span className="flex items-center text-blue-600 bg-blue-50 px-2 rounded-md"><Video size={14} className="mr-1" /> Google Meet</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => navigator.clipboard.writeText(meet.link)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg transition-colors" title="Copiar Link">
                          <Copy size={20} />
                        </button>
                        <a href={meet.link} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center">
                          <LinkIcon size={16} className="mr-2" />
                          Entrar
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'employees' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full max-w-7xl mx-auto animate-fadeIn">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input type="text" placeholder="Pesquisar por nome ou cargo..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <button className="flex items-center space-x-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-500/20 transition-all">
                  <UserPlus size={20} /><span>Novo Colaborador</span>
                </button>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Colaborador</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cargo</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lotação</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-sm font-bold text-slate-600 mr-3 border-2 border-white shadow-sm">{emp.name.charAt(0)}</div>
                            <div><p className="text-sm font-bold text-slate-800">{emp.name}</p><p className="text-xs text-slate-500 font-mono">{emp.cpf}</p></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">{emp.role}</td>
                        <td className="px-6 py-4 text-sm text-slate-600"><div className="flex items-center space-x-2 bg-slate-50 w-fit px-3 py-1 rounded-full border border-slate-200"><Building2 size={14} className="text-slate-400" /><span>{emp.sector}</span></div></td>
                        <td className="px-6 py-4"><Badge status={emp.status} /></td>
                        <td className="px-6 py-4 text-right"><button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"><MoreHorizontal size={20} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}