import { useEffect, useState } from "react";

export default function MerchantDetailModal({
    open,
    merchant,
    onClose,
    onUpdate,
    onEdit,
}) {
    const [status, setStatus] = useState("active");
    const [riskLevel, setRiskLevel] = useState("medium");

    useEffect(() => {
        if (merchant) {
            setStatus(merchant.status);
            setRiskLevel(merchant.riskLevel);
        }
    }, [merchant]);

    if (!open || !merchant) return null;

    const chargebackWarning =
        merchant.chargebackRatio > 2 && status === "active";

    const handleSave = () => {
        if (
            status === merchant.status &&
            riskLevel === merchant.riskLevel
        ) {
            onClose();
            return;
        }

        const highChargeback = merchant.chargebackRatio > 2;
        const isActivating = status === "active";
        const isHighRiskActive = isActivating && riskLevel === "high";
        const isActiveWithHighChargeback = isActivating && highChargeback;

        let confirmMessage = "";

        if (isHighRiskActive && isActiveWithHighChargeback) {
            confirmMessage =
                "This merchant is HIGH risk and has a chargeback ratio above 2% and you are setting status to ACTIVE.\n\nAre you sure you want to proceed?";
        } else if (isHighRiskActive) {
            confirmMessage =
                "This merchant is marked as HIGH risk and you are setting status to ACTIVE.\n\nAre you sure you want to proceed?";
        } else if (isActiveWithHighChargeback) {
            confirmMessage =
                "This merchant has a chargeback ratio above 2% and you are setting status to ACTIVE.\n\nAre you sure you want to proceed?";
        }

        if (confirmMessage) {
            const ok = window.confirm(confirmMessage);
            if (!ok) return;
        }

        onUpdate(merchant.id, { status, riskLevel });
        onClose();
    };


    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-xl rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-50">
                        Merchant details
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 text-xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="space-y-4 text-sm">
                    <div>
                        <p className="text-base font-semibold text-slate-50">
                            {merchant.name}
                        </p>
                        <p className="text-xs text-slate-400">{merchant.country}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-400">Monthly volume</p>
                            <p className="font-medium text-slate-50">
                                {merchant.monthlyVolume.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <p className="text-slate-400">Chargeback ratio</p>
                            <p className="font-medium text-slate-50">
                                {merchant.chargebackRatio.toFixed(2)}%
                            </p>
                        </div>
                    </div>

                    {/* Editable fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">
                                Status
                            </label>
                            <select
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">
                                Risk level
                            </label>
                            <select
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={riskLevel}
                                onChange={(e) => setRiskLevel(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    {chargebackWarning && (
                        <div className="rounded-md border border-amber-400/60 bg-amber-900/30 px-3 py-2 text-xs text-amber-200">
                            Chargeback ratio is above 2% while status is{" "}
                            <span className="font-semibold">active</span>. Review
                            this merchant carefully.
                        </div>
                    )}

                    <div className="flex flex-wrap gap-2 text-xs">
                        <span className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800 px-2.5 py-0.5 text-slate-200">
                            ID: {merchant.id}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-slate-600 bg-slate-800 px-2.5 py-0.5 text-slate-200">
                            Country: {merchant.country}
                        </span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-between">
                    <div>
                        {onEdit && (
                            <button
                                type="button"
                                onClick={() => {
                                    onEdit(merchant);
                                    onClose();  // close detail modal when opening form
                                }}
                                className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
                            >
                                Edit full details
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
