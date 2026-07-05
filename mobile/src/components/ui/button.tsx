import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  textClass?: string;
  children: React.ReactNode;
}

export function Button({ 
  className, 
  variant = 'default', 
  size = 'default', 
  isLoading, 
  textClass, 
  children, 
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'flex-row items-center justify-center rounded-md';
  const variantClasses = {
    default: 'bg-blue-600 active:bg-blue-700',
    destructive: 'bg-red-500 active:bg-red-600',
    outline: 'border border-gray-300 bg-transparent active:bg-gray-100',
    secondary: 'bg-gray-100 active:bg-gray-200',
    ghost: 'bg-transparent active:bg-gray-100',
    link: 'bg-transparent',
  };
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  };
  const textVariantClasses = {
    default: 'text-white font-medium',
    destructive: 'text-white font-medium',
    outline: 'text-gray-900 font-medium',
    secondary: 'text-gray-900 font-medium',
    ghost: 'text-gray-900 font-medium',
    link: 'text-blue-600 underline font-medium',
  };

  return (
    <TouchableOpacity
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], (disabled || isLoading) && 'opacity-50', className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'default' || variant === 'destructive' ? 'white' : '#2563eb'} />
      ) : (
        typeof children === 'string' ? (
          <Text className={cn(textVariantClasses[variant], textClass)}>
            {children}
          </Text>
        ) : (
          children
        )
      )}
    </TouchableOpacity>
  );
}
