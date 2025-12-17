interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', icon }) => {
    const variants = {
        success: 'bg-green-100 text-green-800 border-green-200',
        warning: 'bg-amber-100 text-amber-800 border-amber-200',
        danger: 'bg-red-100 text-red-800 border-red-200',
        info: 'bg-blue-100 text-blue-800 border-blue-200',
        neutral: 'bg-gray-100 text-gray-700 border-gray-200',
    };

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${variants[variant]}`}>
            {icon}
            {children}
        </span>
    );
};