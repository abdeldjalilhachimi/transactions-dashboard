interface RiskScoreProps {
    score: number;
}

export const RiskScore: React.FC<RiskScoreProps> = ({ score }) => {
    const getColor = () => {
        if (score < 30) return 'bg-green-500';
        if (score < 70) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <div className="flex items-center gap-2">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`h-full ${getColor()}`}
                    style={{ width: `${score}%` }}
                />
            </div>
            <span className="text-xs font-medium text-gray-600">{score}</span>
        </div>
    );
};