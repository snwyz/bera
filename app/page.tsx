'use client'

import BindView from '@/sections/bind'
import useLogin from '@/hooks/useLogin';

export default function Index() {
  useLogin();
  return (
    <BindView />
  );
}
