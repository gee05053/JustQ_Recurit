import React, { useState, useEffect } from "react";
import { Select, Pagination, PaginationProps } from "antd";
import ProductList from "../components/ProductList";
import axios from "axios";

const ProductPage: React.FC = () => {
	const [cardCount, setCardCount] = useState<number>(4);
	const [pageCount, setPageCount] = useState<number>(1);
	const [productlist, setProductList] = useState<Array<any>>([]);
	const [totalPage, setTotalPage] = useState<number>(0);
	const onChangePageCount: PaginationProps["onChange"] = (
		page: number,
	) => {
		setPageCount(page);
	};
	useEffect(() => {
		const fetchData = async () => {
			const data = await axios
				.get("/plist", {
					params: { listCount: cardCount, pageCount: pageCount },
				})
				.then((res) => {
					return res.data;
				});
			console.log(data.data);
			setProductList(data.data);
			setTotalPage(data.total);
		};
		fetchData();
	}, [cardCount, pageCount]);
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
						{ value: "24", label: 24 },
						{ value: "64", label: 64 },
						{ value: "128", label: 128 },
					]}
					onChange={(value: string) => setCardCount(Number(value))}
				/>
			</div>
			<ProductList data={productlist} />
			<Pagination
				style={{
					display: "flex",
					justifyContent: "center",
				}}
				total={totalPage}
				pageSize={cardCount}
				defaultCurrent={1}
				onChange={onChangePageCount}
				showSizeChanger={false}
			/>
		</div>
	);
};

export default ProductPage;
