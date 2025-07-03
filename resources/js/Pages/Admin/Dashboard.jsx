import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function AdminDashboard({ auth, stats }) {
    const formatCurrency = (amount) => {
        if (amount >= 1000000) {
            return `₮${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `₮${(amount / 1000).toFixed(1)}K`;
        } else {
            return `₮${amount.toLocaleString()}`;
        }
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }}>
                            {entry.name}:{" "}
                            {entry.name === "Income" || entry.name === "income"
                                ? formatCurrency(entry.value)
                                : entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
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

            <div className="py-6 sm:py-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-6 sm:mb-8 overflow-hidden">
                        <div className="p-6 sm:p-8 text-white">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                Welcome back,{" "}
                                {auth.user.full_name || auth.user.name}!
                            </h1>
                            <p className="text-blue-100 text-base sm:text-lg">
                                Here's your business overview for today
                            </p>
                        </div>
                        {/* <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div> */}
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {/* Total Users */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                                    <div className="ml-3 sm:ml-4">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500">
                                            Total Users
                                        </p>
                                        <p className="text-xl sm:text-3xl font-bold text-gray-900">
                                            {stats.total_users}
                                        </p>
                                        <p
                                            className={`text-xs font-medium ${
                                                stats.growth_percentages
                                                    .users >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {stats.growth_percentages.users >= 0
                                                ? "+"
                                                : ""}
                                            {stats.growth_percentages.users}%
                                            from last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Services */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                                    <div className="ml-3 sm:ml-4">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500">
                                            Total Services
                                        </p>
                                        <p className="text-xl sm:text-3xl font-bold text-gray-900">
                                            {stats.total_services}
                                        </p>
                                        <p
                                            className={`text-xs font-medium ${
                                                stats.growth_percentages
                                                    .services >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {stats.growth_percentages
                                                .services >= 0
                                                ? "+"
                                                : ""}
                                            {stats.growth_percentages.services}%
                                            from last month
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Today's Jobs */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                                    <div className="ml-3 sm:ml-4">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500">
                                            Today's Jobs
                                        </p>
                                        <p className="text-xl sm:text-3xl font-bold text-gray-900">
                                            {stats.today_jobs}
                                        </p>
                                        <p
                                            className={`text-xs font-medium ${
                                                stats.growth_percentages.jobs >=
                                                0
                                                    ? "text-blue-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {stats.growth_percentages.jobs >= 0
                                                ? "+"
                                                : ""}
                                            {stats.growth_percentages.jobs}%
                                            from yesterday
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Income Today */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
                                    <div className="ml-3 sm:ml-4">
                                        <p className="text-xs sm:text-sm font-medium text-gray-500">
                                            Today's Income
                                        </p>
                                        <p className="text-xl sm:text-3xl font-bold text-gray-900">
                                            {formatCurrency(
                                                stats.total_income_today
                                            )}
                                        </p>
                                        <p
                                            className={`text-xs font-medium ${
                                                stats.growth_percentages
                                                    .income >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {stats.growth_percentages.income >=
                                            0
                                                ? "+"
                                                : ""}
                                            {stats.growth_percentages.income}%
                                            from yesterday
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        {/* Monthly Income Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Monthly Income Trend
                            </h3>
                            <div className="h-64 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.monthly_income}>
                                        <defs>
                                            <linearGradient
                                                id="incomeGradient"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#3B82F6"
                                                    stopOpacity={0.8}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#3B82F6"
                                                    stopOpacity={0.1}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#E5E7EB"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            stroke="#6B7280"
                                        />
                                        <YAxis
                                            stroke="#6B7280"
                                            tickFormatter={formatCurrency}
                                            width={70}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="income"
                                            stroke="#3B82F6"
                                            fill="url(#incomeGradient)"
                                            strokeWidth={3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Daily Income Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Daily Income (Last 7 Days)
                            </h3>
                            <div className="h-64 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.daily_income}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#E5E7EB"
                                        />
                                        <XAxis dataKey="day" stroke="#6B7280" />
                                        <YAxis
                                            stroke="#6B7280"
                                            tickFormatter={formatCurrency}
                                            width={70}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="income"
                                            fill="#10B981"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Service Performance and Job Status */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                        {/* Service Performance */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Top Performing Services
                            </h3>
                            <div className="h-64 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={stats.service_stats}
                                        layout="horizontal"
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#E5E7EB"
                                        />
                                        <XAxis type="number" stroke="#6B7280" />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            stroke="#6B7280"
                                            width={80}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="jobs"
                                            fill="#F59E0B"
                                            radius={[0, 4, 4, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Job Status Distribution */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Salary Status Distribution
                            </h3>
                            <div className="h-64 sm:h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.job_status_distribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ status, percent }) =>
                                                `${status} ${(
                                                    percent * 100
                                                ).toFixed(0)}%`
                                            }
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="count"
                                        >
                                            {stats.job_status_distribution.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            COLORS[
                                                                index %
                                                                    COLORS.length
                                                            ]
                                                        }
                                                    />
                                                )
                                            )}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Income Overview and Top Users */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Income Overview */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Income Overview
                            </h3>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                                    <div>
                                        <span className="text-gray-600 font-medium">
                                            This Year
                                        </span>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Total annual income
                                        </p>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-bold text-green-600">
                                        {formatCurrency(
                                            stats.total_income_year
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                                    <div>
                                        <span className="text-gray-600 font-medium">
                                            This Month
                                        </span>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Current month earnings
                                        </p>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-bold text-blue-600">
                                        {formatCurrency(
                                            stats.total_income_month
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                                    <div>
                                        <span className="text-gray-600 font-medium">
                                            This Week
                                        </span>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Weekly performance
                                        </p>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-bold text-purple-600">
                                        {formatCurrency(
                                            stats.total_income_week
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                                    <div>
                                        <span className="text-gray-600 font-medium">
                                            Today
                                        </span>
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            Daily earnings
                                        </p>
                                    </div>
                                    <span className="text-xl sm:text-2xl font-bold text-orange-600">
                                        {formatCurrency(
                                            stats.total_income_today
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Top Users */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-0">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Top Performing Employees
                            </h3>
                            <div className="space-y-3 sm:space-y-4">
                                {stats.top_users.map((user, index) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3 sm:mr-4">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm sm:text-base font-semibold text-gray-900">
                                                    {user.full_name ||
                                                        user.name}
                                                </p>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {user.role}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm sm:text-base font-bold text-green-600">
                                                {formatCurrency(
                                                    user.salaries_sum_base_price ||
                                                        0
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Total earnings
                                            </p>
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
