'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Migracao {
  nome: string;
  descricao: string;
  icone: string;
  status: 'planejada' | 'em_andamento' | 'concluida' | 'pausada';
  progresso: number;
  totalRegistros: number;
  registrosProcessados: number;
  volumeFinanceiro: number;
  erros: number;
  inicioProcessamento: string | null;
  fimProcessamento: string | null;
  planilhaUpload: string | null;
  ultimaAtualizacao: string;
  temDados: boolean;
  estabelecimentosMigrados: number;
  pendencias?: Array<{
    id: number;
    texto: string;
    data: string;
  }>;
}

interface MigracoesData {
  [key: string]: Migracao;
}

export default function Dashboard() {
  const [migracoes, setMigracoes] = useState<MigracoesData>({
    '1': {
      nome: 'Clube de assinatura',
      descricao: 'Transferência de dados de clientes e informações básicas',
      icone: '👥',
      status: 'em_andamento',
      progresso: 88,
      totalRegistros: 1725,
      registrosProcessados: 1518,
      volumeFinanceiro: 12842000,
      erros: 207,
      inicioProcessamento: '2025-08-13T10:00:00Z',
      fimProcessamento: null,
      planilhaUpload: 'clientes_trinks.xlsx',
      ultimaAtualizacao: '2025-08-14T15:30:00Z',
      temDados: true,
      estabelecimentosMigrados: 1518
    },
    '2': {
      nome: 'Assinaturas Trinks',
      descricao: 'Transferência de dados de transações e histórico financeiro',
      icone: '💳',
      status: 'em_andamento',
      progresso: 4,
      totalRegistros: 877,
      registrosProcessados: 35,
      volumeFinanceiro: 458000,
      erros: 15,
      inicioProcessamento: '2025-08-14T08:00:00Z',
      fimProcessamento: null,
      planilhaUpload: 'transacoes_trinks.xlsx',
      ultimaAtualizacao: '2025-08-14T16:00:00Z',
      temDados: true,
      estabelecimentosMigrados: 35
    },
    '3': {
      nome: 'Connect Stone',
      descricao: 'Transferência de catálogo de produtos e configurações',
      icone: '🔗',
      status: 'planejada',
      progresso: 0,
      totalRegistros: 0,
      registrosProcessados: 0,
      volumeFinanceiro: 0,
      erros: 0,
      inicioProcessamento: null,
      fimProcessamento: null,
      planilhaUpload: null,
      ultimaAtualizacao: '2025-08-13T09:00:00Z',
      temDados: false,
      estabelecimentosMigrados: 0
    },
    '4': {
      nome: 'APP B2B',
      descricao: 'Transferência de configurações e políticas de negócio',
      icone: '📱',
      status: 'planejada',
      progresso: 0,
      totalRegistros: 0,
      registrosProcessados: 0,
      volumeFinanceiro: 0,
      erros: 0,
      inicioProcessamento: null,
      fimProcessamento: null,
      planilhaUpload: null,
      ultimaAtualizacao: '2025-08-12T12:00:00Z',
      temDados: false,
      estabelecimentosMigrados: 0
    }
  });

  const [modal, setModal] = useState<{
    isOpen: boolean;
    title: string;
    value: string;
    callback?: (value: string) => void;
  }>({
    isOpen: false,
    title: '',
    value: '',
  });

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    let totalEstabelecimentos = 0;
    let estabelecimentosMigrados = 0;
    let migracoesConcluidas = 0;
    let migracoeComDados = 0;
    let volumeFinanceiroTotal = 0;

    Object.values(migracoes).forEach(migracao => {
      if (migracao.temDados || migracao.totalRegistros > 0) {
        migracoeComDados++;
        totalEstabelecimentos += migracao.totalRegistros;
        estabelecimentosMigrados += migracao.estabelecimentosMigrados || migracao.registrosProcessados || 0;
        volumeFinanceiroTotal += migracao.volumeFinanceiro || 0;
        
        if (migracao.status === 'concluida') {
          migracoesConcluidas++;
        }
      }
    });

    const sucessoRate = totalEstabelecimentos > 0 ? Math.round((estabelecimentosMigrados / totalEstabelecimentos) * 100) : 0;
    const progressoGeral = sucessoRate;
    const volumeFormatado = volumeFinanceiroTotal >= 1000000 ? 
      `R$ ${(volumeFinanceiroTotal / 1000000).toFixed(1)}M` : 
      `R$ ${(volumeFinanceiroTotal / 1000).toFixed(0)}K`;
    const estabelecimentosRestantes = totalEstabelecimentos - estabelecimentosMigrados;

    return {
      totalEstabelecimentos: estabelecimentosMigrados,
      estabelecimentosRestantes,
      volumeFinanceiroTotal: volumeFormatado,
      migracoesConcluidas,
      progressoGeral
    };
  };

  const stats = calcularEstatisticas();

  const formatarUltimaAtualizacao = (data: string) => {
    if (!data) return 'Não atualizada';
    const d = new Date(data);
    const dia = d.getDate().toString().padStart(2, '0');
    const mes = (d.getMonth() + 1).toString().padStart(2, '0');
    const hora = d.getHours().toString().padStart(2, '0');
    const minuto = d.getMinutes().toString().padStart(2, '0');
    return `${dia}-${mes} / ${hora}:${minuto}`;
  };

  const getStatusClass = (status: string) => {
    const classes = {
      'planejada': 'bg-blue-100 text-blue-800',
      'em_andamento': 'bg-orange-100 text-orange-800',
      'concluida': 'bg-green-100 text-green-800',
      'pausada': 'bg-pink-100 text-pink-800'
    };
    return classes[status as keyof typeof classes] || classes.planejada;
  };

  const getStatusText = (status: string) => {
    const texts = {
      'planejada': 'Planejada',
      'em_andamento': 'Em Andamento',
      'concluida': 'Concluída',
      'pausada': 'Pausada'
    };
    return texts[status as keyof typeof texts] || 'Planejada';
  };

  const editarNome = (id: string, novoNome: string) => {
    if (novoNome.trim() !== '') {
      setMigracoes(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          nome: novoNome.trim()
        }
      }));
    }
  };

  const adicionarPendencia = (migracaoId: string) => {
    setModal({
      isOpen: true,
      title: 'Digite a pendência:',
      value: '',
      callback: (texto) => {
        if (texto && texto.trim()) {
          setMigracoes(prev => ({
            ...prev,
            [migracaoId]: {
              ...prev[migracaoId],
              pendencias: [
                ...(prev[migracaoId].pendencias || []),
                {
                  id: Date.now(),
                  texto: texto.trim(),
                  data: new Date().toISOString()
                }
              ]
            }
          }));
        }
      }
    });
  };

  const editarPendencia = (migracaoId: string, pendenciaId: number) => {
    const migracao = migracoes[migracaoId];
    const pendencia = migracao.pendencias?.find(p => p.id === pendenciaId);
    if (pendencia) {
      setModal({
        isOpen: true,
        title: 'Editar pendência:',
        value: pendencia.texto,
        callback: (novoTexto) => {
          if (novoTexto && novoTexto.trim()) {
            setMigracoes(prev => ({
              ...prev,
              [migracaoId]: {
                ...prev[migracaoId],
                pendencias: prev[migracaoId].pendencias?.map(p => 
                  p.id === pendenciaId ? { ...p, texto: novoTexto.trim() } : p
                ) || []
              }
            }));
          }
        }
      });
    }
  };

  const excluirPendencia = (migracaoId: string, pendenciaId: number) => {
    if (confirm('Tem certeza que deseja excluir esta pendência?')) {
      setMigracoes(prev => ({
        ...prev,
        [migracaoId]: {
          ...prev[migracaoId],
          pendencias: prev[migracaoId].pendencias?.filter(p => p.id !== pendenciaId) || []
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-lg p-10 relative">
        {/* Logos */}
        <div className="absolute top-6 left-0 right-0 flex justify-between items-center px-8 z-10">
          {/* Logo Trinks */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute top-0 left-0 w-6 h-6 bg-orange-500 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-6 h-6 bg-orange-500 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 bg-orange-500 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-orange-500 rounded-br-lg"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rotate-45"></div>
            </div>
            <span className="text-2xl font-bold text-gray-800">trinks</span>
          </div>

          <div className="text-3xl text-orange-500 animate-pulse">→</div>

          {/* Logo Stone */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg"></div>
            <span className="text-2xl font-bold text-black">Stone</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10 mt-12 relative">
          <button className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
            📊 Gerar Dashboard com Gráficos
          </button>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Migrações Trinks x Stone</h1>
          <p className="text-xl text-gray-600">Dashboard de monitoramento e controle das migrações de dados</p>
        </div>

        {/* Status Geral */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-10 rounded-3xl mb-10 text-center shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">Status Geral das Migrações</h2>
          <div className="bg-white/20 rounded-full h-8 relative mb-3">
            <div 
              className="bg-white h-full rounded-full flex items-center justify-center text-orange-600 font-semibold transition-all duration-500"
              style={{ width: `${stats.progressoGeral}%` }}
            >
              {stats.progressoGeral}%
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6 mt-8">
            <div className="bg-white/10 p-6 rounded-2xl">
              <div className="text-4xl font-bold mb-2">{stats.totalEstabelecimentos.toLocaleString('pt-BR')}</div>
              <div className="text-sm opacity-90">Estabelecimentos Migrados</div>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <div className="text-4xl font-bold mb-2">{stats.estabelecimentosRestantes.toLocaleString('pt-BR')}</div>
              <div className="text-sm opacity-90">Estabelecimentos Restantes</div>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <div className="text-4xl font-bold mb-2">{stats.volumeFinanceiroTotal}</div>
              <div className="text-sm opacity-90">Volume Financeiro Migrado Total</div>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl">
              <div className="text-4xl font-bold mb-2">{stats.migracoesConcluidas}/4</div>
              <div className="text-sm opacity-90">Migrações Concluídas</div>
            </div>
          </div>
        </div>

        {/* Grid de Migrações */}
        <div className="grid grid-cols-4 gap-6">
          {Object.entries(migracoes).map(([id, migracao]) => (
            <Link href={`/migracao-${id}`} key={id}>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                {/* Header da migração */}
                <div className="flex items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 text-lg">{migracao.nome}</h3>
                      <span 
                        className="text-gray-400 hover:text-orange-500 cursor-pointer text-sm p-1 rounded hover:bg-orange-50 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          const novoNome = prompt('Novo nome:', migracao.nome);
                          if (novoNome) editarNome(id, novoNome);
                        }}
                      >
                        ✏️
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Última atualização: {formatarUltimaAtualizacao(migracao.ultimaAtualizacao)}
                    </div>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progresso</span>
                    <span>{migracao.progresso}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-5 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
                      style={{ width: `${migracao.progresso}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${getStatusClass(migracao.status)}`}>
                  {getStatusText(migracao.status)}
                </div>

                {/* Pendências */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">📝 Pendências</span>
                    <button 
                      className="bg-orange-500 text-white text-xs px-2 py-1 rounded hover:bg-orange-600 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        adicionarPendencia(id);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="max-h-24 overflow-y-auto">
                    {(!migracao.pendencias || migracao.pendencias.length === 0) ? (
                      <div className="text-xs text-gray-400 text-center py-2">Nenhuma pendência</div>
                    ) : (
                      migracao.pendencias.map(pendencia => (
                        <div key={pendencia.id} className="flex justify-between items-center bg-gray-50 p-2 rounded text-xs mb-1">
                          <span className="flex-1 mr-2">{pendencia.texto}</span>
                          <div className="flex gap-1">
                            <button 
                              className="text-blue-600 hover:bg-blue-100 p-1 rounded transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                editarPendencia(id, pendencia.id);
                              }}
                            >
                              ✏️
                            </button>
                            <button 
                              className="text-red-600 hover:bg-red-100 p-1 rounded transition-colors"
                              onClick={(e) => {
                                e.preventDefault();
                                excluirPendencia(id, pendencia.id);
                              }}
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{modal.title}</h3>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-200 rounded-lg text-base mb-5 focus:border-orange-500 outline-none transition-colors"
              value={modal.value}
              onChange={(e) => setModal(prev => ({ ...prev, value: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  modal.callback?.(modal.value);
                  setModal({ isOpen: false, title: '', value: '' });
                } else if (e.key === 'Escape') {
                  setModal({ isOpen: false, title: '', value: '' });
                }
              }}
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button 
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                onClick={() => setModal({ isOpen: false, title: '', value: '' })}
              >
                Cancelar
              </button>
              <button 
                className="px-5 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                onClick={() => {
                  modal.callback?.(modal.value);
                  setModal({ isOpen: false, title: '', value: '' });
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
