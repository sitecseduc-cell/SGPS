import React, { useState } from 'react';
import { 
  Search, ChevronRight, Mail, Phone, Save, Edit, 
  User, MapPin, FileText, Clock, FileCheck, Eye, 
  X, CheckCircle, AlertTriangle, Shield
} from 'lucide-react';
import CandidateTable from '../components/CandidateTable';
import { CANDIDATOS_MOCK } from '../data/mockData';

export default function Inscritos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // Filtro de Busca Inteligente
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
    // Aqui você enviaria 'editData' para o Supabase
    setSelectedCandidate(editData); // Atualiza visualmente
    alert(`Dados de ${editData.nome} atualizados com sucesso!`);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    if(window.confirm(`Tem certeza que deseja alterar o status para: ${newStatus}?`)) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
      // Adicionaria log no histórico aqui
    }
  };

  // --- VISÃO 360º DO CANDIDATO ---
  if (selectedCandidate) {
    return (
      <div className="animate-fadeIn space-y-6 pb-20">
        {/* Cabeçalho do Perfil (Fixo no topo da visualização) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center space-x-5">
              <button onClick={() => setSelectedCandidate(null)} className="p-2.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200">
                <ChevronRight size={20} className="rotate-180 text-slate-600"/>
              </button>
              
              <div className="relative">
                <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-white shadow-lg">
                  {selectedCandidate.nome.charAt(0)}
                </div>
                <div className={`absolute bottom-0 right-0 h-6 w-6 rounded-full border-2 border-white ${
                  selectedCandidate.status === 'Classificado' ? 'bg-emerald-500' : 
                  selectedCandidate.status === 'Desclassificado' ? 'bg-red-500' : 'bg-amber-500'
                }`}></div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedCandidate.nome}</h2>
                <div className="flex flex-wrap gap-3 mt-2 text-sm">
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-mono font-medium border border-slate-200">
                    CPF: {selectedCandidate.cpf}
                  </span>
                  <span className={`px-3 py-1 rounded-full font-bold border ${
                    selectedCandidate.status === 'Classificado' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                    selectedCandidate.status === 'Desclassificado' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {selectedCandidate.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Botões de Ação Global */}
            <div className="flex space-x-3 w-full lg:w-auto">
              {isEditing ? (
                <>
                  <button onClick={() => setIsEditing(false)} className="flex-1 lg:flex-none px-5 py-2.5 border border-slate-300 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all">
                    Cancelar
                  </button>
                  <button onClick={handleSave} className="flex-1 lg:flex-none px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 flex items-center justify-center transition-all">
                    <Save size={18} className="mr-2"/> Salvar
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="flex-1 lg:flex-none px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center justify-center transition-all">
                  <Edit size={18} className="mr-2"/> Editar Dados
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUNA 1: DADOS PESSOAIS E CONTATO (Editável) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 flex items-center">
                  <User size={20} className="mr-2 text-blue-600"/> Dados Pessoais & Contato
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campos Editáveis */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">E-mail</label>
                  {isEditing ? (
                    <input type="email" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} className="w-full p-2.5 border border-blue-300 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"/>
                  ) : (
                    <div className="flex items-center text-slate-700 font-medium p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <Mail size={16} className="mr-2 text-slate-400"/> {selectedCandidate.email}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Telefone</label>
                  {isEditing ? (
                    <input type="text" value={editData.telefone} onChange={(e) => setEditData({...editData, telefone: e.target.value})} className="w-full p-2.5 border border-blue-300 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"/>
                  ) : (
                    <div className="flex items-center text-slate-700 font-medium p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <Phone size={16} className="mr-2 text-slate-400"/> {selectedCandidate.telefone}
                    </div>
                  )}
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Endereço Completo</label>
                  {isEditing ? (
                    <input type="text" value={editData.endereco} onChange={(e) => setEditData({...editData, endereco: e.target.value})} className="w-full p-2.5 border border-blue-300 rounded-lg bg-blue-50 focus:ring-2 focus:ring-blue-500 outline-none"/>
                  ) : (
                    <div className="flex items-center text-slate-700 font-medium p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <MapPin size={16} className="mr-2 text-slate-400"/> {selectedCandidate.endereco} - {selectedCandidate.cidade}
                    </div>
                  )}
                </div>

                {/* Campos Apenas Leitura (Vêm da Receita/Sistema) */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Data de Nascimento</label>
                  <div className="p-2.5 text-slate-600 bg-white border border-slate-100 rounded-lg">{selectedCandidate.nascimento}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase">Nome da Mãe</label>
                  <div className="p-2.5 text-slate-600 bg-white border border-slate-100 rounded-lg">{selectedCandidate.mae}</div>
                </div>
              </div>
            </div>

            {/* Card de Inscrição */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center">
                <Shield size={20} className="mr-2 text-indigo-600"/> Dados da Inscrição
              </h3>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Processo Seletivo</span>
                    <p className="font-semibold text-slate-800">{selectedCandidate.processo}</p>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Cargo Pretendido</span>
                    <p className="font-semibold text-slate-800">{selectedCandidate.cargo}</p>
                  </div>
                  <div className="md:col-span-2 pt-4 border-t border-slate-200 mt-2">
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Lotação / Localidade</span>
                    <p className="font-semibold text-indigo-700 flex items-center">
                      <MapPin size={16} className="mr-1"/> {selectedCandidate.localidade}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Área de Gestão de Status */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => handleStatusChange('Classificado')} className="flex-1 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-bold transition-all flex justify-center items-center">
                  <CheckCircle size={18} className="mr-2"/> Aprovar Candidato
                </button>
                <button onClick={() => handleStatusChange('Desclassificado')} className="flex-1 py-3 px-4 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold transition-all flex justify-center items-center">
                  <X size={18} className="mr-2"/> Desclassificar
                </button>
                <button onClick={() => handleStatusChange('Em Análise')} className="flex-1 py-3 px-4 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl font-bold transition-all flex justify-center items-center">
                  <AlertTriangle size={18} className="mr-2"/> Colocar em Análise
                </button>
              </div>
            </div>
          </div>

          {/* COLUNA 2: DOCUMENTOS E HISTÓRICO */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <FileText size={20} className="mr-2 text-orange-500"/> Documentos Enviados
              </h3>
              <ul className="space-y-2">
                {selectedCandidate.documentos?.map((doc, i) => (
                  <li key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-700 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700 transition-all cursor-pointer group">
                    <span className="flex items-center truncate">
                      <FileCheck size={16} className="mr-2 text-slate-400 group-hover:text-orange-500 flex-shrink-0"/> 
                      <span className="truncate">{doc}</span>
                    </span>
                    <Eye size={16} className="text-slate-300 group-hover:text-orange-500"/>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Ver todos os arquivos
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-slate-500"/> Histórico de Ações
              </h3>
              <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pl-6 pb-2">
                {selectedCandidate.historico?.map((hist, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm ring-2 ring-slate-50"></div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">{hist.data}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mt-1">{hist.evento}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Por: {hist.usuario}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VISÃO DE LISTA (Busca) ---
  return (
    <div className="animate-fadeIn space-y-6 pb-10">
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
              placeholder="Nome, CPF ou Processo..." 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <CandidateTable candidates={filteredCandidates} onSelect={handleSelectCandidate} />
      </div>
    </div>
  );
}