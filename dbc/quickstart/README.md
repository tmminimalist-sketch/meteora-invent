

# Dynamic Bonding Curve Quickstart

  

The Dynamic Bonding Curve Quickstart repository provides a foundational understanding of how the Dynamic Bonding Curve operates. Within the quickstart folder, you'll learn how to create a configuration key and launch a token pool on Solana.

  

## Getting Started

1. For a basic default launch, edit token params in examples/basic.ts

  

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

  

2. Run the script to launch a token


```bash

npm run quickstart

```