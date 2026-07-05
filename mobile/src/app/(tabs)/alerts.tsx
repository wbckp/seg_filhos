import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const alertsData = [
  { id: 1, type: 'App Bloqueado', message: 'João tentou acessar o Instagram', time: '14:30', read: false, emoji: '🚫', color: '#ef4444' },
  { id: 2, type: 'Localização', message: 'Maria saiu da área permitida (Escola)', time: '12:15', read: false, emoji: '📍', color: '#f59e0b' },
  { id: 3, type: 'Tempo Esgotado', message: 'Limite diário de João atingido', time: '10:00', read: true, emoji: '⏰', color: '#3b82f6' },
  { id: 4, type: 'Site Bloqueado', message: 'Tentativa de acesso a site adulto', time: '09:45', read: true, emoji: '🛡️', color: '#8b5cf6' },
  { id: 5, type: 'App Instalado', message: 'Novo app instalado: TikTok', time: 'Ontem', read: true, emoji: '📲', color: '#10b981' },
];

export default function AlertsScreen() {
  const unreadCount = alertsData.filter(a => !a.read).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-2">
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-2xl font-bold">Alertas</Text>
            {unreadCount > 0 && (
              <View className="bg-red-500 rounded-full w-6 h-6 items-center justify-center">
                <Text className="text-white text-xs font-bold">{unreadCount}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity>
            <Text className="text-blue-400 text-sm">Marcar todos como lido</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5 pt-4 gap-3">
          {alertsData.map((alert) => (
            <TouchableOpacity
              key={alert.id}
              className={`rounded-2xl p-4 border ${alert.read ? 'bg-gray-900 border-gray-800' : 'bg-gray-900 border-blue-500/40'}`}
            >
              <View className="flex-row items-start">
                <View
                  className="w-11 h-11 rounded-xl items-center justify-center mr-3 mt-0.5"
                  style={{ backgroundColor: alert.color + '25' }}
                >
                  <Text className="text-xl">{alert.emoji}</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-white text-sm font-semibold">{alert.type}</Text>
                    <Text className="text-gray-500 text-xs">{alert.time}</Text>
                  </View>
                  <Text className="text-gray-400 text-sm mt-1 leading-5">{alert.message}</Text>
                </View>
                {!alert.read && (
                  <View className="w-2 h-2 rounded-full bg-blue-500 ml-2 mt-2" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
