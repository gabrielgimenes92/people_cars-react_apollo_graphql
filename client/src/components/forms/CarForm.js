import { useMutation } from "@apollo/client";
import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { ADD_CAR } from "../../queries";
import { v4 as uuidv4 } from "uuid";

const CarForm = () => {
  const [id] = useState(uuidv4());
  const [addCar] = useMutation(ADD_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
  };

  return (
    <Form
      form={form}
      name="add-contact-form"
      layout="inline"
      onFinish={onFinish}
      size="large"
      style={{ marginBottom: "40px" }}
    >
      <Form.Item
        name="firstName"
        rules={[{ requred: true, message: "Please input your first name" }]}
      >
        <Input placeholder="First name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ requred: true, message: "Please input your last name" }]}
      >
        <Input placeholder="Last name" />
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
