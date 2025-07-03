import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Form, Input, Button, Typography, message } from "antd";

const { Title } = Typography;

export default function ConfirmPassword() {
    const [form] = Form.useForm();

    useEffect(() => {
        return () => {
            form.resetFields(["password"]);
        };
    }, []);

    const submit = (values) => {
        window.Inertia.post(route("password.confirm"), values, {
            onSuccess: () => message.success("Password confirmed!"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />
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
                    Confirm Password
                </Title>
                <div
                    style={{
                        marginBottom: 16,
                        color: "#888",
                        textAlign: "center",
                    }}
                >
                    This is a secure area of the application. Please confirm
                    your password before continuing.
                </div>
                <Form form={form} layout="vertical" onFinish={submit}>
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
                            autoComplete="current-password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Confirm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </GuestLayout>
    );
}
