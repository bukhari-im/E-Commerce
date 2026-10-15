import { Navigate, Route, Routes} from "react-router";
import LoginPage from "./Pages/loginPage.jsx";
import { useAuth } from "@clerk/react";
import DashboardPage from "./Pages/DashboardPage.jsx";
import  ProductsPage from "./Pages/ProductsPage.jsx";
import OrdersPage from "./Pages/OrdersPage.jsx";
import CustomersPage from "./Pages/CustomersPage.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx"
import PageLoader from "./components/PageLoader.jsx";

function App() {
  const {isSignedIn, isLoaded} = useAuth();
  if (!isLoaded)  return <PageLoader/>
  return (
    <Routes>
      <Route  path="/login" element={ isSignedIn ? <Navigate to={"/dashboard"} replace/> : <LoginPage/>}/>

      <Route path="/" element={ isSignedIn ? <DashboardLayout/> : <Navigate to={"/login"} replace/>} >
      <Route index element={<Navigate to={"dashboard"} replace/>} />
      <Route path="dashboard" element= {<DashboardPage/>} />
      <Route path="products" element= {<ProductsPage/>} />
      <Route path="orders" element= {<OrdersPage/>} />
      <Route path="customers" element= {<CustomersPage/>} />
      </Route>
    </Routes>
  );
}

export default App;


