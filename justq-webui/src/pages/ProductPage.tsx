import React, { useState } from "react";
import { Select, Pagination } from "antd";
import ProductList from "../components/ProductList";

const ProductPage: React.FC = () => {
	const [cardCount, setCardCount] = useState<number>(4);
	const onChangeCardCount = (value: string) => {
		setCardCount(Number(value));
	};
	//useEffect로 data API불러오기
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				height: "100vh",
				flexDirection: "column",
				marginInline: "10%",
			}}
		>
			<div style={{ display: "flex", justifyContent: "end" }}>
				<Select
					defaultValue="4"
					style={{
						width: "60px",
						textAlign: "center",
					}}
					options={[
						{ value: "4", label: 4 },
						{ value: "8", label: 8 },
						{ value: "24", label: 12 },
						{ value: "64", label: 64 },
						{ value: "128", label: 128 },
					]}
					onChange={onChangeCardCount}
				/>
			</div>
			<ProductList />
			<Pagination
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			/>
		</div>
	);
};

export default ProductPage;
