import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { SolanaWalletButton } from "~/components/SolanaWalletButton"
import { WalletButton } from "~/components/WalletButton"

function RouteComponent() {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  return (
    <>
      <SolanaWalletButton />
    </>
  )
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})
