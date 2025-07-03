import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Table } from "antd";
import "antd/dist/reset.css";

export default function UserJobsIndex({ auth, jobs }) {
    const formatCurrency = (amount) => `\u20ae${amount.toLocaleString()}`;

    const serviceFilters = Array.from(
        new Set(jobs.map((j) => j.service?.service_name))
    )
        .filter(Boolean)
        .map((name) => ({ text: name, value: name }));

    const columns = [
        {
            title: "Service",
            dataIndex: ["service", "service_name"],
            key: "service",
            render: (_, job) => job.service?.service_name,
            filters: serviceFilters,
            onFilter: (value, record) => record.service?.service_name === value,
            sorter: (a, b) =>
                (a.service?.service_name || "").localeCompare(
                    b.service?.service_name || ""
                ),
        },
        {
            title: "Price",
            dataIndex: ["service", "price"],
            key: "price",
            render: (_, job) => (
                <span className="text-green-600 font-semibold">
                    {formatCurrency(job.service?.price || 0)}
                </span>
            ),
            sorter: (a, b) => (a.service?.price || 0) - (b.service?.price || 0),
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
                    My Jobs
                </h2>
            }
        >
            <Head title="My Jobs" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                All My Jobs
                            </h3>
                            <Table
                                columns={columns}
                                dataSource={jobs.map((j) => ({
                                    ...j,
                                    key: j.id,
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
                                locale={{ emptyText: "No jobs found." }}
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
