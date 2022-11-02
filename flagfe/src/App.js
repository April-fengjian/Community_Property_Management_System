import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import TenantHomePage from "./components/TenantHomePage";
import ManagerHomePage from "./components/ManagerHomePage";
import ServiceRequest from './components/ServiceRequest';
import picture from './resources/picture.jpg';
const items = [{label: "Service Request", key: "service-request"},
               {label: "Book Room", key: "book-room"},
               {label: "Payment", key: "payment"},
               {label: "Message", key:"message"}]
 
const { Header, Content } = Layout; 
 
class App extends React.Component {
  state = {
    authed: false,
    asManager: false,
  };
 
  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const asManager = localStorage.getItem("asManager") === "true";
    this.setState({
      authed: authToken !== null,
      asManager,
    });
  }
 
  handleLoginSuccess = (token, asManager) => {  
    localStorage.setItem("authToken", token);  
    localStorage.setItem("asManager", asManager);
    this.setState({
      authed: true,
      asManager,
    });
  };
 
  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("asManager");
    this.setState({
      authed: false,
    });
  };
 
  renderContent = () => {        
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }
 
    if (this.state.asManager) {
      return <ManagerHomePage />;
    }
 
    return <TenantHomePage />;
  };
 
  userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={this.handleLogOut}>
        Log Out
      </Menu.Item>
    </Menu>
  );
 
  render() {
    return (
      <>
      <div style={{ backgroundImage: `url(${picture})`, opacity: 0.05, width:"100%", height:"100%", position: "absolute", top: "0px", left: "0px"}}></div>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ fontSize: 24, fontWeight: 600, color: "white" }}>
            Flag Community
          </div>
          {this.state.authed && (
            <div>
              <Dropdown trigger="click" overlay={this.userMenu}>
                <Button icon={<UserOutlined />} shape="circle" />
              </Dropdown>
            </div>
          )}
        </Header>
        <Content
          style={{ height: "calc(100% - 64px)", padding: 60, margin: 0, overflow: "auto" }}  
        >
          {this.renderContent()}  
        </Content>
      </Layout>
      </>
    );
  }

// class App extends React.Component{
//   state = {
//     authed: true,
//     asTenant: true,
//   };

//   renderContent = () => {
//     if (!this.state.authed) {
//       return;
//     }
 
//     if (this.state.asTenant) {
//       return <ServiceRequest />;
//     }
 
//     // return <GuestHomePage />;
//   };
//   render(){
//     return (
//       <Layout>
//           <Header>
//           <div className="logo" />
//           <Menu
//               theme="dark"
//               mode="horizontal"
//               defaultSelectedKeys={['2']}
//               items={items}
//           />
//           </Header>
//           <Content
//               className="site-layout-background"
//               style={{
//               padding: 24,
//               minHeight: 480
//               }}
//           >
//             {this.renderContent()}
//           </Content>
          
//       </Layout>
//     );
//   }
  
}
 
export default App;