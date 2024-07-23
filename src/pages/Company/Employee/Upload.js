import React, { useRef, useState } from 'react';
import classNames from 'classnames'


import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, Card, DatePicker,Tabs, message, Dropdown, Upload  } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';



const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
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
    label: 'Employees',
  },
  {
    key: '4',
    label: 'Data Mapping',
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
      title: 'EMP Code',
      dataIndex: 'empcode',
      key: 'empcode',
      ...getColumnSearchProps('empcode'),
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'Employee Name',
      dataIndex: 'empname',
      key: 'empcode',
      ...getColumnSearchProps('empcode'),
      sorter: (a, b) => a.role - b.role,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      
      sorter: (a, b) => a.date - b.date,
    },
    
   

  ];
  const data = [
    {
      key: '1',
      id: 'ABC',
      empcode:'AA',
      empname: 'Colombo',
      action: <Tag color="red">Failed</Tag>
    },
    {
      key: '1',
      id: 'ABC',
      empcode:'AA',
      empname: 'Colombo',
      action: <Tag color="green">Success</Tag>
    },
    {
      key: '1',
      id: 'ABC',
      empcode:'AA',
      empname: 'Colombo',
      action: <Tag color="green">Success</Tag>
    },
  ];

  const { TextArea } = Input;
  return (
    <>
      <div>

      
          <div>

            
          <Form layout="vertical">
          <Row gutter={20}>
          <Col lg={8}>
          <Form.Item label="Company Name">
          <Select 
      defaultValue="ABC"
     
      options={[{ value: 'A', label: 'A' }]}
    />
      </Form.Item>
          </Col>
          <Col lg={8}>
          <Form.Item label="File Type">
          <Select 
      defaultValue="ABC"
     
      options={[{ value: 'A', label: 'A' }]}
    />
      </Form.Item>
          </Col>
          </Row>
        <Row gutter={20}>
          <Col lg={24} className='mb-25'>
          <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
  
      </Col>
          </Row>
         
 

      

        
          {/* <Row>
            <Col lg={24} className='pull-right'>
            <Button type='primary' danger>Cancel</Button>
            <Button type="primary" className='ml-15'>Save</Button>
            </Col>
          </Row> */}
        </Form>
<br/>
<Row>
  
  <Col lg={24} className='mt-25'>
  <Table columns={columns} dataSource={data} />
  </Col>
</Row>

</div>


        
      
        </div> 
    </>
  )
}

export default CompanyLocation
