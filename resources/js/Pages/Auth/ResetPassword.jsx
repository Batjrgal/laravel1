import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Form, Input, Button, Typography, message } from "antd";

const { Title } = Typography;

export default function ResetPassword({ token, email }) {
    const [form] = Form.useForm();

    useEffect(() => {
        return () => {
            form.resetFields(["password", "password_confirmation"]);
        };
    }, []);

    const submit = (values) => {
        window.Inertia.post(
            route("password.store"),
            { ...values, token, email },
            {
                onSuccess: () => message.success("Password reset successful!"),
            }
        );
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />
            <div
                style={{
                    maxWidth: 400,
                    margin: "40px auto",
                    background: "#fff",
                    padding: 32,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #f0f1f2",
                }}
            >
                <Title level={2} style={{ textAlign: "center" }}>
                    Reset Password
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={submit}
                    initialValues={{ email }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please enter your email",
                            },
                        ]}
                    >
                        <Input placeholder="Email" autoComplete="username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your password",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Password"
                            autoComplete="new-password"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="password_confirmation"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Passwords do not match!")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </GuestLayout>
    );
}
