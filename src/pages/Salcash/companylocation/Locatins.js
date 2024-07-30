import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';


const cancel = (e) => {
  message.error('Aborted');
};

const CompanyLocation = (props) => {
  const [form] = Form.useForm();
  
  const [editStatus, setEditStatus] = useState(false);
  const [editStatus2, setEditStatus2] = useState(false);
  const [locationId, setLocationId] = useState();
  const [companyId, setCompanyId] = useState()

  const [companyData, setCompanyData] = useState([]);
  const [locationData, setLocationData] = useState([]);
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

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const handleSubmit = async(values) => {
    if(editStatus2){
      const response = await RestAPI.PUTLocationById(values, locationId)
      if(response.status === 200){
        notification.success({ message: 'Company Location update successfully!' });
        getCompanyLocationData(companyId);
        form.resetFields();
        form.setFieldsValue({company_id : companyId});
        setEditStatus2(false);
      }else{
        notification.error({ message: 'Company Location update Failed' });
      }
    }else{
      const response = await RestAPI.POSTLocation(values)
      if(response.status === 200){
        notification.success({ message: 'Company Location saved successfully!' });
        getCompanyLocationData(companyId);
        form.resetFields();
        form.setFieldsValue({company_id : companyId});
        setEditStatus2(false);
      }else{
        notification.error({ message: 'Company Location creation Failed' });
      }
    }
  };

  const confirm = async(id) => {
    const response = await RestAPI.DELLocationById(id);
    if(response.status === 200){
      notification.success({ message: 'Company Location deleted!' });
      getCompanyLocationData(companyId)
    }else{
      notification.error({ message: 'Company Location delete Failed' });
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

  const getLocationData = async(id) => {
    const response = await RestAPI.GETLocationById(id);
    if(response.status === 200){
      setLocationId(id);
      form.setFieldsValue(response.data);
      setEditStatus2(true);
    }else{
      handleCancel();
      setLocationId();
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
      title: 'Location Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: 'Location Address',
      dataIndex: 'address',
      key: 'address',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" shape="circle" onClick={(e)=>{getLocationData(record._id)}} icon={<EditOutlined />} />
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

  const getCompanyLocationData = async(id)=>{
    const response = await RestAPI.GETLocationsByCompany(id);
    if(response.status === 200){
      setLocationData(response.data)
    }else{
      setLocationData([])
      
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
      getCompanyLocationData(companyId)
    }else{
      setLocationData([])
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
          nick_name: '',
          contact_name: '',
          contact_number: '',
          address: '',
        }}
    >
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
          <Form.Item
            label="Company Location/Branch Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the branch name!' }]}
          >
            <Input placeholder="Company Location/Branch Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={20}>
        <Col lg={12} xs={24}>
          <Form.Item
            label="Location/Branch Nick Name"
            name="nick_name"
            rules={[{ required: true, message: 'Please enter a nickname!' }]}
          >
            <Input placeholder="Short Location Name as Identifier" />
          </Form.Item>

          <Form.Item
            label="Location/Branch Contact Person"
            name="contact_name"
            rules={[{ required: true, message: 'Please enter the contact person name!' }]}
          >
            <Input placeholder="Name of Primary Contact of Location" />
          </Form.Item>
          <Form.Item
            label="Location/Branch Contact Person Contact No"
            name="contact_number"
            rules={[
              { required: true, message: 'Please enter the contact number!' },
              {
                pattern: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,}$/,
                message: 'Please enter a valid phone number',
              },
            ]}
          >
            <Input placeholder="Phone No of Primary Contact of Location" />
          </Form.Item>
        </Col>
        <Col lg={12} xs={24}>
          <Form.Item
            label="Location Address"
            name="address"
            rules={[{ required: true, message: 'Please enter the location address!' }]}
          >
            <TextArea
              showCount
              maxLength={100}
              placeholder="Location Address"
              style={{
                height: 205,
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
            <Table columns={columns} dataSource={locationData} />
          </Col>
        </Row>





      </div>
    </>
  )
}

export default CompanyLocation
