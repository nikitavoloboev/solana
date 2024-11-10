import { createMemoInstruction } from "@solana/spl-memo"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js"
import { createFileRoute } from "@tanstack/react-router"
import { getCostInSol } from "~/lib/solana"

function RouteComponent() {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  return (
    <>
      <button
        onClick={async () => {
          if (!publicKey) {
            return
          }
          try {
            const costInUsd = 5
            const costInSol = await getCostInSol(costInUsd)
            if (!costInSol) return
            console.log(costInSol)
            const addresses = [
              "E57kivv4wcptYTas5aTKQb82sGvipBY5GUQZn4GPzgFT",
              "H2ANeJWUYUSkrLbhRq4VBf2nSmjCBk9tP7WNBFFN7J64",
              "9fyd39ENpTdF6fjJ3CBURsuKANFy2Yw7RvB2mihZkzbS",
              "76XTHj6puju8vkPjN3tZZHBHKMSSCJD2prvTTMUsCJY2",
              "AfWsa4KvhMSN5ti9gMMcFatVutJaT7e1EsftpYsQ7Cpd",
            ]
            const transaction = new Transaction()
            const costInLamports = LAMPORTS_PER_SOL * costInSol
            const amountPerAddress = Math.ceil(costInLamports / 5)
            transaction.add(createMemoInstruction(`id_123`, [publicKey]))
            for (const address of addresses) {
              const recipientPubkey = new PublicKey(address)
              transaction.add(
                SystemProgram.transfer({
                  fromPubkey: publicKey,
                  toPubkey: recipientPubkey,
                  lamports: amountPerAddress,
                }),
              )
            }
            const tx = await sendTransaction(transaction, connection)
            console.log("Transaction confirmed:", tx)
          } catch (err) {
            console.log(err, "err")
          }
        }}
      >
        Send 5$ to 5 addresses, 1$ each
      </button>
    </>
  )
}

export const Route = createFileRoute("/solana/")({
  component: () => <div>Hello /solana/!</div>,
})
