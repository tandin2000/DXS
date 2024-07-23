import React, { useRef, useState } from 'react';
import classNames from 'classnames'


import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Card, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker,Tabs, message, Dropdown } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';


const items = [
  {
    key: '1',
    label: 'View',
  },
  {
    key: '2',
    label: 'Add New Employee',
  },
  {
    key: '3',
    label: 'Upload Employees',
  },
  {
    key: '4',
    label: 'Add/Edit Bank Accounts',
  },
  {
    key: '5',
    label: 'Approvals',
  },
];
const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};

const CompanyLocation = () => {

  
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
      
      ...getColumnSearchProps('name'),
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
         
          <Button type="default" danger shape="circle" icon={<EyeOutlined />} />
        
        </Space>
      ),
      width: 120
    },
  ];
  const data = [
    {
      key: '1',
      id: 'ABC',
      location: 'Colombo',
      carder: 'AA',
     window:""
    },
    {
      key: '1',
      id: 'ABC',
      location: 'Colombo',
      carder: 'AA',
     window:""
    },
    {
      key: '1',
      id: 'ABC',
      location: 'Colombo',
      carder: 'AA',
     window:""
    },  
  ];

  const { TextArea } = Input;
  return (
    <>
      <div>

      <Card className="mb-4">
          <h4>
            <strong>Company Aging Report</strong>
          </h4>
          <div>

            
          <Form layout="vertical">
        <Row gutter={20}>
          <Col lg={12} xs={24}>
          <Form.Item label="Company Name">
          <Input placeholder="Company Name in Full as per BRC" />
      </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
          <Form.Item label="Industry">
          <Select 
      defaultValue="Select"
     
      options={[{ value: 'A', label: 'A' }]}
    />
      </Form.Item>
      </Col>
          </Row>
        

        <Row gutter={20}> 
          <Col lg={12} xs={24}>
          <Form.Item label="Company Nick Name">
          <Input placeholder="Short company Name as Identifier" />

      </Form.Item>

          </Col>
          <Col lg={12}>
          <Form.Item label="Business Registration Number">
          <Input placeholder="" />

      </Form.Item>
            </Col>
           

          
        </Row>

        
          <Row>
            <Col lg={24} xs={24} className='pull-right'>
            <Button type='primary' danger>Cancel</Button>
            <Button type="primary" className='ml-15'>Search</Button>
            </Col>
          </Row>
        </Form>
        <hr/>
<br/>
<Row>
  <Col lg={24} xs={24}>
    
  <Table columns={columns} dataSource={data} />
  </Col>
</Row>

</div>
</Card>

        
      
        </div> 
    </>
  )
}

export default CompanyLocation
