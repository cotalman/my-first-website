import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase-client';

/**
 * 인증 상태를 관리하는 커스텀 훅
 * Supabase Auth를 통해 로그인/로그아웃/회원가입 기능 제공
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * 이메일/비밀번호로 로그인
   * @param {string} email
   * @param {string} password
   */
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  /**
   * 회원가입
   * @param {string} email
   * @param {string} password
   * @param {string} name
   * @param {string} phoneNumber
   */
  const signUp = async (email, password, name, phoneNumber) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone_number: phoneNumber },
      },
    });
    return { data, error };
  };

  /**
   * 로그아웃
   */
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, signIn, signUp, signOut };
}
