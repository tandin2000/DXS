import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Row, Col, Select, Radio, DatePicker, notification } from 'antd';
import RestAPI from '../../../common/RestServices/RestAPI';
import moment from 'moment';

const CompanyDetails = (props) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [editStatus, setEditStatus] = useState(false)
  const [companyId, setCompanyId] = useState()

  const getCompanyData = async (id) => {
    if(id){
      const response = await RestAPI.GETCompanyById(id)
      if(response.data.date_of_incorporation){
        response.data.date_of_incorporation = moment(response.data.date_of_incorporation, 'YYYY-MM-DD')
      }
      form.setFieldsValue(response.data);
    }

  }



  const handleSubmit = async(values) => {
    if(editStatus){
      if (values.date_of_incorporation) {
        values.date_of_incorporation = values.date_of_incorporation.format('YYYY-MM-DD')
      }
      const response = await RestAPI.PUTCompanies(values, companyId)
      if(response.status === 200){
        notification.success({ message: 'Company details updated successfully!' });
      }else{
        notification.error({ message: 'Company update Failed' });
      }
    }else{
      if (values.date_of_incorporation) {
        values.date_of_incorporation = values.date_of_incorporation.format('YYYY-MM-DD')
      }
      const response = await RestAPI.POSTCompany(values)
      if(response.status === 200){
        props.getDataFromChild(response.data);
        notification.success({ message: 'Company details saved successfully!' });

      }else{
        notification.error({ message: 'Company creation Failed' });
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    if(editStatus){
      getCompanyData(companyId)
    }
  };

  useEffect(()=>{
    
    if(props.companyId){
      getCompanyData(props.companyId);
      setEditStatus(true);
      setCompanyId(props.companyId);
    }else{
      setEditStatus(false)
      setCompanyId();
    }
  },[props.tabClicked, props.companyId])

  return (
    <div className="mb-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: '',
          nick_name: '',
          industry: '',
          address: '',
          business_registration_number: '',
          type_of_incorporation: '',
          date_of_incorporation: null,
          company_contact_number: '',
          company_email: '',
          notes: '',
        }}
      >
        <Row gutter={20}>
          <Col lg={12} md={12} xs={24}>
            <Form.Item
              label="Company Name"
              name="name"
              rules={[{ required: true, message: 'Please enter the company name' }]}
            >
              <Input placeholder="Company Name in Full as per BRC" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Company Nick Name"
              name="nick_name"
              rules={[{ required: true, message: 'Please enter the company nickname' }]}
            >
              <Input placeholder="Short Company Name as Identifier" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Industry"
              name="industry"
              rules={[{ required: true, message: 'Please select the industry' }]}
            >
              <Select
                options={[{ value: 'A', label: 'A' }]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Company Address"
              name="address"
              rules={[{ required: true, message: 'Please enter the company address' }]}
            >
              <TextArea
                showCount
                maxLength={100}
                placeholder="Company Address as per BRC"
                style={{ height: 205, resize: 'none' }}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Business Registration Number"
              name="business_registration_number"
              rules={[{ required: true, message: 'Please enter the registration number' }]}
            >
              <Input placeholder="Business Registration Number" />
            </Form.Item>

            <Form.Item
              label="Type of Incorporation"
              name="type_of_incorporation"
              rules={[{ required: true, message: 'Please select the type of incorporation' }]}
            >
              <Radio.Group>
                <Radio value="public limited">Public Limited</Radio>
                <Radio value="private limited">Private Limited</Radio>
                <Radio value="sole proprietor">Sole Proprietor</Radio>
                <Radio value="partnership">Partnership</Radio>
                <Radio value="others">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Date of Incorporation"
              name="date_of_incorporation"
              rules={[{ required: true, message: 'Please select the date of incorporation' }]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <Form.Item
              label="General Telephone No"
              name="company_contact_number"
              rules={[
                      { required: true, message: 'Please enter the company contact number' },
                      {
                        pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/,
                        message: 'Please enter a valid phone number',
                      },
                    ]}            
              >
              <Input placeholder="" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item
              label="General Email Adress"
              name="company_email"
              rules={[
                      { required: true, message: 'Please enter the company email address' },
                      {
                        type: 'email',
                        message: 'Please enter a valid email address',
                      },
                    ]}            
              >
              <Input placeholder="" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={20}>
          <Col lg={12} xs={24}>
            <Form.Item
              label="Notes"
              name="notes"
            >
              <TextArea
                showCount
                maxLength={100}
                placeholder="Any additional notes or comments"
                style={{ height: 150, resize: 'none' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col lg={24} xs={24} className='pull-right'>
            <Button type="primary" danger onClick={handleCancel}>Cancel</Button>
            <Button type="primary" className='ml-15' htmlType="submit">Save Company</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CompanyDetails;
