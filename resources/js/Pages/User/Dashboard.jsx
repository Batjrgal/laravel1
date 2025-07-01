import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function UserDashboard({ auth, stats }) {
    const formatCurrency = (amount) => {
        return `₮${amount.toLocaleString()}`;
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My Dashboard
                </h2>
            }
        >
            <Head title="My Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Message */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Welcome back,{" "}
                                {auth.user.full_name || auth.user.name}!
                            </h3>
                            <p className="text-gray-600">
                                Here's your performance overview and earnings
                                summary.
                            </p>
                        </div>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Today's Jobs */}
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
                                            {stats.today_my_jobs}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Today's Salary */}
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
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Today's Salary
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {formatCurrency(
                                                stats.my_salary_today
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* This Week's Salary */}
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
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            This Week
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {formatCurrency(
                                                stats.my_salary_week
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* This Month's Salary */}
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
                                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            This Month
                                        </p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {formatCurrency(
                                                stats.my_salary_month
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Salary Overview and Top Users */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Salary Overview */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    My Salary Overview
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            This Year
                                        </span>
                                        <span className="font-semibold text-green-600">
                                            {formatCurrency(
                                                stats.my_salary_year
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            This Month
                                        </span>
                                        <span className="font-semibold text-blue-600">
                                            {formatCurrency(
                                                stats.my_salary_month
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            This Week
                                        </span>
                                        <span className="font-semibold text-purple-600">
                                            {formatCurrency(
                                                stats.my_salary_week
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Today
                                        </span>
                                        <span className="font-semibold text-orange-600">
                                            {formatCurrency(
                                                stats.my_salary_today
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
                                    Top Performers
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
