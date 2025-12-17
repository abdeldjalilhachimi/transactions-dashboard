import type { OptimisticAction, OptimisticState } from "../types";

export const optimisticReducer = (state: OptimisticState, action: OptimisticAction): OptimisticState => {
    switch (action.type) {
        case 'INIT':
            return { ...state, transactions: action.payload };

        case 'START_REFUND':
            return {
                ...state,
                transactions: state.transactions.map(t =>
                    t.id === action.payload ? { ...t, status: 'PENDING' as const } : t
                ),
                pendingRefunds: new Set([...state.pendingRefunds, action.payload]),
            };

        case 'COMPLETE_REFUND':
            const newPending = new Set(state.pendingRefunds);
            newPending.delete(action.payload);
            return {
                ...state,
                transactions: state.transactions.map(t =>
                    t.id === action.payload ? { ...t, status: 'DECLINED' as const } : t
                ),
                pendingRefunds: newPending,
            };

        case 'ROLLBACK_REFUND':
            const rolledPending = new Set(state.pendingRefunds);
            rolledPending.delete(action.payload);
            return {
                ...state,
                transactions: state.transactions.map(t =>
                    t.id === action.payload ? { ...t, status: 'APPROVED' as const } : t
                ),
                pendingRefunds: rolledPending,
            };

        default:
            return state;
    }
};