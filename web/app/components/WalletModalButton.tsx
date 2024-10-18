import React, { FC, MouseEvent, useCallback } from "react"
import { useWalletPassThrough } from "~/contexts/WalletPassthroughProvider"

export const WalletModalButton: FC<{
  setIsWalletModalOpen(toggle: boolean): void
}> = ({ setIsWalletModalOpen }) => {
  const { connecting } = useWalletPassThrough()

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (
        // TODO: find how to avoid doing this, check the jup-ag--terminal repo
        // @ts-ignore
        window.Jupiter.enableWalletPassthrough &&
        // @ts-ignore
        window.Jupiter.onRequestConnectWallet
      ) {
        // @ts-ignore
        window.Jupiter.onRequestConnectWallet()
      } else {
        setIsWalletModalOpen(true)
      }
    },
    [setIsWalletModalOpen],
  )

  return (
    <button
      type="button"
      className="py-2 px-3 h-7 flex items-center rounded-2xl text-xs bg-[#191B1F] text-white"
      onClick={handleClick}
    >
      {connecting ? (
        <span>
          <span>Connecting...</span>
        </span>
      ) : (
        <span>
          <span>Connect Wallet</span>
        </span>
      )}
    </button>
  )
}
