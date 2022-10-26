import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import RemovePerson from "../buttons/RemovePerson";
import UpdatePerson from "../forms/UpdatePerson";

const getStyles = () => ({
  card: {
    minWidth: "300px",
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
        </Card>
      )}
    </>
  );
};

export default PersonCard;
