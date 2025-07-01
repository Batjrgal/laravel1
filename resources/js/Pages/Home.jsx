import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Home({ auth, services }) {
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
                        ([serviceName, serviceGroup]) => (
                            <div
                                key={serviceName}
                                className="bg-white rounded-2xl shadow-lg p-6"
                            >
                                <h3 className="text-2xl font-bold text-blue-600 mb-6 border-b pb-2">
                                    {serviceName}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {serviceGroup.map((service) => (
                                        <div
                                            key={service.id}
                                            className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-gray-100"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                                                    {service.car_type}
                                                </span>
                                            </div>
                                            <div className="flex flex-col justify-center items-center text-center">
                                                <div className="text-2xl font-bold text-blue-600 mb-2">
                                                    ₮
                                                    {service.price.toLocaleString()}
                                                </div>
                                                <p className="text-gray-600 text-sm mb-4">
                                                    {service.car_type} машин
                                                </p>
                                            </div>
                                            {auth.user && (
                                                <div className="mt-4">
                                                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200">
                                                        Үйлчилгээ захиалах
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
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
