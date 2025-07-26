'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, GamepadIcon, AlertCircle, CheckCircle, User } from 'lucide-react';
import { useAuth, useAuthActions, useAuthValidation } from '@/lib/stores/authStore';

// ========================================
// LOGIN PAGE COMPONENT
// ========================================

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, error } = useAuth();
  const { login, loginAsGuest, clearError } = useAuthActions();
  const { validateEmail, validatePassword } = useAuthValidation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });
  
  const [showGuestNameModal, setShowGuestNameModal] = useState(false);
  const [guestName, setGuestName] = useState('');

  // ========================================
  // EFFECTS
  // ========================================

  // Redirecionar se já autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/lobby');
    }
  }, [isAuthenticated, router]);

  // Limpar erro quando componente monta
  useEffect(() => {
    clearError();
  }, [clearError]);

  // ========================================
  // HANDLERS
  // ========================================

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Validação em tempo real
    if (name === 'email') {
      const emailValidation = validateEmail(value);
      setValidationErrors(prev => ({
        ...prev,
        email: emailValidation.isValid ? '' : emailValidation.error || '',
      }));
    }
    
    if (name === 'password') {
      // Senhas de teste são sempre válidas para login
      const testPasswords = ['Admin123!', 'Demo123!'];
      const isTestPassword = testPasswords.includes(value);
      
      if (isTestPassword) {
        // Senha de teste - sempre válida
        setValidationErrors(prev => ({
          ...prev,
          password: '',
        }));
      } else {
        // Senha normal - aplicar validação
        const passwordValidation = validatePassword(value);
        setValidationErrors(prev => ({
          ...prev,
          password: passwordValidation.isValid ? '' : passwordValidation.errors[0] || '',
        }));
      }
    }
    
    // Limpar erro global quando usuário começar a digitar
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
      
      // Redirecionar será feito pelo useEffect acima
      
    } catch (err) {
      // Erro será gerenciado pelo store
      console.error('Login failed:', err);
    }
  };

  const handleGuestLogin = async () => {
    setShowGuestNameModal(true);
  };

  const handleGuestNameSubmit = async () => {
    try {
      await loginAsGuest(guestName);
      setShowGuestNameModal(false);
      // Redirecionar será feito pelo useEffect acima
      
    } catch (err) {
      console.error('Guest login failed:', err);
    }
  };

  const isFormValid = () => {
    // Verificar se é senha de teste
    const testPasswords = ['Admin123!', 'Demo123!'];
    const isTestPassword = testPasswords.includes(formData.password);
    

    // Formulário é válido se:
    // - Email e senha preenchidos
    // - Email válido
    // - Senha válida OU é senha de teste
    return formData.email && 
           formData.password && 
           !validationErrors.email && 
           (isTestPassword || !validationErrors.password);
  };

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuMSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] repeat"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-primary-50 rounded-2xl shadow-noir-lg p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/10 mb-4">
              <GamepadIcon className="w-8 h-8 text-accent-gold" />
            </div>
            <h1 className="text-2xl font-display font-bold text-primary-900">
              Criminal Minds
            </h1>
            <p className="text-text-secondary">
              Entre para desvendar mistérios
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-accent-red/10 border border-accent-red/20 rounded-lg p-3">
              <p className="text-accent-red text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-primary-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg bg-white text-primary-900 placeholder-text-muted focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    validationErrors.email 
                      ? 'border-accent-red focus:ring-accent-red' 
                      : formData.email && !validationErrors.email
                        ? 'border-accent-green focus:ring-accent-green'
                        : 'border-primary-300 focus:ring-accent-gold'
                  }`}
                  placeholder="seu@email.com"
                  disabled={isLoading}
                />
                {/* Validation Icon */}
                {formData.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validationErrors.email ? (
                      <AlertCircle className="w-5 h-5 text-accent-red" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-accent-green" />
                    )}
                  </div>
                )}
              </div>
              {/* Email Validation Error */}
              {validationErrors.email && (
                <p className="text-sm text-accent-red flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-primary-700">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white text-primary-900 placeholder-text-muted focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    // Se é senha de teste, sempre verde
                    ['Admin123!', 'Demo123!'].includes(formData.password)
                      ? 'border-accent-green focus:ring-accent-green'
                      // Se tem erro e não é senha de teste, vermelho
                      : validationErrors.password
                        ? 'border-accent-red focus:ring-accent-red' 
                        // Se tem senha e não tem erro, verde
                        : formData.password && !validationErrors.password
                          ? 'border-accent-green focus:ring-accent-green'
                          // Estado padrão
                          : 'border-primary-300 focus:ring-accent-gold'
                  }`}
                  placeholder="Sua senha"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-primary-700 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password Validation Error */}
              {validationErrors.password && !['Admin123!', 'Demo123!'].includes(formData.password) && (
                <p className="text-sm text-accent-red flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.password}
                </p>
              )}
              {/* Password Feedback */}
              {formData.password && (
                <>
                  {['Admin123!', 'Demo123!'].includes(formData.password) ? (
                    <p className="text-sm text-accent-green flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Senha de teste válida! ✨
                    </p>
                  ) : !validationErrors.password ? (
                    <p className="text-sm text-accent-green flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Senha forte!
                    </p>
                  ) : null}
                </>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-4 h-4 text-accent-gold bg-white border-primary-300 rounded focus:ring-accent-gold focus:ring-2"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-primary-700">
                Lembrar de mim
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid()}
              className={`w-full py-3 px-4 rounded-lg font-semibold focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 transition-all duration-200 active:scale-[0.98] ${
                isLoading || !isFormValid()
                  ? 'bg-primary-300 text-primary-500 cursor-not-allowed'
                  : 'bg-accent-gold text-primary-900 hover:bg-accent-gold/90'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-900 border-t-transparent mr-2"></div>
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </button>

            {/* Demo Credentials */}
            <div className="bg-primary-50 p-3 rounded-lg border border-primary-200">
              <p className="text-xs text-primary-600 mb-2 font-medium">Credenciais de teste:</p>
              <div className="space-y-1 text-xs text-primary-500">
                <p><strong>Admin:</strong> admin@criminalmind.com / Admin123!</p>
                <p><strong>Demo:</strong> demo@test.com / Demo123!</p>
              </div>
            </div>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Não tem conta?{' '}
              <Link 
                href="/register" 
                className="text-accent-gold hover:text-accent-gold/80 font-medium transition-colors"
              >
                Registrar-se
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-primary-50 text-text-muted">ou</span>
            </div>
          </div>

          {/* Guest Login */}
          <button
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="w-full bg-primary-700 text-primary-50 py-3 px-4 rounded-lg font-medium hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-50 border-t-transparent mr-2"></div>
                Entrando...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <User className="w-5 h-5 mr-2" />
                Entrar como Convidado
              </div>
            )}
          </button>

          {/* Footer */}
          <div className="text-center pt-4">
            <Link 
              href="/forgot-password" 
              className="text-sm text-text-secondary hover:text-primary-700 transition-colors"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mt-6">
          <p className="text-xs text-primary-400">
            Criminal Minds Game v1.0.0
          </p>
        </div>
      </div>

      {/* Guest Name Modal */}
      {showGuestNameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-gold/10 mb-3">
                <User className="w-6 h-6 text-accent-gold" />
              </div>
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Nome do Detetive
              </h3>
              <p className="text-sm text-text-secondary">
                Como você gostaria de ser chamado na investigação?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Detetive Anônimo"
                  className="w-full px-4 py-3 border border-primary-300 rounded-lg bg-white text-primary-900 placeholder-text-muted focus:ring-2 focus:ring-accent-gold focus:border-transparent transition-all duration-200"
                  maxLength={50}
                  disabled={isLoading}
                />
                <p className="text-xs text-text-muted mt-1">
                  Deixe em branco para um nome aleatório
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowGuestNameModal(false)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-primary-300 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleGuestNameSubmit}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-accent-gold text-primary-900 rounded-lg hover:bg-accent-gold/90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-900 border-t-transparent"></div>
                    </div>
                  ) : (
                    'Continuar'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 