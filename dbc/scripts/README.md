# Dynamic Bonding Curve Scripts

  

This folder contains scripts for interacting with Meteora's Dynamic Bonding Curve.

  
  
  # Scripts

## Create a DBC Config

Takes launch parameters and creates a config key.

- [Create a DBC Config](./src/create-config.ts)

  

## Create Partner Metadata

  For partners to create their metadata to be indexed by integrators and to claim fees.

- [Create Partner Metadata](./src/create-partner-metadata.ts)

  

## Create a DBC Pool

  Launches token with config key and token parameters

- [Create a DBC Pool](./src/create-pool.ts)

  

## Migrate to DAMM V1

  
Migrates DBC pool to DAMM V1 if migration quote threshold is met.
- [Migrate to DAMM V1](./src/migrate-to-damm-v1.ts)

  

## Migrate to DAMM V2

  
Migrates DBC pool to DAMM V2 if migration quote threshold is met.
- [Migrate to DAMM V2](./src/migrate-to-damm-v2.ts)

  

## Swap Buy

  
Buys token in DBC pool.
- [Swap Buy](./src/swap-buy.ts)

  

## Swap Quote

  
Gets quote for token in DBC pool.
- [Swap Quote](./src/swap-quote.ts)

  

## Simulate Curve

  Creates and launches a new token with bonding curve parameters and a config key.
- [Simulate Curve](./src/simulate-curve.ts)

  
  
  

## Getting Started

  
1. Change directory to the `meteora-studio/dbc` folder

```bash

cd  meteora-studio/dbc

```

2. Install dependencies

```bash

npm  install

```

3. Copy `.env.example` file and add your private key and RPC URL into the [env file](./../.env) (RPC is optional but highly encouraged. Visit `https://www.helius.dev/` to get an RPC URL)

```bash

cp  .env.example  .env

```

4. Edit the script
- [Create a DBC Config](./src/create-config.ts)
	Edit `curveConfig`  to match your parameters

- [Create Partner Metadata](./src/create-partner-metadata.ts)
		Edit `createPartnerMetadataParam` to match your project details
		
	Edit `POOL_CREATOR_PRIVATE_KEY` in the [env file]( ./../env) if pool creator address is not payer address
		
- [Create a DBC Pool](./src/create-pool.ts)
	Enter your config key into  `configAddress` 
	
	Edit `POOL_CREATOR_PRIVATE_KEY` in the [env file]( ./../env) if pool creator address is not payer address
	
- [Migrate to DAMM V1](./src/migrate-to-damm-v1.ts) and [Migrate to DAMM V2](./src/migrate-to-damm-v2.ts)

	Enter your token address into  `baseMint` 
	
	

- [Swap Buy](./src/swap-buy.ts) and  [Swap Quote](./src/swap-quote.ts)
	Enter the token address into `baseMint` and edit `amountIn`  to the amount you want to buy.
		To sell the token instead, change `swapBaseForQuote` to true
		
- [Simulate Curve](./src/simulate-curve.ts)
	Edit `curveConfig` and `liquidityWeights` to match your launch parameters

	
5. Run the script

```bash

npm run <file-name>

# scripts:
#create-config
#create-partner-metadata
#create-pool
#migrate-to-damm-v1
#migrate-to-damm-v2
#simulate-curve
#swap-buy
#swap-quote
```