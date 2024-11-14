import { useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { ModuleConfig, ModuleType } from '../components/Module';
import { ModuleConfigs } from '../config';

interface GameItem {
  id: number;
  category: string;
  bonus_percentage: string;
  level: number;
  pc_item: boolean;
  mobile_item: boolean;
}

const categoryToModuleType: Record<string, ModuleType> = {
  cars: 'cars',
  hats: 'hats',
  jackets: 'jackets',
  necklaces: 'necklaces',
};

const generateImageUrls = (category: string, level: number, isActive: boolean) => {
  const basePath = `/images/mobile/cave/${category}/${category}-${level}`;
  
  return {
    icon: `${basePath}${isActive ? '-active' : ''}.png`,
    popoverIcon: `${basePath}-m.png`,
  };

};


export const useGameItems = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [moduleConfigs, setModuleConfigs] = useState<Record<ModuleType, ModuleConfig>>(ModuleConfigs);

  // const { address }  = useAccount();

  useEffect(() => {
    // if (!address) {
    //   return ;
    // }
    const fetchGameItems = async () => {
      try {
        setLoading(true);
        const response = await get(`/api/game/items?game_category=bera&address=${'0x8C7f311f5174b636Bc1849e523810b1e9a4B7a1D'}`);
        if (response.code !== 0 ) return

        const groupedByCategory = response.data.reduce((acc: Record<string, GameItem[]>, item: GameItem) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {});

        const newConfigs: Record<ModuleType, ModuleConfig> = { ...ModuleConfigs };

        Object.entries(groupedByCategory).forEach(([category, items]: any) => {
          const moduleType = categoryToModuleType[category] as ModuleType;
          
          newConfigs[moduleType] = {
            ...ModuleConfigs[moduleType],
            items: items.map((item: any, index: any) => {
              
              const { icon, popoverIcon } = generateImageUrls(
                item.category,
                item.level,
                item.pc_item
              );
              
              return {
                ...ModuleConfigs[moduleType].items[index],
                icon,
                popoverIcon,
              };
            }),
          };
        });

        setModuleConfigs(newConfigs);
        setError(null);
      } catch (err) {
        setError(new Error('Failed to fetch game items'));
      } finally {
        setLoading(false);
      }
    };

    fetchGameItems();
  }, []);

  return {
    moduleConfigs,
    loading,
    error,
  };
};