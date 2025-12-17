import { AlertCircle, CheckCircle } from "lucide-react";

interface NotificationProps {
    type: 'success' | 'error';
    message: string;
    onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ type, message }) => {
    return (
        <div className={`mb-4 p-4 rounded-lg border flex items-center gap-3 ${type === 'success'
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
            }`}>
            {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-medium">{message}</span>
        </div>
    );
};