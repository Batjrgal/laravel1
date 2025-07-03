import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Form, Input, Button, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { router } from "@inertiajs/react";

const { Title } = Typography;

export default function ForgotPassword({ status }) {
    const [form] = Form.useForm();
    const [data, setData] = useState({ email: "" });
    const [errors, setErrors] = useState({});

    const submit = (values) => {
        router.post(route("password.email"), values, {
            onSuccess: () => message.success("Password reset link sent!"),
            onError: (err) => setErrors(err),
        });
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
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
                    Forgot Password
                </Title>
                <div
                    style={{
                        marginBottom: 16,
                        color: "#888",
                        textAlign: "center",
                    }}
                >
                    Forgot your password? No problem. Just let us know your
                    email address and we will email you a password reset link
                    that will allow you to choose a new one.
                </div>
                {status && (
                    <div
                        style={{
                            marginBottom: 16,
                            color: "#52c41a",
                            textAlign: "center",
                        }}
                    >
                        {status}
                    </div>
                )}
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={submit}
                    initialValues={data}
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
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                            }
                            autoComplete="username"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Email Password Reset Link
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </GuestLayout>
    );
}
