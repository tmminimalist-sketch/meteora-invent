# Create DLMM Position

## Scripts


## Create Balanced Position

Adds an balanced amount of liquidity into a DLMM position
- [Create Balanced Position](./src/create-balanced-position.ts)

## Create Imbalanced Position

Creates a DLMM position with imbalanced values of tokens
- [Create Imbalanced Position](./src/create-imbalanced-position.ts)
  



## Getting Started

1. Enter the pool address, the amount of liquidity you want to add, and the range

    Enter the pool address into `poolAddress` 

    Enter the number of token X that is being added into
    `XAmount` and the decimal of token X into `XDecimals`

    If creating imbalanced position, enter the number of token Y that is being added into
    `YAmount` and the decimal of token Y into `YDecimals`

    Change the range in which the liquidity should be deployed by editing `totalRangeInterval`, which determines the number of bins on each side of the active bin in which liquidity will be deployed

    Edit `strategyType` to change the way liquidity is deposited


2. Run the script to create the position

    - To create balanced position

    ```bash
    npm run create-balanced-position
    ```

    - To create imbalanced position

    ```bash
    npm run create-imbalanced-position
    ```