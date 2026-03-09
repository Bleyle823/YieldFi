# **MEMEVELLI: Autonomous Capital Agents**

![Memevelli Banner](./memevelli_banner_1773063048752.png)

## **Build autonomous agents that move capital across chains**

AI agents are becoming the new users of crypto. They trade, they farm yield, they rebalance portfolios, and they execute strategies faster and more consistently than humans ever could.

**Memevelli** is an autonomous agent framework powered by [ElizaOS](https://github.com/elizaos/eliza) and [LI.FI](https://li.fi/), designed to move capital across chains, protocols, and ecosystems through a single unified interface.

bun run ./packages/cli/dist/index.js start --character characters/alpha.json characters/beta.json characters/gamma.json

---

## **Objective**
The goal of Memevelli is to provide a working template for an AI agent that uses **LI.FI** to execute real on-chain strategies. Memevelli doesn't just call a swap endpoint; it actively uses LI.FI as part of its autonomous execution loop to:
- **Move funds** across chains to follow the most viral narratives.
- **Execute trades** on meme coins across Arbitrum, Base, BSC, and more.
- **Rebalance portfolios** based on real-time sentiment analysis and alpha signals.

---

## **Key Capabilities (Powered by LI.FI)**

Memevelli integrates the LI.FI SDK directly into the agent's decision-making process via custom actions:

### 🔄 **LIFI_EXECUTE_BRIDGE**
Allows the agent to move USDC across any supported chain. If the agent detects a hot narrative on Base but its funds are on Arbitrum, it will automatically bridge the capital to where the action is.
- *Example:* "Bridge 0.5 USDC from Base to Arbitrum"

### 🚀 **LIFI_EXECUTE_BUY**
Enables the agent to purchase meme tokens on any target chain using its current holdings. The agent calculates the best route via LI.FI to minimize slippage and gas costs.
- *Example:* "Buy $WIF on BSC" or "The PEPE narrative is heating up, buy some."

### 📊 **LIFI_CHECK_BALANCE**
Provides the agent with real-time visibility into its multichain holdings, allowing it to make informed allocations.

---

## **Why LI.FI?**
LI.FI gives Memevelli-powered agents the ability to navigate the fragmented liquidity of the multichain world. By using the **LI.FI SDK**, Memevelli-powered agents can:
- Source liquidity from over 30+ DEXs.
- Access 14+ Bridges.
- Support 20+ Chains.
- Handle complex cross-chain swaps in a single transaction.

---

## **Getting Started**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v23+)
- [Bun](https://bun.sh/)
- A private key for a burner wallet with some gas (Base, ARB, etc.)

### **Installation**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Bleyle823/Memevelli.git
   cd Memevelli
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and fill in:
   - `OPENAI_API_KEY` (or your preferred LLM provider)
   - `WALLET_PRIVATE_KEY` (Your agent's wallet)
   - `WALLET_ADDRESS` (Your agent's public address)
   - `LIFI_API_KEY` (Optional, for higher rate limits)

4. **Launch the Agent:**
   ```bash
   bun run ./packages/cli/dist/index.js start --character characters/alpha.json
   ```

---

## **Vibeathon Submission Requirements**

### 1. **Working Agent**
Memevelli is a fully functional agent capable of cross-chain execution. You can verify this by running the test script:
```bash
bun exec scripts/test-lifi-final.ts
```

### 2. **Execution Video**
The submission video for Memevelli demonstrates:
- The agent parsing a narrative-driven prompt.
- Identifying the need for cross-chain movement.
- Executing a bridge/swap via LI.FI.
- Confirming the transaction on-chain.

---

## **Technical Architecture**
Memevelli extends the ElizaOS framework with a specialized `@elizaos/plugin-lifi`. This plugin leverages the `LiFiService` to interact with the LI.FI SDK, ensuring typed, safe, and efficient multichain operations.

- **Plugin Path:** `packages/plugin-lifi/`
- **Core Actions:** `executeBuy.action.ts`, `executeBridge.action.ts`, `checkBalance.action.ts`
- **Service:** `service.ts`

---

Built for the **LI.FI Vibeathon** | March 9th, 2026
