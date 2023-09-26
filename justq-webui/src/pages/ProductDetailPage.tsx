import React from "react";
import { Row, Col, Image, Divider, Tag } from "antd";
import { useLocation } from "react-router-dom";
import { productType } from "../components/ProductList";

const ProductDetailPage: React.FC = () => {
	const location = useLocation();
	const product: productType = location.state.product;
	var keywords: string[] = [];
	if (product.keywords) {
		keywords = product.keywords[0].split(";");
	}
	return (
		<Row
			gutter={[24, 16]}
			justify="center"
			align="middle"
			style={{ height: "100vh" }}
		>
			<Col span={24}>
				<Col>
					<h1
						style={{
							display: "flex",
							justifyContent: "center",
							marginBottom: "100px",
						}}
					>
						모델 상세 정보
					</h1>
				</Col>
				<Row
					justify="center"
					align="middle"
					gutter={[24, 0]}
				>
					<Col>
						<Image
							src={product.main_image}
							width={410}
						/>
					</Col>
					<Col span={6}>
						<div
							style={{
								fontWeight: "bold",
								fontSize: "20px",
								marginBottom: "5px",
							}}
						>
							{product.product_name}
						</div>
						<div style={{ fontSize: "15px" }}>
							원산지: {<b>{product.origin}</b>}
						</div>
						<Divider />
						<div
							style={{
								color: "#cb1400",
								fontWeight: "bold",
								fontSize: "25px",
							}}
						>
							{product.price
								? product.price
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
								: ""}
							원
						</div>
						<Divider />
						<div>모델명/품번: {<b>{product.model}</b>}</div>
						<Divider />
						<div>
							{keywords.map((keyword) => {
								return (
									<Tag style={{ marginBottom: "5px" }}>{keyword}</Tag>
								);
							})}
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};

export default ProductDetailPage;
