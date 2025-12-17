import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { SortDirection, SortField, Transaction } from "../types";
import { generateMockData } from "../utils";
import { Notification } from "./Notification";
import { FilterBar } from "./FilterBar";
import { TransactionsTable } from "./Table";
import { RefundModal } from "./RefundModal";
import { optimisticReducer } from "../reducers";

export default function TransactionsDashboard() {
    const [statusFilters, setStatusFilters] = useState<Set<Transaction['status']>>(new Set());
    const [offlineOnly, setOfflineOnly] = useState(false);
    const [sortBy, setSortBy] = useState<SortField>('time');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [refundingTxn, setRefundingTxn] = useState<Transaction | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const [state, dispatch] = useReducer(optimisticReducer, {
        transactions: generateMockData(),
        pendingRefunds: new Set(),
    });


    useEffect(() => {
        dispatch({ type: 'INIT', payload: generateMockData() });
    }, []);


    const toggleStatusFilter = useCallback((status: Transaction['status']) => {
        setStatusFilters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(status)) {
                newSet.delete(status);
            } else {
                newSet.add(status);
            }
            return newSet;
        });
    }, []);


    const handleSort = useCallback((field: SortField) => {
        if (sortBy === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortDirection('desc');
        }
    }, [sortBy]);


    const simulateRefundAPI = useCallback(async (txnId: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return Math.random() > 0.2;
    }, []);


    const handleRefund = useCallback(async (transaction: Transaction) => {
        setRefundingTxn(null);

        dispatch({ type: 'START_REFUND', payload: transaction.id });

        try {
            const success = await simulateRefundAPI(transaction.id);

            if (success) {
                dispatch({ type: 'COMPLETE_REFUND', payload: transaction.id });
                setNotification({
                    type: 'success',
                    message: `Refund successful for ${transaction.id}`,
                });
            } else {
                dispatch({ type: 'ROLLBACK_REFUND', payload: transaction.id });
                setNotification({
                    type: 'error',
                    message: `Refund failed for ${transaction.id}. Please try again.`,
                });
            }
        } catch (error) {
            dispatch({ type: 'ROLLBACK_REFUND', payload: transaction.id });
            setNotification({
                type: 'error',
                message: `Refund error for ${transaction.id}`,
            });
        }

        setTimeout(() => setNotification(null), 4000);
    }, [simulateRefundAPI]);


    const processedTransactions = useMemo(() => {
        let filtered = state.transactions;

        if (statusFilters.size > 0) {
            filtered = filtered.filter(t => statusFilters.has(t.status));
        }

        if (offlineOnly) {
            filtered = filtered.filter(t => t.offline);
        }

        const sorted = [...filtered].sort((a, b) => {
            let comparison = 0;

            switch (sortBy) {
                case 'time':
                    comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    break;
                case 'amount':
                    comparison = a.amountDZD - b.amountDZD;
                    break;
                case 'risk':
                    comparison = a.riskScore - b.riskScore;
                    break;
            }

            return sortDirection === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }, [state.transactions, statusFilters, offlineOnly, sortBy, sortDirection]);

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions Dashboard</h1>
                </div>

                {notification && (
                    <Notification type={notification.type} message={notification.message} />
                )}

                <FilterBar
                    statusFilters={statusFilters}
                    offlineOnly={offlineOnly}
                    onStatusToggle={toggleStatusFilter}
                    onOfflineToggle={setOfflineOnly}
                />

                <TransactionsTable
                    transactions={processedTransactions}
                    pendingRefunds={state.pendingRefunds}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    onRefund={setRefundingTxn}
                />


                <div className="mt-4 text-sm text-gray-600 text-center">
                    Showing {processedTransactions.length} of {state.transactions.length} transactions
                </div>
            </div>

            {refundingTxn && (
                <RefundModal
                    transaction={refundingTxn}
                    onConfirm={() => handleRefund(refundingTxn)}
                    onCancel={() => setRefundingTxn(null)}
                />
            )}
        </div>
    );
}