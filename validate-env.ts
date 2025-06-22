import 'dotenv/config'
import { Connection, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

async function validateEnv() {
  const env = process.env;
  if (!env.PAYER_PRIVATE_KEY) {
    console.log("PAYER_PRIVATE_KEY is not set");
  } else {
    try {
      const payerSecretKey = bs58.decode(env.PAYER_PRIVATE_KEY);
      const payer = Keypair.fromSecretKey(payerSecretKey);
      console.log("Payer is set to", payer.publicKey.toBase58());
    } catch (error) {
      console.log("PAYER_PRIVATE_KEY is not valid");
      console.log(error);
    }
  }

  if (!env.RPC_URL) {
    console.log("Public Mainnet RPC will be used");
  } else {
    try {
      const connection = new Connection(env.RPC_URL);
      const hash = await connection.getGenesisHash();
      const map = {
          "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d": "mainnet-beta",
          "EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG": "devnet",
          "4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY": "testnet"
      };
      console.log("RPC_URL is valid");
      console.log("RPC Cluster:", map[hash.toString() as keyof typeof map] || "unknown");
    } catch (error) {
      console.log("RPC_URL is not valid");
    }
  }
}

validateEnv().catch(console.error);