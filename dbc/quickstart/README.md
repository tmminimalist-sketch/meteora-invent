

# Dynamic Bonding Curve Quickstart

  

The Dynamic Bonding Curve Quickstart repository provides a foundational understanding of how the Dynamic Bonding Curve operates. Within the quickstart folder, you'll learn how to create a configuration key and launch a token pool on Solana.

  

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

4. For a basic default launch, edit token params in examples/basic.ts

  

Edit `tokenParams` which includes:

- Token name

- Token symbol

- Token URI (image)

- Token supply

- Token decimal

  

For more complex launches, edit the launch params:

  

Edit `configKeyParams` which includes:

- Initial and migration market cap

- Vest and cliff params

- Fee scheduler params

- Activation type

- Creator and Partner LP

  

To read more about the lauch params, visit [DBC Docs](https://docs.meteora.ag/product-overview/dynamic-bonding-curve-dbc-overview/customizable-pool-configuration)

  

5. Run the script to launch a token


```bash

npm run quickstart

```