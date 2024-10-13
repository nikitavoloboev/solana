import { createFileRoute } from "@tanstack/react-router"

function RouteComponent() {
  return (
    <>
      <button onClick={() => {}}>Buy 5$ coin</button>
    </>
  )
}

export const Route = createFileRoute("/coin")({
  component: () => <RouteComponent />,
})
