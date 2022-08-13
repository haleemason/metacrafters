# Metacrafters

## Setup
Create a Node project in your directory by entering:
`npm init -y`

Install the Solana Web3 JS library by entering:
`npm install --save @solana/web3.js`

The `index.js` file can be run with the following command:
`node index.js`

## Challenge 1 - Keypairs and Airdrops 
Modify the logic of the existing piece of code to get airdropped into an account of the user's choice. To run the script, you can take the account address as a CLI parameter.

The `myWallet.publicKey` should be replaced with the Public key entered by the user.

## Running `challenge1-solana`
The Command line Argument `--key` is an optional argument to airdrop dev SOL into a specific wallet for testing. Example command:
`node index.js --key publicKeyWalletAddress`

##  Challenge 2 - Transactions and Fees
Explore Completed Transactions. Your challenge is to calculate the wallet balance of the sender wallet. Then, transfer 50% of the balance to another wallet.

## Running `challenge2-solana`
TBD