import { AlertCircle } from "lucide-react";
import type { Transaction } from "../types";
import { Modal } from "./Modal";
import { Button } from "./Button";


interface RefundModalProps {
    transaction: Transaction;
    onConfirm: () => void;
    onCancel: () => void;
}

export const RefundModal: React.FC<RefundModalProps> = ({ transaction, onConfirm, onCancel }) => {
    return (
        <Modal isOpen={true} onClose={onCancel}>
            <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="text-amber-500" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">Confirm Refund</h2>
                </div>

                <div className="mb-6 space-y-2">
                    <p className="text-gray-700">
                        Are you sure you want to refund this transaction?
                    </p>
                    <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Transaction ID:</span>
                            <span className="font-mono font-medium">{transaction.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-semibold">{transaction.amountDZD.toLocaleString()} DZD</span>
                        </div>
                    </div>
                    <p className="text-sm text-amber-600">
                        Note: 20% of refunds may fail due to processing issues.
                    </p>
                </div>

                <div className="flex gap-3 justify-end">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={onConfirm}>
                        Confirm Refund
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
