
import { AgentRuntime } from '../packages/core/src/runtime';
import { lifiPlugin } from '../packages/plugin-lifi/src/plugin';
import { LiFiService } from '../packages/plugin-lifi/src/service';
import { randomUUID } from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

// Mock Database Adapter
const mockAdapter: any = {
    init: async () => { },
    getMemories: async () => [],
    createMemory: async () => { },
    getAccount: async () => null,
    createAccount: async () => true,
    getRoom: async () => null,
    createRoom: async () => randomUUID(),
    log: async () => { },
    getKnowledge: async () => [],
    addKnowledge: async () => { },
    removeKnowledge: async () => { },
    clearKnowledge: async () => { },
    getGoals: async () => [],
    updateGoal: async () => { },
    createGoal: async () => { },
    removeGoal: async () => { },
    removeAllGoals: async () => { },
    getRelationships: async () => [],
    getRelationship: async () => null,
    createRelationship: async () => true,
    getParticipantsForAccount: async () => [],
    getParticipantsForRoom: async () => [],
    getAvailableRooms: async () => [],
};

async function testActions() {
    const runtime = new AgentRuntime({
        character: {
            name: 'Alpha',
            plugins: [lifiPlugin as any],
            settings: {
                secrets: {
                    WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY!,
                    LIFI_API_KEY: process.env.LIFI_API_KEY || ''
                }
            }
        },
        settings: {
            WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY!,
            LIFI_API_KEY: process.env.LIFI_API_KEY || ''
        }
    });

    // Manually register adapter and services to bypass initialize requirement
    (runtime as any).databaseAdapter = mockAdapter;

    // Explicitly init plugin
    await lifiPlugin.init!({}, runtime);

    let service = runtime.services ? runtime.services.get(LiFiService.serviceType) as LiFiService : undefined;
    if (!service) {
        service = await LiFiService.start(runtime);
    }
    runtime.getService = ((type: string) => {
        if (type === LiFiService.serviceType || type === 'lifi') return service;
        return undefined;
    }) as any;

    console.log('--- Testing LIFI_EXECUTE_BUY ---');
    // This will likely fail in getQuote/executeRoute because 0.5 USDC is too small
    // but we want to see a PROPER error result, not legacyResult: { success: false, error: {} }
    const { executeBuyAction } = await import('../packages/plugin-lifi/src/actions/executeBuy.action');
    const result = await executeBuyAction.handler(
        runtime,
        {
            id: randomUUID() as any,
            entityId: runtime.agentId,
            roomId: runtime.agentId,
            content: { text: 'buy $PEPE narrative is hot', actions: ['LIFI_EXECUTE_BUY'] }
        } as any,
        undefined,
        { amountUSD: 0.5 },
        async (msg) => {
            console.log('Callback:', msg.text);
            return [];
        }
    );

    console.log('Final Result Structure:', JSON.stringify({ success: result?.success, error: (result?.error as any)?.message || result?.error }, null, 2));

    process.exit(0);
}

testActions().catch(err => {
    console.error('Fatal test script error:', err);
    process.exit(1);
});
