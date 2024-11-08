async function checkForNewTransactions(programAddress: string) {
  let i = 100
  while (i >= 0) {
    try {
      // scan last 100 tx that were sent to the program splitter address
      // read the metadata of the id, then do a db query
    } catch (e) {
      console.error(e)
      i -= 5
    }
  }
}

async function main() {
  while (true) {
    console.log("Checking for new transactions...")
    try {
      await checkForNewTransactions("..")
    } catch (error) {
      console.log(error, "error")
    }
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
}

main()
