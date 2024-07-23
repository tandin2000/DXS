import React from 'react'
import classNames from 'classnames'


import { Button, Drawer, Flex, Form, Card, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker } from 'antd';

const CompanyDetails = () => {
  const { TextArea } = Input;
  return (
    <>
      <div>

        <Card className="mb-4">
          <h4>
            <strong>Settings</strong>
          </h4>
          <div>
            <Form layout="vertical">
              <Row gutter={20}>
                <Col lg={12} xs={24}>
                  <Form.Item label="SalCash Withdrawal Fees">
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>






              <Row>
                <Col lg={24} className='pull-right'>
                  <Button type='primary' danger>Cancel</Button>
                  <Button type="primary" className='ml-15'>Save</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Card>


      </div>
    </>
  )
}

export default CompanyDetails
