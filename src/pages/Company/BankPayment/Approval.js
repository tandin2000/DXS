import React, { useRef, useState } from 'react';
import classNames from 'classnames'


import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Modal, Table, Card, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, Dropdown } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';


const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};

const EmployeeList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      label:<span onClick={showModal}>View Details</span>,
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
      title: 'Request Date',
      dataIndex: 'rdate',
      key: 'rdate',

      ...getColumnSearchProps('rdate'),
      sorter: (a, b) => a.id - b.id,
      width: 200,
    },
    {
      title: 'Approved Date',
      dataIndex: 'adate',
      key: 'adate',
      ...getColumnSearchProps('adate'),
      sorter: (a, b) => a.location - b.location,
    },
   

    {
      title: 'Requested Amount',
      dataIndex: 'ramount',
      key: 'ramount',
      ...getColumnSearchProps('ramount'),
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: 'Approved Amount',
      dataIndex: 'aamount',
      key: 'aamount',
      ...getColumnSearchProps('aamount'),
      sorter: (a, b) => a.location - b.location,
    },
  ];
  const data = [
    {
      key: '1',
      rdate: 'ABC',
      adate: 'Colombo',
      ramount:'',
      aamount:''
    },
    {
      key: '1',
      rdate: 'ABC',
      adate: 'Colombo',
      ramount:'',
      aamount:''
    },
    {
      key: '1',
      rdate: 'ABC',
      adate: 'Colombo',
      ramount:'',
      aamount:''
    },
  ];

  const { TextArea } = Input;
  return (
    <>
      <div>

        <Card className="mb-4">
          <div>
            <h4>Approval</h4>
            <hr/>
          </div>
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
      <Form.Item label="Employee Code">
      <Select
          defaultValue="Select"

          options={[{ value: 'A', label: 'A' }]}
        /> 
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={20}>
    <Col lg={8} xs={24}>
      <Form.Item label="Employee Name">
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
      <Form.Item label="Total no of Withdrawals">
      <Input placeholder="" />
       
      </Form.Item>
    </Col>
    <Col lg={8} xs={24}>
      <Form.Item label="Total Unapproved Withdrawals">
      <Input placeholder="" />
      </Form.Item>
    </Col>
  </Row>
  <Row gutter={20}>
    
    <Col lg={8} xs={24}>
      <Form.Item label="Net Salary">
      <Input placeholder="" />
      </Form.Item>
    </Col>
    <Col lg={8} xs={24}>
      <Form.Item label="Balance">
      <Input placeholder="" />
      </Form.Item>
    </Col>
  </Row>


</Form>
            <br />
            <Row>
              <Col lg={24}>
                <Table columns={columns} dataSource={data} />
              </Col>
            </Row>

          </div>
        </Card>

   

      </div>
    </>
  )
}

export default EmployeeList
