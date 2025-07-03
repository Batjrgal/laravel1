import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import {
    Table,
    Tag,
    Button,
    Space,
    Modal,
    InputNumber,
    Popconfirm,
    message,
} from "antd";
import "antd/dist/reset.css";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ActionButtons from "@/Components/ActionButtons";

export default function SalaryIndex({ auth, salaries, users }) {
    const [globalPercentage, setGlobalPercentage] = useState(50);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [batchLoading, setBatchLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalValue, setModalValue] = useState(globalPercentage);
    const [openTour, setOpenTour] = useState(false);
    const batchPaidRef = useRef(null);
    const batchUnpaidRef = useRef(null);
    const tableRef = useRef(null);
    const updatePercentRef = useRef(null);

    useEffect(() => {
        axios.get(route("admin.settings.salaryPercentage.get")).then((res) => {
            setGlobalPercentage(res.data.salary_percentage);
            setModalValue(res.data.salary_percentage);
        });
    }, []);

    const salaryData = salaries;

    const showModal = () => {
        setModalValue(globalPercentage);
        setIsModalOpen(true);
    };

    const handleModalOk = async () => {
        if (modalValue < 0 || modalValue > 100) return;
        setLoading(true);
        try {
            await axios.post(route("admin.settings.salaryPercentage.update"), {
                salary_percentage: parseInt(modalValue),
            });
            setGlobalPercentage(parseInt(modalValue));
            message.success("Salary percentage updated successfully!");
        } catch (error) {
            message.error("Failed to update salary percentage.");
        }
        setLoading(false);
        setIsModalOpen(false);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    const formatCurrency = (amount) => {
        return `\u20ae${amount.toLocaleString()}`;
    };

    const handleDelete = (id) => {
        router.delete(route("admin.salary.destroy", id), {
            onSuccess: () => {
                message.success("Salary record deleted successfully!");
            },
            onError: () => {
                message.error("Failed to delete salary record.");
            },
        });
    };

    const updateStatus = (salaryId, newStatus) => {
        router.patch(
            route("admin.salary.updateStatus", salaryId),
            {
                status: newStatus,
                updated_by: auth.user.name,
            },
            {
                onSuccess: () => {
                    router.reload({ only: ["salaries"] });
                    message.success(
                        `Status updated to ${newStatus} successfully!`
                    );
                },
                onError: () => {
                    message.error("Failed to update status.");
                },
            }
        );
    };

    const statusFilters = [
        { text: "Олгосон", value: "Олгосон" },
        { text: "Олгоогүй", value: "Олгоогүй" },
    ];

    const columns = [
        {
            title: "Employee",
            dataIndex: ["user", "full_name"],
            key: "employee",
            render: (_, salary) => (
                <div>{salary.user?.full_name || salary.user?.name}</div>
            ),
            filters: Array.from(
                new Set(
                    salaryData.map((s) => s.user?.full_name || s.user?.name)
                )
            ).map((name) => ({ text: name, value: name })),
            onFilter: (value, record) =>
                (record.user?.full_name || record.user?.name) === value,
        },
        {
            title: "Total Price",
            dataIndex: "total_price",
            key: "total_price",
            sorter: (a, b) => a.total_price - b.total_price,
            render: (price) => (
                <span className="text-green-600 font-semibold">
                    {formatCurrency(price)}
                </span>
            ),
        },
        {
            title: "Base Price",
            dataIndex: "base_price",
            key: "base_price",
            sorter: (a, b) => a.base_price - b.base_price,
            render: (price) => <span>{formatCurrency(price)}</span>,
        },
        {
            title: "Percentage",
            dataIndex: "percentage",
            key: "percentage",
            sorter: (a, b) => a.percentage - b.percentage,
            render: (percentage) => <span>{percentage}%</span>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            filters: statusFilters,
            onFilter: (value, record) => record.status === value,
            render: (status) => (
                <Tag color={status === "Олгосон" ? "green" : "red"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Updated By",
            dataIndex: "updated_by",
            key: "updated_by",
            render: (updated_by) => updated_by || "-",
            filters: Array.from(
                new Set(salaryData.map((s) => s.updated_by).filter(Boolean))
            ).map((name) => ({ text: name, value: name })),
            onFilter: (value, record) => record.updated_by === value,
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
            render: (_, salary) => (
                <ActionButtons
                    onDelete={() => handleDelete(salary.id)}
                    deleteConfirm="Are you sure you want to delete this salary record?"
                    extraActions={
                        <Popconfirm
                            title={`Are you sure you want to mark this as ${
                                salary.status === "Олгосон" ? "Unpaid" : "Paid"
                            }?`}
                            onConfirm={() =>
                                updateStatus(
                                    salary.id,
                                    salary.status === "Олгосон"
                                        ? "Олгоогүй"
                                        : "Олгосон"
                                )
                            }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link">
                                {salary.status === "Олгосон"
                                    ? "Unpaid"
                                    : "Paid"}
                            </Button>
                        </Popconfirm>
                    }
                />
            ),
        },
    ];

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

    const batchUpdateStatus = async (newStatus) => {
        if (selectedRowKeys.length === 0) return;
        setBatchLoading(true);
        try {
            await axios.post(route("admin.salary.batchUpdateStatus"), {
                ids: selectedRowKeys,
                status: newStatus,
                updated_by: auth.user.name,
            });
            message.success(
                `Batch status updated to ${newStatus} successfully!`
            );
        } catch (error) {
            message.error("Failed to update batch status.");
        }
        setBatchLoading(false);
        setSelectedRowKeys([]);
        router.reload({ only: ["salaries"] });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Salary Management
                </h2>
            }
        >
            <Head title="Salary" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Salary Records
                                    <span className="ml-4 text-sm text-gray-500">
                                        (Global Percentage:{" "}
                                        <span className="font-bold">
                                            {globalPercentage}%
                                        </span>
                                        )
                                    </span>
                                </h3>
                                <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                    <Button
                                        ref={batchPaidRef}
                                        onClick={() =>
                                            batchUpdateStatus("Олгосон")
                                        }
                                        type="primary"
                                        loading={batchLoading}
                                        disabled={selectedRowKeys.length === 0}
                                        size="small"
                                        style={{ minWidth: 120 }}
                                    >
                                        Mark Selected Paid
                                    </Button>
                                    <Button
                                        ref={batchUnpaidRef}
                                        onClick={() =>
                                            batchUpdateStatus("Олгоогүй")
                                        }
                                        type="default"
                                        loading={batchLoading}
                                        disabled={selectedRowKeys.length === 0}
                                        size="small"
                                        style={{ minWidth: 120 }}
                                    >
                                        Mark Selected Unpaid
                                    </Button>
                                    <Button
                                        ref={updatePercentRef}
                                        onClick={showModal}
                                        type="dashed"
                                        loading={loading}
                                        size="small"
                                        style={{ minWidth: 120 }}
                                    >
                                        {loading
                                            ? "Updating..."
                                            : "Update salary percentage"}
                                    </Button>
                                </div>
                            </div>
                            <div ref={tableRef}>
                                <Table
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    dataSource={salaryData.map((s) => ({
                                        ...s,
                                        key: s.id,
                                        percentage: s.salary_percentage,
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
                            <Modal
                                title="Update Salary Percentage"
                                open={isModalOpen}
                                onOk={handleModalOk}
                                onCancel={handleModalCancel}
                                okText="Update"
                                cancelText="Cancel"
                                confirmLoading={loading}
                            >
                                <div style={{ marginBottom: 16 }}>
                                    <span>New Percentage: </span>
                                    <InputNumber
                                        min={0}
                                        max={100}
                                        value={modalValue}
                                        onChange={setModalValue}
                                        addonAfter="%"
                                    />
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
