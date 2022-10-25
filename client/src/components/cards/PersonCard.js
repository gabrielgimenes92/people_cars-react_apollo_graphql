import { Card } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CAR } from "../../queries";

const getStyles = () => ({
  card: {
    minWidth: "300px",
  },
});

const PersonCard = (props) => {
  /*   const { loading, error, data } = useQuery(GET_CAR);
  if (loading) return "loading...";
  if (error) return `Error ${error.message}`; */

  const { id, firstName, lastName } = props;
  const styles = getStyles();
  return (
    <Card bordered={false} style={styles.card}>
      <h3>
        {firstName} {lastName}
      </h3>
    </Card>
  );
};

export default PersonCard;
