import { NavLink, Outlet } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import User from '../../assets/user.svg'
import './main.css'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { languageUtils } from '../../utils/language.utils'
function Dashboart() {
  const queryClient = useQueryClient()
  const language = useQuery({
    queryKey: ['languages'],
    queryFn: languageUtils.getLanguage
  })

  const defaultLang = localStorage.getItem("language")
  const changeLnguage = (e) => {
    e.preventDefault()
    localStorage.setItem("language", e.target.value)
    queryClient.invalidateQueries({type: "all"})
  }
  return (
    <div>
      <div className="dashboart">
          <div className="dashboart-inner">
            <div className="aside-dashboart w-25">
                <img className='dash-img-logo' src={Logo} alt="logo" />
                <hr />
                <div className="link-wrap-dash">
                  <NavLink className='dash-link' to="home">Home</NavLink>
                  <NavLink className='dash-link' to="language">Language</NavLink>
                  <NavLink className='dash-link' to="translate">Translate</NavLink>
                  <NavLink className='dash-link' to="region">Region</NavLink>
                  <NavLink className='dash-link' to="place">Place</NavLink>
                  <NavLink className='dash-link' to='cottage-type'>Cottage type</NavLink>
                  <NavLink className='dash-link' to="comfort">Comfort</NavLink> 
                  <NavLink className='dash-link' to = 'cottage'>Cottage</NavLink>
                  <NavLink className='dash-link' to='notification'>Notification</NavLink>
                  <NavLink className='dash-link' to='modales'>Models</NavLink>
                  <NavLink className='dash-link' to='permission'>Permission</NavLink>
                  <NavLink className='dash-link' to='roles'>Roles</NavLink>
                  {/* <Link to='/' className='log-aout'>Log out →</Link> */}
                </div>
            </div>
            <div className="main-dashboart">
              <div className="header-dashboart">
                <form className='d-flex justify-content-between w-100'>
                  <input className='input-search' type="search" name="search" placeholder='Search praducts...'/>
                <div className="user-dashboatr-header d-flex align-items-center gap-3">
                  <select name="language" className='form-control fw-medium' onChange={changeLnguage}>
                    {language.data?.length && language.data.map(e=> {
                      if(e.code == defaultLang) {
                        return <option key={e.id} selected value={e.code}>{e.code}</option>
                      }
                      return <option key={e.id} value={e.code}>{e.code}</option>
                    })}
                  </select>
                  <img className='userLogo' src={User} alt="userLogo" />
                </div>
                </form>
              </div>
              <hr />
              <div className="dashboart-main-structure">
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboart














































// import { useState } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, Button, theme } from "antd";
// const { Header, Sider, Content } = Layout;
// const App = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <Layout className="w-[1280px] mx-auto">
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={["1"]}
//           items={[
//             {
//               key: "0",
//               icon: <img src="https://picsum.photos/id/25/120/120" alt="ok" />,
//               label: "",		 
//             },
//             {
//               key: "1",
//               icon: <UserOutlined />,
//               label: "User",
//             },
//             {
//               key: "2",
//               icon: <VideoCameraOutlined />,
//               label: "Video Camera",
//             },
//             {
//               key: "3",
//               icon: <UploadOutlined />,
//               label: "Upload",
//             },
//           ]}
//         />
//       </Sider>
//       <Layout>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//           }}
//         >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: "16px",
//               width: 64,
//               height: 64,
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//             height: 590,
//             background: colorBgContainer,
//           }}
//         ></Content>
//       </Layout>
//     </Layout>
//   );
// };
// export default App;

