import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Papa from 'papaparse';
import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, Card, DatePicker, Tabs, message, Dropdown, Upload } from 'antd';
import { EditOutlined, EyeOutlined, SearchOutlined, DeleteOutlined, DownOutlined, MenuUnfoldOutlined, InboxOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';
import MultiSelect from './MultiSelect';
import moment from 'moment';


const cancel = (e) => {
  console.log(e);
  message.error('Aborted');
};

const CompanyLocation = () => {
  const [form] = Form.useForm();
  
  const [editStatus, setEditStatus] = useState(false);
  const [dataMappingId, setDataMappingId] = useState();
  const [companyId, setCompanyId] = useState();
  const [companyData, setCompanyData] = useState([]);
  const [dataMappingData, setDataMappingData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [csvColumns, setCsvColumns] = useState([]);
  const [selectedFileFields, setSelectedFileFields] = useState([]);
  const [preDefinedFileFields, setPreDefinedFileFields] = useState([]);
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
    form.setFieldsValue({ company_id: companyId });
    setEditStatus(false);
    setCsvColumns([]);
    setSelectedFileFields([]);
  };

  const handleSubmit = async (values) => {


    if (editStatus) {
      const response = await RestAPI.PUTDataMappingById(values, dataMappingId);
      if (response.status === 200) {
        notification.success({ message: 'Company Location update successfully!' });
        getDataMappingData(companyId);
      } else {
        notification.error({ message: 'Company Location update Failed' });
      }
    } else {

      selectedFileFields.map(async(x, index)=>{
        const payload = {
          company_id: values.company_id,
          salcash_column_name: preDefinedFileFields[index].value,
          company_column_name: x.value,
        }
        const response = await RestAPI.POSTDataMapping(payload);
        if (response.status === 200) {
          notification.success({ message: 'Company Location saved successfully!' });
          getDataMappingData(companyId);
        } else {
          notification.error({ message: 'Company Location creation Failed' });
        }
      })
      handleCancel();
    }
  };

  const confirm = async (id) => {
    const response = await RestAPI.DELDataMappingById(id);
    if (response.status === 200) {
      notification.success({ message: 'Company Location Deleted!' });
      getDataMappingData(companyId);
    } else {
      notification.error({ message: 'Company Location delete Failed' });
    }
  };

  const handleFailedSubmit = (errorInfo) => {
    message.error('Please fill out all required fields correctly.');
  };

  const getCompanyData = async (id) => {
    if (id) {
      const response = await RestAPI.GETCompanyById(id);
      form.setFieldsValue({ company_id: response.data._id });
      setCompanyId(response.data._id);
    }
  };

  const getData = async (id) => {
    const response = await RestAPI.GETDataMappingById(id);
    if (response.status === 200) {
      setDataMappingId(id);
      form.setFieldsValue(response.data);
      setEditStatus(true);
    } else {
      handleCancel();
      setDataMappingId();
      setEditStatus(false);
    }
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
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id - b.id,
      width: 200,
    },
    {
      title: 'Company Field',
      dataIndex: 'company_column_name',
      key: 'company_column_name',
      ...getColumnSearchProps('company_column_name'),
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: 'SalCash Field',
      dataIndex: 'salcash_column_name',
      key: 'salcash_column_name',
      ...getColumnSearchProps('salcash_column_name'),
      sorter: (a, b) => a.role - b.role,
    },
    {
      title: 'Mapping Date',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a, b) => a.date - b.date,
      render: (text) => moment(text).format('DD MMMM YYYY'),

    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" shape="circle" onClick={() => getData(record.id)} icon={<EditOutlined />} />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
      width: 120,
    },
  ];

  const getCompanyList = async () => {
    const response = await RestAPI.GETCompanies();
    if (response.status === 200) {
      const companyOptions = response.data.map(company => ({ value: company._id, label: company.name }));
      setCompanyData(companyOptions);
    }
  };

  const getDataMappingData = async (id) => {
    const response = await RestAPI.GETDataMappingByCompany(id);
    if (response.status === 200) {
      setDataMappingData(response.data);
    } else {
      setDataMappingData([]);
    }
  };

  useEffect(() => {
    getCompanyList();
    const storedRecord = localStorage.getItem('CompanyId');
    if (storedRecord) {
      getCompanyData(JSON.parse(storedRecord));
      setCompanyId(JSON.parse(storedRecord));
      localStorage.removeItem('CompanyId');
    } else {
      setCompanyId();
    }
  }, []);

  useEffect(() => {
    if (companyId) {
      getDataMappingData(companyId);
    } else {
      setDataMappingData([]);
    }
  }, [companyId]);

  const { Dragger } = Upload;
  const uploadProps = {
    name: 'file',
    accept:'csv',
    multiple: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            setCsvColumns(Object.keys(results.data[0]).map((col) => ({ value: col, label: col })));
          },
        });
      };
      reader.readAsText(file);
      return false; // Prevent upload
    },
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
    onRemove(e){
      handleCancel();
    }
  };

  const predefinedOptions = [
    { value: 'first_name', label: 'first_name' },
    { value: 'last_name', label: 'last_name' },
    { value: 'nic', label: 'nic' },
    { value: 'date_of_birth', label: 'date_of_birth' },
    { value: 'date_of_join', label: 'date_of_join' },
    { value: 'contact_number', label: 'contact_number' },
    { value: 'employee_number', label: 'employee_number' },
    { value: 'basic_salary', label: 'basic_salary' },
    { value: 'net_salary', label: 'net_salary' },
    { value: 'bank_name', label: 'bank_name' },
    { value: 'bank_branch', label: 'bank_branch' },
    { value: 'account_number', label: 'account_number' },
    { value: 'notes', label: 'notes' },
  ];

  return (
    <>
      <div>
        <Card className="mb-4">
          <h4>
            <strong>Data Mapping</strong>
          </h4>
          <div>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              onFinishFailed={handleFailedSubmit}
              initialValues={{
                company_id: null,
                salcash_column_name: '',
                company_column_name: '',
              }}
            >
              <Row gutter={20}>
                <Col lg={12}>
                  <Form.Item
                    label="Company Name"
                    name="company_id"
                    rules={[{ required: true, message: 'Please select a company!' }]}
                  >
                    <Select
                      disabled
                      options={companyData}
                      onChange={(n) => {
                        setCompanyId(n);
                      }}
                      placeholder="Select a company"
                    />
                  </Form.Item>
                </Col>
              </Row>
              

              {editStatus ? (<>
                <Row gutter={20}>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="SalCash Field Name"
                        name="salcash_column_name"
                        rules={[{ required: true, message: 'Please enter the SalCash Field Name' }]}
                      >
                        <Input placeholder="SalCash Field Name" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} xs={24}>
                      <Form.Item
                        label="Company Field Name"
                        name="company_column_name"
                        rules={[{ required: true, message: 'Please enter the Company Field Name' }]}
                      >
                        <Input placeholder="Company Field Name" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={24} xs={24} className='pull-right'>
                      <Button type="primary" danger onClick={handleCancel}>Cancel</Button>
                      <Button type="primary" className='ml-15' htmlType="submit">Save</Button>
                    </Col>
                  </Row>
              </>) : (<>
              <Row gutter={20}>
                <Col lg={12}>
                  <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                      Support for a single upload. Strictly prohibited from uploading company data or other banned files.
                    </p>
                  </Dragger>
                </Col>
              </Row>

              <Row gutter={20} className="mt-25">
                <Col lg={6} xs={24}>
                  <Card title="SalCash Fields">
                    <MultiSelect disabled={false} options={predefinedOptions}  onSelectionChange={setPreDefinedFileFields}/>
                  </Card>
                </Col>
                <Col lg={6} xs={24}>
                  <Card title="CSV File Fields">
                    <MultiSelect disabled={false} options={csvColumns} onSelectionChange={setSelectedFileFields} />
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg={24} xs={24} className="pull-right">
                  <Button type="primary" className="ml-15" htmlType="submit">Map Data</Button>
                </Col>
              </Row>
              </>)}
              
            </Form>
            <br />
            <Row>
              <Col lg={24}>
                <Table columns={columns} dataSource={dataMappingData} />
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CompanyLocation;
