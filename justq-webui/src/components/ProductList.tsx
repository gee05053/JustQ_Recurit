import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";

export type productType = {
	brand?: string | null;
	category_code?: string | null;
	id?: string | null;
	keywords?: Array<string> | null;
	main_image?: string | undefined;
	model?: string | null;
	origin?: string | null;
	owner_product_code?: string | null;
	price?: string | null;
	product_name?: string | null;
	status?: string | null;
};

type ListData = {
	data: Array<productType>;
};

const ProductList: React.FC<ListData> = ({ data }) => {
	if (data.length === 0) {
		return <div>No Data</div>;
	} else {
		return (
			<Row
				gutter={[16, 16]}
				justify="space-between"
				style={{ margin: "20px 0" }}
			>
				{data.map((product) => {
					return (
						<Col
							key={product.id}
							span={6}
							style={{
								textAlign: "center",
							}}
						>
							<Link
								to={`/product?id=${product.id}`}
								state={{ product: product }}
							>
								<Card
									hoverable
									cover={
										<img
											alt="product"
											src={product.main_image}
										/>
									}
									bodyStyle={{ padding: "24px 20px", height: "120px" }}
								>
									<Card.Meta
										title={
											<div style={{ whiteSpace: "normal" }}>
												{product.product_name}
											</div>
										}
										description={
											<div
												style={{ color: "#cb1400", fontWeight: "bold" }}
											>
												{product.price
													? product.price
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
													: ""}
												원
											</div>
										}
									/>
								</Card>
							</Link>
						</Col>
					);
				})}
			</Row>
		);
	}
};

export default ProductList;
