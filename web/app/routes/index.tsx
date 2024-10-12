import { createFileRoute } from "@tanstack/react-router"

function RouteComponent() {
  return (
    <>
      <div>
        todo: connect wallet with https://github.com/anza-xyz/wallet-adapter
      </div>
      <div>todo: split tx into multiple addresses (2 and 4)</div>
    </>
  )
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})
