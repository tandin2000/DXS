import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button, Card, Input, Form, Row, Col, notification } from 'antd';
import RestAPI from '../../../common/RestServices/RestAPI';

const CompanyDetails = () => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({ salcash_fee: '' });
  const { TextArea } = Input;

  const getSalcashFee = async () => {
    try {
      const response = await RestAPI.GETSalcashFee();
      if (response && response.data) {
        setInitialValues({ salcash_fee: response.data.salcash_fee });
        form.setFieldsValue({ salcash_fee: response.data.salcash_fee });
      }
    } catch (error) {
      notification.error({ message: 'Failed to fetch data' });
    }
  };


  const handleUpdate = async () => {
    try {
      const values = form.getFieldsValue();
      await RestAPI.UPDATESalcashFee(values);
      setInitialValues({ salcash_fee: values.salcash_fee });
      notification.success({ message: 'Update successful' });
    } catch (error) {
      notification.error({ message: 'Update failed' });
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(initialValues);
  };

  useEffect(() => {
    getSalcashFee();
  }, []);

  return (
    <div>
      <Card className="mb-4">
        <h4>
          <strong>Settings</strong>
        </h4>
        <div>
          <Form form={form} layout="vertical">
            <Row gutter={20}>
              <Col lg={12} xs={24}>
                <Form.Item
                  name="salcash_fee"
                  label="SalCash Withdrawal Fees"
                  initialValue={initialValues.salcash_fee}
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col lg={24} className='pull-right'>
                <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
                <Button type="primary" className='ml-15' onClick={handleUpdate}>Update</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default CompanyDetails;
