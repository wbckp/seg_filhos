import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChildrenScreen() {
  const children = [
    { name: 'João', age: 10, status: 'online', time: '1h 20m', emoji: '👦', color: '#3b82f6' },
    { name: 'Maria', age: 8, status: 'offline', time: '1h 25m', emoji: '👧', color: '#8b5cf6' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-6">
          <Text className="text-white text-2xl font-bold">Filhos</Text>
          <TouchableOpacity className="bg-blue-600 rounded-full px-4 py-2">
            <Text className="text-white text-sm font-medium">+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5 gap-4">
          {children.map((child, index) => (
            <TouchableOpacity
              key={index}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
            >
              <View className="flex-row items-center">
                <View className="w-16 h-16 rounded-full items-center justify-center mr-4"
                  style={{ backgroundColor: child.color + '30' }}>
                  <Text className="text-3xl">{child.emoji}</Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-white text-lg font-bold mr-2">{child.name}</Text>
                    <View className={`w-2 h-2 rounded-full ${child.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
                  </View>
                  <Text className="text-gray-400 text-sm mt-0.5">{child.age} anos</Text>
                  <Text className="text-gray-400 text-sm mt-1">⏱️ {child.time} de uso hoje</Text>
                </View>
                <Text className="text-gray-600 text-lg">›</Text>
              </View>
              <View className="mt-4 pt-4 border-t border-gray-800 flex-row gap-3">
                <View className="flex-1 bg-gray-800 rounded-xl p-3 items-center">
                  <Text className="text-blue-400 text-lg font-bold">3</Text>
                  <Text className="text-gray-400 text-xs mt-0.5">Dispositivos</Text>
                </View>
                <View className="flex-1 bg-gray-800 rounded-xl p-3 items-center">
                  <Text className="text-red-400 text-lg font-bold">12</Text>
                  <Text className="text-gray-400 text-xs mt-0.5">Bloqueios</Text>
                </View>
                <View className="flex-1 bg-gray-800 rounded-xl p-3 items-center">
                  <Text className="text-yellow-400 text-lg font-bold">2</Text>
                  <Text className="text-gray-400 text-xs mt-0.5">Alertas</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
