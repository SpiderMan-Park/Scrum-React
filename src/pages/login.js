import LoginWrap from "./components/login_wrap";
import { Button, Form, Input, Divider } from "antd";
import { Link } from "react-router-dom";
import { userLoginService } from '../api/user'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [form] = Form.useForm();

    async function login_click() {
        const form_data = await form.validateFields();
        if (form_data) {
            const res = await userLoginService(form_data)
            if (res.data.code === 0) {
                navigate('/project')
            }
        }
    }

    return (
        <LoginWrap>
            <Form form={form}>
                <h2 style={{ marginBottom: "40px" }}>请登录</h2>
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
                    <Button type="primary" htmlType="submit" className="login_button" onClick={login_click}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
            <Divider />
            <Link className="login_enroll" to={'/register'}>没有账号？注册新账号</Link>
        </LoginWrap>
    );
}

export default Login;
