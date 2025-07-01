import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { Table, Tag, Button, Space } from "antd";
import "antd/dist/reset.css";

export default function UsersIndex({ auth, users }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            router.delete(route("admin.users.destroy", id));
        }
    };

    const roleFilters = Array.from(new Set(users.map((u) => u.role))).map(
        (role) => ({ text: role, value: role })
    );
    const statusFilters = Array.from(new Set(users.map((u) => u.status))).map(
        (status) => ({ text: status, value: status })
    );

    const columns = [
        {
            title: "User",
            dataIndex: "full_name",
            key: "full_name",
            filterSearch: true,
            filters: Array.from(
                new Set(users.map((u) => u.full_name || u.name))
            ).map((name) => ({ text: name, value: name })),
            onFilter: (value, record) =>
                (record.full_name || record.name) === value,
            render: (text, user) => (
                <Space>
                    <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-700">
                                    {(user.full_name || user.name)
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                                {user.full_name || user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>
                    </div>
                </Space>
            ),
        },
        {
            title: "Contact",
            dataIndex: "phone",
            key: "phone",
            render: (phone) => <span>{phone || "N/A"}</span>,
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            filters: roleFilters,
            onFilter: (value, record) => record.role === value,
            render: (role) => (
                <Tag
                    color={
                        role === "Admin"
                            ? "red"
                            : role === "Manager"
                            ? "blue"
                            : role === "Employee"
                            ? "green"
                            : "default"
                    }
                >
                    {role}
                </Tag>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: statusFilters,
            onFilter: (value, record) => record.status === value,
            render: (status) => (
                <Tag color={status === "Идэвхтэй" ? "green" : "red"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Created",
            dataIndex: "created_at",
            key: "created_at",
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
            render: (created_at) => new Date(created_at).toLocaleDateString(),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, user) => (
                <Space>
                    <Link
                        href={route("admin.users.edit", user.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        Edit
                    </Link>
                    <Button
                        danger
                        type="link"
                        onClick={() => handleDelete(user.id)}
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
                    Users Management
                </h2>
            }
        >
            <Head title="Users" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Users
                                </h3>
                                <Link
                                    href={route("admin.users.create")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
                                >
                                    Add New User
                                </Link>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={users.map((u) => ({
                                    ...u,
                                    key: u.id,
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
                                locale={{ emptyText: "No users found." }}
                                scroll={{ x: true }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
