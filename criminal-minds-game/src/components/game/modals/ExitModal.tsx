import React from 'react';
import { X, LogOut } from 'lucide-react';

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export const ExitModal: React.FC<ExitModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <LogOut className="w-5 h-5 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Sair do Jogo</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <p className="text-yellow-800">
              Tem certeza de que deseja sair do jogo? Todo o progresso atual será perdido.
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Sair do Jogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 