import type { SortDirection } from "@mui/material";
import type { SortField } from "../../types";
import { TrendingDown, TrendingUp } from "lucide-react";

interface TableHeaderProps {
    label: string;
    sortKey?: SortField;
    currentSort?: SortField;
    sortDirection?: SortDirection;
    onSort?: (key: SortField) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
    label,
    sortKey,
    currentSort,
    sortDirection,
    onSort,
}) => {
    const isSortable = sortKey && onSort;
    const isActive = sortKey === currentSort;

    const SortIcon = isActive && sortDirection === 'asc' ? TrendingUp : TrendingDown;

    if (!isSortable) {
        return (
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {label}
            </th>
        );
    }

    return (
        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
            <button
                onClick={() => onSort(sortKey)}
                className="flex items-center gap-1 hover:text-gray-900 transition-colors"
            >
                {label}
                <SortIcon size={16} className={isActive ? '' : 'opacity-30'} />
            </button>
        </th>
    );
};
