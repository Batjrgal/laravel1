import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { message } from "antd";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        service_name: "",
        car_type: "",
        price: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.services.store"), {
            onSuccess: () => {
                message.success("Service created successfully!");
            },
            onError: () => {
                message.error(
                    "Failed to create service. Please check the form."
                );
            },
        });
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Service
                </h2>
            }
        >
            <Head title="Create Service" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Add New Service
                                </h3>
                                <Link
                                    href={route("admin.services.index")}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Back to Services
                                </Link>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="service_name"
                                        value="Service Name"
                                    />
                                    <TextInput
                                        id="service_name"
                                        type="text"
                                        name="service_name"
                                        value={data.service_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "service_name",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.service_name}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="car_type"
                                        value="Car Type"
                                    />
                                    <TextInput
                                        id="car_type"
                                        type="text"
                                        name="car_type"
                                        value={data.car_type}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("car_type", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.car_type}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="price"
                                        value="Price (₮)"
                                    />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        required
                                        min="0"
                                    />
                                    <InputError
                                        message={errors.price}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton
                                        className="ml-4"
                                        disabled={processing}
                                    >
                                        Create Service
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
