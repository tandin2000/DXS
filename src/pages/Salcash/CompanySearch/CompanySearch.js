import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Card, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, Dropdown, Menu } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';
import { useNavigate } from 'react-router-dom';

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
    label: 'Employees',
  },
  // {
  //   key: '4',
  //   label: 'Data Mapping',
  // },
  {
    key: '5',
    label: 'Activate',
  },
];

const CompanyLocation = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [companyList, setCompanyList] = useState([]);

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
  };

  const getCompanySearch = async(values) =>{
    const response = await RestAPI.GETCompanySearch(values)
    if(response.status === 200){
      const filteredData = response?.data.filter(company => company.name.toLowerCase() !== 'salcash');

      setCompanyList(filteredData)
      notification.success({ message: 'Company Found' });
    }else{
      notification.error({ message: 'Company Searching Failed' });
    }
  }

  const handleSubmit = async(values) => {
    getCompanySearch(values)
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

  const activateCompany = async(id)=> {
    const values = {
      status: 1
    }
    const response = await RestAPI.PUTCompanies(values, id);
    if(response.status === 200){
      notification.success({ message: 'Company set active' });
      getCompanySearch();
    }else{
      notification.success({ message: 'Company activation failed' });
    }

  }

  const handleMenuClick = (e, record) => {
    switch(e.key){
      case "1" :

        break;
      case "2" :
          localStorage.setItem('CompanyId', JSON.stringify(record._id));
          localStorage.setItem('edit', JSON.stringify(1));
          navigate('/CompanyAdministration');
        break;
      case "3" :
        break;
      case "4" :
        localStorage.setItem('CompanyId', JSON.stringify(record._id));
        navigate('/DataMapping');
        break;
      case "5" :
        activateCompany(record._id)
        break;
      default :
        break;
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',

      ...getColumnSearchProps('_id'),
      sorter: (a, b) => a.id - b.id,
      width: 200,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
      ...getColumnSearchProps('industry'),
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ...getColumnSearchProps('status'),
      sorter: (a, b) => a.status - b.status,
      render: (status) => (status === 1 ? 'Active' : 'Draft')
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
        <Dropdown
          overlay={(
            <Menu onClick={(e) => handleMenuClick(e, record)}>
              {items.map((item) => (
                <Menu.Item key={item.key}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          )}
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

  useEffect(()=>{
      getCompanySearch()
  },[])
  return (
    <>
      <div>

        <Card className="mb-4">
          <div>
            <h4>Company Search</h4>
            <hr/>
          </div>
          <div>


            <Form form={form}
      layout="vertical" 
      onFinish={handleSubmit} 
      initialValues={{
          name: '',
          nick_name: '',
          industry:null,
          business_registration_number: '',
        }}>
              <Row gutter={20}>
                <Col lg={6} xs={24}>
                  <Form.Item label="Company Name" name="name">
                    <Input placeholder="Company Name in Full as per BRC" />
                  </Form.Item>
                </Col>
                <Col lg={6} xs={24}>
                  <Form.Item label="Industry" name="industry">
                    <Select
                    
                      placeholder="Select a Industry"
                      options={[{ value: 'A', label: 'A' }]}
                    />
                  </Form.Item>
                </Col>
              </Row>


              <Row gutter={20}>
                <Col lg={6} xs={24}>
                  <Form.Item label="Company Nick Name" name="nick_name">
                    <Input placeholder="Short company Name as Identifier" />

                  </Form.Item>

                </Col>
                <Col lg={6} xs={24}>
                  <Form.Item label="Business Registration Number" name="business_registration_number">
                    <Input placeholder="" />

                  </Form.Item>
                </Col>



              </Row>


              <Row>
                <Col lg={12} className='pull-right button-col'>
                <Button type='primary' danger htmlType="reset">Reset</Button>
                <Button type="primary" className='ml-15' htmlType="submit">Search</Button>
                </Col>
              </Row>
            </Form>
            <br />
            <Row>
              <Col lg={24}>
                <Table columns={columns} dataSource={companyList} />
              </Col>
            </Row>

          </div>
        </Card>



      </div>
    </>
  )
}

export default CompanyLocation
