This repo is already setup for use (The user will be requested to create associated token account (in this example this is paid for by us but the user will pay for this to eliminate this security risk)

yarn install

yarn start

The accounts.ts file can be modified to include your sol address

the data.rs file can modified to inlcude your sol address (This is the set of addresses stored on chain that eligible to claim) 

In tests folder spec_0 and spec_3 can be run

spec_0 creates the program authority account

spec_3 tests address eligibility and claim

This app uses the phantom wallet and is using solana devnet
