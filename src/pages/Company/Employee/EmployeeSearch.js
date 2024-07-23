import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Modal, Card, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, Dropdown } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';



const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};

const EmployeeSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [companyName, setCompanyName] = useState('');

  const [userData, setUserData] = useState('');
  const [form] = Form.useForm();


  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const items = [
    {
      key: '1',
      label: 'View',
    },
    {
      key: '2',
      label: 'Edit',
    },
    {
      key: '3',
      label:<span onClick={showModal}>Registration</span>,
    },
    {
      key: '4',
      label: 'Advance Request',
    },
  
  ];

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
  const handleFailedSubmit = (errorInfo) => {
    message.error('Please fill out all required fields correctly.');
  };
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
    },
    {
      title: 'EMP Code',
      dataIndex: 'employee_number',
      key: 'employee_number',
      ...getColumnSearchProps('employee_number'),
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name',
      ...getColumnSearchProps('first_name'),
      sorter: (a, b) => a.location - b.location,
    },


    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">

          <Dropdown
            menu={{
              items,
            }}
          >
            <a className='no-line'>
              <MenuUnfoldOutlined /> <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
      width: 120
    },
  ];

  
  const getUserSearch = async(companyId, values) =>{
    const response = await RestAPI.GETUsersByCompanySearch(companyId, values)
    if(response.status === 200){
      setUserData(response.data.filter(item => item.role === 'employee'))

      // notification.success({ message: 'Employee Found' });
    }else{  
      setUserData([])    
      // notification.error({ message: 'No Employee' });
    }
  }

  const handleCancelSearch = () => {
    form.resetFields();
    getUserSearch(companyId,{})
  };

  const handleSubmit = async(values) => {
   getUserSearch(companyId, values)
  };
  

  useEffect(()=>{
    const storedRecord = localStorage.getItem('CompanyId');
    const companyData = JSON.parse(sessionStorage.getItem('authUser'))
    if(companyData){
      setCompanyName(companyData.name);
      setCompanyId(storedRecord); 
      getUserSearch(storedRecord,{})
    }
},[])

  return (
    <>
      <div>

            <Form form={form} 
                  onFinish={handleSubmit} 
                  onFinishFailed={handleFailedSubmit}
                  
            layout="vertical">
              <Row gutter={20}>
                <Col lg={8} xs={24}>
                <Form.Item label="Company Name">
                      <Input placeholder="" value={companyName} disabled/>
                    </Form.Item>
                </Col>
                <Col lg={8} xs={24}>
                  <Form.Item label="Employee Name" name="first_name">
                  <Input placeholder="Sort by Employee Name" />

                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col lg={8} xs={24}>
                  <Form.Item label="Employee Code" name="employee_number">
                    <Input placeholder="Sort by Employee Code" />

                  </Form.Item>

                </Col>
                <Col lg={8} xs={24}>
                  <Form.Item label="NIC" name="nic">
                    <Input placeholder="Sort by NIC" />

                  </Form.Item>
                </Col>

              </Row>

              <Row>
                <Col lg={12} className='pull-right button-col'>
                <Button type='primary' danger onClick={handleCancelSearch}>Cancel</Button>
                <Button type="primary" className='ml-15' htmlType="submit">Search</Button>

                </Col>
              </Row>
            </Form>
            <br />
            <Row>
              <Col lg={24}>
                <Table columns={columns} dataSource={userData} />
              </Col>
            </Row>

          </div>
         
      <Modal title="Registration" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form layout="vertical">
              <Row gutter={20}>
                <Col lg={24} xs={24}>
                  <Form.Item label="Employee Name">
                    <Input placeholder="" />
                  </Form.Item>
                </Col>
                <Col lg={24} xs={24}>
                  <Form.Item label="Reason for Registration">
                  <Input placeholder="" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col lg={24} xs={24}>
                  <Form.Item label="Registration Date">
                  <DatePicker  />

                  </Form.Item>

                </Col>
               
              </Row>

              <Row>
                <Col lg={12} className='pull-right button-col'>
                  <Button warning>Cancel</Button>
                  <Button type="primary" className='ml-15' htmlType="submit">Save</Button>
                  </Col>
              </Row>
            </Form>
      </Modal>
    </>
  )
}

export default EmployeeSearch
