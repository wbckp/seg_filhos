import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const isTV = width >= 1280;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#030712',
          borderTopColor: '#1f2937',
          height: isTV ? 70 : isTablet ? 60 : 56,
          paddingBottom: Platform.OS === 'ios' ? 16 : 8,
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#6b7280',
        tabBarLabelStyle: {
          fontSize: isTV ? 14 : 11,
          fontWeight: '500',
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <TabIcon emoji="🏠" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="children"
        options={{
          title: 'Filhos',
          tabBarIcon: ({ color, size }) => (
            <TabIcon emoji="👨‍👧" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Dispositivos',
          tabBarIcon: ({ color, size }) => (
            <TabIcon emoji="📱" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rules"
        options={{
          title: 'Regras',
          tabBarIcon: ({ color, size }) => (
            <TabIcon emoji="🔒" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color, size }) => (
            <TabIcon emoji="🔔" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ emoji, color, size }: { emoji: string; color: string; size: number }) {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: size * 0.85 }}>{emoji}</Text>;
}
