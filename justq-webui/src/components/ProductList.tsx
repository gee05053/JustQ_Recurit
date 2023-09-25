import React from "react";
import { Row, Col, Card } from "antd";

type ListData = {
	data: Array<any>;
};
const ProductList: React.FC<ListData> = ({ data }) => {
	return (
		<div>
			<Row
				gutter={[16, 16]}
				justify="space-between"
				style={{ marginTop: "2%", marginBottom: "2%" }}
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
							<Card
								hoverable
								cover={
									<img
										alt="product"
										src={product.main_image}
									/>
								}
								bodyStyle={{ padding: "24px 20px", whiteSpace: "normal" }}
							>
								<Card.Meta
									title={product.product_name}
									description={
										<div style={{ color: "#cb1400", fontWeight: "bold" }}>
											{product.price
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
											원
										</div>
									}
								/>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default ProductList;
