import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = () => {
        post(route("login"), {
            onSuccess: () => message.success("Login successful!"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
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
                    Log in
                </Title>
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
                <Form layout="vertical" onFinish={submit} initialValues={data}>
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
                            onChange={(e) => setData("email", e.target.value)}
                            autoComplete="username"
                        />
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
                        validateStatus={errors.password ? "error" : ""}
                        help={errors.password}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            autoComplete="current-password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                    >
                        <Checkbox
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        >
                            Remember me
                        </Checkbox>
                    </Form.Item>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 16,
                        }}
                    >
                        {canResetPassword && (
                            <Link href={route("password.request")}>
                                Forgot your password?
                            </Link>
                        )}
                    </div>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={processing}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ marginTop: 24, textAlign: "center" }}>
                    <span>Don't have an account? </span>
                    <Link href={route("register")}>Register</Link>
                </div>
            </div>
        </GuestLayout>
    );
}
