import { NativeModules, Platform } from 'react-native';

const { BlockingModule: NativeBlockingModule } = NativeModules;

export interface InstalledApp {
  packageName: string;
  name: string;
}

/**
 * Returns true if the module is available (Android only).
 */
export const isBlockingAvailable = (): boolean => {
  return Platform.OS === 'android' && !!NativeBlockingModule;
};

const guard = (fn: () => Promise<any>): Promise<any> => {
  if (!isBlockingAvailable()) {
    return Promise.reject(
      new Error('BlockingModule is only available on Android native builds.')
    );
  }
  return fn();
};

// ─── VPN / Site Blocking ─────────────────────────────────────────────────────

/** Check if VPN is already authorized (returns false if needs user dialog). */
export const prepareVpn = (): Promise<boolean> =>
  guard(() => NativeBlockingModule.prepareVpn());

/** Start the DNS VPN service. May prompt user for VPN permission. */
export const startVpn = (): Promise<string> =>
  guard(() => NativeBlockingModule.startVpn());

/** Stop the DNS VPN service. */
export const stopVpn = (): Promise<string> =>
  guard(() => NativeBlockingModule.stopVpn());

/** Update the list of blocked domains. Pass full domains like 'tiktok.com'. */
export const setBlockedSites = (domains: string[]): Promise<boolean> =>
  guard(() => NativeBlockingModule.setBlockedSites(domains));

/** Returns true if VPN service is currently running. */
export const isVpnActive = (): Promise<boolean> =>
  guard(() => NativeBlockingModule.isVpnActive());

// ─── App Blocking ─────────────────────────────────────────────────────────────

/** Update the list of blocked app package names. */
export const setBlockedApps = (packages: string[]): Promise<boolean> =>
  guard(() => NativeBlockingModule.setBlockedApps(packages));

/** Enable or disable app blocking enforcement. */
export const setAppBlockingEnabled = (enabled: boolean): Promise<boolean> =>
  guard(() => NativeBlockingModule.setAppBlockingEnabled(enabled));

/** Returns true if our Accessibility Service is enabled in Android settings. */
export const isAccessibilityEnabled = (): Promise<boolean> =>
  guard(() => NativeBlockingModule.isAccessibilityEnabled());

/** Opens Android Accessibility Settings so user can enable the service. */
export const openAccessibilitySettings = (): Promise<boolean> =>
  guard(() => NativeBlockingModule.openAccessibilitySettings());

// ─── Installed Apps ──────────────────────────────────────────────────────────

/** Returns list of user-installed apps that can be blocked. */
export const getInstalledApps = (): Promise<InstalledApp[]> =>
  guard(() => NativeBlockingModule.getInstalledApps());
