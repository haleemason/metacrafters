// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
const { argv } = require("process");

// Create a new keypair
const newPair = new Keypair();

// Exact the public and private key from the keypair
const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
const privateKey = newPair._keypair.secretKey;

// Check if a command line argument is provided with a specific address to airdrop the SOL into
let walletAddressPublicKey = argv[3];
if (typeof walletAddressPublicKey === "undefined") {
  walletAddressPublicKey = publicKey;
}

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Public Key of the generated keypair", walletAddressPublicKey);
// console.log("connection", connection);

// Get the wallet balance from a given private key
/**
 * Get a wallets balance using a public key address
 * @param {string} walletAddressPublicKey a sol public key wallet
 * @returns {number} wallet balance in Sol
 */
const getWalletBalance = async (walletAddressPublicKey) => {
  try {
    // Connect to the Devnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // console.log("Connection object is:", connection);
    const walletBalance = await connection.getBalance(
      new PublicKey(walletAddressPublicKey)
    );
    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );
    return parseInt(walletBalance) / LAMPORTS_PER_SOL;
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async () => {
  try {
    // Connect to the Devnet and make a wallet from privateKey
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(privateKey);

    // Request airdrop of 2 SOL to the wallet
    console.log("Airdropping some SOL to my wallet:", walletAddressPublicKey);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletAddressPublicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  await getWalletBalance(walletAddressPublicKey);
  await airDropSol();
  await getWalletBalance(walletAddressPublicKey);
};

// mainFunction();

exports.getWalletBalance = getWalletBalance;
