// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmRawTransaction,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

const { getWalletBalance } = require("../challenge1-solana/index.js");

// Helper function to send half the wallet balance
const sendHalf = (walletAmount) => {
  console.log("walletAmount", walletAmount);
  return Math.round(walletAmount / 2);
};

const transferSol = async () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Get Keypair from Secret Key
  const keypair = Keypair.generate();
  const from = Keypair.fromSecretKey(Uint8Array.from(keypair.secretKey));
  // Make a new Keypair (starts with 0 SOL)
  // const from = Keypair.generate();

  // Generate another Keypair (account we'll be sending to)
  const to = Keypair.generate();
  console.log("Receiver (to)", to.publicKey, "wallet's previous balance:");
  await getWalletBalance(to.publicKey);

  // Aidrop 2 SOL to Sender wallet
  console.log("Sender (from) wallet's previous balance:");
  let myBalance = await getWalletBalance(from.publicKey);
  console.log("Airdopping some SOL to Sender wallet!");
  const fromAirDropSignature = await connection.requestAirdrop(
    new PublicKey(from.publicKey),
    2 * LAMPORTS_PER_SOL
  );

  // Latest blockhash (unique identifer of the block) of the cluster
  let latestBlockHash = await connection.getLatestBlockhash();

  // Confirm transaction using the last valid block height (refers to its time)
  // to check for transaction expiration
  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: fromAirDropSignature,
  });

  console.log("Airdrop completed for the Sender account");
  let myBalanceAfterAirdrop = await getWalletBalance(from.publicKey);
  console.log(
    "myBalanceAfterAirdrop",
    myBalanceAfterAirdrop,
    "sendHalf",
    sendHalf(myBalanceAfterAirdrop)
  );
  // Send money from "from" wallet and into "to" wallet
  var transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: sendHalf(myBalanceAfterAirdrop) * LAMPORTS_PER_SOL,
    })
  );

  // Sign transaction
  var signature = await sendAndConfirmTransaction(connection, transaction, [
    from,
  ]);
  console.log("Signature is ", signature);
};

transferSol();
