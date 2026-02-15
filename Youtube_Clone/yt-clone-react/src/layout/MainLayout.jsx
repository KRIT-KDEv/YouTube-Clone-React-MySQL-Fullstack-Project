import Nav from "../component/Nav/Nav"
import Sidebar from "../component/Sidebar/Sidebar";
import Content from "../component/Contents/Content";

function MainLayout() {
  return (
  <section id="main-layout">
    <Nav></Nav>
    <Sidebar></Sidebar>
    <Content></Content>
  </section>
  ); 
}

export default MainLayout
