import React from 'react';
import clsx from 'clsx';

interface ResourceItemProps {
  title: string;
  level: number;
  coins: number;
  total: number;
  className?: string;
}

const ResourceItem: React.FC<ResourceItemProps> = ({ title, level, coins, total, className }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className={clsx('flex items-center px-4 height-[2.625rem] justify-between', className)}>
      {/* Title */}
      <div className="text-[26px] font-cherryBomb text-[#F7F9EA] text-stroke-2">
        {title}
      </div>
      <div className="flex items-center gap-2">
        {/* Level */}
        <div className="flex items-center bg-white bg-opacity-50 rounded-2xl px-2.5 py-3 backdrop-blur-[10px]">
          <span className="font-bold text-base font-montserrat text-left leading-4 text-black">Lv.{level}</span>
        </div>
        {/* Coins */}
        <div className="flex items-center bg-white bg-opacity-50 rounded-2xl px-[6px] py-[9px] backdrop-blur-[10px] gap-1.5">
          <img src="/images/coin.png" alt="coin" className="w-[1.375rem] h-[1.375rem]" />
          <span className="font-bold text-base font-montserrat text-left leading-4 text-black">{formatNumber(coins)}</span>
        </div>

        {/* Total */}
        <div className="flex items-center bg-white bg-opacity-50 rounded-2xl px-[6px] py-[9px] backdrop-blur-[10px] gap-1.5">
          <img src="/images/poog.png" alt="total" className="w-[1.375rem] h-[1.375rem]" />
          <span className="font-bold text-base font-montserrat text-left leading-4 text-black">{formatNumber(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceItem;