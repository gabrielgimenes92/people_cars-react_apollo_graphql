import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";
import CarsList from "../lists/CarsList";

const getStyles = () => ({
  card: {
    minWidth: "800px",
  },
});

const PersonCard = (props) => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

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
          bordered={true}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          <h2>
            {firstName} {lastName}
          </h2>
          <CarsList personId={id} />
        </Card>
      )}
    </>
  );
};

export default PersonCard;
