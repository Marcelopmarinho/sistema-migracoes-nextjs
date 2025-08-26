'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Migracao1() {
  const [dados, setDados] = useState({
    arquivo: null,
    status: 'em_andamento',
    progresso: 88,
    totalRegistros: 1725,
    processados: 1518,
    sucessos: 1518,
    erros: 207,
    valorTotal: 12842000,
    logs: [
      'Iniciando processamento da planilha...',
      'Validando estrutura dos dados...',
      '✅ 1518 estabelecimentos processados com sucesso',
      '❌ 207 registros com erro de validação',
      'Processamento em andamento...'
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Link href="/" className="text-orange-500 hover:text-orange-600 transition-colors">
                ← Voltar ao Dashboard
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">👥 Migração 1 - Clube de assinatura</h1>
            <p className="text-xl text-gray-600">Transferência de dados de clientes e informações básicas</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-600 mb-1">{dados.progresso}%</div>
            <div className="text-sm text-gray-500">Concluído</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
              style={{ width: `${dados.progresso}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Estatísticas */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">📊 Estatísticas Gerais</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{dados.totalRegistros.toLocaleString('pt-BR')}</div>
                  <div className="text-sm opacity-90">Total de Registros</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{dados.processados.toLocaleString('pt-BR')}</div>
                  <div className="text-sm opacity-90">Processados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-200">{dados.sucessos.toLocaleString('pt-BR')}</div>
                  <div className="text-sm opacity-90">Sucessos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-200">{dados.erros.toLocaleString('pt-BR')}</div>
                  <div className="text-sm opacity-90">Erros</div>
                </div>
              </div>
            </div>

            {/* Volume Financeiro */}
            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-green-800 mb-2">💰 Volume Financeiro</h3>
              <div className="text-3xl font-bold text-green-700">
                R$ {(dados.valorTotal / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-green-600 mt-1">Volume total migrado</div>
            </div>

            {/* Upload de Planilha */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">📁 Upload de Planilha</h3>
              <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center">
                <div className="text-4xl mb-4">📊</div>
                <p className="text-gray-600 mb-4">Arraste e solte sua planilha aqui ou clique para selecionar</p>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Selecionar Arquivo
                </button>
              </div>
              {dados.arquivo && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">📄</span>
                    <span className="text-blue-800 font-medium">{dados.arquivo}</span>
                    <span className="text-blue-600 text-sm ml-auto">✓ Carregado</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Logs */}
          <div className="space-y-6">
            <div className="bg-gray-900 text-white p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">📝 Log de Processamento</h3>
              <div className="bg-black rounded-lg p-4 font-mono text-sm h-80 overflow-y-auto">
                {dados.logs.map((log, index) => (
                  <div key={index} className="mb-2 text-green-400">
                    <span className="text-gray-400">{new Date().toLocaleTimeString()}</span> {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">⚡ Status da Migração</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status atual:</span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    Em Andamento
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Início:</span>
                  <span className="text-gray-600">13/08/2025 10:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Última atualização:</span>
                  <span className="text-gray-600">14/08/2025 15:30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Tempo estimado:</span>
                  <span className="text-gray-600">~30 minutos restantes</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🔧 Ações</h3>
              <div className="space-y-3">
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  ⏸️ Pausar Migração
                </button>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  📊 Exportar Relatório
                </button>
                <button className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
                  🔄 Reiniciar do Último Ponto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Dados (Preview) */}
        <div className="mt-8 bg-gray-50 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Preview dos Dados</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Nome</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-3">001</td>
                  <td className="px-4 py-3">Cliente Exemplo 1</td>
                  <td className="px-4 py-3">cliente1@exemplo.com</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">✓ Migrado</span>
                  </td>
                  <td className="px-4 py-3">R$ 1.250,00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">002</td>
                  <td className="px-4 py-3">Cliente Exemplo 2</td>
                  <td className="px-4 py-3">cliente2@exemplo.com</td>
                  <td className="px-4 py-3">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">❌ Erro</span>
                  </td>
                  <td className="px-4 py-3">R$ 850,00</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">003</td>
                  <td className="px-4 py-3">Cliente Exemplo 3</td>
                  <td className="px-4 py-3">cliente3@exemplo.com</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">✓ Migrado</span>
                  </td>
                  <td className="px-4 py-3">R$ 2.100,00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            Mostrando 3 de {dados.totalRegistros.toLocaleString('pt-BR')} registros
          </div>
        </div>
      </div>
    </div>
  );
}