import { useEffect } from 'react';
import { supabase } from '@/services/supabase';
import { useAuthStore } from '@/stores/auth-store';
import { router } from 'expo-router';

export function useAuth() {
  const { session, user, isLoading, setSession, setLoading, signOut } = useAuthStore();

  useEffect(() => {
    // Busca sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuta mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // AuthGuard will handle the redirect once the session is updated
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    signOut();
    router.replace('/(auth)/login');
  };

  return { session, user, isLoading, signInWithEmail, signUpWithEmail, signOut: handleSignOut };
}
