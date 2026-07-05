import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const registerSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const { signUpWithEmail } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RegisterForm) => {
    setError(null);
    try {
      await signUpWithEmail(data.email, data.password);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'Falha ao criar conta. Tente novamente.');
    }
  };

  if (success) {
    return (
      <SafeAreaView className="flex-1 bg-gray-950 items-center justify-center px-6">
        <View className="w-24 h-24 rounded-full bg-green-500/20 items-center justify-center mb-6">
          <Text className="text-5xl">✅</Text>
        </View>
        <Text className="text-white text-2xl font-bold text-center mb-3">Conta criada!</Text>
        <Text className="text-gray-400 text-center text-base mb-8">
          Verifique seu e-mail para confirmar o cadastro antes de entrar.
        </Text>
        <Button onPress={() => router.replace('/(auth)/login')} className="h-12 bg-blue-600 rounded-xl px-10">
          Ir para o Login
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="h-48 bg-blue-600 items-center justify-center px-6">
            <Text className="text-white text-3xl font-bold">Crie sua conta</Text>
            <Text className="text-blue-200 text-sm mt-1">Comece a proteger seus filhos agora</Text>
          </View>

          <View className="flex-1 bg-gray-950 rounded-t-3xl -mt-6 px-6 pt-8">
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

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirmar Senha"
                  placeholder="••••••••"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.confirmPassword?.message}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              )}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              isLoading={isSubmitting}
              className="h-12 bg-blue-600 rounded-xl mt-2"
            >
              Criar conta
            </Button>

            <View className="flex-row items-center justify-center mt-6 pb-8">
              <Text className="text-gray-400 text-sm">Já tem conta? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-blue-400 text-sm font-semibold">Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
