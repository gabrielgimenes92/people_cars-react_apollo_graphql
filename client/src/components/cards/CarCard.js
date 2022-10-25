import { Card } from "antd";

const CarCard = (props) => {
  const { id, year, make, model, price, personId } = props;
  return (
    <Card>
      {make} {model}
    </Card>
  );
};

export default CarCard;
