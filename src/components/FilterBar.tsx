import { WifiOff } from "lucide-react";
import type { Transaction } from "../types";
import { Button } from "./Button";

interface FilterBarProps {
    statusFilters: Set<Transaction['status']>;
    offlineOnly: boolean;
    onStatusToggle: (status: Transaction['status']) => void;
    onOfflineToggle: (checked: boolean) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
    statusFilters,
    offlineOnly,
    onStatusToggle,
    onOfflineToggle,
}) => {
    const statuses: Transaction['status'][] = ['APPROVED', 'PENDING', 'DECLINED'];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex flex-wrap gap-2">
                        {statuses.map(status => (
                            <Button
                                key={status}
                                size="sm"
                                variant={statusFilters.has(status) ? 'primary' : 'secondary'}
                                onClick={() => onStatusToggle(status)}
                            >
                                {status}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={offlineOnly}
                            onChange={(e) => onOfflineToggle(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <WifiOff size={16} />
                            Offline only
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};
