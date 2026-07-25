import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getInstalledApps,
  isAccessibilityEnabled,
  isBlockingAvailable,
  isVpnActive,
  openAccessibilitySettings,
  setAppBlockingEnabled,
  setBlockedApps,
  setBlockedSites,
  startVpn,
  stopVpn,
  type InstalledApp,
} from '../modules/BlockingModule';

export interface BlockingState {
  // Status
  available: boolean;
  vpnActive: boolean;
  accessibilityEnabled: boolean;
  loading: boolean;
  error: string | null;

  // Data
  blockedSites: string[];
  blockedApps: string[];
  installedApps: InstalledApp[];

  // Actions
  enableSiteBlocking: (domains: string[]) => Promise<void>;
  disableSiteBlocking: () => Promise<void>;
  enableAppBlocking: (packages: string[]) => Promise<void>;
  disableAppBlocking: () => Promise<void>;
  refreshStatus: () => Promise<void>;
  requestAccessibilityPermission: () => Promise<void>;
  loadInstalledApps: () => Promise<void>;
}

export function useBlocking(): BlockingState {
  const available = isBlockingAvailable();

  const [vpnActive, setVpnActive] = useState(false);
  const [accessibilityEnabled, setAccessibilityEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blockedSites, setBlockedSitesState] = useState<string[]>([]);
  const [blockedApps, setBlockedAppsState] = useState<string[]>([]);
  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([]);

  const pollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshStatus = useCallback(async () => {
    if (!available) return;
    try {
      const [vpn, accessibility] = await Promise.all([
        isVpnActive(),
        isAccessibilityEnabled(),
      ]);
      setVpnActive(vpn);
      setAccessibilityEnabled(accessibility);
    } catch (e: any) {
      setError(e.message);
    }
  }, [available]);

  // Poll status every 3 seconds to detect user enabling accessibility
  useEffect(() => {
    refreshStatus();
    pollInterval.current = setInterval(refreshStatus, 3000);
    return () => {
      if (pollInterval.current) clearInterval(pollInterval.current);
    };
  }, [refreshStatus]);

  const enableSiteBlocking = useCallback(
    async (domains: string[]) => {
      if (!available) return;
      setLoading(true);
      setError(null);
      try {
        await setBlockedSites(domains);
        const result = await startVpn();
        if (result === 'STARTED') {
          setVpnActive(true);
          setBlockedSitesState(domains);
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [available]
  );

  const disableSiteBlocking = useCallback(async () => {
    if (!available) return;
    setLoading(true);
    setError(null);
    try {
      await stopVpn();
      setVpnActive(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [available]);

  const enableAppBlocking = useCallback(
    async (packages: string[]) => {
      if (!available) return;
      setLoading(true);
      setError(null);
      try {
        await setBlockedApps(packages);
        await setAppBlockingEnabled(true);
        setBlockedAppsState(packages);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [available]
  );

  const disableAppBlocking = useCallback(async () => {
    if (!available) return;
    setLoading(true);
    setError(null);
    try {
      await setAppBlockingEnabled(false);
      setBlockedAppsState([]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [available]);

  const requestAccessibilityPermission = useCallback(async () => {
    if (!available) return;
    try {
      await openAccessibilitySettings();
    } catch (e: any) {
      setError(e.message);
    }
  }, [available]);

  const loadInstalledApps = useCallback(async () => {
    if (!available) return;
    setLoading(true);
    try {
      const apps = await getInstalledApps();
      setInstalledApps(apps);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [available]);

  return {
    available,
    vpnActive,
    accessibilityEnabled,
    loading,
    error,
    blockedSites,
    blockedApps,
    installedApps,
    enableSiteBlocking,
    disableSiteBlocking,
    enableAppBlocking,
    disableAppBlocking,
    refreshStatus,
    requestAccessibilityPermission,
    loadInstalledApps,
  };
}
