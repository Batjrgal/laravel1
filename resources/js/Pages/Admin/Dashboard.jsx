import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function AdminDashboard({ auth, stats }) {
    const formatCurrency = (amount) => {
        return `₮${amount.toLocaleString()}`;
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Users */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Total Users
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {stats.total_users}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Services */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Total Services
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {stats.total_services}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Today's Jobs */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Today's Jobs
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {stats.today_jobs}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Income Today */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Today's Income
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {formatCurrency(
                                                stats.total_income_today
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Income Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Income Overview
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            This Year
                                        </span>
                                        <span className="font-semibold text-green-600">
                                            {formatCurrency(
                                                stats.total_income_year
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            This Month
                                        </span>
                                        <span className="font-semibold text-blue-600">
                                            {formatCurrency(
                                                stats.total_income_month
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            This Week
                                        </span>
                                        <span className="font-semibold text-purple-600">
                                            {formatCurrency(
                                                stats.total_income_week
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Today
                                        </span>
                                        <span className="font-semibold text-orange-600">
                                            {formatCurrency(
                                                stats.total_income_today
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Users */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Top Users
                                </h3>
                                <div className="space-y-3">
                                    {stats.top_users.map((user, index) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center">
                                                <span className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700 mr-3">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {user.full_name ||
                                                            user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatCurrency(
                                                            user.salaries_sum_base_price ||
                                                                0
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-medium text-gray-500">
                                                {user.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
