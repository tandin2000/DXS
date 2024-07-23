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

import MultiSelect from './MultiSelect';

const options = [
  { value: 'field1', label: 'Data Field 1' },
  { value: 'field2', label: 'Data Field 2' },
  { value: 'field3', label: 'Data Field 3' },
  { value: 'field4', label: 'Data Field 4' },
  { value: 'field5', label: 'Data Field 5' },
  { value: 'field6', label: 'Data Field 6' },
  { value: 'field7', label: 'Data Field 7' },
  { value: 'field8', label: 'Data Field 8' },
];

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
      title: 'Company Field',
      dataIndex: 'cfiled',
      key: 'cfiled',
      ...getColumnSearchProps('cfiled'),
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'SalCash Field',
      dataIndex: 'sfiled',
      key: 'sfiled',
      ...getColumnSearchProps('sfiled'),
      sorter: (a, b) => a.role - b.role,
    },
    {
      title: 'Mapping Date',
      dataIndex: 'date',
      key: 'date',
      
      sorter: (a, b) => a.date - b.date,
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
      cfiled:'AA',
      sfiled: 'Colombo',
      date:"15-05-2024"
    },
    {
      key: '1',
      id: 'ABC',
      cfiled:'AA',
      sfiled: 'Colombo',
      date:"15-05-2024"
    },
    {
      key: '1',
      id: 'ABC',
      cfiled:'AA',
      sfiled: 'Colombo',
      date:"15-05-2024"
    },
  ];

  const { TextArea } = Input;
  return (
    <>
      <div>

      <Card className="mb-4">
          <h4>
            <strong>Data Mapping</strong>
          </h4>
          <div>

            
          <Form layout="vertical">
          <Row gutter={20}>
          <Col lg={12}>
          <Form.Item label="Company Name">
          <Select disabled
      defaultValue="ABC"
     
      options={[{ value: 'A', label: 'A' }]}
    />
      </Form.Item>
          </Col>
          </Row>
        <Row gutter={20}>
          <Col lg={12}>
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
         
  <Row gutter={20} className='mt-25'>
    <Col lg={6} xs={24}>

    <Card
      title="File Fields"
      
    >
      <MultiSelect options={options} />
    </Card>

     
   
    </Col>
    <Col lg={6} xs={24}>

    <Card
      title="File Fields"
      
    >
      <MultiSelect options={options} />
    </Card>

     
   
    </Col>
    
  </Row>
<Row>
<Col lg={12} xs={24} className='mt-25'>
    <Button type="primary" style={{ width: '100%' }}>Map Data</Button>
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

export default CompanyLocation
