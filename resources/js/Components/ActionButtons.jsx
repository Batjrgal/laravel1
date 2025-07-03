import { Space, Button, Tooltip, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "@inertiajs/react";

export default function ActionButtons({
    editHref,
    onDelete,
    deleteConfirm = "Are you sure you want to delete this item?",
    extraActions = null,
    editLabel = "Edit",
    deleteLabel = "Delete",
    editTooltip = "Edit",
    deleteTooltip = "Delete",
    disabled = false,
}) {
    return (
        <Space>
            {editHref && (
                <Tooltip title={editTooltip}>
                    <Link
                        href={editHref}
                        className="text-indigo-600 hover:text-indigo-900"
                    >
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            disabled={disabled}
                            style={{ padding: 0 }}
                        >
                            {editLabel}
                        </Button>
                    </Link>
                </Tooltip>
            )}
            {onDelete && (
                <Popconfirm
                    title={deleteConfirm}
                    onConfirm={onDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Tooltip title={deleteTooltip}>
                        <Button
                            danger
                            type="link"
                            icon={<DeleteOutlined />}
                            disabled={disabled}
                            style={{ padding: 0 }}
                        >
                            {deleteLabel}
                        </Button>
                    </Tooltip>
                </Popconfirm>
            )}
            {extraActions}
        </Space>
    );
}
