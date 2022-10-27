import { List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CARS, GET_CARS_BY_PERSONID } from "../../queries";
import CarCard from "../cards/CarCard";

const CarsList = (props) => {
  const { personId } = props;
  const { loading, error, data } = useQuery(GET_CARS_BY_PERSONID, {
    variables: { personId },
  });
  if (loading) return "loading...";
  if (error) return `Error ${error.message}`;

  console.log(data);

  return (
    <List>
      {data.carsByPerson.map(({ id, year, make, model, price, personId }) => (
        <List.Item key={id}>
          <CarCard
            id={id}
            year={year}
            make={make}
            model={model}
            price={price}
            personId={personId}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default CarsList;
