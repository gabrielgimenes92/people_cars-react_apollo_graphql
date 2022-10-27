import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import {
  GET_PEOPLE,
  REMOVE_PERSON,
  GET_CARS,
  REMOVE_CAR_PERSON,
} from "../../queries";

import filter from "lodash.filter";

const RemovePerson = ({ id }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (o) => {
            return o.id !== removePerson.id;
          }),
        },
      });
    },
  });

  const [removeCarPerson] = useMutation(REMOVE_CAR_PERSON, {
    update(cache, { data: { removeCarPerson } }) {
      const { car } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(car, (o) => {
            return o.personId !== removeCarPerson.personId;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (result) {
      removePerson({
        variables: {
          id,
        },
      });
      removeCarPerson({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemovePerson;
