import { List } from "antd";
import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../queries";
import PersonCard from "../cards/PersonCard";

const PeopleList = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "loading...";
  if (error) return `Error ${error.message}`;

  return (
    <List>
      {data.people.map(({ id, firstName, lastName }) => (
        <List.Item key={id}>
          <PersonCard id={id} firstName={firstName} lastName={lastName} />
        </List.Item>
      ))}
    </List>
  );
};

export default PeopleList;
