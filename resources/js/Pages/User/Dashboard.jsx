import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function UserDashboard({ auth, stats }) {
    const formatCurrency = (amount) => {
        if (amount >= 1000000) {
            return `₮${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `₮${(amount / 1000).toFixed(1)}K`;
        } else {
            return `₮${amount.toLocaleString()}`;
        }
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

            <div className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-8 overflow-hidden relative">
                        <div className="p-8 text-white">
                            <h1 className="text-3xl font-bold mb-2">
                                Welcome back,{" "}
                                {auth.user.full_name || auth.user.name}!
                            </h1>
                            <p className="text-blue-100 text-lg">
                                Here's your performance overview and earnings
                                summary.
                            </p>
                        </div>
                        {/* <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div> */}
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Today's Jobs */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-white"
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
                                        <p className="text-3xl font-bold text-gray-900">
                                            {stats.today_my_jobs}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Today's Salary */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-white"
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
                                        <p className="text-3xl font-bold text-gray-900">
                                            {formatCurrency(
                                                stats.my_salary_today
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* This Week's Salary */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-white"
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
                                        <p className="text-3xl font-bold text-gray-900">
                                            {formatCurrency(
                                                stats.my_salary_week
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* This Month's Salary */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-white"
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
                                        <p className="text-3xl font-bold text-gray-900">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Salary Overview */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                My Salary Overview
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                                    <div>
                                        <span className="text-gray-600 font-medium">
                                            This Year
                                        </span>
                                        <p className="text-sm text-gray-500">
                                            Total annual salary
                                        </p>
                                    </div>
                                    <span className="text-2xl font-bold text-green-600">
                                        {formatCurrency(stats.my_salary_year)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                                    <div>
                                        <span className="text-gray-600 font-medium">
                                            This Month
                                        </span>
                                        <p className="text-sm text-gray-500">
                                            Current month salary
                                        </p>
                                    </div>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {formatCurrency(stats.my_salary_month)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                                    <div>
                                        <span className="text-gray-600 font-medium">
                                            This Week
                                        </span>
                                        <p className="text-sm text-gray-500">
                                            Weekly salary
                                        </p>
                                    </div>
                                    <span className="text-2xl font-bold text-purple-600">
                                        {formatCurrency(stats.my_salary_week)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                                    <div>
                                        <span className="text-gray-600 font-medium">
                                            Today
                                        </span>
                                        <p className="text-sm text-gray-500">
                                            Daily salary
                                        </p>
                                    </div>
                                    <span className="text-2xl font-bold text-orange-600">
                                        {formatCurrency(stats.my_salary_today)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Top Performers */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                Top Performers
                            </h3>
                            <div className="space-y-4">
                                {stats.top_users.map((user, index) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">
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
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-gray-500">
                                                {user.role}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
