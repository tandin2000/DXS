import React, { useRef, useState } from 'react';
import classNames from 'classnames'


import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Card, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, Dropdown } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';

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
    label: 'Add / Edit Bank Accounts',
  },
  {
    key: '5',
    label: 'Approvels',
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

const BankAccount = () => {


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
      title: 'Bank Name',
      dataIndex: 'bankname',
      key: 'bankname',
      ...getColumnSearchProps('bankname'),
      sorter: (a, b) => a.location - b.location,
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      ...getColumnSearchProps('branch'),
      sorter: (a, b) => a.location - b.location,
    },

    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      ...getColumnSearchProps('account'),
      sorter: (a, b) => a.location - b.location,
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
  const data = [
    {
      key: '1',
      id: 'ABC',
      bankname: 'Colombo',
      branch: 'AA',
      account: '',
      window: "",
    },
    {
      key: '1',
      id: 'ABC',
      bankname: 'Colombo',
      branch: 'AA',
      account: '',
      window: "",
    },
    {
      key: '1',
      id: 'ABC',
      bankname: 'Colombo',
      branch: 'AA',
      account: '',
      window: "",
    },
  ];

  const { TextArea } = Input;
  return (
    <>
      <div>

        <Card className="mb-4">
          <div>
            <h4>Bank Account</h4>
            <hr/>
          </div>
          <div>


            <Form layout="vertical">
              <Row gutter={20}>
                <Col lg={6} xs={24}>
                  <Form.Item label="Company Name">
                    <Input placeholder="Company Name in Full as per BRC" />
                  </Form.Item>
                </Col>
                <Col lg={6} xs={24}>
                  <Form.Item label="Bank">
                    <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    />
                  </Form.Item>
                </Col>
              </Row>


              <Row gutter={20}>
                <Col lg={6} xs={24}>
                  <Form.Item label="Branch">
                  <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    />

                  </Form.Item>

                </Col>
                <Col lg={6} xs={24}>
                  <Form.Item label="Account No">
                    <Input placeholder="" />

                  </Form.Item>
                </Col>



              </Row>


              <Row>
                <Col lg={12} className='pull-right button-col'>
                  <Button warning>Cancel</Button>
                  <Button type="primary" className='ml-15'>Search</Button>
                </Col>
              </Row>
            </Form>
            <br />
            <Row>
              <Col lg={24}>
              <br/>
              <Button type="primary" className='mt-15'>Add New</Button>
              <br/>
                <Table columns={columns} dataSource={data} />
              </Col>
            </Row>

          </div>
        </Card>



      </div>
    </>
  )
}

export default BankAccount
