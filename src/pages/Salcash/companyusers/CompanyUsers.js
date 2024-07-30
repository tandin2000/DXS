import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker,Tabs, message, Dropdown } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';
import moment from 'moment';

const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};

const CompanyLocation = (props) => {

  const [form] = Form.useForm();
  const [companyId, setCompanyId] = useState();
  const [companyData, setCompanyData] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [editStatus, setEditStatus] = useState(false)


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
  };
  const handleSubmit = async(values) => {
    const response = await RestAPI.POSTNewUser(values)
    if(response.status === 200){
      notification.success({ message: 'Company Department saved successfully!' });
      getUserData(companyId)
      handleCancel();
    }else{
      notification.error({ message: 'Company Department creation Failed' });
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
      dataIndex: '_id',
      key: '_id',
      
      ...getColumnSearchProps('_id'),
      sorter: (a, b) => a.id - b.id,

    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key: 'username',
      ...getColumnSearchProps('username'),
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role'),
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
      dataIndex: 'contact_number',
      key: 'contact_number',
      ...getColumnSearchProps('contact_number'),
      sorter: (a, b) => a.phone - b.phone,
    },
   
   
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
          <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={confirm}
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

  const getUserData = async(id)=>{
    const response = await RestAPI.GETUsersByCompany(id);
    if(response.status === 200){
      setUserData(response.data.filter(item => item.role !== 'employee'))
    }else{
      setUserData([])
      
    }
  }


  useEffect(()=>{
    if(props.companyId){
      getCompanyData(props.companyId);
      setEditStatus(true);
      setCompanyId(props.companyId);
    }else{
      setEditStatus(false)
      setCompanyId();
    }
    getCompanyList();
  },[props.tabClicked, props.companyId])

  useEffect(()=>{
    if(companyId){
      getUserData(companyId)
    }else{
      setUserData([])
    }
  },[companyId])

  return (
    <>
      <div>

      
            <strong>Company Users</strong>
        <hr/>
            
          <Form form={form}
            layout="vertical"
            onFinish={handleSubmit} 
            onFinishFailed={handleFailedSubmit}
            initialValues={{
                company_id: null,
                username: '',
                roleName: null,
                firstName: '',
                lastName: '',
                email: '',
                contact_number: '',
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
          <Form.Item label="User Name"
           name="username"
           rules={[{ required: true, message: 'Please enter the Username!' }]}>
          <Input placeholder="Enter your Username" />
      </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
          <Form.Item label="Role"
           name="roleName"
           rules={[{ required: true, message: 'Please select a role' }]}>
          <Select      
          placeholder="Select a role"
      options={[
        { value: 'COMPANY_ADMIN', label: 'Admin' },
        { value: 'COMPANY_FIN_CHECKER', label: 'Financial Checker' },
        { value: 'COMPANY_FIN_MAKER', label: 'Financial Maker' },
        { value: 'COMPANY_HR_CHECKER', label: 'HR Checker' },
        { value: 'COMPANY_HR_MAKER', label: 'HR Maker' },]}
    />
      </Form.Item>
      </Col>
          </Row>
        
          <Row gutter={20}> 
          <Col lg={12} xs={24}>
          <Form.Item label="First name"
           name="firstName"
           rules={[{ required: true, message: 'Please enter the First Name' }]}>
          <Input placeholder="Please enter the email" />

      </Form.Item>

          </Col>
          <Col lg={12} xs={24}>
          <Form.Item label="Last name"
           name="lastName"
           rules={[{ required: true, message: 'Please enter the Last Name' }]}>
          <Input placeholder="Enter the phone number" />

      </Form.Item>
            </Col>
           

          
        </Row>
        <Row gutter={20}> 
          <Col lg={12} xs={24}>
          <Form.Item label="Email"
           name="email"
           rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input placeholder="Please enter the email" />

      </Form.Item>

          </Col>
          <Col lg={12} xs={24}>
          <Form.Item label="Phone"
           name="contact_number"
           rules={[
              { required: true, message: 'Please enter the phone number' },
              {
                pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/,
                message: 'Please enter a valid phone number',
              },
            ]}
            >
          <Input placeholder="Enter the phone number" />

      </Form.Item>
            </Col>
           

          
        </Row>

        
          <Row>
            <Col lg={24} className='pull-right'>
            <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
              <Button type="primary" className='ml-15' htmlType="submit">Save</Button>
            </Col>
          </Row>
        </Form>
<br/>
<Row>
  <Col lg={24}>
  <Table columns={columns} dataSource={UserData} />
  </Col>
</Row>


        
      
        </div> 
    </>
  )
}

export default CompanyLocation
