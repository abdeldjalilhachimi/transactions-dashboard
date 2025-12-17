import { Clock, WifiOff } from "lucide-react";
import type { Transaction } from "../../types";
import { formatDate } from "../../utils";
import { Badge } from "../Badge";
import { StatusBadge } from "../StatusBadge";
import { RiskScore } from "../RiskScore";
import { Button } from "../Button";

interface TransactionRowProps {
    transaction: Transaction;
    isPending: boolean;
    onRefund: (transaction: Transaction) => void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({
    transaction,
    isPending,
    onRefund,
}) => {
    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm text-gray-900">
                <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400" />
                    {formatDate(transaction.createdAt)}
                </div>
            </td>
            <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                {transaction.amountDZD.toLocaleString()} DZD
            </td>
            <td className="px-4 py-3 text-sm">
                <Badge variant="neutral">{transaction.method}</Badge>
            </td>
            <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                    <StatusBadge status={transaction.status} />
                    {transaction.offline && (
                        <Badge variant="info" icon={<WifiOff size={12} />}>
                            Offline
                        </Badge>
                    )}
                </div>
            </td>
            <td className="px-4 py-3 text-sm">
                <RiskScore score={transaction.riskScore} />
            </td>
            <td className="px-4 py-3 text-sm">
                {transaction.status === 'APPROVED' && (
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onRefund(transaction)}
                        disabled={isPending}
                    >
                        {isPending ? 'Processing...' : 'Refund'}
                    </Button>
                )}
            </td>
        </tr>
    );
};
