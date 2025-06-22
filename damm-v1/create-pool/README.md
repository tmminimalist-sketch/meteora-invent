
# Creating DAMM V1 pool

This folder contains the script to create a **Meteora DAMM V1 pool**.

## Getting Started

1. Enter your pool details into [create pool script](./src/constant-product.ts)

Input the address of token A and B into `tokenAMint` and `tokenBMint`

Enter your configuration address for the pool into `config`

Enter the amount of token A into `tokenAAmount` and amount of token B into `tokenBAmount`

Enter the decimal of token A into `tokenADecimals` and decimal of token B into `tokenBDecimals`
  
Go to https://amm-v2.meteora.ag/swagger-ui/#/pools/get-all-pool-configs to get a config.

Note that you must have permission to use some addresses.

To find a permissionless address, look for "pool_creator_authority": "11111111111111111111111111111111" in the config

Each configuration address can be used to create only one pool per unique token pair.

Find another config key if the pair is common. e.g SOL-USDC

Edit the amount you want to deposit into the pool

2. Run the script to create the pool

```bash
npm  run  create-constant-product-pool
```