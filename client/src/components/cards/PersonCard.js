import { EditOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CARS_BY_PERSONID } from "../../queries";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import CarCard from "./CarCard";
import CarsList from "../lists/CarsList";

const getStyles = () => ({
  card: {
    minWidth: "300px",
  },
});

const PersonCard = (props) => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);
  const [carsList, setCarsList] = useState([]);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  /*   const UpdateCarsList = (id) => {
    const { loading, error, data } = useQuery(GET_CARS_BY_PERSONID, {
      variables: { id },
    });
    if (loading) return "loading...";
    if (error) return `Error ${error.message}`;

    console.log(data.carsList);

    return data.carsList;
  }; */

  /* useEffect((id) => {
    const carlist123 = updateCarsList(id);
  }, []); */

  return (
    <>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          bordered={false}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson
              id={id} /* firstName={firstName} lastName={lastName} */
            />,
          ]}
        >
          <h3>
            {firstName} {lastName}
          </h3>
          <CarsList personId={id} />
        </Card>
      )}
    </>
  );
};

export default PersonCard;
