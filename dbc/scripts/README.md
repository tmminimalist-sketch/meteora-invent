# Dynamic Bonding Curve Scripts

This folder contains scripts for interacting with Meteora's Dynamic Bonding Curve.

## Create a DBC Config

- [Create a DBC Config](./src/create-config.ts)

## Create Partner Metadata (to be indexed by integrators)

- [Create Partner Metadata](./src/create-partner-metadata.ts)

## Create a DBC Pool

- [Create a DBC Pool](./src/create-pool.ts)

## Migrate to DAMM V1

- [Migrate to DAMM V1](./src/migrate-to-damm-v1.ts)

## Migrate to DAMM V2

- [Migrate to DAMM V2](./src/migrate-to-damm-v2.ts)

## Swap Buy

- [Swap Buy](./src/swap-buy.ts)

## Swap Quote

- [Swap Quote](./src/swap-quote.ts)

## Simulate Curve

- [Simulate Curve](./src/simulate-curve.ts)



## Getting Started

1. Clone the repository

```bash
git clone https://github.com/MeteoraAg/meteora-studio.git
```

2. Change directory to the `dbc/scripts` folder

```bash
cd meteora-studio/dbc/scripts
```

3. Copy `.env.example` file and add your private key and RPC URL into .env (RPC is optional but highly encouraged. Visit `https://www.helius.dev/` to get an RPC URL)

```bash
cp .env.example .env
```

For create-partner-metadata, set the PARTNER_PRIVATE_KEY in the .env file if PARTNER_PRIVATE_KEY is not PAYER_PRIVATE_KEY.

For create-pool, set the POOL_CREATOR_PRIVATE_KEY in the .env file if POOL_CREATOR_PRIVATE_KEY is not PAYER_PRIVATE_KEY.

4. Install dependencies

```bash
npm install
```

5. Run the examples

```bash
npm run <file-name>
# e.g. npm run create-config
```

