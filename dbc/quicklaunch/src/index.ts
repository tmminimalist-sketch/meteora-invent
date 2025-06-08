import {
    buildCurveWithMarketCap,
    DynamicBondingCurveClient,
  } from "@meteora-ag/dynamic-bonding-curve-sdk";
  import bs58 from "bs58";
  import {
    Connection,
    Keypair,
    sendAndConfirmTransaction,
    PublicKey,
  } from "@solana/web3.js";
  import "dotenv/config";
import "dotenv/config";

const WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!WALLET_PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
}
const walletSecretKey = bs58.decode(WALLET_PRIVATE_KEY);
const wallet = Keypair.fromSecretKey(walletSecretKey);

const connection = new Connection(
    process.env.RPC_URL || "https://api.mainnet-beta.solana.com"
);


async function main() {
    const tokenParams = {
        name: "PUMP IT Token",
        symbol: "PUMP",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgk7EaZ4MxetCM1IB2B8z0MFJZg8IOn8AcMw&s",
    };

    const client = new DynamicBondingCurveClient(connection, "confirmed");

    const configKey = new PublicKey('6ZjAF1MqbWZ4cCHGqpAMAZbUBi5KnAZDTDT6nXEA5iYZ')

    const start = tokenParams.symbol.slice(0, 3);
    let baseMint: Keypair;

    if (!/^[a-zA-Z0-9]+$/.test(start)) {
        while (true) {
        const keypair = Keypair.generate();
        if (keypair.publicKey.toBase58().slice(0, 3) === start) {
            baseMint = keypair;
            break;
        }
        }
    } else {
        baseMint = Keypair.generate();
    }


    const createPoolTx = await client.pool.createPool({
        ...tokenParams,
        config: configKey,
        baseMint: baseMint.publicKey,
        payer: wallet.publicKey,
        poolCreator: wallet.publicKey,
    });

    const createPoolSignature = await sendAndConfirmTransaction(
        connection,
        createPoolTx,
        [wallet, baseMint, wallet],
        {
        commitment: "confirmed",
        skipPreflight: true,
        }
    );
    console.log(`Generated base mint: ${baseMint.publicKey.toString()}`);
    console.log(`Transaction: https://solscan.io/tx/${createPoolSignature}`);
    console.log(
        `Trade on Jup Pro: https://jup.ag/tokens/${baseMint.publicKey.toString()}`
    );
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
  