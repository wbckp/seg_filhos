import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/use-auth';

interface StatCardProps {
  label: string;
  value: string;
  emoji: string;
  color: string;
}

function StatCard({ label, value, emoji, color }: StatCardProps) {
  return (
    <View className={`flex-1 rounded-2xl bg-gray-900 border border-gray-800 p-4 min-w-[140px]`}>
      <View className={`w-10 h-10 rounded-xl items-center justify-center mb-3`} style={{ backgroundColor: color + '30' }}>
        <Text className="text-xl">{emoji}</Text>
      </View>
      <Text className="text-white text-2xl font-bold">{value}</Text>
      <Text className="text-gray-400 text-xs mt-1">{label}</Text>
    </View>
  );
}

interface AlertItemProps {
  type: string;
  message: string;
  time: string;
  emoji: string;
}

function AlertItem({ type, message, time, emoji }: AlertItemProps) {
  return (
    <View className="flex-row items-center py-3 border-b border-gray-800">
      <View className="w-10 h-10 rounded-full bg-gray-800 items-center justify-center mr-3">
        <Text>{emoji}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-white text-sm font-medium">{type}</Text>
        <Text className="text-gray-400 text-xs mt-0.5" numberOfLines={1}>{message}</Text>
      </View>
      <Text className="text-gray-500 text-xs ml-2">{time}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const stats = [
    { label: 'Tempo de Tela', value: '2h 45m', emoji: '⏱️', color: '#3b82f6' },
    { label: 'Apps Bloqueados', value: '12', emoji: '🚫', color: '#ef4444' },
    { label: 'Sites Bloqueados', value: '38', emoji: '🛡️', color: '#f59e0b' },
    { label: 'Alertas Hoje', value: '3', emoji: '🔔', color: '#8b5cf6' },
  ];

  const recentAlerts = [
    { type: 'App Bloqueado', message: 'Tentativa de acesso ao YouTube', time: '14:30', emoji: '🚫' },
    { type: 'Localização', message: 'Filho saiu da área permitida', time: '12:15', emoji: '📍' },
    { type: 'Tempo Esgotado', message: 'Limite diário atingido', time: '10:00', emoji: '⏰' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-6">
          <View>
            <Text className="text-gray-400 text-sm">Olá, Responsável 👋</Text>
            <Text className="text-white text-xl font-bold mt-0.5">
              {user?.email?.split('@')[0] || 'Dashboard'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={signOut}
            className="bg-gray-800 rounded-full px-4 py-2 border border-gray-700"
          >
            <Text className="text-gray-300 text-sm">Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Status banner */}
        <View className="mx-5 mb-5 bg-blue-600/10 border border-blue-500/30 rounded-2xl p-4 flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-green-500 mr-3" />
          <Text className="text-blue-300 text-sm flex-1">
            Todos os dispositivos estão <Text className="font-bold text-green-400">online</Text> e protegidos
          </Text>
        </View>

        {/* Cards de estatísticas */}
        <View className="px-5 mb-6">
          <Text className="text-white text-base font-semibold mb-3">Resumo de Hoje</Text>
          <View
            className={isTablet ? "flex-row flex-wrap gap-3" : "flex-row flex-wrap gap-3"}
          >
            {stats.map((stat, index) => (
              <View key={index} style={{ width: isTablet ? '22%' : '47%', marginBottom: isTablet ? 0 : 0 }}>
                <StatCard {...stat} />
              </View>
            ))}
          </View>
        </View>

        {/* Filhos cadastrados */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white text-base font-semibold">Filhos</Text>
            <TouchableOpacity>
              <Text className="text-blue-400 text-sm">Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row gap-3">
            {/* placeholder filho 1 */}
            <View className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-4 items-center">
              <View className="w-14 h-14 rounded-full bg-blue-600/30 items-center justify-center mb-2">
                <Text className="text-2xl">👦</Text>
              </View>
              <Text className="text-white text-sm font-semibold">João</Text>
              <View className="flex-row items-center mt-1.5">
                <View className="w-2 h-2 rounded-full bg-green-500 mr-1.5" />
                <Text className="text-green-400 text-xs">Online</Text>
              </View>
              <Text className="text-gray-400 text-xs mt-1">1h 20m hoje</Text>
            </View>
            {/* placeholder filho 2 */}
            <View className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-4 items-center">
              <View className="w-14 h-14 rounded-full bg-purple-600/30 items-center justify-center mb-2">
                <Text className="text-2xl">👧</Text>
              </View>
              <Text className="text-white text-sm font-semibold">Maria</Text>
              <View className="flex-row items-center mt-1.5">
                <View className="w-2 h-2 rounded-full bg-gray-500 mr-1.5" />
                <Text className="text-gray-400 text-xs">Offline</Text>
              </View>
              <Text className="text-gray-400 text-xs mt-1">1h 25m hoje</Text>
            </View>
          </View>
        </View>

        {/* Alertas recentes */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white text-base font-semibold">Alertas Recentes</Text>
            <TouchableOpacity>
              <Text className="text-blue-400 text-sm">Ver todos</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-gray-900 border border-gray-800 rounded-2xl px-4">
            {recentAlerts.map((alert, index) => (
              <AlertItem key={index} {...alert} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
