import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/hooks/use-auth';

interface Child {
  id: string;
  name: string;
  age: number;
  avatar_emoji: string;
  color: string;
}

export default function ChildrenScreen() {
  const { user } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchChildren();
  }, [user]);

  async function fetchChildren() {
    setLoading(true);
    const { data, error } = await supabase
      .from('children')
      .select('id, name, age, avatar_emoji, color')
      .eq('parent_id', user!.id)
      .order('name');

    if (!error) setChildren(data ?? []);
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-6">
          <Text className="text-white text-2xl font-bold">Filhos</Text>
          <TouchableOpacity className="bg-blue-600 rounded-full px-4 py-2">
            <Text className="text-white text-sm font-semibold">+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View className="items-center py-20">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-gray-400 mt-4">Carregando filhos...</Text>
          </View>
        ) : children.length === 0 ? (
          <View className="items-center justify-center px-8 py-20">
            <Text className="text-6xl mb-4">👨‍👧</Text>
            <Text className="text-white text-lg font-bold text-center">Nenhum filho cadastrado</Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Toque em "+ Adicionar" para registrar o primeiro filho e começar o monitoramento.
            </Text>
          </View>
        ) : (
          <View className="px-5 gap-4">
            {children.map((child) => (
              <TouchableOpacity
                key={child.id}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
              >
                <View className="flex-row items-center">
                  <View
                    className="w-16 h-16 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: (child.color ?? '#3b82f6') + '30' }}
                  >
                    <Text className="text-3xl">{child.avatar_emoji ?? '👶'}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-lg font-bold">{child.name}</Text>
                    {child.age != null && (
                      <Text className="text-gray-400 text-sm mt-0.5">{child.age} anos</Text>
                    )}
                  </View>
                  <Text className="text-gray-600 text-lg">›</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
