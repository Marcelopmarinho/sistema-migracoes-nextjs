'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Migracao4() {
  const [dados, setDados] = useState({
    arquivo: null,
    status: 'planejada',
    progresso: 0,
    totalRegistros: 0,
    processados: 0,
    sucessos: 0,
    erros: 0,
    valorTotal: 0,
    logs: [
      'Aguardando início da migração...',
      'Sistema pronto para receber dados...'
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
            <h1 className="text-4xl font-bold text-gray-800 mb-2">📱 Migração 4 - APP B2B</h1>
            <p className="text-xl text-gray-600">Transferência de configurações e políticas de negócio</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-400 mb-1">{dados.progresso}%</div>
            <div className="text-sm text-gray-500">Planejada</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full transition-all duration-500"
              style={{ width: `${dados.progresso}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload de Planilha */}
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">📁 Upload de Planilha</h3>
              <div className="border-2 border-dashed border-purple-300 p-8 rounded-xl text-center">
                <div className="text-4xl mb-4">📱</div>
                <p className="text-purple-600 mb-4">Arraste e solte sua planilha aqui ou clique para selecionar</p>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Selecionar Arquivo
                </button>
              </div>
              <div className="mt-4 p-4 bg-purple-100 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Formato esperado:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• ID da Configuração</li>
                  <li>• Política de Negócio</li>
                  <li>• Regras de Validação</li>
                  <li>• Parâmetros B2B</li>
                  <li>• Configurações de App</li>
                </ul>
              </div>
            </div>

            {/* Status */}
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">⏳ Status da Migração</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Status atual:</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Planejada
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Previsão de início:</span>
                  <span className="text-gray-600">A definir</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Duração estimada:</span>
                  <span className="text-gray-600">~1 hora</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Dependências:</span>
                  <span className="text-gray-600">Migração 3 concluída</span>
                </div>
              </div>
            </div>
          </div>

          {/* Logs e Preparação */}
          <div className="space-y-6">
            <div className="bg-gray-900 text-white p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">📝 Sistema de Logs</h3>
              <div className="bg-black rounded-lg p-4 font-mono text-sm h-60 overflow-y-auto">
                {dados.logs.map((log, index) => (
                  <div key={index} className="mb-2 text-yellow-400">
                    <span className="text-gray-400">{new Date().toLocaleTimeString()}</span> {log}
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist de Preparação */}
            <div className="bg-purple-50 border border-purple-200 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">✅ Checklist de Preparação</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-purple-700">Validar políticas de negócio</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-purple-700">Configurar ambiente B2B</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-purple-700">Testar integrações de app</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-purple-700">Validar regras de negócio</span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="bg-gray-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🚀 Ações</h3>
              <div className="space-y-3">
                <button 
                  className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed" 
                  disabled
                >
                  ⏳ Aguardando Migração 3
                </button>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  🧪 Executar Testes
                </button>
                <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                  📋 Validar Configurações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}