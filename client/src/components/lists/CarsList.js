import { List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import CarCard from "../cards/CarCard";

const CarsList = () => {
  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "loading...";
  if (error) return `Error ${error.message}`;

  return (
    <List>
      {data.cars.map(({ id, year, make, model, price, personId }) => (
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
