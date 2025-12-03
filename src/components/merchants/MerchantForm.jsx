import { useEffect, useMemo, useState } from "react";

const defaultValues = {
    id: undefined,
    name: "",
    country: "",
    monthlyVolume: "",
    chargebackRatio: "",
    status: "active",
    riskLevel: "medium",
};

function validate(values) {
    const errors = {};

    if (!values.name || values.name.trim().length < 3) {
        errors.name = "Name must be at least 3 characters.";
    }

    if (!values.country || values.country.trim().length === 0) {
        errors.country = "Country is required.";
    }

    const volume = Number(values.monthlyVolume);
    if (!values.monthlyVolume || isNaN(volume) || volume <= 0) {
        errors.monthlyVolume = "Monthly volume must be a number greater than 0.";
    }

    if (values.chargebackRatio !== "" && values.chargebackRatio !== null) {
        const cb = Number(values.chargebackRatio);
        if (isNaN(cb) || cb < 0) {
            errors.chargebackRatio = "Chargeback ratio must be a number ≥ 0.";
        }
    }

    if (!values.status) {
        errors.status = "Status is required.";
    }

    if (!values.riskLevel) {
        errors.riskLevel = "Risk level is required.";
    }

    return errors;
}

export default function MerchantForm({
    open,
    mode = "add", // "add" | "edit"
    initialValues,
    onClose,
    onSubmit,
}) {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            if (mode === "edit" && initialValues) {
                setValues({
                    ...defaultValues,
                    ...initialValues,
                    monthlyVolume: String(initialValues.monthlyVolume ?? ""),
                    chargebackRatio:
                        initialValues.chargebackRatio !== undefined &&
                            initialValues.chargebackRatio !== null
                            ? String(initialValues.chargebackRatio)
                            : "",
                });
            } else {
                setValues(defaultValues);
            }
            setErrors({});
        }
    }, [open, mode, initialValues]);

    const handleChange = (field) => (e) => {
        const newValues = { ...values, [field]: e.target.value };
        setValues(newValues);
        setErrors(validate(newValues));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();

        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const payload = {
            ...values,
            monthlyVolume: Number(values.monthlyVolume),
            chargebackRatio:
                values.chargebackRatio === "" || values.chargebackRatio === null
                    ? 0
                    : Number(values.chargebackRatio),
        };

        onSubmit(payload);
    };

    const isValid = useMemo(
        () =>
            Object.keys(errors).length === 0 &&
            values.name &&
            values.country &&
            values.monthlyVolume,
        [errors, values]
    );

    const title = mode === "add" ? "Add merchant" : "Edit merchant";

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex bg-black/40">
            {/* Left backdrop (click to close) */}
            <div
                className="flex-1 h-full"
                onClick={onClose}
                aria-label="Close merchant form"
            />

            {/* Right drawer */}
            <div className="h-full w-full max-w-md md:max-w-lg lg:w-1/3 bg-slate-900 border-l border-slate-700 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
                    <h2 className="text-base font-semibold text-slate-50">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-200 text-xl leading-none"
                    >
                        ×
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">
                                Name
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={values.name}
                                onChange={handleChange("name")}
                                placeholder="Merchant name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                            )}
                        </div>

                        {/* Country */}
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">
                                Country
                            </label>
                            <input
                                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={values.country}
                                onChange={handleChange("country")}
                                placeholder="Country (e.g. US, IN, DE)"
                            />
                            {errors.country && (
                                <p className="mt-1 text-xs text-red-400">{errors.country}</p>
                            )}
                        </div>

                        {/* Volume + Chargeback */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Monthly volume
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={values.monthlyVolume}
                                    onChange={handleChange("monthlyVolume")}
                                    placeholder="e.g. 50000"
                                />
                                {errors.monthlyVolume && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {errors.monthlyVolume}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Chargeback ratio (%)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={values.chargebackRatio}
                                    onChange={handleChange("chargebackRatio")}
                                    placeholder="e.g. 1.5"
                                />
                                {errors.chargebackRatio && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {errors.chargebackRatio}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Status + Risk */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Status
                                </label>
                                <select
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={values.status}
                                    onChange={handleChange("status")}
                                >
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="blocked">Blocked</option>
                                </select>
                                {errors.status && (
                                    <p className="mt-1 text-xs text-red-400">{errors.status}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">
                                    Risk level
                                </label>
                                <select
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={values.riskLevel}
                                    onChange={handleChange("riskLevel")}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                                {errors.riskLevel && (
                                    <p className="mt-1 text-xs text-red-400">
                                        {errors.riskLevel}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-700 px-5 py-3 flex justify-end gap-2 bg-slate-900">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`rounded-md px-4 py-1.5 text-sm font-medium text-white ${isValid
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-blue-900/40 cursor-not-allowed"
                            }`}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
