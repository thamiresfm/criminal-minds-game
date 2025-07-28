import React from 'react';
import { X, Trophy, AlertCircle } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVictory?: boolean;
  message?: string;
  onPlayAgain?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onClose,
  isVictory = false,
  message = "Jogo finalizado!",
  onPlayAgain
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            {isVictory ? (
              <Trophy className="w-5 h-5 text-yellow-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {isVictory ? 'Vitória!' : 'Fim de Jogo'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className={`p-4 rounded-lg mb-4 ${
            isVictory ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <p className="text-center">{message}</p>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              Fechar
            </button>
            {onPlayAgain && (
              <button
                onClick={onPlayAgain}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Jogar Novamente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 