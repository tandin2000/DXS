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
  const [carderId, setCarderId] = useState();
  const [companyData, setCompanyData] = useState([]);
  const [carderData, setCarderData] = useState([]);

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
      const response = await RestAPI.PUTCarderById(values, carderId)
      if(response.status === 200){
        notification.success({ message: 'Company Carder updated successfully!' });
        getCompanyCarderData(companyId)
      }else{
        notification.error({ message: 'Company Carder update Failed' });
      }
    }else{
      const response = await RestAPI.POSTCarder(values)
      if(response.status === 200){
        notification.success({ message: 'Company Carder saved successfully!' });
        getCompanyCarderData(companyId)
      }else{
        notification.error({ message: 'Company Carder creation Failed' });
      }
    }
  };

  const confirm = async(id) => {
    const response = await RestAPI.DELCarderById(id);
    if(response.status === 200){
      notification.success({ message: 'Company Carder Deleted!' });
      getCompanyCarderData(companyId)
    }else{
      notification.error({ message: 'Company Carder delete Failed' });
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

  const getCarderData = async(id) => {
    const response = await RestAPI.GETCarderById(id);
    if(response.status === 200){
      setCarderId(id);
      form.setFieldsValue(response.data);
      setEditStatus2(true);
    }else{
      handleCancel();
      setCarderId();
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
      title: 'Carder Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.location - b.location,
    },


    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" shape="circle"  onClick={(e)=>{getCarderData(record._id)}} icon={<EditOutlined />} />
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

  const getCompanyCarderData = async(id)=>{
    const response = await RestAPI.GETCardersByCompany(id);
    if(response.status === 200){
      setCarderData(response.data)
    }else{
      setCarderData([])
      
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
      getCompanyCarderData(companyId)
    }else{
      setCarderData([])
    }
  },[companyId])

  return (
    <>
      <div>
    <Form form={form}
      layout="vertical" 
      onFinish={handleSubmit} 
      onFinishFailed={handleFailedSubmit}
      initialValues={{
          company_id: null,
          name: '',
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
              <Form.Item label="Carder Name"
              name="name"
              rules={[{ required: true, message: 'Please enter the carder name!' }]}>
                <Input placeholder="Carder Name in Full" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col lg={12} xs={24}>

              <Form.Item label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the location address!' }]}>
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
            <Col lg={12} xs={24}>

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
            <Table columns={columns} dataSource={carderData} />
          </Col>
        </Row>





      </div>
    </>
  )
}

export default CompanyLocation
