import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { Table, Tag, Button, Space, message } from "antd";
import "antd/dist/reset.css";
import ActionButtons from "@/Components/ActionButtons";

export default function JobsIndex({ auth, jobs }) {
    const formatCurrency = (amount) => {
        return `\u20ae${amount.toLocaleString()}`;
    };

    const handleDelete = (id) => {
        router.delete(route("admin.jobs.destroy", id), {
            onSuccess: () => {
                message.success("Job deleted successfully!");
            },
            onError: () => {
                message.error("Failed to delete job.");
            },
        });
    };

    const paymentFilters = [
        { text: "Бэлэн", value: "Бэлэн" },
        { text: "Данс", value: "Данс" },
        { text: "Бусад", value: "Бусад" },
    ];

    const columns = [
        {
            title: "Employee",
            dataIndex: ["user", "full_name"],
            key: "employee",
            render: (_, job) => (
                <div>
                    <div className="text-sm font-medium text-gray-900">
                        {job.user?.full_name || job.user?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                        {job.user?.role}
                    </div>
                </div>
            ),
            filters: Array.from(
                new Set(jobs.map((j) => j.user?.full_name || j.user?.name))
            ).map((name) => ({ text: name, value: name })),
            onFilter: (value, record) =>
                (record.user?.full_name || record.user?.name) === value,
        },
        {
            title: "Service",
            dataIndex: ["service", "service_name"],
            key: "service",
            render: (_, job) => (
                <div>
                    <div className="text-sm font-medium text-gray-900">
                        {job.service?.service_name}
                    </div>
                    <div className="text-sm text-gray-500">
                        {job.service?.car_type}
                    </div>
                </div>
            ),
            filters: Array.from(
                new Set(jobs.map((j) => j.service?.service_name))
            ).map((name) => ({ text: name, value: name })),
            onFilter: (value, record) => record.service?.service_name === value,
        },
        {
            title: "Vehicle Number",
            dataIndex: "vehicle_number",
            key: "vehicle_number",
        },
        {
            title: "Payment",
            dataIndex: "payment",
            key: "payment",
            filters: paymentFilters,
            onFilter: (value, record) => record.payment === value,
            render: (payment) => (
                <Tag
                    color={
                        payment === "Бэлэн"
                            ? "green"
                            : payment === "Данс"
                            ? "blue"
                            : "purple"
                    }
                >
                    {payment}
                </Tag>
            ),
        },
        {
            title: "Price",
            dataIndex: ["service", "price"],
            key: "price",
            sorter: (a, b) => (a.service?.price || 0) - (b.service?.price || 0),
            render: (_, job) => (
                <span className="text-green-600 font-semibold">
                    {formatCurrency(job.service?.price || 0)}
                </span>
            ),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at) =>
                created_at ? new Date(created_at).toLocaleDateString() : "-",
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            key: "updated_at",
            render: (updated_at) =>
                updated_at ? new Date(updated_at).toLocaleDateString() : "-",
            sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, job) => (
                <ActionButtons
                    editHref={route("admin.jobs.edit", job.id)}
                    onDelete={() => handleDelete(job.id)}
                    deleteConfirm="Are you sure you want to delete this job?"
                />
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Jobs Management
                </h2>
            }
        >
            <Head title="Jobs" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Jobs
                                </h3>
                                <Link
                                    href={route("admin.jobs.create")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                                >
                                    Add New Job
                                </Link>
                            </div>
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
