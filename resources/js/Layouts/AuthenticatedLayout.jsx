import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Notification from "@/Components/Notification";
import {
    HomeOutlined,
    AppstoreOutlined,
    UserOutlined,
    DollarOutlined,
    TeamOutlined,
    BellOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";
import {
    Badge,
    Dropdown as AntDropdown,
    List,
    Spin,
    Button,
    Modal,
    notification,
    Progress,
} from "antd";
import axios from "axios";

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notificationModalVisible, setNotificationModalVisible] =
        useState(false);
    const [isOnline, setIsOnline] = useState(
        typeof window !== "undefined" ? navigator.onLine : true
    );
    const [reconnectProgress, setReconnectProgress] = useState(0);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    let reconnectInterval = null;

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await axios.get("/notifications");
            setNotifications(res.data.notifications);
            setUnreadCount(res.data.unread_count);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        if (window.Echo && auth.user) {
            window.Echo.private(`App.Models.User.${auth.user.id}`).listen(
                "SalaryPaid",
                () => {
                    fetchNotifications();
                }
            );
        }
        return () => {
            if (window.Echo && auth.user) {
                window.Echo.leave(`App.Models.User.${auth.user.id}`);
            }
        };
    }, [auth.user]);

    const handleBellClick = async () => {
        await fetchNotifications();
        if (isMobile) {
            setNotificationModalVisible(true);
        }
    };

    const handleMarkAllRead = async () => {
        await axios.post("/notifications/mark-all-read");
        setUnreadCount(0);
        fetchNotifications();
    };

    // --- INTERNET STATUS ---
    const openOfflineNotification = () => {
        notification.error({
            message: "Интернет холболт тасарсан",
            description: "Та интернетээ шалгана уу.",
            icon: <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />,
            duration: 0,
            key: "network-status",
        });
    };

    const openReconnectNotification = () => {
        let progress = 0;
        notification.open({
            message: "Интернет дахин холбогдож байна",
            description: (
                <Progress percent={progress} size="small" status="active" />
            ),
            icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            duration: 0,
            key: "network-status",
        });

        reconnectInterval = setInterval(() => {
            progress += 10;
            setReconnectProgress(progress);
            notification.open({
                message: "Интернет дахин холбогдож байна",
                description: (
                    <Progress percent={progress} size="small" status="active" />
                ),
                icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                duration: 0,
                key: "network-status",
            });

            if (progress >= 100) {
                clearInterval(reconnectInterval);
                notification.success({
                    message: "Интернет холбогдлоо",
                    description: "Холболт амжилттай сэргээгдлээ.",
                    icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                    duration: 3,
                    key: "network-status",
                });
            }
        }, 200);
    };

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            openReconnectNotification();
        };

        const handleOffline = () => {
            setIsOnline(false);
            if (reconnectInterval) clearInterval(reconnectInterval);
            openOfflineNotification();
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        if (!navigator.onLine) {
            handleOffline(); // Initial offline state
        }

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
            if (reconnectInterval) clearInterval(reconnectInterval);
        };
    }, []);
    // -----------------------

    const notificationList = (
        <div
            style={{
                width: "100%",
                maxHeight: 420,
                overflowY: "auto",
                background: "#fff",
                padding: 12,
            }}
        >
            <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-base">Мэдэгдэл</span>
                <Button
                    size="small"
                    type="link"
                    onClick={handleMarkAllRead}
                    disabled={unreadCount === 0}
                >
                    Бүгдийг уншсан болгох
                </Button>
            </div>
            {loading ? (
                <Spin style={{ width: "100%", margin: "20px 0" }} />
            ) : notifications.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                    Мэдэгдэл алга
                </div>
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={(item) => (
                        <List.Item
                            style={{
                                background: item.read_at ? "#fff" : "#e6f7ff",
                                borderRadius: 6,
                                marginBottom: 4,
                            }}
                        >
                            <List.Item.Meta
                                title={
                                    <span
                                        className={
                                            item.read_at ? "" : "font-semibold"
                                        }
                                    >
                                        {item.data.message}
                                    </span>
                                }
                                description={
                                    <span
                                        style={{ fontSize: 12, color: "#888" }}
                                    >
                                        {new Date(
                                            item.created_at
                                        ).toLocaleString()}
                                    </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Notification />

            {/* Top nav */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* Navigation */}
                            <div className="hidden sm:flex space-x-8 sm:ml-10">
                                {(auth.user.role === "Admin" ||
                                    auth.user.role === "Manager") && (
                                    <>
                                        <NavLink
                                            href={route("admin.dashboard")}
                                            active={route().current(
                                                "admin.dashboard"
                                            )}
                                        >
                                            Dashboard
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.services.index")}
                                            active={route().current(
                                                "admin.services.*"
                                            )}
                                        >
                                            Services
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.jobs.index")}
                                            active={route().current(
                                                "admin.jobs.*"
                                            )}
                                        >
                                            Jobs
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.salary.index")}
                                            active={route().current(
                                                "admin.salary.*"
                                            )}
                                        >
                                            Salary
                                        </NavLink>
                                        <NavLink
                                            href={route("admin.users.index")}
                                            active={route().current(
                                                "admin.users.*"
                                            )}
                                        >
                                            Users
                                        </NavLink>
                                    </>
                                )}

                                {auth.user.role === "Employee" && (
                                    <>
                                        <NavLink
                                            href={route("user.dashboard")}
                                            active={route().current(
                                                "user.dashboard"
                                            )}
                                        >
                                            Dashboard
                                        </NavLink>
                                        <NavLink
                                            href={route("user.jobs.index")}
                                            active={route().current(
                                                "user.jobs.*"
                                            )}
                                        >
                                            Jobs
                                        </NavLink>
                                        <NavLink
                                            href={route("user.salary.index")}
                                            active={route().current(
                                                "user.salary.*"
                                            )}
                                        >
                                            Salary
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Notification */}
                            {!isMobile ? (
                                <AntDropdown
                                    overlay={notificationList}
                                    trigger={["click"]}
                                    placement="bottomRight"
                                    onOpenChange={(open) =>
                                        open && handleBellClick()
                                    }
                                >
                                    <Badge count={unreadCount} size="small">
                                        <Button
                                            type="text"
                                            icon={
                                                <BellOutlined
                                                    style={{ fontSize: 22 }}
                                                />
                                            }
                                            className="hover:bg-gray-100"
                                        />
                                    </Badge>
                                </AntDropdown>
                            ) : (
                                <>
                                    <Badge count={unreadCount} size="small">
                                        <Button
                                            type="text"
                                            icon={
                                                <BellOutlined
                                                    style={{ fontSize: 22 }}
                                                />
                                            }
                                            onClick={handleBellClick}
                                            className="hover:bg-gray-100"
                                        />
                                    </Badge>
                                    <Modal
                                        open={notificationModalVisible}
                                        title=""
                                        footer={null}
                                        onCancel={() =>
                                            setNotificationModalVisible(false)
                                        }
                                        width="90%"
                                        bodyStyle={{
                                            maxHeight: 400,
                                            overflowY: "auto",
                                        }}
                                    >
                                        {notificationList}
                                    </Modal>
                                </>
                            )}

                            {/* User Dropdown */}
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 bg-white hover:text-gray-700"
                                            >
                                                {auth.user.name}
                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>

            {/* Bottom Navigation - Mobile */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow md:hidden flex justify-around items-center h-14">
                {auth.user.role === "Admin" || auth.user.role === "Manager" ? (
                    <>
                        <Link
                            href={route("admin.dashboard")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("admin.dashboard")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <HomeOutlined style={{ fontSize: 22 }} />
                            Dashboard
                        </Link>
                        <Link
                            href={route("admin.services.index")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("admin.services.*")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <AppstoreOutlined style={{ fontSize: 22 }} />
                            Services
                        </Link>
                        <Link
                            href={route("admin.jobs.index")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("admin.jobs.*")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <AppstoreOutlined style={{ fontSize: 22 }} />
                            Jobs
                        </Link>
                        <Link
                            href={route("admin.salary.index")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("admin.salary.*")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <DollarOutlined style={{ fontSize: 22 }} />
                            Salary
                        </Link>
                        <Link
                            href={route("admin.users.index")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("admin.users.*")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <TeamOutlined style={{ fontSize: 22 }} />
                            Users
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href={route("user.dashboard")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("user.dashboard")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <HomeOutlined style={{ fontSize: 22 }} />
                            Dashboard
                        </Link>
                        <Link
                            href={route("user.jobs.index")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("user.jobs.*")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <AppstoreOutlined style={{ fontSize: 22 }} />
                            Jobs
                        </Link>
                        <Link
                            href={route("user.salary.index")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("user.salary.*")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <DollarOutlined style={{ fontSize: 22 }} />
                            Salary
                        </Link>
                        <Link
                            href={route("profile.edit")}
                            className={`flex flex-col items-center text-xs ${
                                route().current("profile.edit")
                                    ? "text-blue-600"
                                    : "text-gray-500"
                            }`}
                        >
                            <UserOutlined style={{ fontSize: 22 }} />
                            Profile
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
}
