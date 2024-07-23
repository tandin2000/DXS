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
            <strong>Company Status</strong>
          </h4>
          <hr />
          <div>
            <Form layout="vertical">
              <Row gutter={20}>
                <Col lg={12} xs={24}>
                  <h4>
                    <strong>Current Month</strong>
                    <hr />
                  </h4>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th >Number of Companies</th>
                        <td>1</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th >Total no of Employees</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Pending Approvals</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Total Amount of Pending Approvals</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Approval Advances</th>
                        <td colSpan={1}>1</td>
                      </tr>
                      <tr>
                        <th >Total Amount of Approval Advances</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Total Amount Due to the Bank</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Total Fees to be Collected</th>
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
                        <th >Number of Companies</th>
                        <td>1</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th >Total no of Employees</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Pending Approvals</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Total Amount of Pending Approvals</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Total No of Approval Advances</th>
                        <td colSpan={1}>1</td>
                      </tr>
                      <tr>
                        <th >Total Amount of Approval Advances</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Total Amount Due to the Bank</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Total Fees to be Collected</th>
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
