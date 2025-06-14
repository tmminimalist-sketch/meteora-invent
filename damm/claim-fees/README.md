# Claim and check fees

 This folder contains scripts for checking and claiming unclaimed fees in a **Meteora DAMM V1 pool**.

## Check Unclaimed Fees
 [Check Fees](./src/get-lock-fees.ts)


## Claim Unclaimed Fees
 [Claim Fees](./src/claim-lock-fees.ts)

## Getting Started

  

1. Clone the repository

 
```bash

git  clone  https://github.com/MeteoraAg/meteora-studio.git

```

  

2. Change directory to the `claim-fees` folder

  

```bash

cd  meteora-studio/damm/claim-fees

```

  

3. Copy `.env.example` file and add your private key and RPC URL into .env (RPC is optional but highly encouraged. Visit `https://www.helius.dev/` to get an RPC URL)

Note that private key is not needed for get-lock-fees

```bash

cp  .env.example  .env

```

  

4. Install dependencies

  

```bash

npm  install

```

  

5. Enter the pool details into the script

For get-lock-fees:
Enter the public key of the owner of the position and the pool address into the [script](./src/get-lock-fees.ts)

For claim-lock-fees:
Enter the position's owners private key into the .env file if the owner is not the payer
Enter the receivers public key and pool address into the [script](./src/claim-lock-fees.ts)

6. Run the scripts
    
-   To check the fees from a pool:
    
```bash
npm run get-lock-fees
```

-   To claim the fees:

```bash
npm run claim-lock-fees
```