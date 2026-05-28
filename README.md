# DocVault Backend

This backend scaffold is based on the `DocVault Backend PRD` and provides:

- `POST /auth/signup`
- `POST /nft/mint`
- `GET /nft/wallet/:address`

## Stack

- Node.js
- Express
- TypeScript
- MongoDB with Mongoose
- Zod validation

## Folder Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    types/
    utils/
    validators/
    app.ts
    server.ts
```

## Provider Mode

The code runs in `mock` mode by default so the core service flow is implemented and testable without real Web3 credentials. Provider adapters are abstracted behind interfaces so you can later swap in:

- Privy for user + wallet provisioning
- NFT.Storage or Pinata for IPFS metadata uploads
- Alchemy plus your ERC-721 contract for minting and wallet NFT retrieval

## Local Setup

1. Copy `.env.example` to `.env`
2. Install dependencies with `npm install`
3. Start MongoDB
4. Run `npm run dev`

## Authentication for MVP

The mint endpoint is protected with a simple `x-user-id` header lookup against MongoDB. This keeps the route authenticated at the app level now, and gives you a clear replacement point for real auth middleware later.

## Example Requests

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "Ada Lovelace"
}
```

```http
POST /nft/mint
Content-Type: application/json
x-user-id: <mongo-user-id>

{
  "documentId": "doc-001",
  "title": "Employment Contract",
  "description": "Signed master copy",
  "documentHash": "sha256:123",
  "attributes": [
    { "trait_type": "category", "value": "legal" }
  ]
}
```
# FortiFile-Backend
