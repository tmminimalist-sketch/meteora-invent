// believe fee scheduler
// 90% to 2% 
// 100s <= x <= 300s
// @meteora-ag/dynamic-bonding-curve@v1.2.4

import {
    ActivationType,
    CollectFeeMode,
    MigrationFeeOption,
    MigrationOption,
    TokenDecimal,
    TokenType,
    TokenUpdateAuthorityOption,
    BaseFeeMode,
    buildCurveWithMarketCap,
    BuildCurveWithMarketCapParam
} from "@meteora-ag/dynamic-bonding-curve-sdk";
import { NATIVE_MINT } from "@solana/spl-token";

export const tokenParams = {
  totalTokenSupply: 1000000000,
  tokenBaseDecimal: TokenDecimal.SIX,
  name: "PUMP IT Token",
  symbol: "PUMP",
  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgk7EaZ4MxetCM1IB2B8z0MFJZg8IOn8AcMw&s",
};

export const quoteMint = NATIVE_MINT;

export const configKeyParams: BuildCurveWithMarketCapParam = {
    totalTokenSupply: tokenParams.totalTokenSupply,
    initialMarketCap: 23,
    migrationMarketCap: 395,
    migrationOption: MigrationOption.MET_DAMM_V2,
    tokenBaseDecimal: TokenDecimal.NINE,
    tokenQuoteDecimal: TokenDecimal.NINE,
    lockedVestingParam: {
      totalVestingDuration: 0,
      cliffDurationFromMigrationTime: 0,
      numberOfVestingPeriod: 0,
      cliffUnlockAmount: 0,
      totalLockedVestingAmount: 0,
    },
    baseFeeParams: {
      baseFeeMode: BaseFeeMode.FeeSchedulerExponential,
      feeSchedulerParam: {
        startingFeeBps: 9000,
        endingFeeBps: 200,
        numberOfPeriod: 150,
        totalDuration: 100 / 0.4, // Default is 100 seconds
      },
    },
    dynamicFeeEnabled: true,
    activationType: ActivationType.Slot,
    collectFeeMode: CollectFeeMode.OnlyQuote,
    migrationFeeOption: MigrationFeeOption.FixedBps200,
    tokenType: TokenType.SPL,
    partnerLpPercentage: 0,
    creatorLpPercentage: 0,
    partnerLockedLpPercentage: 50,
    creatorLockedLpPercentage: 50,
    creatorTradingFeePercentage: 50,
    leftover: 0,
    migrationFee: {
      feePercentage: 0,
      creatorFeePercentage: 0,
    },
    tokenUpdateAuthority: TokenUpdateAuthorityOption.Immutable,
};
  
