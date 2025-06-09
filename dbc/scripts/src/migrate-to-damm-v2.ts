import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  DAMM_V2_MIGRATION_FEE_ADDRESS,
  DynamicBondingCurveClient,
  deriveDbcPoolAddress,
  deriveDammV2MigrationMetadataAddress,
  deriveBaseKeyForLocker,
  deriveEscrow,
} from "@meteora-ag/dynamic-bonding-curve-sdk";
import { BN } from "bn.js";
import bs58 from "bs58";

/**
 * Migrate to DAMM V1
 */
async function migrateToDammV2() {
  const PAYER_PRIVATE_KEY = process.env.PRIVATE_KEY;
  if (!PAYER_PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }
  const payerSecretKey = bs58.decode(PAYER_PRIVATE_KEY);
  const payer = Keypair.fromSecretKey(payerSecretKey);
  console.log("Payer public key:", payer.publicKey.toBase58());

  const connection = new Connection(
    "https://api.mainnet-beta.solana.com",
    "confirmed"
  );

  try {
    const client = new DynamicBondingCurveClient(connection, "confirmed");

    const baseMint = new PublicKey("YOUR_BASE_MINT");

    const virtualPoolState = await client.state.getPoolByBaseMint(baseMint);
    if (!virtualPoolState) {
      throw new Error(`Pool not found for base mint: ${baseMint.toString()}`);
    }

    const config = virtualPoolState.account.config;
    if (!config) {
      throw new Error("Pool config is undefined");
    }

    const poolConfigState = await client.state.getPoolConfig(config);

    console.log("poolConfigState", poolConfigState);

    const quoteMint = new PublicKey(poolConfigState.quoteMint);

    const migrationFeeOption = poolConfigState.migrationFeeOption;
    const dammConfigAddress = new PublicKey(
      DAMM_V2_MIGRATION_FEE_ADDRESS[migrationFeeOption]
    );

    const poolAddress = deriveDbcPoolAddress(quoteMint, baseMint, config);
    console.log("Derived pool address:", poolAddress.toString());

    // check if migration metadata exists
    console.log("Checking if migration metadata exists...");
    const migrationMetadata = deriveDammV2MigrationMetadataAddress(poolAddress);
    console.log("Migration metadata address:", migrationMetadata.toString());

    const metadataAccount = await connection.getAccountInfo(migrationMetadata);
    if (!metadataAccount) {
      console.log("Creating migration metadata...");
      const createMetadataTx =
        await client.migration.createDammV2MigrationMetadata({
          payer: payer.publicKey,
          virtualPool: poolAddress,
          config: config,
        });

      const { blockhash } = await connection.getLatestBlockhash("confirmed");
      createMetadataTx.recentBlockhash = blockhash;
      createMetadataTx.feePayer = payer.publicKey;

      const metadataSignature = await sendAndConfirmTransaction(
        connection,
        createMetadataTx,
        [payer],
        { commitment: "confirmed" }
      );

      console.log(`Migration metadata created successfully!`);
      console.log(`Transaction: https://solscan.io/tx/${metadataSignature}`);
    } else {
      console.log("Migration metadata already exists");
    }

    // check if locked vesting exists
    if (poolConfigState.lockedVestingConfig.amountPerPeriod.gt(new BN(0))) {
      // Check if locker already exists
      const base = deriveBaseKeyForLocker(poolAddress);
      const escrow = deriveEscrow(base);
      const escrowAccount = await connection.getAccountInfo(escrow);

      if (!escrowAccount) {
        console.log("Locker not found, creating locker...");
        const createLockerTx = await client.migration.createLocker({
          virtualPool: poolAddress,
          payer: payer.publicKey,
        });

        const { blockhash: lockerBlockhash } =
          await connection.getLatestBlockhash("confirmed");
        createLockerTx.recentBlockhash = lockerBlockhash;
        createLockerTx.feePayer = payer.publicKey;

        const lockerSignature = await sendAndConfirmTransaction(
          connection,
          createLockerTx,
          [payer],
          { commitment: "confirmed" }
        );

        console.log(`Locker created successfully!`);
        console.log(`Transaction: https://solscan.io/tx/${lockerSignature}`);
      } else {
        console.log("Locker already exists, skipping creation");
      }
    } else {
      console.log("No locked vesting found, skipping locker creation");
    }

    // migrate to DAMM V2
    console.log("Migrating to DAMM V2...");
    if (virtualPoolState.account.isMigrated === 0) {
      const migrateTx = await client.migration.migrateToDammV2({
        payer: payer.publicKey,
        virtualPool: poolAddress,
        dammConfig: dammConfigAddress,
      });

      const { blockhash: migrateBlockhash } =
        await connection.getLatestBlockhash("confirmed");
      migrateTx.transaction.recentBlockhash = migrateBlockhash;
      migrateTx.transaction.feePayer = payer.publicKey;

      const migrateSignature = await sendAndConfirmTransaction(
        connection,
        migrateTx.transaction,
        [
          payer,
          migrateTx.firstPositionNftKeypair,
          migrateTx.secondPositionNftKeypair,
        ],
        { commitment: "confirmed" }
      );

      console.log(`Migration to DAMM V2 completed successfully!`);
      console.log(`Transaction: https://solscan.io/tx/${migrateSignature}?`);
    } else {
      console.log("Pool already migrated to DAMM V2");
    }
  } catch (error) {
    console.error("Failed to migrate to DAMM V2:", error);
  }
}

migrateToDammV2()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
