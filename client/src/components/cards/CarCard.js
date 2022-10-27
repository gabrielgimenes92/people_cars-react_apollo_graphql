import { Card } from "antd";
import RemoveCar from "../buttons/RemoveCar";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import UpdateCar from "../forms/UpdateCar";

const getStyles = () => ({
  card: {
    minWidth: "700px",
    backgroundColor: "#F3F3F3",
  },
});

const CarCard = (props) => {
  const { id, year, make, model, price, personId } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          bordered={false}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
        >
          <p>
            {make} {model} - {year} - ${price}
          </p>
        </Card>
      )}
    </>
  );
};

export default CarCard;
