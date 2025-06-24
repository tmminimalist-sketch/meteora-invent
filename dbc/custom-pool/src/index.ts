import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  buildCurveWithMarketCap,
  DynamicBondingCurveClient,
} from "@meteora-ag/dynamic-bonding-curve-sdk";
import bs58 from "bs58";
import "dotenv/config";
import { quoteMint, configKeyParams, tokenParams } from "../examples/basic";



const PAYER_PRIVATE_KEY = process.env.PAYER_PRIVATE_KEY;
if (!PAYER_PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
}
const payerSecretKey = bs58.decode(PAYER_PRIVATE_KEY);
const payer = Keypair.fromSecretKey(payerSecretKey);

const connection = new Connection(
    process.env.RPC_URL || "https://api.mainnet-beta.solana.com"
);


async function customPool() {
  const client = new DynamicBondingCurveClient(connection, "confirmed");

  const configKey = Keypair.generate();
  const curveConfig = buildCurveWithMarketCap(configKeyParams);

  const createConfigTx = await client.partner.createConfig({
    config: configKey.publicKey,
    feeClaimer: payer.publicKey,
    leftoverReceiver: payer.publicKey,
    payer: payer.publicKey,
    quoteMint: quoteMint,
    ...curveConfig,
  });

  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  createConfigTx.recentBlockhash = blockhash;
  createConfigTx.feePayer = payer.publicKey;

  createConfigTx.partialSign(configKey);

  const createConfigSignature = await sendAndConfirmTransaction(
    connection,
    createConfigTx,
    [payer, configKey],
    { commitment: "confirmed", skipPreflight: true }
  );

  console.log(`Config created successfully! ${configKey.publicKey.toString()}`);
  console.log(`Transaction: https://solscan.io/tx/${createConfigSignature}`);

  // Wait for config key creation to be confirmed and finalized
  await connection.confirmTransaction(createConfigSignature, "finalized");

  // Step 2: Create Base Mint Token Pool
  const start = tokenParams.symbol.slice(0, 3);
  let baseMint = Keypair.generate();
  const base58Regex = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
  if (base58Regex.test(start)) {
      var attempts = 0
      while (attempts < 100000) {
          const keypair = Keypair.generate();
          attempts += 1
          if (keypair.publicKey.toBase58().slice(0, 3) === start) {
              baseMint = keypair;
              break;
          }
      }
  }


  const createPoolTx = await client.pool.createPool({
    ...tokenParams,
    config: configKey.publicKey,
    baseMint: baseMint.publicKey,
    payer: payer.publicKey,
    poolCreator: payer.publicKey,
  });

  const createPoolSignature = await sendAndConfirmTransaction(
    connection,
    createPoolTx,
    [payer, baseMint, payer],
    {
      commitment: "confirmed",
      skipPreflight: true,
    }
  );
  console.log(`Generated base mint: ${baseMint.publicKey.toString()}`);
  console.log(`Transaction: https://solscan.io/tx/${createPoolSignature}`);
  console.log(
    `Trade on Jup Pro: https://jup.ag/tokens/${baseMint.publicKey.toString()}`
  );
}

customPool()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
