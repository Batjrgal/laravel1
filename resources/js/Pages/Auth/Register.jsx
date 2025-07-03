import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Form, Input, Button, Steps, message, Typography } from "antd";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const steps = [
        {
            title: "Account Info",
            content: (
                <>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your name",
                            },
                        ]}
                        initialValue={data.name}
                        validateStatus={errors.name ? "error" : ""}
                        help={errors.name}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "Please enter a valid email",
                            },
                        ]}
                        initialValue={data.email}
                        validateStatus={errors.email ? "error" : ""}
                        help={errors.email}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your phone number",
                            },
                        ]}
                        initialValue={data.phone}
                        validateStatus={errors.phone ? "error" : ""}
                        help={errors.phone}
                    >
                        <Input
                            prefix={<PhoneOutlined />}
                            placeholder="Phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            title: "Password",
            content: (
                <>
                    <Form.Item
                        name="password"
                        label="Password"
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
                        />
                    </Form.Item>
                    <Form.Item
                        name="password_confirmation"
                        label="Confirm Password"
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password",
                            },
                        ]}
                        validateStatus={
                            errors.password_confirmation ? "error" : ""
                        }
                        help={errors.password_confirmation}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Confirm Password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                    </Form.Item>
                </>
            ),
        },
    ];

    const next = async () => {
        try {
            await form.validateFields(["name", "email", "phone"]);
            setCurrent(current + 1);
        } catch (err) {
            // validation error
        }
    };

    const prev = () => setCurrent(current - 1);

    const submit = () => {
        form.validateFields()
            .then(() => {
                post(route("register"), {
                    onSuccess: () =>
                        message.success("Registration successful!"),
                });
            })
            .catch(() => {});
    };

    return (
        <GuestLayout>
            <Head title="Register" />
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
                    Register
                </Title>
                <Steps current={current} style={{ marginBottom: 32 }}>
                    {steps.map((item) => (
                        <Steps.Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form form={form} layout="vertical" initialValues={data}>
                    {steps[current].content}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 24,
                        }}
                    >
                        {current > 0 && (
                            <Button onClick={prev} style={{ minWidth: 100 }}>
                                Previous
                            </Button>
                        )}
                        {current < steps.length - 1 && (
                            <Button
                                type="primary"
                                onClick={next}
                                style={{ minWidth: 100 }}
                            >
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button
                                type="primary"
                                loading={processing}
                                onClick={submit}
                                style={{ minWidth: 100 }}
                            >
                                Register
                            </Button>
                        )}
                    </div>
                </Form>
                <div style={{ marginTop: 24, textAlign: "center" }}>
                    <Text>Already registered? </Text>
                    <Link href={route("login")}>Log in</Link>
                </div>
            </div>
        </GuestLayout>
    );
}
