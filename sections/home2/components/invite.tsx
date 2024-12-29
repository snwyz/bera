import Modal from "@/components/modal";
import { memo } from "react";
export default memo(function Invite() {

  return (
    <Modal
      open={true}
      onClose={() => {

      }}
    >
      <div className="flex flex-col items-center w-[332px]">

        <div className="flex flex-col items-center w-full h-[292px] rounded-[20px] bg-[#7ABBF7] border border-black/20">
          <div className="-mt-[15px] mb-[7px] w-[78px]">
            <img src="/images/beraciaga/foot.svg" alt="foot" />
          </div>
          <div className="mb-[8px] text-[#F7F9EA] text-stroke-1 font-cherryBomb text-[32px] leading-[100%]">Invite Frens</div>
          <div className="text-black font-montserrat text-[16px] font-medium leading-[150%]">Invite friends to get more prize!</div>
          <div className="mt-[18px] mb-[24px] flex items-center justify-center w-[292px] h-[50px] rounded-[53px] border border-white bg-[rgba(255, 255, 255, 0.30)] backdrop-blur-[10px]">
            <span className="text-[#F7F9EA] text-stroke-1 font-cherryBomb text-[20px] leading-[100%]">5 Invited</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="w-[142px] h-[42px] rounded-[10px] border border-[#FFCF23] bg-black/30 flex items-center justify-center gap-[8px]">
              <div className="w-[15px]">
                <img src="/images/beraciaga/copy.svg" alt="copy" />
              </div>
              <span className="text-[#FFCF23] font-montserrat text-[16px] font-semibold">Copy link</span>
            </div>

            <div className="w-[142px] h-[42px] rounded-[10px] border border-[#000] bg-[#FFD335] flex items-center justify-center gap-[6px]">
              <div className="w-[15px]">
                <img src="/images/beraciaga/invite.svg" alt="invite" />
              </div>
              <span className="text-black font-montserrat text-[16px] font-semibold">Invite</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
})