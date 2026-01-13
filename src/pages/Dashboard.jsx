import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../lib/supabaseClient';
import {
  Users,
  GitCommit,
  CheckCircle,
  AlertTriangle,
  Plus,
  ArrowRight,
  BookOpen,
  Map
} from 'lucide-react';
import StatCard from '../components/StatCard';
import FunnelChart from '../components/FunnelChart';
import CardSkeleton from '../components/CardSkeleton';
import OnboardingTour from '../components/OnboardingTour';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    candidatos: 0,
    processos: 0,
    vagasPreenchidas: 0,
    atrasos: 0
  });
  const [funnelData, setFunnelData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ÚNICA requisição para buscar tudo
        const { data, error } = await supabase.rpc('get_dashboard_stats');

        if (error) throw error;

        // Atualiza Cards
        setStats({
          candidatos: data.total_candidatos || 0,
          processos: data.total_processos || 0,
          vagasPreenchidas: data.vagas_preenchidas || 0,
          atrasos: 0 // Se precisar calcular atrasos, faça no SQL também
        });

        // Atualiza Funil sem novas requisições
        setFunnelData([
          { label: 'Inscritos Totais', count: data.total_candidatos, color: 'bg-blue-600' },
          { label: 'Em Análise', count: data.em_analise, color: 'bg-blue-500' },
          { label: 'Classificados', count: data.classificados, color: 'bg-purple-500' },
          { label: 'Convocados', count: data.convocados, color: 'bg-emerald-500' }
        ]);

      } catch (e) {
        console.error('Erro ao carregar dashboard:', e);
        toast.error('Erro ao atualizar dados');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn pb-10">

      {/* Welcome Section */}
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-indigo-950 dark:to-slate-900 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden border border-slate-700/50 group">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Bem-vindo à CPS</h1>
          <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
            Seu painel de controle central para gestão de processos seletivos públicos.
            Acompanhe indicadores em tempo real e inicie novas ações.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform translate-x-12 transition-transform duration-700 group-hover:translate-x-6"></div>
        <div className="absolute -bottom-24 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* KPIs Grid */}
      <div id="kpi-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <>
            <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
          </>
        ) : (
          <>
            <StatCard title="Processos Ativos" value={stats.processos} icon={GitCommit} color="bg-blue-100 text-blue-600" />
            <StatCard title="Candidatos na Base" value={stats.candidatos.toLocaleString()} icon={Users} color="bg-purple-100 text-purple-600" subtext="Total acumulado" />
            <StatCard title="Vagas Preenchidas" value={stats.vagasPreenchidas} icon={CheckCircle} color="bg-emerald-100 text-emerald-600" subtext="No ano corrente" />
            <StatCard title="Alertas do Sistema" value={stats.atrasos} icon={AlertTriangle} color="bg-red-100 text-red-600" alert={stats.atrasos > 0} subtext="Requer atenção" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Chart */}
        <div className="lg:col-span-2 h-[400px]">
          <FunnelChart loading={loading} data={funnelData} />
        </div>

        {/* Quick Actions / Shortcuts */}
        <div id="quick-actions" className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 h-full">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Acesso Rápido</h3>

            <div className="space-y-3">
              <Link to="/processos" className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-600 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg"><Plus size={18} /></div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Novo Processo Seletivo</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              </Link>

              <Link to="/planejamento" className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-600 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg"><BookOpen size={18} /></div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Configurar Vagas</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </Link>

              <Link to="/lotacao" className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-purple-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-600 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-lg"><Map size={18} /></div>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Mapa de Lotação</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-purple-500 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <OnboardingTour />
    </div>
  );
}