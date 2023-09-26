import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App: React.FC = () => {
	return (
		<Routes>
			<Route
				index
				element={<ProductPage />}
			/>
			<Route
				path="/product"
				element={<ProductDetailPage />}
			/>
		</Routes>
	);
};

export default App;
