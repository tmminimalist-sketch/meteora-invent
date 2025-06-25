# Managing DLMM Position

## Scripts


## Add Balanced Liquidity

Adds an balanced amount of liquidity into a DLMM position
- [Add Balanced Liquidity](./src/add-balanced-liquidity.ts)

## Add Imbalanced Liquidity

Adds an imbalanced amount of liquidity into a DLMM position
- [Add Imbalanced Liquidity](./src/add-imbalanced-liquidity.ts)
  



## Getting Started

1. Enter the pool address, the amount of liquidity you want to add, and the range

Enter the pool address into `poolAddress` 

Enter the number of token X that is being added into
`totalXAmount` and the decimal of token X into `X_DECIMALS`

If creating imbalanced position, enter the number of token Y that is being added into
`totalYAmount` and the decimal of token Y into `Y_DECIMALS`

Enter the  existing positions address into `existingPositionPubkey` 

Change the range in which the liquidity should be deposited by editing `minBinId` and `maxBinId`

Edit `strategyType` to change the way liquidity is deposited


2. Run the script to add liquidity

To add balanced liquidity

```bash
npm run dlmm-add-balanced-liquidity
```

To add imbalanced liquidity

```bash
npm run dlmm-add-imbalanced-liquidity
```
