import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function UserJobsIndex({ auth, jobs }) {
    const formatCurrency = (amount) => `\u20ae${amount.toLocaleString()}`;

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    My Jobs
                </h2>
            }
        >
            <Head title="My Jobs" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                All My Jobs
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Service
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {jobs.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={3}
                                                    className="text-center py-8 text-gray-500"
                                                >
                                                    No jobs found.
                                                </td>
                                            </tr>
                                        )}
                                        {jobs.map((job) => (
                                            <tr key={job.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {job.service?.service_name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">
                                                    {formatCurrency(
                                                        job.service?.price || 0
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {new Date(
                                                        job.created_at
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
