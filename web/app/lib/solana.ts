export async function getCostInSol(costInUsd: number) {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd",
    )
    const data = await response.json()
    const solPriceInUsd = data.solana.usd
    return costInUsd / solPriceInUsd
  } catch (error) {
    console.error("Error fetching SOL price:", error)
    // TODO: should be reliable!
  }
}
