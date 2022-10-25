import { Card } from "antd";

const getStyles = () => ({
  card: {
    minWidth: "300px",
    /* padding: '15px',
    marginBottom: '50px' */
  },
});

const CarCard = (props) => {
  const { id, year, make, model, price, personId } = props;
  const styles = getStyles();
  return (
    <Card bordered={false} style={styles.card}>
      <h3>
        {make} {model} - {year}
      </h3>
      <p>${price}</p>
      <p>Owned by {personId}</p>
    </Card>
  );
};

export default CarCard;
