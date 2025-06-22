

  

# Creating DAMM V1 pool




## Getting Started


  

1. Change directory to the `damm` folder

```bash
cd  meteora-studio/damm
```


2. Install dependencies
  

```bash
npm  install
```

3. Copy `.env.example` file and add your private key and RPC URL into .env (RPC is optional but highly encouraged. Visit `https://www.helius.dev/` to get an RPC URL)

```bash
cp  .env.example  .env
```

4. Enter your pool details into [create pool script](create-pool/src/constant-product.ts)


Enter the token addresses into `tokenAMint` and `tokenBMint`

Example: Creating a SOL-USDC pool
```typescript
const  tokenAMint  =  new  PublicKey("So11111111111111111111111111111111111111112")
const  tokenBMint  =  new  PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
```

Enter your configuration address for the pool
  

Go to https://amm-v2.meteora.ag/swagger-ui/#/pools/get-all-pool-configs to get one or create one

  

Note that you must have permission to use some addresses.

  

  

To find a permissionless address, look for "pool_creator_authority": "11111111111111111111111111111111" in the config

  

  

Each configuration address can be used to create only one pool per unique token pair.

  

Consider finding another config key or creating your own if the pair is common. e.g SOL-USDC

  

  

Edit the amount you want to deposit into the pool

  

Example: Depositing 100 USDC and 0.6 SOL into the DAMM

```typescript
const  tokenAAmount  =  new  BN(100  *  10  **  6);
const  tokenBAmount  =  new  BN(0.6  *  10  **  9);
```

5. Run the script to create the pool

```bash
npm  run  create-constant-product-pool
```