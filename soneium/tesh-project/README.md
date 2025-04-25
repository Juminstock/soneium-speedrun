# Astar Savings App

A Next.js application for staking and earning rewards with Astar Network.

## Features

- Connect wallet using Privy
- Stake funds and earn rewards
- View staking dashboard with rewards projections
- Withdraw funds with different options

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Privy App ID:
   ```
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Wallet Connection

This application uses [Privy](https://www.privy.io/) for wallet connection. The implementation allows users to:

- Connect their wallets securely
- Use email or wallet-based authentication
- View their connected wallet address
- Disconnect their wallet

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Privy SDK for wallet connection
- Shadcn UI components

## License

MIT 