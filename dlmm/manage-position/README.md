# Managing DLMM Position

## Scripts


## Add Balanced Liquidity

Adds an balanced amount of liquidity into a DLMM position
- [Add Balanced Liquidity](./src/add-balanced-liquidity.ts)

## Add Imbalanced Liquidity

Adds an imbalanced amount of liquidity into a DLMM position
- [Add Imbalanced Liquidity](./src/add-imbalanced-liquidity.ts)
  



## Getting Started


  

1. Change directory to the `damm` folder

```bash
cd  meteora-studio/dlmm
```


2. Install dependencies
  

```bash
npm  install
```

3. Copy `.env.example` file and add your private key and RPC URL into .env (RPC is optional but highly encouraged. Visit `https://www.helius.dev/` to get an RPC URL)

```bash
cp  .env.example  .env
```

4. Enter the pool address, the amount of liquidity you want to add, and the range

Enter the pool address into `poolAddress` 

Enter the number of token X that is being added into
`totalXAmount` and the decimal of token X into `X_DECIMALS`

If creating imbalanced position, enter the number of token Y that is being added into
`totalYAmount` and the decimal of token Y into `Y_DECIMALS`

Enter the  existing positions address into `existingPositionPubkey` 

Change the range in which the liquidity should be deposited by editing `minBinId` and `maxBinId`

Edit `strategyType` to change the way liquidity is deposited


5. Run the script to create the pool

```bash
npm  run <file-name>

#scripts
#add-balanced-liquidity
#add-imbalanced-liquidity
```
