import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';

const cancel = (e) => {
  console.log(e);
  message.error('Aborted');
};



const CompanyLocation = (props) => {
  const [form] = Form.useForm();
  const [companyId, setCompanyId] = useState();
  const [editStatus, setEditStatus] = useState(false)
  const [editStatus2, setEditStatus2] = useState(false);
  const [departmentId, setDepartmentId] = useState();

  const [companyData, setCompanyData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleCancel = () => {
    form.resetFields();
    form.setFieldsValue({company_id : companyId});
    setEditStatus2(false);
  };
  const handleSubmit = async(values) => {
    if(editStatus2){
      const response = await RestAPI.PUTDepartmentById(values, departmentId)
      if(response.status === 200){
        notification.success({ message: 'Company Department updated successfully!' });
        getCompanyDepartmentData(companyId);
        form.resetFields();
        form.setFieldsValue({company_id : companyId});
        setEditStatus2(false);
      }else{
        notification.error({ message: 'Company Department update Failed' });
      }
    }else{
      const response = await RestAPI.POSTDepartment(values)
      if(response.status === 200){
        notification.success({ message: 'Company Department saved successfully!' });
        getCompanyDepartmentData(companyId);
        form.resetFields();
        form.setFieldsValue({company_id : companyId});
        setEditStatus2(false);
      }else{
        notification.error({ message: 'Company Department creation Failed' });
      }
    }
  };
  
  const handleFailedSubmit = (errorInfo) => {
    message.error('Please fill out all required fields correctly.');
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getCompanyData = async (id) => {
    if(id){
      const response = await RestAPI.GETCompanyById(id)
      form.setFieldsValue({company_id : response.data._id});
      setCompanyId(response.data._id)
    }

  }

  const getDepartmentData = async(id) => {
    const response = await RestAPI.GETDepartmentById(id);
    if(response.status === 200){
      setDepartmentId(id);
      form.setFieldsValue(response.data);
      setEditStatus2(true);
    }else{
      handleCancel();
      setDepartmentId();
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
            onClick={()=> handleReset()}
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
  const confirm = async(id) => {
      const response = await RestAPI.DELDepartmentById(id);
      if(response.status === 200){
        notification.success({ message: 'Company Department Deleted!' });
        getCompanyDepartmentData(companyId)
      }else{
        notification.error({ message: 'Company Department delete Failed' });
      }
    };
    const getCompanyNameById = (id) => {
      const Company = companyData.find((item) => item.value === id);
      return Company ? Company.label : '';
    };
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'company_id',
      key: 'company_id',

      ...getColumnSearchProps('company_id'),
      sorter: (a, b) => a.name - b.name,
      render: (text, record) => getCompanyNameById(record.company_id),
      width: 200,

    },
    {
      title: 'Department Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: 'Head of the Department',
      dataIndex: 'name_of_hod',
      key: 'name_of_hod',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" shape="circle" onClick={(e)=>{getDepartmentData(record._id)}} icon={<EditOutlined />} />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={(e)=>confirm(record._id)}
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

  const getCompanyDepartmentData = async(id)=>{
    const response = await RestAPI.GETDepartmentsByCompany(id);
    if(response.status === 200){
      setDepartmentData(response.data)
    }else{
      setDepartmentData([])
      
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
      getCompanyDepartmentData(companyId)
    }else{
      setDepartmentData([])
    }
  },[companyId])
  return (
    <>
      <div>
        <Form 
      form={form}
      layout="vertical"
      onFinish={handleSubmit} 
      onFinishFailed={handleFailedSubmit}
      initialValues={{
          company_id: null,
          name: '',
          name_of_hod: '',
          contact_number: '',
          description: '',
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
            <Col lg={12} xs={24}>
              <Form.Item label="Department Name" 
            name="name"
            rules={[{ required: true, message: 'Please enter the Department name!' }]}
          >
                <Input placeholder="Department Name in Full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col lg={12} xs={24}>


              <Form.Item label="Name of the Head of the Department"
               name="name_of_hod"
            rules={[{ required: true, message: 'Please enter Name of the Head of the Department!' }]}
          >
                <Input placeholder="Name of the Head of the Department" />
              </Form.Item>
              <Form.Item label="Head of the Department Contact No"
              name="contact_number"
              rules={[
              { required: true, message: 'Please enter the contact number!' },
              {
                pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/,
                message: 'Please enter a valid phone number',
              },
            ]}>
                <Input placeholder="Phone No of Head of department" />
              </Form.Item>

            </Col>
            <Col lg={12} xs={24}>
              <Form.Item label="Description"
              
            name="description"
            rules={[{ required: true, message: 'Please enter the description!' }]}
         
         >
                <TextArea
                  showCount
                  maxLength={100}
                  placeholder="Description"
                  style={{
                    height: 120,
                    resize: 'none',
                  }}
                />
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
        <br />
        <Row>
          <Col lg={24}>
            <Table columns={columns} dataSource={departmentData} />
          </Col>
        </Row>





      </div>
    </>
  )
}

export default CompanyLocation
