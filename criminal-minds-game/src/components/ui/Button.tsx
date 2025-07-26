'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

// ========================================
// BUTTON VARIANTS
// ========================================

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        // Primary (Dourado Noir)
        primary: "bg-accent-gold text-primary-900 hover:bg-accent-gold/90 shadow-noir",
        
        // Secondary (Cinza escuro)
        secondary: "bg-primary-700 text-primary-50 hover:bg-primary-600 shadow-sm",
        
        // Danger (Vermelho)
        danger: "bg-accent-red text-white hover:bg-accent-red/90 shadow-sm",
        
        // Success (Verde)
        success: "bg-accent-green text-white hover:bg-accent-green/90 shadow-sm",
        
        // Outline variants
        outline: "border border-primary-300 bg-transparent text-primary-700 hover:bg-primary-50",
        'outline-gold': "border border-accent-gold bg-transparent text-accent-gold hover:bg-accent-gold hover:text-primary-900",
        
        // Ghost variants
        ghost: "bg-transparent text-primary-700 hover:bg-primary-100",
        'ghost-gold': "bg-transparent text-accent-gold hover:bg-accent-gold/10",
        
        // Link variant
        link: "bg-transparent text-accent-blue underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10",
        'icon-sm': "h-8 w-8",
        'icon-lg': "h-12 w-12",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

// ========================================
// BUTTON COMPONENT PROPS
// ========================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

// ========================================
// BUTTON COMPONENT
// ========================================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        
        {/* Left icon */}
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center">
            {leftIcon}
          </span>
        )}
        
        {/* Button content */}
        <span className="flex items-center">
          {loading && loadingText ? loadingText : children}
        </span>
        
        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="ml-2 flex items-center">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ========================================
// BUTTON PRESETS
// ========================================

// Preset para botões de ação principal do jogo
export const GameActionButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="primary"
      size="lg"
      fullWidth
      className="font-semibold tracking-wide uppercase"
      {...props}
    >
      {children}
    </Button>
  )
);

GameActionButton.displayName = "GameActionButton";

// Preset para botões secundários
export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="outline"
      size="md"
      {...props}
    >
      {children}
    </Button>
  )
);

SecondaryButton.displayName = "SecondaryButton";

// Preset para botões de ícone
export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, size = "icon", ...props }, ref) => (
    <Button
      ref={ref}
      variant="ghost"
      size={size}
      {...props}
    >
      {children}
    </Button>
  )
);

IconButton.displayName = "IconButton";

// ========================================
// EXPORTS
// ========================================

export { Button, buttonVariants };

// ========================================
// USAGE EXAMPLES
// ========================================

/*
// Primary action button
<Button variant="primary" size="lg">
  Iniciar Investigação
</Button>

// Button with loading state
<Button variant="primary" loading loadingText="Entrando...">
  Entrar na Partida
</Button>

// Button with icons
<Button variant="secondary" leftIcon={<SearchIcon />}>
  Buscar Pistas
</Button>

// Full width button
<Button variant="primary" fullWidth>
  Fazer Acusação
</Button>

// Icon only button
<Button variant="ghost" size="icon">
  <SettingsIcon />
</Button>

// Danger button for critical actions
<Button variant="danger" size="lg">
  Abandonar Partida
</Button>

// Game action preset
<GameActionButton loading={isJoining}>
  Entrar na Sala
</GameActionButton>

// Secondary action
<SecondaryButton>
  Cancelar
</SecondaryButton>

// Icon button
<IconButton>
  <CloseIcon />
</IconButton>
*/ 