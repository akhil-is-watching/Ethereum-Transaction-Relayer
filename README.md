# Ethereum Transaction Relayer

This Ethereum transaction relayer is a tool designed to relay Ethereum transactions. It is particularly useful for developers and users who need to submit transactions to the Ethereum network but want to do so through a trusted, centralized intermediary.

## How it works

The Ethereum transaction relayer works by taking transactions from a user, signing them with its own private key, and broadcasting them to the Ethereum network. Users can submit their transactions to the relayer through an API, and the relayer will take care of the rest.

To ensure the security of the relayer, it uses multiple layers of encryption and authentication. Each user is assigned a unique API key, which they must use to submit transactions. The API key is encrypted using industry-standard encryption algorithms, and the relayer also uses SSL/TLS encryption to secure all data transmissions.

## Getting Started

To get started with the Ethereum transaction relayer, you will need to do the following:

1. Clone this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Set the required environment variables (see below).
4. Start the server using `npm start`.

## Environment Variables

The Ethereum transaction relayer requires the following environment variables:

- `TEST`: Your Infura API key. You can sign up for one [here]().


To set these environment variables, you can create a `.env` file in the root directory of the project, and add the variables in the following format:

 - PRIVATE_KEY=your-private-key-here
 -  INFURA_KEY=your-infura-key-here
 -  API_KEY=your-api-key-here



Make sure to replace the values with your own keys.

## API Endpoints

The Ethereum transaction relayer exposes the following API endpoints:

- `POST /api/v1/relay`: Submit a transaction to be relayed. Requires the `API_KEY` header to be set to your API key. The request body should contain a JSON object with the following fields:
  - `to`: The address of the recipient.
  - `value`: The amount of Ether to send, in wei.
  - `speed`: The gas price to use, in wei.
  - `data`: Optional data to include with the transaction.
  
The response will contain the unique transaction ID if successful, or an error message if unsuccessful.

## Conclusion

The Ethereum transaction relayer is a useful tool for developers and users who need to submit transactions to the Ethereum network securely and reliably. It provides multiple layers of encryption and authentication to ensure the security of your transactions.