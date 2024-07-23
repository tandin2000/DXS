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
    {
      key: '1',
      label:'Approve',
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
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: 'EMP Code',
      dataIndex: 'empcode',
      key: 'empcode',

      ...getColumnSearchProps('empcode'),
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
  const data = [
    {
      key: '1',
      id:"",
      empcode: 'ABC',
      name: 'Colombo',
      
    },
    {
      key: '1',
      id:"",
      empcode: 'ABC',
      name: 'Colombo',
    },
    {
      key: '1',
      id:"",
      empcode: 'ABC',
      name: 'Colombo',
    },
  ];

  const { TextArea } = Input;
  return (
    <>
      <div>

        <Card className="mb-4">
          <div>
            <h4>Employee Aproval</h4>
            <hr/>
          </div>
          <div>


            <Form layout="vertical">
              <Row gutter={20}>
                <Col lg={6} xs={24}>
                  <Form.Item label="Company Name">
                  <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    />
                  </Form.Item>
                </Col>
                <Col lg={6} xs={24}>
                  <Form.Item label="Approval Type">
                  <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    />
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

        <Modal title="Employee Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <table className="table table-striped">
                    <thead>
                      <tr>
                        <th >ID</th>
                        <td>1</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th >EMP Code</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >EMP Name</th>
                        <td>1</td>
                      </tr>
                      <tr>
                        <th >Phone</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >NIC</th>
                        <td colSpan={1}>1</td>
                      </tr>
                      <tr>
                        <th >Added Date</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Added By</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      <tr>
                        <th >Actions</th>
                        <td colSpan={2}>1</td>
                      </tr>
                      
                    </tbody>
                  </table>
      </Modal>

      </div>
    </>
  )
}

export default EmployeeList
