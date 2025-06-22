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


  

1. Change directory to the `damm` folder

```bash
cd  meteora-studio/dlmm
```


2. Install dependencies
  

```bash
npm  install
```

3.  (optional) Copy `.env.example` file and add your RPC URL into .env (RPC is optional but highly encouraged. Visit `https://www.helius.dev/` to get an RPC URL)


```bash
cp  .env.example  .env
```

4. Enter your pool details into the script

- [Get Active Bin](./src/get-active-bin.ts)

Enter pool address into `poolAddress`


- [Get Positions](./src/get-positions-list.ts)

Enter pool address into `poolAddress`  and wallet address into `userPublicKey`

5. Run the script to create the position

- To get active bins

```bash
npm run get-active-bin
```

 

- To get positions

```bash
npm run get-positions-list    
```