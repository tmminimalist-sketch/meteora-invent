
# Claim and check fees

  

This folder contains scripts for checking and claiming unclaimed fees in a **Meteora DAMM V1 pool**.

  
## Scripts

## Check Unclaimed Fees

Checks for any unclaimed fees by owner of a position
- [Check Fees](./src/get-lock-fees.ts)
  

## Claim Unclaimed Fees

Claims any unclaimed fees by owner of a position

- [Claim Fees](./src/claim-lock-fees.ts)

  

## Getting Started

1. Change directory to the `claim-fees` folder

  

  

```bash
cd  meteora-studio/damm/claim-fees
```

  
2. Install dependencies

```bash
npm  install
```
  

3. Copy `.env.example` file and add your private key and RPC URL into .env (RPC is optional but highly encouraged. Visit `https://www.helius.dev/` to get an RPC URL)

Note that private key is not needed for get-lock-fees

```bash
cp  .env.example  .env
```

4. Edit the script

- [Check Fees](./src/get-lock-fees.ts)
Enter the public key of the owner of the position and the pool address into the [script](./src/get-lock-fees.ts) 

  
- [Claim Fees](./src/claim-lock-fees.ts)
Enter the position's owners private key into the .env file if the owner is not the payer
Enter the receivers public key and pool address into the [script](./src/claim-lock-fees.ts) if receiver is not owner

  

5. Run the scripts

- To check the fees from a pool:

```bash
npm  run  get-lock-fees
```

  

- To claim the fees:

  

```bash
npm  run  claim-lock-fees
```