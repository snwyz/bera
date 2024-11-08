'use client'

import { useEffect, type ReactNode } from 'react';
import { useLayoutStore } from '@/stores/useLayoutStore';
import TabBar from '../TabBar/TabBar';

interface TabBarWrapperProps {
  children: ReactNode;
  showTabBar?: boolean;
}

export const TabBarWrapper = ({ 
  children, 
  showTabBar = true 
}: TabBarWrapperProps) => {
  const setShowTabBar = useLayoutStore((state) => state.setShowTabBar);

  useEffect(() => {
    setShowTabBar(showTabBar);
    return () => setShowTabBar(true);
  }, [showTabBar, setShowTabBar]);

  return (
    <div className="min-h-screen rounded-tl-2xl rounded-tr-2xl bg-[#F5F5F5] overflow-hidden">
      <main className={`pb-${showTabBar ? '16' : '0'}`}>
        {children}
      </main>
      {showTabBar && <TabBar />}
    </div>
  );
};