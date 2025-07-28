import React from 'react';
import { X, Beaker } from 'lucide-react';

interface AllLabResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allResults?: any[];
}

export const AllLabResultsModal: React.FC<AllLabResultsModalProps> = ({
  isOpen,
  onClose,
  allResults = []
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Todos os Resultados Laboratoriais</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {allResults.length > 0 ? (
              allResults.map((result, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Resultado {index + 1}
                  </h3>
                  <pre className="text-sm text-gray-700 overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Beaker className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum resultado laboratorial disponível ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 