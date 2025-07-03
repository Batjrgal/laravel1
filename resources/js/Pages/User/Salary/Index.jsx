import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Table } from "antd";
import "antd/dist/reset.css";

export default function UserSalaryIndex({ auth, salaries }) {
    const formatCurrency = (amount) => `\u20ae${amount.toLocaleString()}`;

    const statusFilters = Array.from(
        new Set(salaries.map((s) => s.status))
    ).map((status) => ({ text: status, value: status }));
    const percentageFilters = Array.from(
        new Set(salaries.map((s) => s.salary_percentage))
    ).map((p) => ({ text: `${p}%`, value: p }));

    const columns = [
        {
            title: "Total Price",
            dataIndex: "total_price",
            key: "total_price",
            render: (total_price) => formatCurrency(total_price),
            sorter: (a, b) => a.total_price - b.total_price,
        },
        {
            title: "Base Price",
            dataIndex: "base_price",
            key: "base_price",
            render: (base_price) => (
                <span className="text-green-600 font-semibold">
                    {formatCurrency(base_price)}
                </span>
            ),
            sorter: (a, b) => a.base_price - b.base_price,
        },
        {
            title: "Percentage",
            dataIndex: "salary_percentage",
            key: "salary_percentage",
            render: (percentage) => `${percentage}%`,
            sorter: (a, b) => a.salary_percentage - b.salary_percentage,
            filters: percentageFilters,
            onFilter: (value, record) => record.salary_percentage === value,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        status === "Олгосон"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    {status}
                </span>
            ),
            filters: statusFilters,
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Date",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at) => (
                <span className="text-gray-500">
                    {new Date(created_at).toLocaleDateString()}
                </span>
            ),
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
        },
    ];

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My Salary
                </h2>
            }
        >
            <Head title="My Salary" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                All My Salary Records
                            </h3>
                            <Table
                                columns={columns}
                                dataSource={salaries.map((s) => ({
                                    ...s,
                                    key: s.id,
                                }))}
                                pagination={{
                                    defaultCurrent: 1,
                                    defaultPageSize: 10,
                                    showSizeChanger: true,
                                    pageSizeOptions: [
                                        "5",
                                        "10",
                                        "20",
                                        "50",
                                        "100",
                                    ],
                                }}
                                locale={{
                                    emptyText: "No salary records found.",
                                }}
                                scroll={{ x: true }}
                                bordered
                                size="middle"
                                rowClassName={(_, idx) =>
                                    idx % 2 === 0
                                        ? "bg-white hover:bg-blue-50 transition"
                                        : "bg-gray-50 hover:bg-blue-50 transition"
                                }
                                className="rounded-lg shadow overflow-x-auto"
                                sticky
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
