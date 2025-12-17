import { Clock } from "lucide-react";
import { TableHeader } from "./TableHeader";
import type { SortDirection, SortField, Transaction } from "../../types";
import { TransactionRow } from "./TransactionRow";

interface TransactionsTableProps {
    transactions: Transaction[];
    pendingRefunds: Set<string>;
    sortBy: SortField;
    sortDirection: SortDirection;
    onSort: (field: SortField) => void;
    onRefund: (transaction: Transaction) => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
    transactions,
    pendingRefunds,
    sortBy,
    sortDirection,
    onSort,
    onRefund,
}) => {
    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center text-gray-500">
                <Clock size={48} className="mx-auto mb-3 opacity-30" />
                <p className="text-lg font-medium">No transactions found</p>
                <p className="text-sm">Try adjusting your filters</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                        <tr>
                            <TableHeader
                                label="Time"
                                sortKey="time"
                                currentSort={sortBy}
                                sortDirection={sortDirection}
                                onSort={onSort}
                            />
                            <TableHeader
                                label="Amount"
                                sortKey="amount"
                                currentSort={sortBy}
                                sortDirection={sortDirection}
                                onSort={onSort}
                            />
                            <TableHeader label="Method" />
                            <TableHeader label="Status" />
                            <TableHeader
                                label="Risk Score"
                                sortKey="risk"
                                currentSort={sortBy}
                                sortDirection={sortDirection}
                                onSort={onSort}
                            />
                            <TableHeader label="Actions" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.map((txn) => (
                            <TransactionRow
                                key={txn.id}
                                transaction={txn}
                                isPending={pendingRefunds.has(txn.id)}
                                onRefund={onRefund}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};