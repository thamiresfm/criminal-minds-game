'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Settings, Volume2, Monitor, Gamepad2, 
  Bell, Eye, Shield, Mouse, Download, Upload, 
  RotateCcw, Save, X 
} from 'lucide-react';
import { 
  useAudioSettings, useVideoSettings, useGameplaySettings,
  useNotificationSettings, useAccessibilitySettings, 
  usePrivacySettings, useControlsSettings, useSettingsActions 
} from '@/lib/stores/settingsStore';
import { useNotify } from '@/lib/stores/notificationStore';

// ========================================
// SETTINGS PAGE COMPONENT
// ========================================

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<string>('audio');
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');

  // Settings hooks
  const audioSettings = useAudioSettings();
  const videoSettings = useVideoSettings();
  const gameplaySettings = useGameplaySettings();
  const notificationSettings = useNotificationSettings();
  const accessibilitySettings = useAccessibilitySettings();
  const privacySettings = usePrivacySettings();
  const controlsSettings = useControlsSettings();

  const {
    updateAudioSettings, updateVideoSettings, updateGameplaySettings,
    updateNotificationSettings, updateAccessibilitySettings, 
    updatePrivacySettings, updateControlsSettings, resetToDefaults,
    exportSettings, importSettings
  } = useSettingsActions();
  
  const notify = useNotify();

  // ========================================
  // SETTINGS TABS
  // ========================================

  const settingsTabs = [
    { id: 'audio', label: 'Áudio', icon: Volume2 },
    { id: 'video', label: 'Vídeo', icon: Monitor },
    { id: 'gameplay', label: 'Jogabilidade', icon: Gamepad2 },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'accessibility', label: 'Acessibilidade', icon: Eye },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
    { id: 'controls', label: 'Controles', icon: Mouse },
  ];

  // ========================================
  // HANDLERS
  // ========================================

  const handleReset = () => {
    resetToDefaults();
    setShowConfirmReset(false);
    
    notify.warning(
      'Configurações Resetadas', 
      'Todas as configurações foram restauradas para os valores padrão.',
      { duration: 3000 }
    );
  };

  const handleExport = () => {
    const settings = exportSettings();
    navigator.clipboard.writeText(settings);
    setShowExportModal(false);
    
    notify.success(
      'Configurações Exportadas!', 
      'As configurações foram copiadas para a área de transferência.',
      { duration: 4000 }
    );
  };

  const handleImport = () => {
    const success = importSettings(importData);
    if (success) {
      setShowImportModal(false);
      setImportData('');
      setImportError('');
      
      notify.success(
        'Configurações Importadas!', 
        'As configurações foram aplicadas com sucesso.',
        { duration: 3000 }
      );
    } else {
      setImportError('Formato de configurações inválido');
      
      notify.error(
        'Erro na Importação', 
        'O formato das configurações está inválido. Verifique os dados e tente novamente.',
        { duration: 5000 }
      );
    }
  };

  // ========================================
  // RENDER FUNCTIONS
  // ========================================

  const renderSlider = (
    label: string, 
    value: number, 
    onChange: (value: number) => void,
    min: number = 0,
    max: number = 100,
    unit: string = '%'
  ) => (
    <div className="space-y-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center">
        <label className="text-base font-semibold text-gray-900">{label}</label>
        <span className="text-base font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-lg border border-gray-200">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full slider-enhanced"
        style={{
          background: `linear-gradient(to right, rgb(212 175 55) 0%, rgb(212 175 55) ${value}%, #F3F4F6 ${value}%, #F3F4F6 100%)`
        }}
      />
    </div>
  );

  const renderToggle = (
    label: string,
    description: string,
    checked: boolean,
    onChange: (checked: boolean) => void
  ) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex-1">
        <p className="text-base font-semibold text-gray-900 mb-1">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="ml-4">
        <button
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
            checked 
              ? 'bg-gray-300' 
              : 'bg-gray-300'
          }`}
          style={{
            backgroundColor: checked ? 'rgb(212 175 55 / var(--tw-bg-opacity, 1))' : undefined
          }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
              checked ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`block text-xs font-medium mt-1 text-center ${
          checked ? 'text-gray-500' : 'text-gray-500'
        }`}
        style={{
          color: checked ? 'rgb(212 175 55 / var(--tw-bg-opacity, 1))' : undefined
        }}>
          {checked ? 'ON' : 'OFF'}
        </span>
      </div>
    </div>
  );

  const renderSelect = (
    label: string,
    value: string,
    options: { value: string; label: string }[],
    onChange: (value: string) => void
  ) => (
    <div className="space-y-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <label className="text-base font-semibold text-gray-900 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:ring-2 focus:ring-[rgb(212,175,55)] focus:border-[rgb(212,175,55)] transition-all duration-200 hover:border-gray-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="py-2">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderAudioSlider = (
    label: string,
    value: number,
    onChange: (value: number) => void,
    icon: React.ReactNode,
    color: string = 'accent-gold'
  ) => (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-gray-100">
            <div className="w-5 h-5 text-gray-600">{icon}</div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
        </div>
        <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md font-medium text-sm border border-gray-200">
          {value}%
        </div>
      </div>
      
      <div className="relative">
        <div className="relative">
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full slider-enhanced"
            style={{
              background: `linear-gradient(to right, rgb(212 175 55) 0%, rgb(212 175 55) ${value}%, #F3F4F6 ${value}%, #F3F4F6 100%)`
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );

  const renderAudioSettings = () => (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <Volume2 className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Configurações de Áudio</h2>
              <p className="text-gray-600 mt-1">Ajuste todos os volumes e preferências de som</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-semibold ${
              audioSettings.isMuted ? 'text-red-600' : 'text-green-600'
            }`}>
              {audioSettings.isMuted ? 'MUDO' : 'ATIVO'}
            </div>
            <div className="text-sm text-gray-500">Status do Áudio</div>
          </div>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="grid gap-6">
        {renderAudioSlider(
          'Volume Geral',
          audioSettings.masterVolume,
          (value) => updateAudioSettings({ masterVolume: value }),
          <Volume2 className="w-6 h-6 text-accent-gold" />,
          'accent-gold'
        )}

        {renderAudioSlider(
          'Efeitos Sonoros',
          audioSettings.sfxVolume,
          (value) => updateAudioSettings({ sfxVolume: value }),
          <Gamepad2 className="w-6 h-6 text-blue-600" />,
          'blue-500'
        )}

        {renderAudioSlider(
          'Música de Fundo',
          audioSettings.musicVolume,
          (value) => updateAudioSettings({ musicVolume: value }),
          <Monitor className="w-6 h-6 text-purple-600" />,
          'purple-500'
        )}

        {renderAudioSlider(
          'Volume de Voz',
          audioSettings.voiceVolume,
          (value) => updateAudioSettings({ voiceVolume: value }),
          <Bell className="w-6 h-6 text-green-600" />,
          'green-500'
        )}
      </div>

      {/* Toggle Controls */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mudo Geral</h3>
                <p className="text-sm text-gray-600">Silenciar todos os sons do jogo</p>
              </div>
            </div>
            <button
              onClick={() => updateAudioSettings({ isMuted: !audioSettings.isMuted })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
                audioSettings.isMuted 
                  ? 'bg-gray-300' 
                  : 'bg-gray-300'
              }`}
              style={{
                backgroundColor: audioSettings.isMuted ? 'rgb(212 175 55 / var(--tw-bg-opacity, 1))' : undefined
              }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                  audioSettings.isMuted ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className={`text-center mt-3 text-sm font-medium ${
            audioSettings.isMuted ? 'text-gray-500' : 'text-gray-500'
          }`}
          style={{
            color: audioSettings.isMuted ? 'rgb(212 175 55 / var(--tw-bg-opacity, 1))' : undefined
          }}>
            {audioSettings.isMuted ? 'ATIVADO' : 'DESATIVADO'}
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Volume2 className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Áudio Espacial</h3>
                <p className="text-sm text-gray-600">Permite localização 3D dos sons</p>
              </div>
            </div>
            <button
              onClick={() => updateAudioSettings({ enableSpatialAudio: !audioSettings.enableSpatialAudio })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
                audioSettings.enableSpatialAudio 
                  ? 'bg-gray-300' 
                  : 'bg-gray-300'
              }`}
              style={{
                backgroundColor: audioSettings.enableSpatialAudio ? 'rgb(212 175 55 / var(--tw-bg-opacity, 1))' : undefined
              }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm ${
                  audioSettings.enableSpatialAudio ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className={`text-center mt-3 text-sm font-medium ${
            audioSettings.enableSpatialAudio ? 'text-gray-500' : 'text-gray-500'
          }`}
          style={{
            color: audioSettings.enableSpatialAudio ? 'rgb(212 175 55 / var(--tw-bg-opacity, 1))' : undefined
          }}>
            {audioSettings.enableSpatialAudio ? 'ATIVADO' : 'DESATIVADO'}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVideoSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-100 text-gray-900 p-4 rounded-lg mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold flex items-center">
          <Monitor className="w-6 h-6 mr-3" style={{ color: 'rgb(212 175 55)' }} />
          Configurações de Vídeo
        </h2>
        <p className="text-sm text-gray-600 mt-1">Ajuste qualidade gráfica e resolução</p>
      </div>
      
      {renderSelect(
        'Resolução',
        videoSettings.resolution,
        [
          { value: 'auto', label: 'Automática' },
          { value: '720p', label: '1280x720 (HD)' },
          { value: '1080p', label: '1920x1080 (Full HD)' },
          { value: '1440p', label: '2560x1440 (2K)' },
          { value: '4k', label: '3840x2160 (4K)' },
        ],
        (value) => updateVideoSettings({ resolution: value as any })
      )}

      {renderSelect(
        'Qualidade Gráfica',
        videoSettings.quality,
        [
          { value: 'low', label: 'Baixa' },
          { value: 'medium', label: 'Média' },
          { value: 'high', label: 'Alta' },
          { value: 'ultra', label: 'Ultra' },
        ],
        (value) => updateVideoSettings({ quality: value as any })
      )}

      {renderSelect(
        'Taxa de Quadros (FPS)',
        videoSettings.fps.toString(),
        [
          { value: '30', label: '30 FPS' },
          { value: '60', label: '60 FPS' },
          { value: '120', label: '120 FPS' },
          { value: 'unlimited', label: 'Ilimitado' },
        ],
        (value) => updateVideoSettings({ fps: value === 'unlimited' ? 'unlimited' : Number(value) as any })
      )}

      {renderToggle(
        'V-Sync',
        'Sincronização vertical para evitar tearing',
        videoSettings.enableVSync,
        (checked) => updateVideoSettings({ enableVSync: checked })
      )}

      {renderToggle(
        'Tela Cheia',
        'Executar o jogo em modo tela cheia',
        videoSettings.enableFullscreen,
        (checked) => updateVideoSettings({ enableFullscreen: checked })
      )}

      {renderToggle(
        'HDR',
        'High Dynamic Range para cores mais vibrantes',
        videoSettings.enableHDR,
        (checked) => updateVideoSettings({ enableHDR: checked })
      )}
    </div>
  );

  const renderGameplaySettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-100 text-gray-900 p-4 rounded-lg mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold flex items-center">
          <Gamepad2 className="w-6 h-6 mr-3" style={{ color: 'rgb(212 175 55)' }} />
          Configurações de Jogabilidade
        </h2>
        <p className="text-sm text-gray-600 mt-1">Personalize sua experiência de jogo</p>
      </div>
      
      {renderSelect(
        'Dificuldade',
        gameplaySettings.difficulty,
        [
          { value: 'easy', label: 'Fácil' },
          { value: 'normal', label: 'Normal' },
          { value: 'hard', label: 'Difícil' },
          { value: 'expert', label: 'Especialista' },
        ],
        (value) => updateGameplaySettings({ difficulty: value as any })
      )}

      {renderSelect(
        'Idioma',
        gameplaySettings.language,
        [
          { value: 'pt-BR', label: 'Português (Brasil)' },
          { value: 'en-US', label: 'English (US)' },
          { value: 'es-ES', label: 'Español' },
          { value: 'fr-FR', label: 'Français' },
        ],
        (value) => updateGameplaySettings({ language: value as any })
      )}

      {renderToggle(
        'Salvamento Automático',
        'Salvar progresso automaticamente',
        gameplaySettings.autoSave,
        (checked) => updateGameplaySettings({ autoSave: checked })
      )}

      {renderToggle(
        'Mostrar Dicas',
        'Exibir dicas durante o jogo',
        gameplaySettings.showHints,
        (checked) => updateGameplaySettings({ showHints: checked })
      )}

      {renderToggle(
        'Timer Visível',
        'Mostrar cronômetro durante as investigações',
        gameplaySettings.enableTimer,
        (checked) => updateGameplaySettings({ enableTimer: checked })
      )}

      {renderToggle(
        'Pular Animações',
        'Acelerar animações para jogabilidade mais rápida',
        gameplaySettings.skipAnimations,
        (checked) => updateGameplaySettings({ skipAnimations: checked })
      )}

      {renderToggle(
        'Tutorial Habilitado',
        'Mostrar tutoriais para novos jogadores',
        gameplaySettings.enableTutorial,
        (checked) => updateGameplaySettings({ enableTutorial: checked })
      )}
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-100 text-gray-900 p-4 rounded-lg mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold flex items-center">
          <Bell className="w-6 h-6 mr-3" style={{ color: 'rgb(212 175 55)' }} />
          Configurações de Notificações
        </h2>
        <p className="text-sm text-gray-600 mt-1">Gerencie alertas e avisos do jogo</p>
      </div>
      
      {renderSlider('Volume das Notificações', notificationSettings.notificationVolume, (value) => 
        updateNotificationSettings({ notificationVolume: value })
      )}

      {renderToggle(
        'Notificações Push',
        'Receber notificações do navegador',
        notificationSettings.enablePushNotifications,
        (checked) => updateNotificationSettings({ enablePushNotifications: checked })
      )}

      {renderToggle(
        'Notificações por Email',
        'Receber emails sobre o jogo',
        notificationSettings.enableEmailNotifications,
        (checked) => updateNotificationSettings({ enableEmailNotifications: checked })
      )}

      {renderToggle(
        'Sons de Notificação',
        'Reproduzir sons para notificações',
        notificationSettings.enableSoundNotifications,
        (checked) => updateNotificationSettings({ enableSoundNotifications: checked })
      )}

      {renderToggle(
        'Convites de Jogo',
        'Receber convites de outros jogadores',
        notificationSettings.enableGameInvites,
        (checked) => updateNotificationSettings({ enableGameInvites: checked })
      )}

      {renderToggle(
        'Conquistas',
        'Notificações sobre conquistas desbloqueadas',
        notificationSettings.enableAchievements,
        (checked) => updateNotificationSettings({ enableAchievements: checked })
      )}

      {renderToggle(
        'Notícias e Atualizações',
        'Receber informações sobre atualizações',
        notificationSettings.enableNews,
        (checked) => updateNotificationSettings({ enableNews: checked })
      )}
    </div>
  );

  const renderAccessibilitySettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-100 text-gray-900 p-4 rounded-lg mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold flex items-center">
          <Eye className="w-6 h-6 mr-3" style={{ color: 'rgb(212 175 55)' }} />
          Configurações de Acessibilidade
        </h2>
        <p className="text-sm text-gray-600 mt-1">Opções para melhor acessibilidade</p>
      </div>
      
      {renderSelect(
        'Tamanho da Fonte',
        accessibilitySettings.fontSize,
        [
          { value: 'small', label: 'Pequena' },
          { value: 'medium', label: 'Média' },
          { value: 'large', label: 'Grande' },
          { value: 'x-large', label: 'Extra Grande' },
        ],
        (value) => updateAccessibilitySettings({ fontSize: value as any })
      )}

      {renderToggle(
        'Alto Contraste',
        'Aumentar contraste para melhor visibilidade',
        accessibilitySettings.enableHighContrast,
        (checked) => updateAccessibilitySettings({ enableHighContrast: checked })
      )}

      {renderToggle(
        'Suporte para Daltonismo',
        'Ajustes de cor para daltonismo',
        accessibilitySettings.enableColorBlindSupport,
        (checked) => updateAccessibilitySettings({ enableColorBlindSupport: checked })
      )}

      {renderToggle(
        'Leitor de Tela',
        'Compatibilidade com leitores de tela',
        accessibilitySettings.enableScreenReader,
        (checked) => updateAccessibilitySettings({ enableScreenReader: checked })
      )}

      {renderToggle(
        'Legendas',
        'Exibir legendas para áudios',
        accessibilitySettings.enableSubtitles,
        (checked) => updateAccessibilitySettings({ enableSubtitles: checked })
      )}

      {renderToggle(
        'Movimento Reduzido',
        'Reduzir animações para sensibilidade ao movimento',
        accessibilitySettings.enableReducedMotion,
        (checked) => updateAccessibilitySettings({ enableReducedMotion: checked })
      )}

      {renderToggle(
        'Navegação por Teclado',
        'Habilitar navegação completa via teclado',
        accessibilitySettings.enableKeyboardNavigation,
        (checked) => updateAccessibilitySettings({ enableKeyboardNavigation: checked })
      )}
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-100 text-gray-900 p-4 rounded-lg mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold flex items-center">
          <Shield className="w-6 h-6 mr-3" style={{ color: 'rgb(212 175 55)' }} />
          Configurações de Privacidade
        </h2>
        <p className="text-sm text-gray-600 mt-1">Controle sua privacidade e dados</p>
      </div>
      
      {renderToggle(
        'Compartilhar Estatísticas',
        'Permitir compartilhamento de estatísticas de jogo',
        privacySettings.shareStatistics,
        (checked) => updatePrivacySettings({ shareStatistics: checked })
      )}

      {renderToggle(
        'Permitir Analytics',
        'Enviar dados de uso para melhorar o jogo',
        privacySettings.allowAnalytics,
        (checked) => updatePrivacySettings({ allowAnalytics: checked })
      )}

      {renderToggle(
        'Mostrar Status Online',
        'Outros jogadores podem ver quando você está online',
        privacySettings.showOnlineStatus,
        (checked) => updatePrivacySettings({ showOnlineStatus: checked })
      )}

      {renderToggle(
        'Permitir Solicitações de Amizade',
        'Receber solicitações de amizade de outros jogadores',
        privacySettings.allowFriendRequests,
        (checked) => updatePrivacySettings({ allowFriendRequests: checked })
      )}

      {renderToggle(
        'Compartilhar Histórico de Jogos',
        'Outros podem ver seu histórico de partidas',
        privacySettings.shareGameHistory,
        (checked) => updatePrivacySettings({ shareGameHistory: checked })
      )}

      {renderToggle(
        'Coleta de Dados',
        'Permitir coleta de dados para pesquisa e desenvolvimento',
        privacySettings.allowDataCollection,
        (checked) => updatePrivacySettings({ allowDataCollection: checked })
      )}
    </div>
  );

  const renderControlsSettings = () => (
    <div className="space-y-6">
      <div className="bg-gray-100 text-gray-900 p-4 rounded-lg mb-6 border border-gray-200">
        <h2 className="text-2xl font-bold flex items-center">
          <Settings className="w-6 h-6 mr-3" style={{ color: 'rgb(212 175 55)' }} />
          Configurações de Controles
        </h2>
        <p className="text-sm text-gray-600 mt-1">Personalize controles e atalhos</p>
      </div>
      
      {renderSlider('Sensibilidade do Mouse', controlsSettings.mouseSensitivity, (value) => 
        updateControlsSettings({ mouseSensitivity: value }), 0, 100, '%'
      )}

      {renderSlider('Velocidade de Rolagem', controlsSettings.scrollSpeed, (value) => 
        updateControlsSettings({ scrollSpeed: value }), 1, 10, 'x'
      )}

      {renderSlider('Velocidade do Duplo Clique', controlsSettings.doubleClickSpeed, (value) => 
        updateControlsSettings({ doubleClickSpeed: value }), 100, 1000, 'ms'
      )}

      {renderToggle(
        'Aceleração do Mouse',
        'Habilitar aceleração para movimento do mouse',
        controlsSettings.enableMouseAcceleration,
        (checked) => updateControlsSettings({ enableMouseAcceleration: checked })
      )}

      {renderToggle(
        'Feedback Háptico',
        'Vibração em dispositivos compatíveis',
        controlsSettings.enableHapticFeedback,
        (checked) => updateControlsSettings({ enableHapticFeedback: checked })
      )}

              <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Teclas de Atalho</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(controlsSettings.keyBindings).map(([action, key]) => (
            <div key={action} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
              <span className="text-sm text-gray-700 capitalize font-medium">
                {action.replace('-', ' ')}
              </span>
              <kbd className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-mono font-semibold text-gray-800 shadow-sm hover:shadow-md transition-all duration-200 min-w-[40px] text-center">
                {key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'audio': return renderAudioSettings();
      case 'video': return renderVideoSettings();
      case 'gameplay': return renderGameplaySettings();
      case 'notifications': return renderNotificationSettings();
      case 'accessibility': return renderAccessibilitySettings();
      case 'privacy': return renderPrivacySettings();
      case 'controls': return renderControlsSettings();
      default: return renderAudioSettings();
    }
  };

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Header */}
      <div className="bg-primary-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/lobby"
              className="flex items-center space-x-2 text-primary-200 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Lobby</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Settings className="w-6 h-6 text-accent-gold" />
              <h1 className="text-xl font-bold">Configurações</h1>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Exportar</span>
            </button>
            
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Importar</span>
            </button>

            <button
              onClick={() => setShowConfirmReset(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-accent-red hover:bg-red-600 rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm font-medium">Resetar</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-primary-200 min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-primary-900 mb-4">Categorias</h2>
            <nav className="space-y-1">
              {settingsTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-accent-gold text-primary-900 font-medium'
                        : 'text-primary-600 hover:bg-primary-100'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-2xl">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Resetar Configurações
            </h3>
            <p className="text-primary-600 mb-6">
              Tem certeza que deseja resetar todas as configurações para os valores padrão?
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 px-4 py-2 border-2 border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-accent-red text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Resetar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">
              Exportar Configurações
            </h3>
            <p className="text-primary-600 mb-4">
              Suas configurações serão copiadas para a área de transferência.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 border-2 border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-accent-gold text-primary-900 rounded-lg hover:bg-accent-gold/90 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
              >
                Copiar para Área de Transferência
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">
              Importar Configurações
            </h3>
            <p className="text-primary-600 mb-4">
              Cole o JSON das configurações exportadas:
            </p>
            <textarea
              value={importData}
              onChange={(e) => {
                setImportData(e.target.value);
                setImportError('');
              }}
              placeholder="Cole aqui o JSON das configurações..."
              className="w-full h-32 p-3 border-2 border-primary-300 rounded-lg resize-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all duration-200 font-mono text-sm"
            />
            {importError && (
              <p className="text-accent-red text-sm mt-2">{importError}</p>
            )}
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportData('');
                  setImportError('');
                }}
                className="flex-1 px-4 py-2 border-2 border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleImport}
                disabled={!importData.trim()}
                className="flex-1 px-4 py-2 bg-accent-gold text-primary-900 rounded-lg hover:bg-accent-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg disabled:shadow-none"
              >
                Importar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 