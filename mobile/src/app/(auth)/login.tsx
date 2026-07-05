import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { signInWithEmail } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    console.log('Botão pressionado! Iniciando login com:', data.email);
    setError(null);
    try {
      await signInWithEmail(data.email, data.password);
      console.log('Login bem sucedido!');
    } catch (e: any) {
      console.error('Erro no login:', e);
      setError(e.message || 'Falha ao entrar. Verifique suas credenciais.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header com gradiente simulado */}
          <View className="h-64 bg-blue-600 items-center justify-center px-6">
            <View className="w-20 h-20 rounded-full bg-white/20 items-center justify-center mb-4 border-2 border-white/40">
              <Text className="text-4xl">🛡️</Text>
            </View>
            <Text className="text-white text-3xl font-bold">Seg. Filhos</Text>
            <Text className="text-blue-200 text-base mt-1">Controle Parental Inteligente</Text>
          </View>

          {/* Formulário */}
          <View className="flex-1 bg-gray-950 rounded-t-3xl -mt-6 px-6 pt-8">
            <Text className="text-white text-2xl font-bold mb-1">Bem-vindo de volta!</Text>
            <Text className="text-gray-400 text-sm mb-8">
              Entre na sua conta para continuar monitorando
            </Text>

            {error && (
              <View className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                <Text className="text-red-400 text-sm">{error}</Text>
              </View>
            )}

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="E-mail"
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.email?.message}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Senha"
                  placeholder="••••••••"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              )}
            />

            <TouchableOpacity className="items-end mb-6">
              <Text className="text-blue-400 text-sm">Esqueceu a senha?</Text>
            </TouchableOpacity>

            <Button
              onPress={handleSubmit(onSubmit, (errors) => console.log('Erros de validação:', errors))}
              isLoading={isSubmitting}
              className="h-12 bg-blue-600 rounded-xl"
            >
              Entrar
            </Button>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-800" />
              <Text className="text-gray-600 mx-4 text-sm">ou</Text>
              <View className="flex-1 h-px bg-gray-800" />
            </View>

            <View className="flex-row items-center justify-center pb-8">
              <Text className="text-gray-400 text-sm">Ainda não tem conta? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text className="text-blue-400 text-sm font-semibold">Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
