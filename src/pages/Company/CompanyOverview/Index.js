import React from 'react'
import classNames from 'classnames'




import { Button, Drawer, Flex, Card, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker } from 'antd';

const CompanyDetails = () => {
  const { TextArea } = Input;
  return (
    <>
      <div>

        <Card className="mb-4">
          <h4>
            <strong>Company Overview</strong>
          </h4>
          <hr />
          <div>
            <Form layout="vertical">
            <Row gutter={20}>
                <Col lg={6} xs={24}>
                  <Form.Item label="Company Name">
                  <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    /> 
                   
                  </Form.Item>
                </Col>
                <Col lg={6} xs={24}>
                  <Form.Item label="Total No of Employees">
                  <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col lg={12} xs={24}>
                  <h4>
                    <strong>Current Month</strong>
                    <hr />
                  </h4>
                 
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th >Month Started</th>
                        <td>1</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th >Month End</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Employees</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Pending Approvals</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Approved Advances</th>
                        <td colSpan={1}>1</td>
                      </tr>
                      <tr>
                        <th >Total Amount of Approved Advances</th>
                        <td colSpan={2}>1</td>
                      </tr>
                     
                      <tr>
                        <th >Total amount due to the bank</th>
                        <td colSpan={2}>1</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col lg={12} xs={24}>
                  <h4>
                    <strong>Previous Month</strong>
                    <hr />
                  </h4>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th >Month Started</th>
                        <td>1</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th >Month End</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Employees</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Pending Approvals</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Approved Advances</th>
                        <td colSpan={1}>1</td>
                      </tr>
                      <tr>
                        <th >Total Amount of Approved Advances</th>
                        <td colSpan={2}>1</td>
                      </tr>
                     
                      <tr>
                        <th >Total amount due to the bank</th>
                        <td colSpan={2}>1</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>






              <Row>
                <Col lg={24} className='pull-right'>

                  <Button type="primary" className='ml-15'>Refresh</Button>
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
