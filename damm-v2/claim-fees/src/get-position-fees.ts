import {
  Connection,
  PublicKey,
} from "@solana/web3.js";
import { getMint } from "@solana/spl-token";
import {
  CpAmm,
  getTokenProgram,
  getUnClaimReward,
} from "@meteora-ag/cp-amm-sdk";
import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(process.cwd(), "../.env") });  
  
  const connection = new Connection(
      process.env.RPC_URL || "https://api.mainnet-beta.solana.com"
  );
  
  
  
async function checkPositionFee() {
  
    // Variables to be configured
    const poolAddress = new PublicKey("");
    const owner = new PublicKey("");

    //
  
    const cpAmm = new CpAmm(connection);
    try {
      // get pool state
      const poolState = await cpAmm.fetchPoolState(poolAddress); // DAMM V2 pool ad
      // adress (can use deriveDAMMV2PoolAddress)
      // get position address for the user
      const tokenAMint = poolState.tokenAMint;
      const tokenBMint = poolState.tokenBMint;
      const tokenAData = await getMint(connection, tokenAMint);
      const tokenBData = await getMint(connection, tokenBMint);
      const userPositions = await cpAmm.getUserPositionByPool(
        poolAddress, // DAMM V2 pool address (can use deriveDAMMV2PoolAddress)
        owner // user wallet address
      );
      if (userPositions.length === 0) {
        console.log("No positions found for this user.");
        return;
      }
      const positionState = await cpAmm.fetchPositionState(
        userPositions[0].position
      );
      const unClaimedReward = getUnClaimReward(poolState, positionState);
      console.log(tokenAMint.toBase58(), unClaimedReward.feeTokenA.toNumber() / 10 ** tokenAData.decimals);
      console.log(tokenBMint.toBase58(), unClaimedReward.feeTokenB.toNumber() / 10 ** tokenBData.decimals);
    } catch (error) {
      console.error("Error:", error);
    }
}

checkPositionFee();