import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBlocking } from '../hooks/useBlocking';

type Step = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  check: () => boolean;
  action?: () => void;
  actionLabel?: string;
};

export default function SetupPermissionsScreen() {
  const blocking = useBlocking();
  const [currentStep, setCurrentStep] = useState(0);

  const steps: Step[] = [
    {
      id: 'vpn',
      title: 'Bloqueio de Sites (VPN Local)',
      description:
        'O app cria uma VPN que existe apenas no seu celular — nenhum dado vai para servidores externos. Ela intercepta consultas DNS e bloqueia domínios configurados.\n\nAo ativar o bloqueio de sites pela primeira vez, o Android pedirá sua confirmação. Basta tocar em "OK" no diálogo.',
      emoji: '🛡️',
      check: () => true, // Just informational — VPN dialog appears on demand
      actionLabel: 'Entendido',
    },
    {
      id: 'accessibility',
      title: 'Serviço de Acessibilidade (Bloqueio de Apps)',
      description:
        'Para bloquear aplicativos, o Seg. Filhos usa o Serviço de Acessibilidade do Android, que detecta qual app está em uso.\n\nVocê precisa ativar manualmente:\n\n1. Toque em "Abrir Configurações" abaixo\n2. Encontre "Seg. Filhos" na lista\n3. Ative o serviço',
      emoji: '📵',
      check: () => blocking.accessibilityEnabled,
      action: blocking.requestAccessibilityPermission,
      actionLabel: 'Abrir Configurações de Acessibilidade',
    },
  ];

  const allDone = steps.every(s => s.check());

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      {/* Header */}
      <View className="flex-row items-center px-5 pt-4 pb-6 border-b border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Text className="text-blue-400 text-base">← Voltar</Text>
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Configuração de Permissões</Text>
      </View>

      <ScrollView className="flex-1 px-5 py-6" showsVerticalScrollIndicator={false}>
        {/* Intro */}
        <View className="bg-blue-950 border border-blue-800 rounded-2xl p-4 mb-6">
          <Text className="text-blue-300 font-bold mb-1">Como funciona o bloqueio real?</Text>
          <Text className="text-blue-200 text-sm leading-5">
            O Seg. Filhos usa duas tecnologias nativas do Android para bloquear sites e apps. Cada uma requer uma permissão específica que você precisa autorizar uma única vez.
          </Text>
        </View>

        {/* Steps */}
        {steps.map((step, index) => {
          const done = step.check();
          return (
            <View
              key={step.id}
              className={`mb-4 rounded-2xl border p-5 ${
                done
                  ? 'bg-green-950 border-green-800'
                  : currentStep === index
                  ? 'bg-gray-900 border-blue-700'
                  : 'bg-gray-900 border-gray-800'
              }`}
            >
              {/* Step header */}
              <View className="flex-row items-center mb-3">
                <View className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${done ? 'bg-green-600' : 'bg-gray-800'}`}>
                  <Text className="text-white font-bold text-sm">
                    {done ? '✓' : (index + 1).toString()}
                  </Text>
                </View>
                <Text className="text-2xl mr-2">{step.emoji}</Text>
                <Text className={`font-bold flex-1 ${done ? 'text-green-300' : 'text-white'}`}>
                  {step.title}
                </Text>
              </View>

              {/* Description */}
              <Text className="text-gray-300 text-sm leading-6 mb-4">
                {step.description}
              </Text>

              {/* Status */}
              {done ? (
                <View className="flex-row items-center">
                  <Text className="text-green-400 font-semibold">✅ Pronto</Text>
                </View>
              ) : (
                step.action && (
                  <TouchableOpacity
                    onPress={() => {
                      step.action?.();
                      setCurrentStep(index);
                    }}
                    className="bg-blue-600 rounded-xl py-3 items-center"
                  >
                    <Text className="text-white font-semibold">{step.actionLabel}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          );
        })}

        {/* Done! */}
        {allDone && (
          <View className="bg-green-950 border border-green-700 rounded-2xl p-5 mt-2">
            <Text className="text-green-300 text-lg font-bold mb-2 text-center">
              🎉 Tudo configurado!
            </Text>
            <Text className="text-green-400 text-sm text-center mb-4">
              Agora você pode ativar o bloqueio de sites e apps na aba de Regras.
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-green-700 rounded-xl py-3 items-center"
            >
              <Text className="text-white font-bold">Ir para Regras</Text>
            </TouchableOpacity>
          </View>
        )}

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
