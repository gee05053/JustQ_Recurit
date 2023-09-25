import React from "react";
import { Row, Col, Card } from "antd";

const ProductList: React.FC = () => {
	const arrayTest = [1, 2, 3, 4];
	return (
		<div>
			<Row
				justify="space-between"
				style={{ marginTop: "2%", marginBottom: "2%" }}
			>
				{arrayTest.map((data) => {
					return (
						<Col
							span={4}
							style={{
								textAlign: "center",
							}}
						>
							<Card hoverable>
								<Card.Meta title={data} />
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
};

export default ProductList;
