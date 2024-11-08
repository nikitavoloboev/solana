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
import { useState } from "react"
import { $checkTxValidity } from "~/actions"
import { SolanaWalletButton } from "~/components/SolanaWalletButton"

async function getCostInSol(costInUsd: number) {
  // TODO: use pyth to get how much SOL costInUsd is
  // for now, just estimating (assume 204$ for 1 SOL)

  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
    )
    const data = await response.json()
    const solPriceInUsd = data.solana.usd
    return costInUsd / solPriceInUsd
  } catch (error) {
    console.error("Error fetching SOL price:", error)
    // Fallback to estimated price if API call fails
    return costInUsd / 204
  }

  const costInSol = costInUsd / 204
  return costInSol
}

function RouteComponent() {
  const { connection } = useConnection()
  const { publicKey, sendTransaction, wallet } = useWallet()
  const [loadingTransaction, setLoadingTransaction] = useState(false)

  return (
    <>
      <SolanaWalletButton />
      <button
        onClick={async () => {
          setLoadingTransaction(true)
          if (!publicKey) return
          if (!wallet) return

          try {
            const costInUsd = 5

            // TODO: change it to pyth to make it real
            const costInSol = await getCostInSol(costInUsd)
            console.log(costInSol)

            const costInLamports = LAMPORTS_PER_SOL * costInSol
            // const costInLamports = Math.round(LAMPORTS_PER_SOL * costInSol)
            console.log(costInLamports, "lamports")

            // const address = fetchRandomAddresses() => 5 addresses

            const addresses = ["", "", "", "", ""]

            // Solana devnet connection
            const connection = new Connection("https://api.devnet.solana.com")

            // Create a new transaction
            const transaction = new Transaction()

            //  (added via memo)

            // Amount to send to each address
            // Math.round() because lamports are integers
            const amountPerAddress = Math.round(costInLamports / 5)
            console.log(amountPerAddress, "amount")

            transaction.add(
              createMemoInstruction(`item_id_901231::5}`, [publicKey]),
            )
            // Add transfer instructions for each address
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

            // Sign and send the transaction
            const tx = await sendTransaction(transaction, connection)
            console.log("Transaction confirmed:", tx)
            await $checkTxValidity({
              transaction: tx,
            })
          } catch (err) {
            console.log(err, "err")
          }
        }}
      >
        SEND 1$ to 5 addresses, 20 cent each
      </button>

      <button
        onClick={async () => {
          const priceInUsd = 5
          const priceInSol = await getCostInSol(priceInUsd)
          console.log(priceInSol, "sol")
          await $checkTxValidity({
            transaction:
              "4M3Y4vVAycHD6tutLXawCA48Mc99R1svpnoB1YA7Ub99CWSwWHxnnqi1YfSRfABu7pknSkH2qpczhn288kDPrEZq",
          })
        }}
      >
        Check tx validity
      </button>
    </>
  )
}

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

// const mainNetAddress = [
//   "E57kivv4wcptYTas5aTKQb82sGvipBY5GUQZn4GPzgFT",
//   "H2ANeJWUYUSkrLbhRq4VBf2nSmjCBk9tP7WNBFFN7J64",
//   "9fyd39ENpTdF6fjJ3CBURsuKANFy2Yw7RvB2mihZkzbS",
//   "76XTHj6puju8vkPjN3tZZHBHKMSSCJD2prvTTMUsCJY2",
//   "4KDiwPGGdXoFp66QsQmf4DxQb7U6TPYrbazkHUcb4DBD",
// ]

// check that tx has been confirmed
// read the tx metadata, grab the `tokenId`
// const tokenId = parseTx(tx).tokenId
// const token = await get.solToken(tokenId)
// ...
// const parsedTransactions = []
// db calls...
