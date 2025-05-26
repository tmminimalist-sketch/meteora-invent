import {
  ActivationType,
  CollectFeeMode,
  FeeSchedulerMode,
  MigrationFeeOption,
  MigrationOption,
  TokenDecimal,
  TokenType,
} from "@meteora-ag/dynamic-bonding-curve-sdk";
import { NATIVE_MINT } from "@solana/spl-token";

export const quoteMint = NATIVE_MINT; // new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") (for USDC)

export const configKeyParams = {
    totalTokenSupply: 1000000000,
    initialMarketCap: 50,
    migrationMarketCap: 100,
    migrationOption: MigrationOption.MET_DAMM_V2,
    tokenBaseDecimal: TokenDecimal.SIX,
    tokenQuoteDecimal: TokenDecimal.NINE, // TokenDecimal.SIX (for USDC)
    lockedVestingParam: {
      totalLockedVestingAmount: 100000000,
      numberOfVestingPeriod: 365,
      cliffUnlockAmount: 0,
      totalVestingDuration: 365 * 24 * 60 * 60 / 0.4,
      cliffDurationFromMigrationTime: 0
    },
    feeSchedulerParam: {
      startingFeeBps: 5000,
      endingFeeBps: 100,
      numberOfPeriod: 100,
      totalDuration: 1800 / 0.4,
      feeSchedulerMode: FeeSchedulerMode.Exponential
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
    leftover: 0

}

export const tokenParams = {
  name: "Moon Token",
  symbol: "MOON",
  uri: "https://i.pinimg.com/736x/9b/80/f6/9b80f613d125c9efd816d0be243aa1c0.jpg",
}

