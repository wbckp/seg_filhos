import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBlocking } from '../../hooks/useBlocking';
import { router } from 'expo-router';

type Tab = 'sites' | 'apps';

export default function RulesScreen() {
  const blocking = useBlocking();
  const [activeTab, setActiveTab] = useState<Tab>('sites');

  // Sites
  const [siteInput, setSiteInput] = useState('');
  const [siteList, setSiteList] = useState<string[]>([]);
  const [vpnEnabled, setVpnEnabled] = useState(false);

  // Apps
  const [appsEnabled, setAppsEnabled] = useState(false);
  const [blockedApps, setBlockedApps] = useState<Set<string>>(new Set());
  const [showAppPicker, setShowAppPicker] = useState(false);

  useEffect(() => {
    if (blocking.available) {
      setSiteList(blocking.blockedSites);
      setVpnEnabled(blocking.vpnActive);
      setBlockedApps(new Set(blocking.blockedApps));
    }
  }, [blocking.available]);

  // ─── Site blocking ──────────────────────────────────────────────────────────

  const addSite = () => {
    const domain = siteInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!domain || siteList.includes(domain)) {
      setSiteInput('');
      return;
    }
    setSiteList(prev => [...prev, domain]);
    setSiteInput('');
  };

  const removeSite = (domain: string) => {
    setSiteList(prev => prev.filter(d => d !== domain));
  };

  const handleVpnToggle = async (value: boolean) => {
    if (!blocking.available) {
      Alert.alert('Indisponível', 'Esta função requer o APK instalado diretamente (não via Expo Go).');
      return;
    }
    if (value) {
      if (siteList.length === 0) {
        Alert.alert('Aviso', 'Adicione ao menos um site para bloquear antes de ativar.');
        return;
      }
      await blocking.enableSiteBlocking(siteList);
    } else {
      await blocking.disableSiteBlocking();
    }
    setVpnEnabled(value);
  };

  const handleSaveAndActivateSites = async () => {
    if (!blocking.available) {
      Alert.alert('Salvo localmente', 'Sites salvos. O bloqueio real requer APK instalado diretamente.');
      return;
    }
    if (vpnEnabled) {
      await blocking.enableSiteBlocking(siteList);
      Alert.alert('✅ Atualizado', 'Lista de sites bloqueados atualizada.');
    }
  };

  // ─── App blocking ───────────────────────────────────────────────────────────

  const handleAppsToggle = async (value: boolean) => {
    if (!blocking.available) {
      Alert.alert('Indisponível', 'Esta função requer o APK instalado diretamente (não via Expo Go).');
      return;
    }
    if (!blocking.accessibilityEnabled) {
      Alert.alert(
        'Permissão Necessária',
        'Para bloquear apps, você precisa ativar o Serviço de Acessibilidade do Seg. Filhos nas configurações do Android.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Abrir Configurações', onPress: () => blocking.requestAccessibilityPermission() },
        ]
      );
      return;
    }
    if (value) {
      await blocking.enableAppBlocking(Array.from(blockedApps));
    } else {
      await blocking.disableAppBlocking();
    }
    setAppsEnabled(value);
  };

  const openAppPicker = async () => {
    if (blocking.installedApps.length === 0) {
      await blocking.loadInstalledApps();
    }
    setShowAppPicker(true);
  };

  const toggleAppBlock = (pkg: string) => {
    setBlockedApps(prev => {
      const next = new Set(prev);
      if (next.has(pkg)) next.delete(pkg);
      else next.add(pkg);
      return next;
    });
  };

  const saveBlockedApps = async () => {
    setShowAppPicker(false);
    if (blocking.available && appsEnabled) {
      await blocking.enableAppBlocking(Array.from(blockedApps));
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      {/* Header */}
      <View className="px-5 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-2xl font-bold">Controle Parental</Text>
          {/* Setup button */}
          {blocking.available && !blocking.accessibilityEnabled && (
            <TouchableOpacity
              onPress={() => router.push('/setup-permissions')}
              className="bg-amber-500 rounded-full px-3 py-1"
            >
              <Text className="text-white text-xs font-bold">⚠️ Setup</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Status bar */}
        {blocking.available && (
          <View className="flex-row gap-2 mb-4">
            <View className={`flex-row items-center gap-1 px-3 py-1 rounded-full ${blocking.vpnActive ? 'bg-green-900' : 'bg-gray-800'}`}>
              <View className={`w-2 h-2 rounded-full ${blocking.vpnActive ? 'bg-green-400' : 'bg-gray-500'}`} />
              <Text className={`text-xs font-medium ${blocking.vpnActive ? 'text-green-400' : 'text-gray-400'}`}>
                Sites {blocking.vpnActive ? 'Bloqueados' : 'Desativado'}
              </Text>
            </View>
            <View className={`flex-row items-center gap-1 px-3 py-1 rounded-full ${blocking.accessibilityEnabled ? 'bg-blue-900' : 'bg-gray-800'}`}>
              <View className={`w-2 h-2 rounded-full ${blocking.accessibilityEnabled ? 'bg-blue-400' : 'bg-gray-500'}`} />
              <Text className={`text-xs font-medium ${blocking.accessibilityEnabled ? 'text-blue-400' : 'text-gray-400'}`}>
                Apps {blocking.accessibilityEnabled ? 'Prontos' : 'Sem permissão'}
              </Text>
            </View>
          </View>
        )}

        {/* Tabs */}
        <View className="flex-row bg-gray-900 rounded-xl p-1">
          {(['sites', 'apps'] as Tab[]).map(tab => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-2 rounded-lg items-center ${activeTab === tab ? 'bg-blue-600' : ''}`}
              onPress={() => setActiveTab(tab)}
            >
              <Text className={`font-semibold text-sm ${activeTab === tab ? 'text-white' : 'text-gray-400'}`}>
                {tab === 'sites' ? '🌐 Sites' : '📱 Aplicativos'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* ── SITES TAB ── */}
        {activeTab === 'sites' && (
          <View className="gap-4 pt-4 pb-8">
            {/* Enable/Disable VPN */}
            <View className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-1 mr-4">
                <Text className="text-white font-semibold text-base">🛡️ Ativar Bloqueio de Sites</Text>
                <Text className="text-gray-400 text-xs mt-1">
                  Cria uma VPN local que bloqueia os domínios listados abaixo em qualquer navegador.
                </Text>
              </View>
              {blocking.loading ? (
                <ActivityIndicator color="#3b82f6" />
              ) : (
                <Switch
                  value={vpnEnabled}
                  onValueChange={handleVpnToggle}
                  trackColor={{ false: '#374151', true: '#3b82f6' }}
                  thumbColor={vpnEnabled ? '#fff' : '#9ca3af'}
                />
              )}
            </View>

            {/* Add site */}
            <View className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Adicionar Site
              </Text>
              <View className="flex-row gap-2">
                <TextInput
                  className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 text-sm"
                  placeholder="ex: tiktok.com"
                  placeholderTextColor="#6b7280"
                  value={siteInput}
                  onChangeText={setSiteInput}
                  onSubmitEditing={addSite}
                  autoCapitalize="none"
                  keyboardType="url"
                />
                <TouchableOpacity
                  onPress={addSite}
                  className="bg-blue-600 rounded-xl px-4 items-center justify-center"
                >
                  <Text className="text-white font-bold text-lg">+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Site list */}
            <View className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <View className="px-4 pt-4 pb-2 flex-row items-center justify-between">
                <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Sites Bloqueados ({siteList.length})
                </Text>
                {vpnEnabled && siteList.length > 0 && (
                  <TouchableOpacity onPress={handleSaveAndActivateSites}>
                    <Text className="text-blue-400 text-xs font-semibold">Aplicar</Text>
                  </TouchableOpacity>
                )}
              </View>

              {siteList.length === 0 ? (
                <View className="px-4 pb-4">
                  <Text className="text-gray-600 text-sm text-center py-4">
                    Nenhum site bloqueado ainda.{'\n'}Adicione domínios acima.
                  </Text>
                </View>
              ) : (
                siteList.map((domain, index) => (
                  <View
                    key={domain}
                    className={`flex-row items-center px-4 py-3 ${index < siteList.length - 1 ? 'border-b border-gray-800' : ''}`}
                  >
                    <Text className="text-red-400 mr-2">🚫</Text>
                    <Text className="text-white flex-1 text-sm">{domain}</Text>
                    <TouchableOpacity onPress={() => removeSite(domain)}>
                      <Text className="text-gray-500 text-lg px-2">×</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>

            {/* Quick presets */}
            <View className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Adicionar Pacote Rápido
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {[
                  { label: '📸 Redes Sociais', domains: ['instagram.com', 'tiktok.com', 'twitter.com', 'snapchat.com', 'facebook.com'] },
                  { label: '🎮 Jogos', domains: ['roblox.com', 'miniclip.com', 'friv.com'] },
                  { label: '🔞 Conteúdo Adulto', domains: ['pornhub.com', 'xvideos.com', 'xnxx.com'] },
                ].map(preset => (
                  <TouchableOpacity
                    key={preset.label}
                    onPress={() => setSiteList(prev => [...new Set([...prev, ...preset.domains])])}
                    className="bg-gray-800 border border-gray-700 rounded-full px-3 py-2"
                  >
                    <Text className="text-gray-300 text-xs">{preset.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* ── APPS TAB ── */}
        {activeTab === 'apps' && (
          <View className="gap-4 pt-4 pb-8">
            {/* Accessibility warning */}
            {blocking.available && !blocking.accessibilityEnabled && (
              <TouchableOpacity
                onPress={blocking.requestAccessibilityPermission}
                className="bg-amber-900 border border-amber-700 rounded-2xl p-4"
              >
                <Text className="text-amber-300 font-bold mb-1">⚠️ Permissão necessária</Text>
                <Text className="text-amber-400 text-sm">
                  Toque aqui para ativar o Serviço de Acessibilidade do Seg. Filhos nas configurações do Android.
                </Text>
              </TouchableOpacity>
            )}

            {/* Enable/Disable app blocking */}
            <View className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex-row items-center justify-between">
              <View className="flex-1 mr-4">
                <Text className="text-white font-semibold text-base">📵 Ativar Bloqueio de Apps</Text>
                <Text className="text-gray-400 text-xs mt-1">
                  Detecta quando um app bloqueado é aberto e exibe tela de bloqueio imediatamente.
                </Text>
              </View>
              {blocking.loading ? (
                <ActivityIndicator color="#3b82f6" />
              ) : (
                <Switch
                  value={appsEnabled}
                  onValueChange={handleAppsToggle}
                  trackColor={{ false: '#374151', true: '#3b82f6' }}
                  thumbColor={appsEnabled ? '#fff' : '#9ca3af'}
                />
              )}
            </View>

            {/* Blocked apps list */}
            <View className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Apps Bloqueados ({blockedApps.size})
                </Text>
                <TouchableOpacity
                  onPress={openAppPicker}
                  className="bg-blue-600 rounded-lg px-3 py-1"
                >
                  <Text className="text-white text-xs font-semibold">+ Selecionar Apps</Text>
                </TouchableOpacity>
              </View>

              {blockedApps.size === 0 ? (
                <Text className="text-gray-600 text-sm text-center py-4">
                  Nenhum app bloqueado ainda.{'\n'}Toque em "Selecionar Apps" acima.
                </Text>
              ) : (
                Array.from(blockedApps).map((pkg, index) => {
                  const appInfo = blocking.installedApps.find(a => a.packageName === pkg);
                  return (
                    <View
                      key={pkg}
                      className={`flex-row items-center py-3 ${index < blockedApps.size - 1 ? 'border-b border-gray-800' : ''}`}
                    >
                      <Text className="text-red-400 mr-2">🚫</Text>
                      <View className="flex-1">
                        <Text className="text-white text-sm">{appInfo?.name ?? pkg}</Text>
                        <Text className="text-gray-500 text-xs">{pkg}</Text>
                      </View>
                      <TouchableOpacity onPress={() => toggleAppBlock(pkg)}>
                        <Text className="text-gray-500 text-lg px-2">×</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              )}
            </View>
          </View>
        )}
      </ScrollView>

      {/* ── App Picker Modal ── */}
      <Modal visible={showAppPicker} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 bg-gray-950">
          <View className="flex-row items-center justify-between px-5 pt-6 pb-4 border-b border-gray-800">
            <Text className="text-white text-lg font-bold">Selecionar Apps para Bloquear</Text>
            <TouchableOpacity onPress={saveBlockedApps}>
              <Text className="text-blue-400 font-semibold">Salvar</Text>
            </TouchableOpacity>
          </View>

          {blocking.loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator color="#3b82f6" size="large" />
              <Text className="text-gray-400 mt-4">Carregando apps instalados...</Text>
            </View>
          ) : (
            <FlatList
              data={blocking.installedApps}
              keyExtractor={item => item.packageName}
              renderItem={({ item }) => {
                const isBlocked = blockedApps.has(item.packageName);
                return (
                  <TouchableOpacity
                    onPress={() => toggleAppBlock(item.packageName)}
                    className={`flex-row items-center px-5 py-4 border-b border-gray-900 ${isBlocked ? 'bg-red-950' : ''}`}
                  >
                    <View className="flex-1">
                      <Text className="text-white font-medium">{item.name}</Text>
                      <Text className="text-gray-500 text-xs">{item.packageName}</Text>
                    </View>
                    <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isBlocked ? 'bg-red-500 border-red-500' : 'border-gray-600'}`}>
                      {isBlocked && <Text className="text-white text-xs font-bold">✓</Text>}
                    </View>
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={{ paddingBottom: 40 }}
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
