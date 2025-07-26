import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// ========================================
// SETTINGS TYPES
// ========================================

export interface AudioSettings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  voiceVolume: number;
  isMuted: boolean;
  enableSpatialAudio: boolean;
}

export interface VideoSettings {
  resolution: 'auto' | '720p' | '1080p' | '1440p' | '4k';
  quality: 'low' | 'medium' | 'high' | 'ultra';
  fps: 30 | 60 | 120 | 'unlimited';
  enableVSync: boolean;
  enableFullscreen: boolean;
  enableHDR: boolean;
}

export interface GameplaySettings {
  difficulty: 'easy' | 'normal' | 'hard' | 'expert';
  autoSave: boolean;
  showHints: boolean;
  enableTimer: boolean;
  skipAnimations: boolean;
  enableTutorial: boolean;
  language: 'pt-BR' | 'en-US' | 'es-ES' | 'fr-FR';
}

export interface NotificationSettings {
  enablePushNotifications: boolean;
  enableEmailNotifications: boolean;
  enableSoundNotifications: boolean;
  enableGameInvites: boolean;
  enableAchievements: boolean;
  enableNews: boolean;
  notificationVolume: number;
}

export interface AccessibilitySettings {
  enableHighContrast: boolean;
  enableColorBlindSupport: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'x-large';
  enableScreenReader: boolean;
  enableSubtitles: boolean;
  enableReducedMotion: boolean;
  enableKeyboardNavigation: boolean;
}

export interface PrivacySettings {
  shareStatistics: boolean;
  allowAnalytics: boolean;
  showOnlineStatus: boolean;
  allowFriendRequests: boolean;
  shareGameHistory: boolean;
  allowDataCollection: boolean;
}

export interface ControlsSettings {
  mouseSensitivity: number;
  enableMouseAcceleration: boolean;
  keyBindings: Record<string, string>;
  enableHapticFeedback: boolean;
  doubleClickSpeed: number;
  scrollSpeed: number;
}

export interface AllSettings {
  audio: AudioSettings;
  video: VideoSettings;
  gameplay: GameplaySettings;
  notifications: NotificationSettings;
  accessibility: AccessibilitySettings;
  privacy: PrivacySettings;
  controls: ControlsSettings;
}

export interface SettingsState extends AllSettings {
  // Actions
  updateAudioSettings: (settings: Partial<AudioSettings>) => void;
  updateVideoSettings: (settings: Partial<VideoSettings>) => void;
  updateGameplaySettings: (settings: Partial<GameplaySettings>) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  updateAccessibilitySettings: (settings: Partial<AccessibilitySettings>) => void;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;
  updateControlsSettings: (settings: Partial<ControlsSettings>) => void;
  resetToDefaults: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

// ========================================
// DEFAULT SETTINGS
// ========================================

const defaultAudioSettings: AudioSettings = {
  masterVolume: 80,
  sfxVolume: 70,
  musicVolume: 60,
  voiceVolume: 85,
  isMuted: false,
  enableSpatialAudio: true,
};

const defaultVideoSettings: VideoSettings = {
  resolution: 'auto',
  quality: 'high',
  fps: 60,
  enableVSync: true,
  enableFullscreen: false,
  enableHDR: false,
};

const defaultGameplaySettings: GameplaySettings = {
  difficulty: 'normal',
  autoSave: true,
  showHints: true,
  enableTimer: true,
  skipAnimations: false,
  enableTutorial: true,
  language: 'pt-BR',
};

const defaultNotificationSettings: NotificationSettings = {
  enablePushNotifications: true,
  enableEmailNotifications: false,
  enableSoundNotifications: true,
  enableGameInvites: true,
  enableAchievements: true,
  enableNews: false,
  notificationVolume: 50,
};

const defaultAccessibilitySettings: AccessibilitySettings = {
  enableHighContrast: false,
  enableColorBlindSupport: false,
  fontSize: 'medium',
  enableScreenReader: false,
  enableSubtitles: false,
  enableReducedMotion: false,
  enableKeyboardNavigation: true,
};

const defaultPrivacySettings: PrivacySettings = {
  shareStatistics: false,
  allowAnalytics: true,
  showOnlineStatus: true,
  allowFriendRequests: true,
  shareGameHistory: false,
  allowDataCollection: false,
};

const defaultControlsSettings: ControlsSettings = {
  mouseSensitivity: 50,
  enableMouseAcceleration: false,
  keyBindings: {
    'move-up': 'W',
    'move-down': 'S',
    'move-left': 'A',
    'move-right': 'D',
    'interact': 'E',
    'inventory': 'I',
    'menu': 'ESC',
    'chat': 'T',
    'hint': 'H',
    'pause': 'P',
  },
  enableHapticFeedback: true,
  doubleClickSpeed: 500,
  scrollSpeed: 3,
};

const defaultSettings: AllSettings = {
  audio: defaultAudioSettings,
  video: defaultVideoSettings,
  gameplay: defaultGameplaySettings,
  notifications: defaultNotificationSettings,
  accessibility: defaultAccessibilitySettings,
  privacy: defaultPrivacySettings,
  controls: defaultControlsSettings,
};

// ========================================
// SETTINGS STORE
// ========================================

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial State
        ...defaultSettings,

