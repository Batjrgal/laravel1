import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Skeleton } from "antd"; // Ant Design Skeleton import

export default function Dashboard(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Redirect based on user role
        const role = props.auth.user.role;

        if (role === "Admin" || role === "Manager") {
            router.visit(route("admin.dashboard"));
        } else {
            router.visit(route("user.dashboard"));
        }

        // Loading effect until redirect completes
        const timer = setTimeout(() => setLoading(false), 2000); // Fallback loading time
        return () => clearTimeout(timer);
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Skeleton active paragraph={{ rows: 10 }} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
