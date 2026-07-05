import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const rulesData = [
  { id: 1, name: 'Limite diário de 2h', type: 'Tempo', child: 'João', active: true, emoji: '⏱️' },
  { id: 2, name: 'Bloqueio total após 22h', type: 'Horário', child: 'Ambos', active: true, emoji: '🌙' },
  { id: 3, name: 'Bloquear redes sociais', type: 'Aplicativos', child: 'Maria', active: true, emoji: '📵' },
  { id: 4, name: 'Bloquear conteúdo adulto', type: 'Sites', child: 'Ambos', active: true, emoji: '🚫' },
  { id: 5, name: 'YouTube Kids apenas', type: 'Aplicativos', child: 'João', active: false, emoji: '▶️' },
];

export default function RulesScreen() {
  const [rules, setRules] = useState(rulesData);

  const toggleRule = (id: number) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-6">
          <Text className="text-white text-2xl font-bold">Regras</Text>
          <TouchableOpacity className="bg-blue-600 rounded-full px-4 py-2">
            <Text className="text-white text-sm font-medium">+ Nova Regra</Text>
          </TouchableOpacity>
        </View>

        {/* Categorias */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 mb-5">
          <View className="flex-row gap-2">
            {['Todas', 'Tempo', 'Horário', 'Aplicativos', 'Sites'].map((cat) => (
              <TouchableOpacity key={cat}
                className={`px-4 py-2 rounded-full border ${cat === 'Todas' ? 'bg-blue-600 border-blue-600' : 'bg-gray-900 border-gray-700'}`}>
                <Text className={`text-sm font-medium ${cat === 'Todas' ? 'text-white' : 'text-gray-400'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View className="px-5 gap-3">
          {rules.map((rule) => (
            <View key={rule.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <View className="flex-row items-center">
                <View className="w-11 h-11 rounded-xl bg-gray-800 items-center justify-center mr-3">
                  <Text className="text-xl">{rule.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-sm font-semibold">{rule.name}</Text>
                  <View className="flex-row items-center mt-1 gap-2">
                    <View className="bg-gray-800 rounded-full px-2 py-0.5">
                      <Text className="text-gray-400 text-xs">{rule.type}</Text>
                    </View>
                    <Text className="text-gray-500 text-xs">👤 {rule.child}</Text>
                  </View>
                </View>
                <Switch
                  value={rule.active}
                  onValueChange={() => toggleRule(rule.id)}
                  trackColor={{ false: '#374151', true: '#3b82f6' }}
                  thumbColor={rule.active ? '#fff' : '#9ca3af'}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
