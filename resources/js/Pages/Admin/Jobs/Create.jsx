import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Create({ auth, services, users }) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: "",
        user_id: "",
        vehicle_number: "",
        payment: "Бэлэн",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.jobs.store"));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Job
                </h2>
            }
        >
            <Head title="Create Job" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Add New Job
                                </h3>
                                <Link
                                    href={route("admin.jobs.index")}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to Jobs
                                </Link>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="user_id"
                                        value="Employee"
                                    />
                                    <select
                                        id="user_id"
                                        name="user_id"
                                        value={data.user_id}
                                        onChange={(e) =>
                                            setData("user_id", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">
                                            Select Employee
                                        </option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.full_name || user.name} (
                                                {user.role})
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.user_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="service_id"
                                        value="Service"
                                    />
                                    <select
                                        id="service_id"
                                        name="service_id"
                                        value={data.service_id}
                                        onChange={(e) =>
                                            setData(
                                                "service_id",
                                                e.target.value
                                            )
                                        }
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="">Select Service</option>
                                        {services.map((service) => (
                                            <option
                                                key={service.id}
                                                value={service.id}
                                            >
                                                {service.service_name} -{" "}
                                                {service.car_type} (₮
                                                {service.price.toLocaleString()}
                                                )
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.service_id}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="vehicle_number"
                                        value="Vehicle Number"
                                    />
                                    <TextInput
                                        id="vehicle_number"
                                        type="text"
                                        name="vehicle_number"
                                        value={data.vehicle_number}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "vehicle_number",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g., 1234АБВ"
                                    />
                                    <InputError
                                        message={errors.vehicle_number}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="payment"
                                        value="Payment Method"
                                    />
                                    <select
                                        id="payment"
                                        name="payment"
                                        value={data.payment}
                                        onChange={(e) =>
                                            setData("payment", e.target.value)
                                        }
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        required
                                    >
                                        <option value="Бэлэн">
                                            Бэлэн (Cash)
                                        </option>
                                        <option value="Данс">
                                            Данс (Bank Transfer)
                                        </option>
                                        <option value="Карт">
                                            Карт (Card)
                                        </option>
                                    </select>
                                    <InputError
                                        message={errors.payment}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        Create Job
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
