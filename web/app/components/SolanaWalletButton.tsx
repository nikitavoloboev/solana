import React, { useMemo } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import "@solana/wallet-adapter-react-ui/styles.css"

// Wallet connector component
export const SolanaWalletButton = () => {
  const { publicKey, connecting } = useWallet()

  return (
    <div className="absolute top-1 right-1">
      <WalletMultiButton className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" />
      {connecting && <div>Connecting...</div>}
    </div>
  )
}
