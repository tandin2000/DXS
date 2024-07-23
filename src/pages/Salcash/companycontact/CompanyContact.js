import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, Dropdown } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';
import moment from 'moment';

const cancel = (e) => {
  console.log(e);
  message.error('Aborted');
};
 
const CompanyLocation = (props) => {

  const [form] = Form.useForm();
  
  const [editStatus, setEditStatus] = useState(false)
  const [editStatus2, setEditStatus2] = useState(false);
  const [ccdId, setCcdId] = useState();
  const [companyId, setCompanyId] = useState()

  const [companyData, setCompanyData] = useState([]);
  const [companyContactDetails, setCompanyContactDetails] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  
  const handleCancel = () => {
    form.resetFields();
    form.setFieldsValue({company_id : companyId});
    setEditStatus2(false);

  };

  const handleSubmit = async(values) => {
    if(editStatus2){
      const response = await RestAPI.PUTCCDById(values, ccdId)
      if(response.status === 200){
        notification.success({ message: 'Company Contact Details Updated successfully!' });
        getCompanyContactDetailsData(companyId)
      }else{
        notification.error({ message: 'Company Contact Details update Failed' });
      }
    }else{
      const response = await RestAPI.POSTCompanyContactDetails(values)
      if(response.status === 200){
        notification.success({ message: 'Company Contact Details saved successfully!' });
        getCompanyContactDetailsData(companyId)
      }else{
        notification.error({ message: 'Company Contact Details creation Failed' });
      }
    }
    
  };

  const confirm = async(id) => {
    const response = await RestAPI.DELCCDById(id);
    if(response.status === 200){
      notification.success({ message: 'Company Contact Details Deleted!' });
      getCompanyContactDetailsData(companyId)
    }else{
      notification.error({ message: 'Company Contact Details delete Failed' });
    }
  };
  
  const handleFailedSubmit = (errorInfo) => {
    message.error('Please fill out all required fields correctly.');
  };

  const getCompanyData = async (id) => {
    if(id){
      const response = await RestAPI.GETCompanyById(id)
      form.setFieldsValue({company_id : response.data._id});
      setCompanyId(response.data._id)
    }

  }

  const getCCDData = async(id) => {
    const response = await RestAPI.GETCCCDById(id);
    if(response.status === 200){
      setCcdId(id);
      form.setFieldsValue(response.data);
      setEditStatus2(true);
    }else{
      handleCancel();
      setCcdId();
      setEditStatus2(false);
    }
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',

      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,

    },
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name - b.name,
      width: 200,
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      ...getColumnSearchProps('designation'),
      sorter: (a, b) => a.role - b.role,
    },
    {
      title: 'Added Date',
      dataIndex: 'created_at',
      key: 'created_at',

      sorter: (a, b) => a.date - b.date,
      render: (text) => moment(text).format('DD MMMM YYYY'),
      width: 200,

    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

      sorter: (a, b) => a.email - b.email,
    },
    {
      title: 'Phone',
      dataIndex: 'phone1',
      key: 'phone1',
      ...getColumnSearchProps('phone1'),
      sorter: (a, b) => a.phone - b.phone,
    },


    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {!props.cameFromCompany && (
            <Button type="primary" shape="circle"  onClick={(e)=>{getCCDData(record.id)}} icon={<EditOutlined />} />
          )}
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={(e)=>confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
      width: 120
    },
  ];
  

  const { TextArea } = Input;

  const getCompanyList = async()=>{
    const response = await RestAPI.GETCompanies();
    if(response.status === 200){
      const companyOptions = response.data.map(company => ({ value: company._id, label: company.name }));
      setCompanyData(companyOptions)
    }
  }

  const getCompanyContactDetailsData = async(id)=>{
    const response = await RestAPI.GETCCDByCompany(id);
    if(response.status === 200){
      setCompanyContactDetails(response.data)
    }else{
      setCompanyContactDetails([])
      
    }
  }


  useEffect(()=>{
    getCompanyList();
    if(props.companyId){
      getCompanyData(props.companyId);
      setEditStatus(true);
      setCompanyId(props.companyId);
    }else{
      setEditStatus(false)
      setCompanyId();
    }
  },[props.tabClicked, props.companyId])

  useEffect(()=>{
    if(companyId){
      getCompanyContactDetailsData(companyId)
    }else{
      setCompanyContactDetails([])
    }
  },[companyId])

  return (
    <>
      <div>


        <strong>Company Contact Details</strong>
        <hr />


        <Form  form={form}
      layout="vertical" 
      onFinish={handleSubmit} 
      onFinishFailed={handleFailedSubmit}
      initialValues={{
          company_id: null,
          name: '',
          designation: '',
          email: '',
          phone_1: '',
          phone_2: '',
        }}>
          <Row gutter={20}>
            <Col lg={12} xs={24}>
            <Form.Item
            label="Company Name"
            name="company_id"
            
            rules={[{ required: true, message: 'Please select a company!' }]}
          >
            <Select disabled
              options={companyData}
              onChange={n=>{
                setCompanyId(n)
              }}
              placeholder="Select a company"
            />
          </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col lg={12} xs={24}>
              <Form.Item label="Name of Contact Person" name="name"
            rules={[{ required: true, message: 'Please enter the name!' }]}>
                <Input placeholder="" />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item label="Designation" name="designation"
            rules={[{ required: true, message: 'Please enter the Designation!' }]}>
                <Input placeholder="" />
              </Form.Item>
            </Col>
          </Row>


          <Row gutter={20}>
            <Col lg={12} xs={24}>
              <Form.Item label="Email" name="email"
            rules={[{ required: true, message: 'Please enter the Email!' }]}>
                <Input placeholder="" />

              </Form.Item>

            </Col>
            <Col lg={6} xs={12}>
              <Form.Item label="Phone 1" name="phone_1"
            rules={[{ required: true, message: 'Please enter the Contact Number!' }]}>
                <Input placeholder="" />

              </Form.Item>
            </Col>
            <Col lg={6} xs={12}>
              <Form.Item label="Phone 2" name="phone_2">
                <Input placeholder="" />

              </Form.Item>
            </Col>


          </Row>


          <Row>
            <Col lg={24} className='pull-right'>
            <Button type='primary' danger  onClick={handleCancel}>Cancel</Button>
            <Button type="primary" className='ml-15' htmlType="submit">Save</Button>
            </Col>
          </Row>
        </Form>
        <br />
        <Row>
          <Col lg={24}>
            <Table columns={columns} dataSource={companyContactDetails} />
          </Col>
        </Row>





      </div>
    </>
  )
}

export default CompanyLocation
