'use client';

import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X,
  Clock
} from 'lucide-react';
import { Notification } from '@/types/game';
import { useNotifications, useNotificationActions } from '@/lib/stores/notificationStore';

// ========================================
// NOTIFICATION ITEM COMPONENT
// ========================================

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Animar entrada
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(notification.id), 200);
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5";
    
    switch (notification.type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'error':
        return <XCircle className={`${iconClass} text-red-500`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
      case 'info':
      default:
        return <Info className={`${iconClass} text-blue-500`} />;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'info':
      default:
        return 'border-l-blue-500';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}m atrás`;
    return `${seconds}s atrás`;
  };

  return (
    <div
      className={`
        relative flex items-start p-4 mb-3 bg-white rounded-lg border-l-4 shadow-lg
        transform transition-all duration-300 ease-in-out
        ${getBorderColor()}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isRemoving ? 'translate-x-full opacity-0 scale-95' : ''}
        hover:shadow-xl hover:scale-[1.02]
      `}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mr-3 mt-0.5">
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              {notification.title}
            </h4>
            
            {notification.message && (
              <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                {notification.message}
              </p>
            )}

            {/* Timestamp */}
            <div className="flex items-center text-xs text-gray-400 mb-2">
              <Clock className="w-3 h-3 mr-1" />
              {formatTimeAgo(notification.createdAt)}
            </div>

            {/* Actions */}
            {notification.actions && notification.actions.length > 0 && (
              <div className="flex gap-2 mt-3">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`
                      px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200
                      ${action.variant === 'danger' 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200 hover:scale-105' 
                        : action.variant === 'secondary'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                        : 'text-white hover:scale-105 shadow-sm'
                      }
                    `}
                    style={{
                      backgroundColor: action.variant === 'primary' 
                        ? 'rgb(212 175 55 / var(--tw-bg-opacity, 1))' 
                        : undefined
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={handleRemove}
            className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:scale-110"
            title="Fechar notificação"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar para notificações com duração */}
      {notification.duration && (
        <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-100 ease-linear"
            style={{
              backgroundColor: 'rgb(212 175 55 / var(--tw-bg-opacity, 1))',
              animation: `shrink ${notification.duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
};

// ========================================
// NOTIFICATION CONTAINER COMPONENT
// ========================================

const NotificationContainer: React.FC = () => {
  const notifications = useNotifications();
  const { removeNotification, clearAllNotifications } = useNotificationActions();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <>
      {/* Global Styles for Progress Animation */}
      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>

      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] pointer-events-none">
        <div className="space-y-2 pointer-events-auto">
          {/* Clear All Button */}
          {notifications.length > 1 && (
            <div className="flex justify-end mb-2">
              <button
                onClick={clearAllNotifications}
                className="px-3 py-1.5 text-xs font-medium text-white rounded-md shadow-sm transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: 'rgb(212 175 55 / var(--tw-bg-opacity, 1))'
                }}
              >
                Limpar Todas ({notifications.length})
              </button>
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-2">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRemove={removeNotification}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationContainer; 