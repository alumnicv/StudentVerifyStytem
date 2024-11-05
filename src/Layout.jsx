import Footer from "./layout/Footer";
import Header from "./layout/Header";
import Main from "./layout/Main";
import style from "./layout/Main.module.css";

function Layout() {
  return (
    <div className={style.layout}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Layout;
