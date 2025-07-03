import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { Table, Tag, Button, Space, message } from "antd";
import "antd/dist/reset.css";
import ActionButtons from "@/Components/ActionButtons";

export default function ServicesIndex({ auth, services }) {
    const formatCurrency = (amount) => {
        return `\u20ae${amount.toLocaleString()}`;
    };

    const handleDelete = (id) => {
        router.delete(route("admin.services.destroy", id), {
            onSuccess: () => {
                message.success("Service deleted successfully!");
            },
            onError: () => {
                message.error("Failed to delete service.");
            },
        });
    };

    const carTypeFilters = [
        ...Array.from(new Set(services.map((s) => s.car_type))).map((type) => ({
            text: type,
            value: type,
        })),
    ];

    const columns = [
        {
            title: "Service Name",
            dataIndex: "service_name",
            key: "service_name",
            filterSearch: true,
            filters: [
                ...Array.from(new Set(services.map((s) => s.service_name))).map(
                    (name) => ({
                        text: name,
                        value: name,
                    })
                ),
            ],
            onFilter: (value, record) => record.service_name === value,
        },
        {
            title: "Car Type",
            dataIndex: "car_type",
            key: "car_type",
            filters: carTypeFilters,
            onFilter: (value, record) => record.car_type === value,
            render: (car_type) => <Tag color="blue">{car_type}</Tag>,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
            render: (price) => (
                <span className="text-green-600 font-semibold">
                    {formatCurrency(price)}
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
            render: (_, service) => (
                <ActionButtons
                    editHref={route("admin.services.edit", service.id)}
                    onDelete={() => handleDelete(service.id)}
                    deleteConfirm="Are you sure you want to delete this service?"
                />
            ),
        },
    ];

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Services Management
                </h2>
            }
        >
            <Head title="Services" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Services
                                </h3>
                                <Link
                                    href={route("admin.services.create")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                                >
                                    Add New Service
                                </Link>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={services.map((s) => ({
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
                                locale={{ emptyText: "No services found." }}
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
