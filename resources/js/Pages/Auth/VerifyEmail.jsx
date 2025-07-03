import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Typography, message } from "antd";

const { Title, Text } = Typography;

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"), {
            onSuccess: () => message.success("Verification email sent!"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />
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
                    Email Verification
                </Title>
                <Text type="secondary">
                    Thanks for signing up! Before getting started, could you
                    verify your email address by clicking on the link we just
                    emailed to you? If you didn't receive the email, we will
                    gladly send you another.
                </Text>
                {status === "verification-link-sent" && (
                    <div
                        style={{
                            margin: "16px 0",
                            color: "#52c41a",
                            textAlign: "center",
                        }}
                    >
                        A new verification link has been sent to the email
                        address you provided during registration.
                    </div>
                )}
                <form onSubmit={submit}>
                    <div
                        style={{
                            marginTop: 24,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={processing}
                        >
                            Resend Verification Email
                        </Button>
                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            style={{
                                color: "#888",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: 14,
                            }}
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
