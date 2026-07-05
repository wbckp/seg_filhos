import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, Text, View } from 'react-native';
import { cn } from './button'; // reusing cn from button for simplicity

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <View className="mb-4">
        {label && (
          <Text className="mb-1.5 text-sm font-medium text-gray-900">
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          className={cn(
            "h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900",
            "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          placeholderTextColor="#9ca3af"
          {...props}
        />
        {error && (
          <Text className="mt-1 text-sm text-red-500">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";
