import { Outlet, createFileRoute } from "@tanstack/react-router"
import { SolanaWalletButton } from "~/components/SolanaWalletButton"

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
})

// TODO: does not apply layout
function LayoutComponent() {
  return (
    <>
      <SolanaWalletButton />
      <Outlet />
    </>
  )
}
