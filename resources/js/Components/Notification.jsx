import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

export default function Notification() {
    const { flash } = usePage().props;
    const [show, setShow] = useState(!!(flash.success || flash.error));
    const [type, setType] = useState(
        flash.success ? "success" : flash.error ? "error" : null
    );

    useEffect(() => {
        if (flash.success || flash.error) {
            setShow(true);
            setType(flash.success ? "success" : "error");
            const timer = setTimeout(() => setShow(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash.success, flash.error]);

    // console.log("flash:", flash);

    if (!show) return null;

    return (
        <div className="fixed top-5 right-5 z-50">
            <div
                className={`
                    px-6 py-3 rounded shadow-lg flex items-center gap-2
                    transition-all duration-500
                    ${
                        show
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4"
                    }
                    ${
                        type === "success"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }
                `}
            >
                {type === "success" ? (
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                )}
                <span>{flash.success || flash.error}</span>
            </div>
        </div>
    );
}
