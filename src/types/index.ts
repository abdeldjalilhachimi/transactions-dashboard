export type Transaction = {
    id: string;
    createdAt: string;
    amountDZD: number;
    method: "QR" | "NFC" | "SCRATCH";
    status: "APPROVED" | "PENDING" | "DECLINED";
    riskScore: number;
    offline: boolean;
};

export type OptimisticState = {
    transactions: Transaction[];
    pendingRefunds: Set<string>;
};

export type OptimisticAction =
    | { type: 'INIT'; payload: Transaction[] }
    | { type: 'START_REFUND'; payload: string }
    | { type: 'COMPLETE_REFUND'; payload: string }
    | { type: 'ROLLBACK_REFUND'; payload: string };

export type SortField = 'time' | 'amount' | 'risk';
export type SortDirection = 'asc' | 'desc';
