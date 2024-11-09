import { createFileRoute } from "@tanstack/react-router"
import { notify } from "~/lib/notifications"

function RouteComponent() {
  return (
    <div className="w-full h-screen  flex items-center justify-center relative">
      <button
        onClick={() => {
          // @ts-ignore
          window.Jupiter.init({
            displayMode: "modal",
            integratorName: "TON_Tools",
            defaultExplorer: "Solana FM",
            containerStyles: {
              zIndex: 100000,
              position: "relative",
              maxHeight: "90vh",
            },
            onSuccess: ({ txid }: { txid: string }) => {
              notify({
                type: "success",
                message: `Transaction successful!`,
                txid,
              })
            },
            onError: (error: any) => {
              notify({
                type: "error",
                message: `Transaction failed: ${error.message}`,
              })
            },
          })
        }}
        className="bg-gradient-to-r relative  from-[#4832a2] to-[#241764] border border-[#6a59f6] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Launch Jupiter
      </button>
    </div>
  )
}

export const Route = createFileRoute("/try/solana-connect")({
  component: () => <RouteComponent />,
})
