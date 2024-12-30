import { useEffect, useRef, useState } from 'react';
import { useAudio } from '@/hooks/useAudio';
import Big from 'big.js';
import { useUserStore } from '@/stores/useUserStore';

const createNewCoin = (latestAmount: Big.Big) => {
  return {
    id: Math.random(),
    latestAmount,
    x: Math.random() * 300,
    y: 0,
  };
};

// 2024-12-30 00:00:00
// const creat_timestamp = 1735488000000;
// 0x=1000 1x=Double 2x=Triple ...
// const coins_per_hour = 1000;
// seconds
const coins_duration = 3;

const calcLatestCoins = (props: { coins_per_hour: number; creat_timestamp: number; add_speed?: number; }) => {
  const { coins_per_hour, creat_timestamp,  add_speed } = props;

  const coinsPerHour = Big(coins_per_hour).times(Big(1).plus(add_speed || 0));

  const currentTimestamp = new Date().getTime();
  const coinCountPerDuration = Big(coinsPerHour).div(Big(60).times(60).div(coins_duration));
  const diffHours = Big(Big(currentTimestamp).minus(creat_timestamp)).div(Big(1000).times(60).times(60)).toFixed(0, Big.roundDown);
  const lastSeconds = Big(Big(currentTimestamp).minus(creat_timestamp)).mod(Big(1000).times(60).times(60)).div(1000).toFixed(0, Big.roundDown);
  const lastCoins = Big(lastSeconds).times(coinCountPerDuration);

  // console.log('-----> diffHours: %o', diffHours);
  // console.log('-----> lastSeconds: %o', lastSeconds);
  // console.log('-----> coinCountPerDuration: %o', coinCountPerDuration.toString());
  // console.log('-----> lastCoins: %o', lastCoins.toString());

  return Big(lastCoins).plus(Big(diffHours).times(coinsPerHour));
};

export function useCoins() {
  const coinTimer = useRef<any>();
  const {
    addSpeed,
    levels,
    userInfo,
    userEquipmentListLoading,
    userInfoLoading,
    levelsLoading,
  } = useUserStore();

  const [coins, setCoins] = useState<any[]>([]);
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [latestCoins, setLatestCoins] = useState(Big(0));
  const [currentCoins, setCurrentCoins] = useState(Big(0));
  const TARGET_COINS = 10;

  const { play: playSound } = useAudio({
    src: '/audios/coin.mp3',
    volume: 0.5
  });

  const handleCollected = (id: number) => {
    setCoins((prevCoins) => prevCoins.filter((coin) => coin.id !== id));
    setCollectedCoins(prev => prev + 1);
    playSound();
    const curr = coins.find((it: any) => it.id === id);
    curr && setCurrentCoins(() => curr.latestAmount);
  };

  const progress = (collectedCoins / TARGET_COINS) * 100;

  const handleProgressComplete = () => {
    console.log('Progress complete!');
    setCollectedCoins(0);
  };

  useEffect(() => {
    if (!userInfo || !userInfo.creat_timestamp || !userInfo.level || userEquipmentListLoading || userInfoLoading || levelsLoading) return;

    const creatTimestamp = userInfo?.creat_timestamp;
    const coinsPerHour = levels?.[userInfo?.level]?.coins_per_hour;

    const _latestCoins = calcLatestCoins({
      coins_per_hour: coinsPerHour,
      creat_timestamp: creatTimestamp,
    });
    setLatestCoins(_latestCoins);
    setCurrentCoins(_latestCoins);

    const createInterval = () => {
      const _latestCoins = calcLatestCoins({
        coins_per_hour: coinsPerHour,
        creat_timestamp: creatTimestamp,
      });
      setLatestCoins(() => _latestCoins);
      setCoins((prevCoins: any) => [
        ...prevCoins,
        createNewCoin(_latestCoins),
      ]);
    };

    coinTimer.current = setInterval(createInterval, coins_duration * 1000);

    const visibilityEvent = () => {
      const isHidden = document.hidden || document.visibilityState === 'hidden';
      clearInterval(coinTimer.current);
      if (!isHidden) {
        coinTimer.current = setInterval(createInterval, coins_duration * 1000);
      }
    };
    document.addEventListener('visibilitychange', visibilityEvent);

    return () => {
      clearInterval(coinTimer.current);
      document.removeEventListener('visibilitychange', visibilityEvent);
    };
  }, [userInfo, addSpeed, userEquipmentListLoading, userInfoLoading, levelsLoading]);

  return {
    coins,
    progress,
    handleCollected,
    handleProgressComplete,
    latestCoins,
    currentCoins,
  };
}
