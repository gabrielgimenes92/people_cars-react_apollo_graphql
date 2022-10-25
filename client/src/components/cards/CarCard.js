import { Card } from "antd";

const CarCard = (props) => {
  const { id, year, make, model, price, personId } = props;
  return (
    <Card bordered={false}>
      <h3>
        {make} {model} - {year}
      </h3>
      <p>${price}</p>
      <p>Owned by {personId}</p>
    </Card>
  );
};

export default CarCard;
