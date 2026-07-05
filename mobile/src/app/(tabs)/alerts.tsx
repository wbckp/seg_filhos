import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/hooks/use-auth';

interface Alert {
  id: string;
  type: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const ALERT_EMOJI: Record<string, string> = {
  'App Bloqueado': '🚫',
  'Site Bloqueado': '🛡️',
  'Localização': '📍',
  'Tempo Esgotado': '⏰',
  'App Instalado': '📲',
};

const ALERT_COLOR: Record<string, string> = {
  'App Bloqueado': '#ef4444',
  'Site Bloqueado': '#8b5cf6',
  'Localização': '#f59e0b',
  'Tempo Esgotado': '#3b82f6',
  'App Instalado': '#10b981',
};

export default function AlertsScreen() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchAlerts();
  }, [user]);

  async function fetchAlerts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('alerts')
      .select('id, type, message, created_at, is_read')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error) setAlerts(data ?? []);
    setLoading(false);
  }

  async function markAllRead() {
    await supabase
      .from('alerts')
      .update({ is_read: true })
      .eq('user_id', user!.id)
      .eq('is_read', false);
    setAlerts((prev) => prev.map((a) => ({ ...a, is_read: true })));
  }

  const unreadCount = alerts.filter((a) => !a.is_read).length;

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
          <View className="flex-row items-center gap-2">
            <Text className="text-white text-2xl font-bold">Alertas</Text>
            {unreadCount > 0 && (
              <View className="bg-red-500 rounded-full w-6 h-6 items-center justify-center">
                <Text className="text-white text-xs font-bold">{unreadCount}</Text>
              </View>
            )}
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllRead}>
              <Text className="text-blue-400 text-sm">Marcar todos como lido</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View className="items-center py-20">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-gray-400 mt-4">Carregando alertas...</Text>
          </View>
        ) : alerts.length === 0 ? (
          <View className="items-center justify-center px-8 py-20">
            <Text className="text-6xl mb-4">✅</Text>
            <Text className="text-white text-lg font-bold text-center">Nenhum alerta</Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Tudo tranquilo! Os alertas aparecerão aqui quando houver atividade nos dispositivos monitorados.
            </Text>
          </View>
        ) : (
          <View className="px-5 pb-6 gap-3">
            {alerts.map((alert) => {
              const emoji = ALERT_EMOJI[alert.type] ?? '🔔';
              const color = ALERT_COLOR[alert.type] ?? '#6b7280';
              return (
                <TouchableOpacity
                  key={alert.id}
                  className={`rounded-2xl p-4 border ${alert.is_read ? 'bg-gray-900 border-gray-800' : 'bg-gray-900 border-blue-500/40'}`}
                >
                  <View className="flex-row items-start">
                    <View
                      className="w-11 h-11 rounded-xl items-center justify-center mr-3 mt-0.5"
                      style={{ backgroundColor: color + '25' }}
                    >
                      <Text className="text-xl">{emoji}</Text>
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between">
                        <Text className="text-white text-sm font-semibold">{alert.type}</Text>
                        <Text className="text-gray-500 text-xs">
                          {new Date(alert.created_at).toLocaleString('pt-BR', {
                            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                          })}
                        </Text>
                      </View>
                      <Text className="text-gray-400 text-sm mt-1 leading-5">{alert.message}</Text>
                    </View>
                    {!alert.is_read && (
                      <View className="w-2 h-2 rounded-full bg-blue-500 ml-2 mt-2" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