        // ========================================
        // UPDATE ACTIONS
        // ========================================
        updateAudioSettings: (newSettings: Partial<AudioSettings>) => {
          set((state) => {
            Object.assign(state.audio, newSettings);
          });
        },

        updateVideoSettings: (newSettings: Partial<VideoSettings>) => {
          set((state) => {
            Object.assign(state.video, newSettings);
          });
        },

        updateGameplaySettings: (newSettings: Partial<GameplaySettings>) => {
          set((state) => {
            Object.assign(state.gameplay, newSettings);
          });
        },

        updateNotificationSettings: (newSettings: Partial<NotificationSettings>) => {
          set((state) => {
            Object.assign(state.notifications, newSettings);
          });
        },

        updateAccessibilitySettings: (newSettings: Partial<AccessibilitySettings>) => {
          set((state) => {
            Object.assign(state.accessibility, newSettings);
          });
        },

        updatePrivacySettings: (newSettings: Partial<PrivacySettings>) => {
          set((state) => {
            Object.assign(state.privacy, newSettings);
          });
        },

        updateControlsSettings: (newSettings: Partial<ControlsSettings>) => {
          set((state) => {
            Object.assign(state.controls, newSettings);
          });
        },

        // ========================================
        // UTILITY ACTIONS
        // ========================================
        resetToDefaults: () => {
          set(() => ({ ...defaultSettings }));
        },

        exportSettings: (): string => {
          const currentSettings = get();
          const settingsToExport = {
            audio: currentSettings.audio,
            video: currentSettings.video,
            gameplay: currentSettings.gameplay,
            notifications: currentSettings.notifications,
            accessibility: currentSettings.accessibility,
            privacy: currentSettings.privacy,
            controls: currentSettings.controls,
          };
          return JSON.stringify(settingsToExport, null, 2);
        },

        importSettings: (settingsJson: string): boolean => {
          try {
            const importedSettings = JSON.parse(settingsJson);
            
            // Validar estrutura básica
            if (!importedSettings || typeof importedSettings !== 'object') {
              return false;
            }

            set((state) => {
              // Merge com as configurações existentes
              if (importedSettings.audio) Object.assign(state.audio, importedSettings.audio);
              if (importedSettings.video) Object.assign(state.video, importedSettings.video);
              if (importedSettings.gameplay) Object.assign(state.gameplay, importedSettings.gameplay);
              if (importedSettings.notifications) Object.assign(state.notifications, importedSettings.notifications);
              if (importedSettings.accessibility) Object.assign(state.accessibility, importedSettings.accessibility);
              if (importedSettings.privacy) Object.assign(state.privacy, importedSettings.privacy);
              if (importedSettings.controls) Object.assign(state.controls, importedSettings.controls);
            });

            return true;
          } catch (error) {
            console.error('Erro ao importar configurações:', error);
            return false;
          }
        },
      })),
      {
        name: 'criminal-minds-settings',
        partialize: (state) => ({
          audio: state.audio,
          video: state.video,
          gameplay: state.gameplay,
          notifications: state.notifications,
          accessibility: state.accessibility,
          privacy: state.privacy,
          controls: state.controls,
        }),
      }
    ),
    {
      name: 'settings-store',
    }
  )
);

// ========================================
// SELECTORS
// ========================================

export const useAudioSettings = () => useSettingsStore(state => state.audio);
export const useVideoSettings = () => useSettingsStore(state => state.video);
export const useGameplaySettings = () => useSettingsStore(state => state.gameplay);
export const useNotificationSettings = () => useSettingsStore(state => state.notifications);
export const useAccessibilitySettings = () => useSettingsStore(state => state.accessibility);
export const usePrivacySettings = () => useSettingsStore(state => state.privacy);
export const useControlsSettings = () => useSettingsStore(state => state.controls);

export const useSettingsActions = () => useSettingsStore(state => ({
  updateAudioSettings: state.updateAudioSettings,
  updateVideoSettings: state.updateVideoSettings,
  updateGameplaySettings: state.updateGameplaySettings,
  updateNotificationSettings: state.updateNotificationSettings,
  updateAccessibilitySettings: state.updateAccessibilitySettings,
  updatePrivacySettings: state.updatePrivacySettings,
  updateControlsSettings: state.updateControlsSettings,
  resetToDefaults: state.resetToDefaults,
  exportSettings: state.exportSettings,
  importSettings: state.importSettings,
})); 