import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../queries";
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

const CarForm = () => {
  const styles = getStyles();
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const [listOwners, setListOwners] = useState();

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, model, make, price, personId } = values;

    addCar({
      variables: {
        id,
        year,
        model,
        make,
        price,
        personId,
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...ADD_CAR,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "loading...";
  if (error) return `Error ${error.message}`;
  let owners = data;

  return (
    <>
      <h2 style={{ fontSize: "1.5rem" }}>Add Car Form</h2>
      <Form
        style={styles.form}
        form={form}
        name="add-car-form"
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          label="Model year"
          name="year"
          rules={[
            { requred: true, message: "Please input the vehicle's model year" },
          ]}
        >
          <Input style={styles.input} placeholder="Year" />
        </Form.Item>
        <Form.Item
          label="Make"
          name="make"
          rules={[{ requred: true, message: "Please input the vehicle make" }]}
        >
          <Input style={styles.input} placeholder="Make" />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[{ requred: true, message: "Please input the vehicle model" }]}
        >
          <Input style={styles.input} placeholder="Model" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ requred: true, message: "Please input the vehicle price" }]}
        >
          <Input style={styles.input} placeholder="Price" />
        </Form.Item>
        <Form.Item
          label="Owner"
          name="personId"
          rules={[{ requred: true, message: "Please select the owner's ID" }]}
        >
          <Select style={styles.input}>
            {owners.people.map(({ id, firstName, lastName }) => (
              <Select.Option key={id} value={id}>
                {firstName} {lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              style={{ width: "150px" }}
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default CarForm;
