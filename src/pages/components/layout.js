import { Outlet, useLocation } from "react-router-dom"
import Header from "./header"
import LeftMenu from "./left_menu"


function Layout() {
    let location = useLocation()
    let is_project_page = location.pathname === '/project'

    return (
        // 类 BEM 命名
        <div className="layout_wrap">
            {/* header */}
            <div className="header_wrap">
                <Header />
            </div>
            {/* side & content */}
            <div className="layout_wrap_project">
                {/* 左侧side */}
                {
                    is_project_page ? null :
                        <div className="project_side_menu_wrap">
                            <LeftMenu />
                        </div>
                }
                {/* content */}
                <div className="project_wrap">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}


export default Layout