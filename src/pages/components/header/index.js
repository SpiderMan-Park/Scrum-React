import ProjectPopover from "./projectPopover"
import UserPopover from "./userPopover"
import { useNavigate } from 'react-router-dom'
import { userLogoutService } from '../../../api/user'
function Header() {
    const navigate = useNavigate()
    function home_click() {
        navigate('/project')
    }
    async function logout() {
        await userLogoutService()
        navigate('/login')
    }
    return (
        <div className="header_wrap_body">
            <button className="header_button" onClick={home_click}>
                <div className="icon_blue"></div>
                <h2>Jira Software</h2>
            </button>
            <ProjectPopover />
            <UserPopover />
            <div className="header_login_out_btn" onClick={logout}>退出登录</div>
        </div>
    )
}


export default Header