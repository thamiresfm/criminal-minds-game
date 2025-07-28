import React from 'react';
import { X, Microscope } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  evidence?: any;
  analysisResult?: string;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({
  isOpen,
  onClose,
  evidence,
  analysisResult
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Microscope className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Análise de Evidência</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {evidence && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Evidência Analisada:</h3>
                <p className="text-gray-700">{evidence.name || 'Evidência desconhecida'}</p>
                {evidence.description && (
                  <p className="text-sm text-gray-600 mt-1">{evidence.description}</p>
                )}
              </div>
            )}
            
            {analysisResult ? (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-2">Resultado da Análise:</h3>
                <p className="text-purple-700">{analysisResult}</p>
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Análise em Progresso</h3>
                <p className="text-blue-700">
                  A análise detalhada da evidência está sendo processada...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 