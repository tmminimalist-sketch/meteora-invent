import {
  ActivationType,
  buildCurveWithMarketCap,
  CollectFeeMode,
  DynamicBondingCurveClient,
  FeeSchedulerMode,
  MigrationFeeOption,
  MigrationOption,
  TokenDecimal,
  TokenType,
} from "@meteora-ag/dynamic-bonding-curve-sdk";
import bs58 from "bs58";
import {
  Connection,
  Keypair,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";
import { NATIVE_MINT } from "@solana/spl-token";

const WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!WALLET_PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set");
}
const walletSecretKey = bs58.decode(WALLET_PRIVATE_KEY);
const wallet = Keypair.fromSecretKey(walletSecretKey);

const connection = new Connection(
  process.env.RPC_URL || "https://api.mainnet-beta.solana.com"
);

async function main() {
  const client = new DynamicBondingCurveClient(connection, "confirmed");

  // Step 1: Create Config Key
  const configKey = Keypair.generate();

  const curveConfig = buildCurveWithMarketCap({
    totalTokenSupply: 1000000000,
    initialMarketCap: 100,
    migrationMarketCap: 100.1,
    migrationOption: MigrationOption.MET_DAMM_V2,
    tokenBaseDecimal: TokenDecimal.SIX,
    tokenQuoteDecimal: TokenDecimal.NINE,
    lockedVestingParam: {
      totalLockedVestingAmount: 10000000,
      numberOfVestingPeriod: 365,
      cliffUnlockAmount: 0,
      totalVestingDuration: ((365 * 24 * 60 * 60) / 1000) * 400,
      cliffDurationFromMigrationTime: 0,
    },
    feeSchedulerParam: {
      startingFeeBps: 5000,
      endingFeeBps: 100,
      numberOfPeriod: 100,
      totalDuration: 10 * 60 * 60,
      feeSchedulerMode: FeeSchedulerMode.Exponential,
    },
    dynamicFeeEnabled: true,
    activationType: ActivationType.Slot,
    collectFeeMode: CollectFeeMode.OnlyQuote,
    migrationFeeOption: MigrationFeeOption.FixedBps100,
    tokenType: TokenType.SPL,
    partnerLpPercentage: 0,
    creatorLpPercentage: 0,
    partnerLockedLpPercentage: 50,
    creatorLockedLpPercentage: 50,
    creatorTradingFeePercentage: 50,
    leftover: 0,
  });

  console.log(curveConfig);

  const createConfigTx = await client.partner.createConfig({
    config: configKey.publicKey,
    quoteMint: NATIVE_MINT,
    feeClaimer: wallet.publicKey,
    leftoverReceiver: wallet.publicKey,
    payer: wallet.publicKey,
    ...curveConfig,
  });

  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  createConfigTx.recentBlockhash = blockhash;
  createConfigTx.feePayer = wallet.publicKey;

  createConfigTx.partialSign(configKey);

  const createConfigSignature = await sendAndConfirmTransaction(
    connection,
    createConfigTx,
    [wallet, configKey],
    { commitment: "confirmed", skipPreflight: true }
  );

  console.log(`Config created successfully! ${configKey.publicKey.toString()}`);
  console.log(`Transaction: https://solscan.io/tx/${createConfigSignature}`);

  // Wait for config key creation to be confirmed and finalized
  await connection.confirmTransaction(createConfigSignature, "finalized");

  // Step 2: Create Base Mint Token Pool
  const baseMint = Keypair.generate();

  const createPoolTx = await client.pool.createPool({
    name: "Moon Token",
    symbol: "MOON",
    uri: "https://i.pinimg.com/736x/9b/80/f6/9b80f613d125c9efd816d0be243aa1c0.jpg",
    config: configKey.publicKey,
    baseMint: baseMint.publicKey,
    payer: wallet.publicKey,
    poolCreator: wallet.publicKey,
  });

  const createPoolSignature = await sendAndConfirmTransaction(
    connection,
    createPoolTx,
    [wallet, baseMint, wallet],
    {
      commitment: "confirmed",
      skipPreflight: true,
    }
  );
  console.log(`Generated base mint: ${baseMint.publicKey.toString()}`);
  console.log(`Transaction: https://solscan.io/tx/${createPoolSignature}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
