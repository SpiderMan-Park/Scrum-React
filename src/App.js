import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/login'
import Register from './pages/register'
import Layout from './pages/components/layout';
import Project from './pages/project';
import Epic from './pages/epic';
import Kanban from './pages/kanban';
import { notification } from 'antd'
import { useEffect } from 'react';
import EventBus from './util/event';
import { useDispatch } from 'react-redux'
import { get_org_async, get_project_list_async, get_task_type_async, get_users_async } from './redux/slice/project';

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const Map = {
    success: 'global_success_tips',
    error: 'global_error_tips',
    warning: 'global_warning_tips'
  }
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (msg, status) => {
    api[status]({
      message: msg,
      placement: 'topRight',
    });
  };

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/project')
    }
    dispatch(get_users_async())
    dispatch(get_org_async())
    dispatch(get_task_type_async())

    dispatch(get_project_list_async()) // 拉取项目列表

    // 没有登录
    EventBus.on("global_not_login", function (msg) {
      navigate('/login')
    })
    EventBus.on(Map.error, (msg) => {
      openNotification(msg, 'error')
    })
    EventBus.on(Map.success, (msg) => {
      openNotification(msg, 'success')
    })
  }, [])

  return (
    <div className="App">
      {contextHolder}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Layout />}>
          <Route path='/project' element={<Project />} />
          <Route path='/project/:id/kanban' element={<Kanban />} />
          <Route path='/project/:id/epic' element={<Epic />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
