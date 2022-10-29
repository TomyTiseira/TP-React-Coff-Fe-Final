import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartContext";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Error from "./components/Error";

function App() {
	return (
		<BrowserRouter>
			<CartProvider>
				<NavBar />
				<Routes>
					<Route exact path="/" element={<ItemListContainer/>}/>
					<Route exact path="/category/:id" element={<ItemListContainer/>}/>
					<Route exact path="/cart" element={<Cart/>}/>
					<Route exact path="/item/:itemId" element={<ItemDetailContainer/>}/>
					<Route exact path="/cart/checkout" element={<CheckOut/>}/>
					<Route path="*" element={<Error/>}/>
				</Routes>
			</CartProvider>
		</BrowserRouter>
	);
}

export default App;