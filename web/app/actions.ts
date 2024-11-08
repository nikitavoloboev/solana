import { Connection } from "@solana/web3.js"
import { createServerFn } from "@tanstack/start"

// TODO: https://solana-labs.github.io/solana-web3.js/ see how most of below can be done with this lib
export const $checkTxValidity = createServerFn(
  "POST",
  async (data: { transaction: string }) => {
    const { transaction } = data
    try {
      const connection = new Connection("https://api.devnet.solana.com")
      const txDetails = await connection.getParsedTransaction(transaction)
      // console.log(txDetails, "tx details")

      const preBalance = txDetails?.meta?.preBalances?.[0] ?? 0
      const postBalance = txDetails?.meta?.postBalances?.[0] ?? 0
      const totalCostInLamports = preBalance - postBalance
      console.log(totalCostInLamports, "total cost")

      // console.log("Total cost in lamports:", totalCost)
      // console.log(txDetails?.transaction.message.instructions, "instructions")

      const memoIx = txDetails?.transaction.message.instructions.find(
        (instruction) => {
          console.log(instruction, "instruction")
          // @ts-ignore
          return instruction.program === "spl-memo"
        },
      )

      // @ts-ignore
      console.log("Memo instruction:", memoIx?.parsed)

      if (!txDetails || !txDetails.meta) {
        throw new Error("Transaction not found or invalid")
      }

      // @ts-ignore
      const memoData = memoIx?.parsed?.info?.memo

      // Find the memo instruction in the transaction
      const memoInstruction = txDetails.transaction.message.instructions.find(
        (ix) =>
          ix.programId.toString() ===
          "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
      )

      if (!memoInstruction) {
        throw new Error("No memo instruction found in transaction")
      }

      // Parse the memo data
      const decoder = new TextDecoder()
      // const memoData = decoder.decode(
      //   Buffer.from(memoInstruction.data, "base64"),
      // )
      // console.log("Memo content:", memoData)

      // db call..
      // await create.item.with({
      // id: memoInstruction
      // })

      // return memoData
    } catch (error) {
      console.error("Error reading memo:", error)
      throw error
    }
  },
)
