import React, { useState, useEffect } from "react";
import { Select, Pagination, Row, Col, Input, Form, Button } from "antd";
import ProductList from "../components/ProductList";
import axios from "axios";

type paramsType = {
	cardCount: number;
	pageCount: number;
	searchString: string;
};

const ProductPage: React.FC = () => {
	const sessionData = window.sessionStorage.getItem("sessionData");
	var jsonData: paramsType = {
		cardCount: 4,
		pageCount: 1,
		searchString: "",
	};
	if (sessionData) {
		jsonData = JSON.parse(sessionData);
	}
	const [params, setParams] = useState<paramsType>(jsonData);
	const [productlist, setProductList] = useState<Array<object>>([]);
	const [totalProductCount, setTotalProductCount] = useState<number>(0);
	const [form] = Form.useForm();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("/plist", {
					params: {
						cardCount: params.cardCount,
						pageCount: params.pageCount,
						searchString: params.searchString,
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
				searchString: params.searchString,
			}),
		);
	}, [params]);

	return (
		<Row
			justify="center"
			align="middle"
			style={{
				height: "100vh",
				marginInline: "10%",
			}}
		>
			<Col>
				<Col style={{ textAlign: "center", fontSize: "20px" }}>
					<Button
						type="link"
						onClick={() => {
							form.setFieldsValue({ search: "" });
							setParams({
								cardCount: params.cardCount,
								pageCount: 1,
								searchString: "",
							});
						}}
					>
						<h1 style={{ margin: 0, fontSize: "50px", color: "#205f85" }}>
							JustQ
						</h1>
					</Button>
				</Col>
				<Col style={{ textAlign: "end" }}>
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
								searchString: params.searchString,
							})
						}
					/>
				</Col>
				<Col>
					<ProductList data={productlist} />
				</Col>
				<Col style={{ textAlign: "center" }}>
					<Pagination
						total={totalProductCount}
						pageSize={params.cardCount}
						defaultCurrent={params.pageCount}
						current={params.pageCount}
						onChange={(page: number) =>
							setParams({
								cardCount: params.cardCount,
								pageCount: page,
								searchString: params.searchString,
							})
						}
						showSizeChanger={false}
					/>
					<Form form={form}>
						<Form.Item name="search">
							<Input.Search
								allowClear={true}
								style={{
									width: "400px",
									marginTop: "13px",
									marginBottom: "50px",
								}}
								onSearch={(value: string) =>
									setParams({
										cardCount: params.cardCount,
										pageCount: 1,
										searchString: value,
									})
								}
							/>
						</Form.Item>
					</Form>
				</Col>
			</Col>
		</Row>
	);
};

export default ProductPage;
