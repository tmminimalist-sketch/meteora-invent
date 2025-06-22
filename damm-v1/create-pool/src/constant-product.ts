import AmmImpl, { PROGRAM_ID } from "@meteora-ag/dynamic-amm-sdk";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { derivePoolAddressWithConfig } from "@meteora-ag/dynamic-amm-sdk/dist/cjs/src/amm/utils";
import { BN } from "@coral-xyz/anchor";
import bs58 from "bs58";
import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), "../.env") });

const PAYER_PRIVATE_KEY = process.env.PAYER_PRIVATE_KEY;
if (!PAYER_PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
}
const payerSecretKey = bs58.decode(PAYER_PRIVATE_KEY);
const payer = Keypair.fromSecretKey(payerSecretKey);

const connection = new Connection(
    process.env.RPC_URL || "https://api.mainnet-beta.solana.com"
);


async function createConstantProductPool() {

  //Variables to be configured
  const tokenAMint = new PublicKey("");
  const tokenBMint = new PublicKey("");
  
  //
  try {



    // Initialise anchor provider
    const provider = new AnchorProvider(connection, new Wallet(payer), {
      commitment: "confirmed",
    });

    // Configuration address for the pool (get from https://amm-v2.meteora.ag/swagger-ui/#/pools/get_all_pool_configs)
    const config = new PublicKey(
      "" // Note that you must have the authority to use config and that each pair can only have 1 pool under the same config
    );

    // Amount of token A and B to be deposited to the pool in base units
    const tokenAAmount = new BN(); 
    const tokenBAmount = new BN(); 

    console.log("Pool configuration:");
    console.log("Token A:", tokenAMint.toBase58());
    console.log("Token B:", tokenBMint.toBase58());
    console.log("Config address:", config.toBase58());
    console.log("Initial liquidity - Token A:", tokenAAmount.toString());
    console.log("Initial liquidity - Token B:", tokenBAmount.toString());

    // Get pool address
    const programId = new PublicKey(PROGRAM_ID);
    const poolPubkey = derivePoolAddressWithConfig(
      tokenAMint,
      tokenBMint,
      config,
      programId
    );
    console.log("Derived pool address:", poolPubkey.toBase58());

    // Create pool transactions
    console.log("Preparing pool creation transactions...");
    const transactions =
      await AmmImpl.createPermissionlessConstantProductPoolWithConfig(
        provider.connection as any,
        payer.publicKey, // payer
        tokenAMint,
        tokenBMint,
        tokenAAmount,
        tokenBAmount,
        config
      );

    // Sign and send transactions
    console.log("Sending transactions to network...");
    for (const transaction of transactions) {
      transaction.sign(payer);
      const txHash = await provider.connection.sendRawTransaction(
        transaction.serialize(),
        {
          skipPreflight: false,
          preflightCommitment: "confirmed",
          maxRetries: 3,
        }
      );
      console.log("Transaction sent, waiting for confirmation...");

      try {
        const latestBlockhash = await provider.connection.getLatestBlockhash();
        const confirmation = await provider.connection.confirmTransaction({
          signature: txHash,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        });

        if (confirmation.value.err) {
          throw new Error(`Transaction failed: ${confirmation.value.err}`);
        }

        console.log("Transaction confirmed:", txHash);
      } catch (error) {
        console.error("Error confirming transaction:", error);
        console.log(
          "Transaction may still be processing. Check Solana Explorer for status."
        );
        console.log("Transaction signature:", txHash);
        throw error;
      }
    }

    console.log("\nPool created successfully!");
    console.log("Pool address:", poolPubkey.toBase58());
    console.log(
      "Transaction: https://solscan.io/tx/" + transactions[0].signature
    );
    process.exit(0);
  } catch (error) {
    console.error("Error creating constant product pool:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

// Execute the main function
createConstantProductPool().catch((error) => {
  console.error("Fatal error in main function:", error);
  process.exit(1);
});
