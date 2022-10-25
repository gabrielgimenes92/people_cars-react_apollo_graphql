import { useMutation, useQuery } from "@apollo/client";
import { Form, Input, Button, Select } from "antd";
import { useState, useEffect } from "react";
import { ADD_CAR, GET_PEOPLE } from "../../queries";
import { v4 as uuidv4 } from "uuid";

const CarForm = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);
  const [listOwners, setListOwners] = useState();

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "loading...";
  if (error) return `Error ${error.message}`;

  return (
    <Form
      form={form}
      name="add-car-form"
      onFinish={onFinish}
      size="large"
      style={{ marginBottom: "40px" }}
    >
      <Form.Item
        label="Model year"
        name="year"
        rules={[
          { requred: true, message: "Please input the vehicle's model year" },
        ]}
      >
        <Input placeholder="Year" />
      </Form.Item>
      <Form.Item
        label="Make"
        name="make"
        rules={[{ requred: true, message: "Please input the vehicle make" }]}
      >
        <Input placeholder="Make" />
      </Form.Item>
      <Form.Item
        label="Model"
        name="model"
        rules={[{ requred: true, message: "Please input the vehicle model" }]}
      >
        <Input placeholder="Model" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ requred: true, message: "Please input the vehicle price" }]}
      >
        <Input placeholder="Price" />
      </Form.Item>
      <Form.Item
        label="Owner"
        name="personId"
        rules={[{ requred: true, message: "Please input the owner's ID" }]}
      >
        <Select>
          {data.people.map(({ id, firstName, lastName }) => (
            <Select.Option key={id} value={firstName}>
              {firstName} {lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default CarForm;
