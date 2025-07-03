import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Card, Row, Col, Button, Grid } from "antd";
import "antd/dist/reset.css";
import { useState } from "react";

export default function Home({ auth, services }) {
    const [expandedGroups, setExpandedGroups] = useState({});
    const screens = Grid.useBreakpoint();

    const getVisibleCount = () => {
        if (screens.xs) return 3;
        return 8;
    };

    const handleToggleGroup = (groupKey) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [groupKey]: !prev[groupKey],
        }));
    };

    return (
        <>
            <Head title="Car Wash Services" />

            {/* Hero Section */}
            <div className="relative min-h-[60vh] flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 via-indigo-400 to-blue-100 text-white overflow-hidden w-full">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-100 drop-shadow-lg" />
                </div>
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
                <div className="relative z-10 text-center py-20 px-4 w-full">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                        Машины угаалгын{" "}
                        <span className="text-yellow-300">орчин үеийн</span>{" "}
                        үйлчилгээ
                    </h1>
                    <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow">
                        Хурдан, найдвартай, чанартай үйлчилгээ — таны машиныг
                        бид хамгийн гоё болгоно!
                    </p>
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition duration-200"
                        >
                            Миний самбар
                        </Link>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route("login")}
                                className="bg-white/80 hover:bg-white text-blue-700 px-8 py-3 rounded-full font-bold text-lg shadow transition duration-200"
                            >
                                Нэвтрэх
                            </Link>
                            <Link
                                href={route("register")}
                                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold text-lg shadow transition duration-200"
                            >
                                Бүртгүүлэх
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Services Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Манай үйлчилгээ &amp; үнэ
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Таны хэрэгцээнд тохирсон, мэргэжлийн авто угаалгын
                        үйлчилгээнүүд.
                    </p>
                </div>

                <div className="space-y-12">
                    {Object.entries(services).map(
                        ([serviceName, serviceGroup]) => {
                            const expanded = expandedGroups[serviceName];
                            const visibleCount = getVisibleCount();
                            const showToggle =
                                serviceGroup.length > visibleCount;
                            const visibleServices = expanded
                                ? serviceGroup
                                : serviceGroup.slice(0, visibleCount);
                            return (
                                <Card
                                    key={serviceName}
                                    title={serviceName}
                                    className="mb-8 shadow-lg rounded-2xl"
                                    headStyle={{
                                        fontSize: 22,
                                        fontWeight: "bold",
                                        color: "#1677ff",
                                    }}
                                    bodyStyle={{ padding: 0 }}
                                >
                                    <Row gutter={[24, 24]} className="p-6">
                                        {visibleServices.map((service) => (
                                            <Col
                                                key={service.id}
                                                xs={24}
                                                sm={12}
                                                md={8}
                                                lg={6}
                                            >
                                                <Card
                                                    hoverable
                                                    className="rounded-xl border border-gray-100 shadow-sm h-full"
                                                    style={{ minHeight: 200 }}
                                                    bodyStyle={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        padding: 24,
                                                    }}
                                                >
                                                    <div className="flex items-center justify-between w-full mb-2">
                                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                                                            {service.car_type}
                                                        </span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-blue-600 mb-1">
                                                        ₮
                                                        {service.price.toLocaleString()}
                                                    </div>
                                                    <p className="text-gray-600 text-sm mb-2">
                                                        {service.car_type}
                                                    </p>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                    {showToggle && (
                                        <div className="flex justify-center pb-6">
                                            <Button
                                                type="primary"
                                                onClick={() =>
                                                    handleToggleGroup(
                                                        serviceName
                                                    )
                                                }
                                            >
                                                {expanded
                                                    ? "Хураах"
                                                    : "Үргэлжлүүлэх"}
                                            </Button>
                                        </div>
                                    )}
                                </Card>
                            );
                        }
                    )}
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-16 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 text-white w-full">
                <div className="max-w-3xl mx-auto text-center px-4">
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Өнөөдрөөс эхэлж, илүү цэвэрхэн машинтай бол!
                    </h3>
                    <p className="text-lg mb-8">
                        Манай багт нэгдэж, эсвэл үйлчилгээгээ захиалаад, өөрийн
                        машинд хамгийн сайн арчилгаа хийлгээрэй.
                    </p>
                    {!auth.user && (
                        <Link
                            href={route("register")}
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-lg transition duration-200"
                        >
                            Өнөөдөр бүртгүүлэх
                        </Link>
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-8 mt-0 w-full">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <span className="font-bold text-white">CarWash</span>{" "}
                        &copy; {new Date().getFullYear()} — Бүх эрх хуулиар
                        хамгаалагдсан.
                    </div>
                    <div className="flex gap-4">
                        <a
                            href="tel:+97699112233"
                            className="hover:text-yellow-400 transition"
                        >
                            Утас: 9911-2233
                        </a>
                        <a
                            href="mailto:info@carwash.mn"
                            className="hover:text-yellow-400 transition"
                        >
                            info@carwash.mn
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
