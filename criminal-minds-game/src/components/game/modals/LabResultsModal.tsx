import React from 'react';
import { X, TestTube } from 'lucide-react';

interface LabResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results?: any;
}

export const LabResultsModal: React.FC<LabResultsModalProps> = ({
  isOpen,
  onClose,
  results
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <TestTube className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Resultados Laboratoriais</h2>
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
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Análise Concluída</h3>
              <p className="text-blue-700">
                Os resultados laboratoriais estão prontos para análise.
              </p>
            </div>
            {results && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Detalhes:</h4>
                <pre className="bg-gray-50 p-3 rounded text-sm text-gray-700 overflow-x-auto">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 