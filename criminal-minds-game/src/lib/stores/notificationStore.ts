'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { 
  Notification, 
  NotificationState, 
  NotificationActions,
  NotificationId 
} from '@/types/game';

// ========================================
// STORE STATE & ACTIONS
// ========================================

interface NotificationStore extends NotificationState, NotificationActions {}

const defaultState: NotificationState = {
  notifications: [],
  maxNotifications: 5,
  defaultDuration: 5000, // 5 segundos
  soundEnabled: true,
};

// ========================================
// NOTIFICATION STORE
// ========================================

export const useNotificationStore = create<NotificationStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      ...defaultState,

      // Actions
      addNotification: (notificationData) => {
        const notification: Notification = {
          ...notificationData,
          id: uuidv4(),
          createdAt: new Date(),
        };

        set((state) => {
          const newNotifications = [...state.notifications, notification];
          
          // Limitar número máximo de notificações
          if (newNotifications.length > state.maxNotifications) {
            newNotifications.splice(0, newNotifications.length - state.maxNotifications);
          }

          return { notifications: newNotifications };
        });

        // Auto-remove notification após duration
        if (notification.duration !== undefined) {
          const duration = notification.duration || get().defaultDuration;
          setTimeout(() => {
            get().removeNotification(notification.id);
          }, duration);
        }

        // Reproduzir som se habilitado
        if (notification.playSound !== false && get().soundEnabled) {
          playNotificationSound(notification.type);
        }
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },

      clearAllNotifications: () => {
        set({ notifications: [] });
      },

      updateNotification: (id, updates) => {
        set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, ...updates } : n
          )
        }));
      },

      setSoundEnabled: (enabled) => {
        set({ soundEnabled: enabled });
      },

      setMaxNotifications: (max) => {
        set({ maxNotifications: max });
        
        // Remove excess notifications if needed
        const { notifications } = get();
        if (notifications.length > max) {
          set({
            notifications: notifications.slice(-max)
          });
        }
      },

      setDefaultDuration: (duration) => {
        set({ defaultDuration: duration });
      },
    }),
    { name: 'notification-store' }
  )
);

// ========================================
// UTILITY FUNCTIONS
// ========================================

const playNotificationSound = (type: Notification['type']) => {
  try {
    const audio = new Audio();
    
    switch (type) {
      case 'success':
        audio.src = '/sounds/notification-success.mp3';
        break;
      case 'error':
        audio.src = '/sounds/notification-error.mp3';
        break;
      case 'warning':
        audio.src = '/sounds/notification-warning.mp3';
        break;
      case 'info':
      default:
        audio.src = '/sounds/notification-info.mp3';
        break;
    }
    
    audio.volume = 0.3;
    audio.play().catch(console.warn); // Ignore errors if sound files don't exist
  } catch (error) {
    console.warn('Failed to play notification sound:', error);
  }
};

// ========================================
// SELECTORS
// ========================================

export const useNotifications = () => useNotificationStore(state => state.notifications);
export const useNotificationActions = () => useNotificationStore(state => ({
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearAllNotifications: state.clearAllNotifications,
  updateNotification: state.updateNotification,
}));
export const useNotificationSettings = () => useNotificationStore(state => ({
  soundEnabled: state.soundEnabled,
  maxNotifications: state.maxNotifications,
  defaultDuration: state.defaultDuration,
  setSoundEnabled: state.setSoundEnabled,
  setMaxNotifications: state.setMaxNotifications,
  setDefaultDuration: state.setDefaultDuration,
}));

// ========================================
// CONVENIENCE HOOKS
// ========================================

export const useNotify = () => {
  const { addNotification } = useNotificationActions();
  
  return {
    success: (title: string, message?: string, options?: Partial<Notification>) => 
      addNotification({ ...options, type: 'success', title, message }),
    
    error: (title: string, message?: string, options?: Partial<Notification>) => 
      addNotification({ ...options, type: 'error', title, message }),
    
    warning: (title: string, message?: string, options?: Partial<Notification>) => 
      addNotification({ ...options, type: 'warning', title, message }),
    
    info: (title: string, message?: string, options?: Partial<Notification>) => 
      addNotification({ ...options, type: 'info', title, message }),
    
    custom: (notification: Omit<Notification, 'id' | 'createdAt'>) => 
      addNotification(notification),
  };
}; 