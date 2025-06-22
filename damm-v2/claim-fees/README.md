# Claim and check fees


This folder contains scripts for checking and claiming unclaimed fees in a **Meteora DAMM V2 pool**.

  
## Scripts

## Check Unclaimed Fees

Checks for any unclaimed fees by owner of a position
- [Check Fees](./src/get-lock-fees.ts)
  

## Claim Unclaimed Fees

Claims any unclaimed fees by owner of a position

- [Claim Fees](./src/claim-lock-fees.ts)

  

## Getting Started


1. Edit the script

- [Check Fees](./src/get-position-fees.ts)
Enter the public key of the owner of the position and the pool address into the [script](./src/get-position-fees.ts) 

  
- [Claim Fees](./src/claim-position-fees.ts)
Enter the position's owners private key into the .env file if the owner is not the payer
Enter the receivers public key and pool address into the [script](./src/claim-position-fees.ts) if receiver is not owner

  

2. Run the scripts

- To check the fees from a pool:

```bash
npm  run  get-position-fees
```

- To claim the fees:


```bash
npm  run  claim-position-fees
```