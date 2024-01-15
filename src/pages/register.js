import LoginWrap from "./components/login_wrap";
import { Button, Form, Input, Divider } from "antd";
import { Link } from "react-router-dom";
import { userRegisterService } from "../api/user";

function Register() {

    const [form] = Form.useForm();

    async function register_click() {
        const form_data = await form.validateFields();
        if (form_data) {
            await userRegisterService(form_data)
        }
    }

    return (
        <LoginWrap>
            <Form form={form}>
                <h2 style={{ marginBottom: "40px" }}>请注册账号</h2>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "请输入用户名" }]}
                >
                    <Input placeholder="用户名" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "请输入密码" }]}
                >
                    <Input.Password placeholder="密码" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login_button" onClick={register_click}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
            <Divider />
            <Link className="login_enroll" to={'/login'}>已有账号？直接登录</Link>
        </LoginWrap>
    );
}

export default Register;
