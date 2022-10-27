import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { UPDATE_CAR, GET_PEOPLE } from "../../queries";

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const [updateCar] = useMutation(UPDATE_CAR);

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, model, make, price, personId } = values;

    updateCar({
      variables: {
        id,
        year,
        model,
        make,
        price,
        personId,
      },
    });

    props.onButtonClick();
  };

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "loading...";
  if (error) return `Error ${error.message}`;

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year: year,
        model: model,
        make: make,
        price: price,
        personId: personId,
      }}
    >
      <Form.Item
        label="Model year"
        name="year"
        rules={[
          { required: true, message: "Please input the vehicle's model year" },
        ]}
      >
        <Input placeholder="2005" />
      </Form.Item>
      <Form.Item
        label="Make"
        name="make"
        rules={[{ required: true, message: "Please input the vehicle make" }]}
      >
        <Input placeholder="Ford" />
      </Form.Item>

      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: "Please input the vehicle model" }]}
      >
        <Input placeholder="Escape" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the vehicle price" }]}
      >
        <Input placeholder="25000" />
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
              (!form.isFieldTouched("year") &&
                !form.isFieldTouched("make") &&
                !form.isFieldTouched("model") &&
                !form.isFieldTouched("price") &&
                !form.isFieldTouched("personId")) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button type="danger" onClick={props.onButtonClick}>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateCar;
