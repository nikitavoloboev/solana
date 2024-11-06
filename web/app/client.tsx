import "@solana/wallet-adapter-react-ui/styles.css"
import { hydrateRoot } from "react-dom/client"
import { StartClient } from "@tanstack/start"
import { createRouter } from "./router"

const router = createRouter()

hydrateRoot(document.getElementById("root")!, <StartClient router={router} />)
