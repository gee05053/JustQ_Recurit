import React, { useState, useEffect } from "react";
import { Select, Pagination, Row, Col } from "antd";
import ProductList from "../components/ProductList";
import axios from "axios";

type paramsType = {
	cardCount: number;
	pageCount: number;
};

const ProductPage: React.FC = () => {
	const sessionData = window.sessionStorage.getItem("sessionData");
	var jsonData: paramsType = { cardCount: 4, pageCount: 1 };
	if (sessionData) {
		jsonData = JSON.parse(sessionData);
	}
	const [params, setParams] = useState<paramsType>(jsonData);
	const [productlist, setProductList] = useState<Array<object>>([]);
	const [totalProductCount, setTotalProductCount] = useState<number>(0);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/plist", {
					params: {
						cardCount: params.cardCount,
						pageCount: params.pageCount,
					},
				});
				setProductList(response.data.products);
				setTotalProductCount(response.data.total);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
		window.sessionStorage.setItem(
			"sessionData",
			JSON.stringify({
				cardCount: params.cardCount,
				pageCount: params.pageCount,
			}),
		);
	}, [params]);

	return (
		<Row
			align="middle"
			style={{ height: "100vh", marginInline: "10%" }}
		>
			<Col>
				<div
					style={{ display: "flex", justifyContent: "end", margin: "8px" }}
				>
					<Select
						defaultValue={String(params.cardCount)}
						style={{
							width: "67px",
							textAlign: "center",
						}}
						options={[
							{ value: "4", label: 4 },
							{ value: "8", label: 8 },
							{ value: "24", label: 24 },
							{ value: "64", label: 64 },
							{ value: "128", label: 128 },
						]}
						onChange={(value: string) =>
							setParams({
								cardCount: Number(value),
								pageCount: 1,
							})
						}
					/>
				</div>
				<ProductList data={productlist} />
				<div style={{ display: "flex", justifyContent: "center" }}>
					<Pagination
						total={totalProductCount}
						pageSize={params.cardCount}
						defaultCurrent={params.pageCount}
						current={params.pageCount}
						onChange={(page: number) =>
							setParams({ cardCount: params.cardCount, pageCount: page })
						}
						showSizeChanger={false}
					/>
				</div>
			</Col>
		</Row>
	);
};

export default ProductPage;
