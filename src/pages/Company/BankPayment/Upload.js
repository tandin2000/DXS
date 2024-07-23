import React from 'react'
import classNames from 'classnames'
import { InboxOutlined } from '@ant-design/icons';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, Card, DatePicker,Tabs, message, Dropdown, Upload  } from 'antd';
const { Dragger } = Upload;
const CompanyDetails = () => {
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const { TextArea } = Input;
  return (
    <>
      <div>

        <Card className="mb-4">
          <h4>
            <strong>Bank Payment</strong>
          </h4>
          <hr />
          <div>
            <Form layout="vertical">

            <Row gutter={20}>
                <Col lg={8} xs={24}>
                  <Form.Item label="Company Name">
                  <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    /> 
                   
                  </Form.Item>
                </Col>
                <Col lg={8} xs={24}>
                  <Form.Item label="From Company">
                  <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    /> 
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col lg={8} xs={24}>
                  <Form.Item label="Ro Account">
                  <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    /> 
                   
                  </Form.Item>
                </Col>
                <Col lg={8} xs={24}>
                  <Form.Item label="Salary Month">
                  <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col lg={8} xs={24}>
                  <Form.Item label="Due Amount">
                  <Input placeholder="" />
                   
                  </Form.Item>
                </Col>
                <Col lg={8} xs={24}>
                  <Form.Item label="Transfred Amount">
                  <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                
                <Col lg={8} xs={24}>
                  <Form.Item label="Transfre Confirmation">
                  <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>



              <Row gutter={20}>
          <Col lg={24} className='mb-25'>
          <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
  
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
