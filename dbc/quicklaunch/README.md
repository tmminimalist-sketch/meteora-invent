# Dynamic Bonding Curve Quicklaunch

The Dynamic Bonding Curve Quicklaunch provides a simple way to launch tokens when using the default setup or an existing config key.


## Getting Started


1. Change directory to the `dbc` folder

```bash
cd meteora-studio/dbc
```

2. Copy `.env.example` file and add your private key and RPC URL into .env (RPC is optional but highly encouraged. Visit `https://www.helius.dev/` to get an RPC URL)

Note: Private key owner will be the owner of the token
```bash
cp .env.example .env
```

3. Install dependencies

```bash
npm install
```

4. Edit the token name, ticker and image in the [quicklaunch script](src/index.ts). If you want to use a custom config key, edit `configKey' to your custom key

5. Run the script to launch a token

```bash
npm run dbc
```


