# Retrieving DLMM Position

This folder contains the scripts to help retrieve the state of DLMM pools and DLMM positions.

## Scripts


## Get Active Bin

Retrieves the active bin ID and the price

- [Get Active Bin](./src/get-active-bin.ts)

 ## Get Positions 

Retrieves positions by wallet

- [Get Positions](./src/get-positions-list.ts)



## Getting Started


1. Enter your pool details into the script

- [Get Active Bin](./src/get-active-bin.ts)

Enter pool address into `poolAddress`


- [Get Positions](./src/get-positions-list.ts)

Enter pool address into `poolAddress`  and wallet address into `userPublicKey`

2. Run the script to create the position

- To get active bins

```bash
npm run get-active-bin
```

 

- To get positions

```bash
npm run get-positions-list    
```