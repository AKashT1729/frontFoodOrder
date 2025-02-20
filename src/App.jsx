import "./App.css";
import Categories from "./components/Categories";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SubNav from "./components/SubNav";

function App() {
  return (
    <>
      <Navbar />
      <SubNav />
      {/* //<Home/> */}
      <Categories />
    </>
  );
}

export default App;
