'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Eye, EyeOff, Mail, Lock, User, GamepadIcon, 
  AlertCircle, CheckCircle, Shield, FileText 
} from 'lucide-react';
import { useAuth, useAuthActions, useAuthValidation } from '@/lib/stores/authStore';

// ========================================
// REGISTER PAGE COMPONENT
// ========================================

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, error } = useAuth();
  const { register, clearError } = useAuthActions();
  const { validateEmail, validatePassword, validateName } = useAuthValidation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: '',
  });

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
    if (name === 'name') {
      const nameValidation = validateName(value);
      setValidationErrors(prev => ({
        ...prev,
        name: nameValidation.isValid ? '' : nameValidation.error || '',
      }));
    }
    
    if (name === 'email') {
      const emailValidation = validateEmail(value);
      setValidationErrors(prev => ({
        ...prev,
        email: emailValidation.isValid ? '' : emailValidation.error || '',
      }));
    }
    
    if (name === 'password') {
      const passwordValidation = validatePassword(value);
      setValidationErrors(prev => ({
        ...prev,
        password: passwordValidation.isValid ? '' : passwordValidation.errors[0] || '',
      }));
      
      // Também validar confirmação de senha se já foi preenchida
      if (formData.confirmPassword) {
        setValidationErrors(prev => ({
          ...prev,
          confirmPassword: value === formData.confirmPassword ? '' : 'Senhas não coincidem',
        }));
      }
    }
    
    if (name === 'confirmPassword') {
      setValidationErrors(prev => ({
        ...prev,
        confirmPassword: value === formData.password ? '' : 'Senhas não coincidem',
      }));
    }
    
    if (name === 'acceptTerms') {
      setValidationErrors(prev => ({
        ...prev,
        terms: checked ? '' : 'Você deve aceitar os termos de uso',
      }));
    }
    
    // Limpar erro global quando usuário começar a digitar
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        acceptTerms: formData.acceptTerms,
      });
      
      // Redirecionar será feito pelo useEffect acima
      
    } catch (err) {
      // Erro será gerenciado pelo store
      console.error('Registration failed:', err);
    }
  };

  const isFormValid = () => {
    return formData.name && 
           formData.email && 
           formData.password && 
           formData.confirmPassword &&
           formData.acceptTerms &&
           !validationErrors.name && 
           !validationErrors.email && 
           !validationErrors.password && 
           !validationErrors.confirmPassword;
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: 'Nenhuma' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
    
    if (score <= 2) return { strength: 1, label: 'Fraca', color: 'bg-accent-red' };
    if (score <= 3) return { strength: 2, label: 'Média', color: 'bg-accent-gold' };
    if (score <= 4) return { strength: 3, label: 'Forte', color: 'bg-accent-green' };
    return { strength: 4, label: 'Muito Forte', color: 'bg-accent-green' };
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

      {/* Register Card */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-primary-50 rounded-2xl shadow-noir-lg p-8 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/10 mb-4">
              <Shield className="w-8 h-8 text-accent-gold" />
            </div>
            <h1 className="text-2xl font-display font-bold text-primary-900">
              Criar Conta
            </h1>
            <p className="text-text-secondary">
              Junte-se aos melhores detetives
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-accent-red/10 border border-accent-red/20 rounded-lg p-3">
              <p className="text-accent-red text-sm font-medium flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </p>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-primary-700">
                Nome Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-10 py-3 border rounded-lg bg-white text-primary-900 placeholder-text-muted focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    validationErrors.name 
                      ? 'border-accent-red focus:ring-accent-red' 
                      : formData.name && !validationErrors.name
                        ? 'border-accent-green focus:ring-accent-green'
                        : 'border-primary-300 focus:ring-accent-gold'
                  }`}
                  placeholder="Seu nome completo"
                  disabled={isLoading}
                  maxLength={50}
                />
                {/* Validation Icon */}
                {formData.name && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {validationErrors.name ? (
                      <AlertCircle className="w-5 h-5 text-accent-red" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-accent-green" />
                    )}
                  </div>
                )}
              </div>
              {/* Name Validation Error */}
              {validationErrors.name && (
                <p className="text-sm text-accent-red flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.name}
                </p>
              )}
            </div>

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
                    validationErrors.password 
                      ? 'border-accent-red focus:ring-accent-red' 
                      : formData.password && !validationErrors.password
                        ? 'border-accent-green focus:ring-accent-green'
                        : 'border-primary-300 focus:ring-accent-gold'
                  }`}
                  placeholder="Crie uma senha forte"
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">Força da senha:</span>
                    <span className={`font-medium ${
                      getPasswordStrength().strength <= 2 ? 'text-accent-red' : 'text-accent-green'
                    }`}>
                      {getPasswordStrength().label}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 h-2 rounded-full ${
                          level <= getPasswordStrength().strength
                            ? getPasswordStrength().color
                            : 'bg-primary-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Password Validation Error */}
              {validationErrors.password && (
                <p className="text-sm text-accent-red flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary-700">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg bg-white text-primary-900 placeholder-text-muted focus:ring-2 focus:border-transparent transition-all duration-200 ${
                    validationErrors.confirmPassword 
                      ? 'border-accent-red focus:ring-accent-red' 
                      : formData.confirmPassword && !validationErrors.confirmPassword
                        ? 'border-accent-green focus:ring-accent-green'
                        : 'border-primary-300 focus:ring-accent-gold'
                  }`}
                  placeholder="Confirme sua senha"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-primary-700 transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Confirm Password Validation Error */}
              {validationErrors.confirmPassword && (
                <p className="text-sm text-accent-red flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-2">
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 mt-1 text-accent-gold bg-white border-primary-300 rounded focus:ring-accent-gold focus:ring-2"
                  disabled={isLoading}
                />
                <label htmlFor="acceptTerms" className="ml-2 text-sm text-primary-700">
                  Eu aceito os{' '}
                  <Link href="/terms" className="text-accent-gold hover:text-accent-gold/80 font-medium">
                    Termos de Uso
                  </Link>
                  {' '}e{' '}
                  <Link href="/privacy" className="text-accent-gold hover:text-accent-gold/80 font-medium">
                    Política de Privacidade
                  </Link>
                </label>
              </div>
              {validationErrors.terms && (
                <p className="text-sm text-accent-red flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {validationErrors.terms}
                </p>
              )}
            </div>

            {/* Register Button */}
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
                  Criando conta...
                </div>
              ) : (
                'Criar Conta'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-text-secondary">
              Já tem uma conta?{' '}
              <Link 
                href="/login" 
                className="text-accent-gold hover:text-accent-gold/80 font-medium transition-colors"
              >
                Fazer Login
              </Link>
            </p>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mt-6">
          <p className="text-xs text-primary-400">
            Criminal Minds Game v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
} 