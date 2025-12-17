import type { Transaction } from "../types";


export const generateMockData = (): Transaction[] => {
    const methods: Transaction['method'][] = ['QR', 'NFC', 'SCRATCH'];
    const statuses: Transaction['status'][] = ['APPROVED', 'PENDING', 'DECLINED'];

    return Array.from({ length: 50 }, (_, i) => ({
        id: `txn_${i + 1}`,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        amountDZD: Math.floor(Math.random() * 50000) + 100,
        method: methods[Math.floor(Math.random() * methods.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        riskScore: Math.floor(Math.random() * 100),
        offline: Math.random() > 0.7,
    }));
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};