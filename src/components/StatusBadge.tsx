import { Badge } from "@mui/material";
import type { Transaction } from "./Table";

interface StatusBadgeProps {
    status: Transaction['status'];
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const config = {
        APPROVED: { variant: 'success' as const, label: 'Approved' },
        PENDING: { variant: 'warning' as const, label: 'Pending' },
        DECLINED: { variant: 'danger' as const, label: 'Declined' },
    };

    const { variant, label } = config[status];

    return <Badge variant={variant}>{label}</Badge>;
};