import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/services/supabase';

interface DashboardStats {
  childrenCount: number;
  devicesCount: number;
  alertsToday: number;
  rulesCount: number;
}

interface ChildPreview {
  id: string;
  name: string;
  avatar_emoji: string;
  color: string;
}

interface AlertPreview {
  id: string;
  type: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

function StatCard({ label, value, emoji, color }: { label: string; value: string | number; emoji: string; color: string }) {
  return (
    <View style={{ flex: 1, minWidth: 140 }} className="rounded-2xl bg-gray-900 border border-gray-800 p-4 m-1">
      <View className="w-10 h-10 rounded-xl items-center justify-center mb-3" style={{ backgroundColor: color + '30' }}>
        <Text className="text-xl">{emoji}</Text>
      </View>
      <Text className="text-white text-2xl font-bold">{value}</Text>
      <Text className="text-gray-400 text-xs mt-1">{label}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [stats, setStats] = useState<DashboardStats>({ childrenCount: 0, devicesCount: 0, alertsToday: 0, rulesCount: 0 });
  const [children, setChildren] = useState<ChildPreview[]>([]);
  const [recentAlerts, setRecentAlerts] = useState<AlertPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchDashboardData();
  }, [user]);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const [childrenRes, devicesRes, alertsRes, rulesRes] = await Promise.all([
        supabase.from('children').select('id, name, avatar_emoji, color').eq('parent_id', user!.id),
        supabase.from('devices').select('id', { count: 'exact' }).eq('user_id', user!.id),
        supabase.from('alerts').select('id, type, message, created_at, is_read').eq('user_id', user!.id).order('created_at', { ascending: false }).limit(5),
        supabase.from('rules').select('id', { count: 'exact' }).eq('user_id', user!.id),
      ]);

      const today = new Date().toISOString().split('T')[0];
      const todayAlerts = alertsRes.data?.filter(a => a.created_at?.startsWith(today)) ?? [];

      setStats({
        childrenCount: childrenRes.data?.length ?? 0,
        devicesCount: devicesRes.count ?? 0,
        alertsToday: todayAlerts.length,
        rulesCount: rulesRes.count ?? 0,
      });
      setChildren(childrenRes.data ?? []);
      setRecentAlerts(alertsRes.data ?? []);
    } catch (err) {
      console.error('Erro ao buscar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    { label: 'Filhos', value: stats.childrenCount, emoji: '👶', color: '#3b82f6' },
    { label: 'Dispositivos', value: stats.devicesCount, emoji: '📱', color: '#8b5cf6' },
    { label: 'Alertas Hoje', value: stats.alertsToday, emoji: '🔔', color: '#ef4444' },
    { label: 'Regras Ativas', value: stats.rulesCount, emoji: '🔒', color: '#10b981' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-6">
          <View>
            <Text className="text-gray-400 text-sm">Olá, Responsável 👋</Text>
            <Text className="text-white text-xl font-bold mt-0.5">
              {user?.email?.split('@')[0] ?? 'Dashboard'}
            </Text>
          </View>
          <TouchableOpacity onPress={signOut} className="bg-gray-800 rounded-full px-4 py-2 border border-gray-700">
            <Text className="text-gray-300 text-sm">Sair</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center py-20">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-gray-400 mt-4">Carregando dados...</Text>
          </View>
        ) : (
          <>
            {/* Stats */}
            <View className="px-4 mb-6">
              <Text className="text-white text-base font-semibold mb-3 px-1">Resumo Geral</Text>
              <View className="flex-row flex-wrap">
                {statCards.map((card, i) => (
                  <View key={i} style={{ width: isTablet ? '24%' : '48%' }}>
                    <StatCard {...card} />
                  </View>
                ))}
              </View>
            </View>

            {/* Filhos */}
            <View className="px-5 mb-6">
              <Text className="text-white text-base font-semibold mb-3">Filhos Cadastrados</Text>
              {children.length === 0 ? (
                <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6 items-center">
                  <Text className="text-4xl mb-3">👨‍👧</Text>
                  <Text className="text-gray-300 font-semibold text-center">Nenhum filho cadastrado</Text>
                  <Text className="text-gray-500 text-sm text-center mt-1">Vá para a aba "Filhos" para adicionar</Text>
                </View>
              ) : (
                <View className="flex-row flex-wrap gap-3">
                  {children.slice(0, 4).map((child) => (
                    <View key={child.id} className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-4 items-center" style={{ minWidth: 120 }}>
                      <View className="w-14 h-14 rounded-full items-center justify-center mb-2" style={{ backgroundColor: (child.color ?? '#3b82f6') + '30' }}>
                        <Text className="text-2xl">{child.avatar_emoji ?? '👶'}</Text>
                      </View>
                      <Text className="text-white text-sm font-semibold">{child.name}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            {/* Alertas Recentes */}
            <View className="px-5 mb-6">
              <Text className="text-white text-base font-semibold mb-3">Alertas Recentes</Text>
              {recentAlerts.length === 0 ? (
                <View className="bg-gray-900 border border-gray-800 rounded-2xl p-6 items-center">
                  <Text className="text-4xl mb-3">✅</Text>
                  <Text className="text-gray-300 font-semibold text-center">Nenhum alerta</Text>
                  <Text className="text-gray-500 text-sm text-center mt-1">Tudo tranquilo por aqui!</Text>
                </View>
              ) : (
                <View className="bg-gray-900 border border-gray-800 rounded-2xl px-4">
                  {recentAlerts.map((alert, i) => (
                    <View key={alert.id} className={`flex-row items-center py-3 ${i < recentAlerts.length - 1 ? 'border-b border-gray-800' : ''}`}>
                      <View className="w-9 h-9 rounded-full bg-gray-800 items-center justify-center mr-3">
                        <Text>🔔</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="text-white text-sm font-medium">{alert.type}</Text>
                        <Text className="text-gray-400 text-xs mt-0.5" numberOfLines={1}>{alert.message}</Text>
                      </View>
                      <Text className="text-gray-500 text-xs ml-2">
                        {new Date(alert.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
