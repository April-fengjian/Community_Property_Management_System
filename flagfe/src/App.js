import { Layout, Dropdown, Menu, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import LoginPage from "./components/LoginPage";
import TenantHomePage from "./components/TenantHomePage";
import ManagerHomePage from "./components/ManagerHomePage";
import ProviderHomePage from './components/ProviderHomePage';
import picture from './resources/picture.jpg';
 
const { Header, Content } = Layout; 
 
class App extends React.Component {
  state = {
    authed: false,
    role: undefined,
  };
 
  componentDidMount() {
    const authToken = localStorage.getItem("authToken");
    const role = localStorage.getItem("role");
    this.setState({
      authed: authToken !== null,
      role : role,
    });
  }
 
  handleLoginSuccess = (token, role) => {  
    localStorage.setItem("authToken", token);  
    localStorage.setItem("role", role);
    this.setState({
      authed: true,
      role : role,
    });
  };
 
  handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    this.setState({
      authed: false,
    });
  };
 
  renderContent = () => {        
    if (!this.state.authed) {
      return <LoginPage handleLoginSuccess={this.handleLoginSuccess} />;
    }
 
    if (this.state.role === "manager") {
      return <ManagerHomePage />;
    } else if (this.state.role === "provider") {
      return <ProviderHomePage />;
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
      {/* <div style={{ backgroundImage: `url(${picture})`, opacity: 0.05, width:"100%", height:"100%", position: "absolute", top: "0px", left: "0px"}}></div> */}
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

}
 
export default App;