import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { Table, Tag, Button, Space } from "antd";
import "antd/dist/reset.css";

export default function ServicesIndex({ auth, services }) {
    const formatCurrency = (amount) => {
        return `\u20ae${amount.toLocaleString()}`;
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this service?")) {
            router.delete(route("admin.services.destroy", id));
        }
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
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at) => new Date(created_at).toLocaleDateString(),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, service) => (
                <Space>
                    <Link
                        href={route("admin.services.edit", service.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        Edit
                    </Link>
                    <Button
                        danger
                        type="link"
                        onClick={() => handleDelete(service.id)}
                        style={{ padding: 0 }}
                    >
                        Delete
                    </Button>
                </Space>
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
