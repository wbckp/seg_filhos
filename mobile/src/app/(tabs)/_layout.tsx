import { Tabs, usePathname, router } from 'expo-router';
import { View, Text, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// ─── Definição das abas ───────────────────────────────────────────────────────
const TABS = [
  { name: 'dashboard', label: 'Início',      emoji: '🏠' },
  { name: 'children',  label: 'Filhos',      emoji: '👶' },
  { name: 'devices',   label: 'Dispositivos', emoji: '📱' },
  { name: 'rules',     label: 'Regras',      emoji: '🔒' },
  { name: 'alerts',    label: 'Alertas',     emoji: '🔔' },
];

// ─── Tab Bar totalmente customizada ──────────────────────────────────────────
function CustomTabBar({ state }: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const isTablet  = width >= 768;
  const pathname  = usePathname();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#030712',
        borderTopWidth: 1,
        borderTopColor: '#1f2937',
        height: isTablet ? 72 : 64,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        alignItems: 'center',
      }}
    >
      {TABS.map((tab) => {
        const isActive = pathname.includes(tab.name);
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(`/(tabs)/${tab.name}` as any)}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 8,
              gap: 3,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: isTablet ? 22 : 20, lineHeight: isTablet ? 26 : 24 }}>
              {tab.emoji}
            </Text>
            <Text
              style={{
                fontSize: isTablet ? 11 : 9,
                fontWeight: '600',
                color: isActive ? '#3b82f6' : '#6b7280',
                lineHeight: isTablet ? 14 : 12,
              }}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="dashboard"  options={{ title: 'Início'       }} />
      <Tabs.Screen name="children"   options={{ title: 'Filhos'       }} />
      <Tabs.Screen name="devices"    options={{ title: 'Dispositivos' }} />
      <Tabs.Screen name="rules"      options={{ title: 'Regras'       }} />
      <Tabs.Screen name="alerts"     options={{ title: 'Alertas'      }} />
    </Tabs>
  );
}
