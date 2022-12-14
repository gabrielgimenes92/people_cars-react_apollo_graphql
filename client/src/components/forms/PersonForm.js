import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { ADD_PERSON, GET_PEOPLE } from "../../queries";
import { v4 as uuidv4 } from "uuid";

const getStyles = () => ({
  form: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "1200px",
    justifyContent: "space-around",
    marginTop: "10px",
    marginBottom: "40px",
  },
  input: {
    minWidth: "150px",
  },
});

const PersonForm = () => {
  const styles = getStyles();
  const [id] = useState(uuidv4());
  const [addPerson] = useMutation(ADD_PERSON);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <>
      <h2 style={{ marginTop: "40px", fontSize: "1.5rem" }}>Add person form</h2>
      <Form
        form={form}
        name="add-person-form"
        layout="inline"
        onFinish={onFinish}
        size="large"
        style={styles.form}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ requred: true, message: "Please input your first name" }]}
        >
          <Input style={styles.input} placeholder="First name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ requred: true, message: "Please input your last name" }]}
        >
          <Input style={styles.input} placeholder="Last name" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              style={styles.input}
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default PersonForm;
