import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const devices = [
  { name: 'Samsung Galaxy S22', owner: 'João', type: 'smartphone', status: 'online', battery: 78, emoji: '📱' },
  { name: 'Samsung Galaxy Tab', owner: 'Maria', type: 'tablet', status: 'online', battery: 45, emoji: '📟' },
  { name: 'Android TV - Sala', owner: 'Ambos', type: 'tv', status: 'offline', battery: 100, emoji: '📺' },
];

export default function DevicesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between px-5 pt-4 pb-6">
          <Text className="text-white text-2xl font-bold">Dispositivos</Text>
          <TouchableOpacity className="bg-blue-600 rounded-full px-4 py-2">
            <Text className="text-white text-sm font-medium">+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5 gap-4">
          {devices.map((device, index) => (
            <TouchableOpacity key={index} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <View className="flex-row items-center">
                <View className="w-14 h-14 rounded-xl bg-gray-800 items-center justify-center mr-4">
                  <Text className="text-3xl">{device.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white text-base font-semibold">{device.name}</Text>
                  <Text className="text-gray-400 text-sm mt-0.5">👤 {device.owner}</Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${device.status === 'online' ? 'bg-green-500/20' : 'bg-gray-700/50'}`}>
                  <Text className={`text-xs font-medium ${device.status === 'online' ? 'text-green-400' : 'text-gray-400'}`}>
                    {device.status === 'online' ? '● Online' : '○ Offline'}
                  </Text>
                </View>
              </View>
              <View className="mt-4 flex-row items-center gap-2">
                <Text className="text-gray-400 text-xs">Bateria:</Text>
                <View className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <View
                    className={`h-full rounded-full ${device.battery > 50 ? 'bg-green-500' : device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${device.battery}%` }}
                  />
                </View>
                <Text className="text-gray-400 text-xs">{device.battery}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
