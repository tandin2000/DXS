import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker,Tabs, message, } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';
import moment from 'moment';
 
const cancel = (e) => {
  message.error('Aborted');
};

const CompanyLocation = (props) => {

  const [form] = Form.useForm();
  const [companyId, setCompanyId] = useState();
  const [locationData, setLocationData] = useState([]);
  const [carderData, setCarderData] = useState([]);
  const [editStatus, setEditStatus] = useState(false)

  const [editStatus2, setEditStatus2] = useState(false);
  const [companyConfigurationId, setCompanyConfigurationId] = useState();
  const [companyData, setCompanyData] = useState([]);
  const [locationConfigurationData, setLocationConfigurationData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [startDate, setStartDate] = useState(null);

  const searchInput = useRef(null);


  const getLocationNameById = (id) => {
    const location = locationData.find((item) => item.value === id);
    return location ? location.label : '';
  };
  
  const getCarderNameById = (id) => {
    const carder = carderData.find((item) => item.value === id);
    return carder ? carder.label : '';
  };

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
    setStartDate(null);
  };

  const convertToDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  const convertToIsoString = (dateString) => {
    const date = new Date(dateString);
    return moment(date.toISOString());
};

function checkIfObjInArray(obj) {
  for (const item of locationConfigurationData) {
      if (item.location_id === obj.location_id && item.carder_id === obj.carder_id) {
          return false;
      }
  }
  return true;
}

  const handleSubmit = async(values) => {

    const checkNew = checkIfObjInArray(values)
    
    if(checkNew){
    values.salary_date = convertToDate( values.salary_date)
    values.month_start = convertToDate( values.month_start)
    values.month_end = convertToDate( values.month_end)
    if(editStatus2){
      const response = await RestAPI.PUTLocationConfigurationById(values, companyConfigurationId)
      if(response.status === 200){
        notification.success({ message: 'Company Location Configuration updated successfully!' });
        getCompanyLocationConfigurationData(companyId);
        form.resetFields();
        form.setFieldsValue({company_id : companyId});
        setEditStatus2(false);
        setStartDate(null);

      }else{
        notification.error({ message: 'Company Location Configuration update Failed' });
      }
    }else{
      if(values.location_id === "all" && values.carder_id !== "all"){        
        const locationValueData = locationData
                .filter(option => option.value !== "all")
                .map(option => option.value);
        locationValueData.map(async(x, index)=>{
          const isExistingCombination = locationConfigurationData.some(item => item.location_id === x && item.carder_id === values.carder_id);

        if (isExistingCombination) {
                notification.error({ message: 'Company Location Configuration already exists' });
        } else{
          values.location_id = x;
          const response = await RestAPI.POSTLocationConfiguration(values);
          if(index === locationValueData.length - 1 ){
            if(response.status === 200){
              notification.success({ message: 'Company Location Configuration saved successfully!' });
              getCompanyLocationConfigurationData(companyId);
              form.resetFields();
              form.setFieldsValue({company_id : companyId});
              setEditStatus2(false);
              setStartDate(null);
      
            }else{
              notification.error({ message: 'Company Location Configuration creation Failed' });
            }
          }
        }
      })
      }else if(values.location_id !== "all" && values.carder_id === "all"){
        const carderValueData = carderData
                .filter(option => option.value !== "all")
                .map(option => option.value);
        carderValueData.map(async(x, index)=>{
          const isExistingCombination = locationConfigurationData.some(item => item.location_id === values.location_id && item.carder_id === x);

        if (isExistingCombination) {

                notification.error({ message: 'Company Location Configuration already exists' });
        } else{
          values.carder_id = x;
          const response = await RestAPI.POSTLocationConfiguration(values);
          if(index === carderValueData.length  -1){
            if(response.status === 200){
              notification.success({ message: 'Company Location Configuration saved successfully!' });
              getCompanyLocationConfigurationData(companyId);
              form.resetFields();
              form.setFieldsValue({company_id : companyId});
              setEditStatus2(false);
              setStartDate(null);
      
            }else{
              notification.error({ message: 'Company Location Configuration creation Failed' });
            }
          }
        }
        })

      }else if(values.location_id === "all" && values.carder_id === "all"){
        const locationValueData = locationData
        .filter(option => option.value !== "all")
        .map(option => option.value);

        const carderValueData = carderData
            .filter(option => option.value !== "all")
            .map(option => option.value);

        locationValueData.forEach(locationId => {
            carderValueData.map(async (carderId, index) => {
                const isExistingCombination = locationConfigurationData.some(item => item.location_id === locationId && item.carder_id === carderId);

                if (isExistingCombination) {
                    if (index === carderValueData.length - 1) {
                        notification.error({ message: 'Company Location Configuration already exists for one or more combinations.' });
                    }
                } else {
                    values.location_id = locationId;
                    values.carder_id = carderId;
                    const response = await RestAPI.POSTLocationConfiguration(values);

                    if (index === carderValueData.length - 1) {
                        if (response.status === 200) {
                            notification.success({ message: 'Company Location Configuration saved successfully!' });
                            getCompanyLocationConfigurationData(companyId);
                            form.resetFields();
                            form.setFieldsValue({ company_id: companyId });
                            setEditStatus2(false);
                            setStartDate(null);
                        } else {
                            notification.error({ message: 'Company Location Configuration creation failed.' });
                        }
                    }
                }
            });
        });

      }else{
        const response = await RestAPI.POSTLocationConfiguration(values)
        if(response.status === 200){
          notification.success({ message: 'Company Location Configuration saved successfully!' });
          getCompanyLocationConfigurationData(companyId);
          form.resetFields();
          form.setFieldsValue({company_id : companyId});
          setEditStatus2(false);
          setStartDate(null);
  
        }else{
          notification.error({ message: 'Company Location Configuration creation Failed' });
        }
      }
    }
    }else{
      notification.error({ message: 'Company Location Configuration already created Try to edit or delete it' });
    }

    
  };
  const confirm = async(id) => {
    const response = await RestAPI.DELLocationConfigurationById(id);
    if(response.status === 200){
      notification.success({ message: 'Company Location Configuration Deleted!' });
      getCompanyLocationConfigurationData(companyId)
    }else{
      notification.error({ message: 'Company Location Configuration delete Failed' });
    }
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
      dataIndex: 'company_location_configuration_id',
      key: 'company_location_configuration_id',
      
      ...getColumnSearchProps('company_location_configuration_id'),
      sorter: (a, b) => a.company_location_configuration_id - b.company_location_configuration_id,

    },
    {
      title: 'Location',
      dataIndex: 'location_id',
      key: 'location_id',
      ...getColumnSearchProps('location_id'),
      sorter: (a, b) => a.location - b.location,
      render: (text, record) => getLocationNameById(record.location_id), // Use helper function here
    },
    {
      title: 'Carder',
      dataIndex: 'carder_id',
      key: 'carder_id',
      ...getColumnSearchProps('carder_id'),
      sorter: (a, b) => a.location - b.location,
      render: (text, record) => getCarderNameById(record.carder_id), // Use helper function here
    },
    {
      title: 'Withdrawal Window',
      key: 'window',
      children: [
        {
          title: 'Start Date',
          dataIndex: 'month_start',
          key: 'month_start',
          ...getColumnSearchProps('month_start'),
          sorter: (a, b) => new Date(a.month_start) - new Date(b.month_start),
      render: (text) => moment(text).format('DD MMMM YYYY'),
        },
        {
          title: 'End Date',
          dataIndex: 'month_end',
          key: 'month_end',
          ...getColumnSearchProps('month_end'),
          sorter: (a, b) => new Date(a.month_end) - new Date(b.month_end),
      render: (text) => moment(text).format('DD MMMM YYYY'),

        },
      ],
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
           {!props.cameFromCompany && (
              <Button 
                type="primary" 
                shape="circle"
                onClick={(e) => getData(record.company_location_configuration_id)}  
                icon={<EditOutlined />} 
              />
            )}
          <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    onConfirm={(e)=>confirm(record.company_location_configuration_id)}
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

  const getCompanyList = async()=>{
    const response = await RestAPI.GETCompanies();
    if(response.status === 200){
      const companyOptions = response.data.map(company => ({ value: company._id, label: company.name }));
      setCompanyData(companyOptions)
    }
  }

  

  const getCompanyLocationConfigurationData = async(id)=>{
    const response = await RestAPI.GETLocationConfigurationByCompany(id);
    if(response.status === 200){
      setLocationConfigurationData(response.data)
    }else{
      setLocationConfigurationData([])
      
    }
  }

  const getData = async(id) => {
    const response = await RestAPI.GETLocationConfigurationById(id);

    if(response.status === 200){
      setCompanyConfigurationId(id);
      

      const salary_date = convertToIsoString(response.data.salary_date);
      const month_start = convertToIsoString(response.data.month_start);
      const month_end = convertToIsoString(response.data.month_end);
      handleStartDateChange(month_start)

      form.setFieldsValue({
          company_id: response.data.company_id,
          location_id: response.data.location_id,
          carder_id: response.data.carder_id,
          salary_date: salary_date,
          month_start: month_start,
          month_end: month_end,
          max_percentage_override: response.data.max_percentage_override,
      });
      setEditStatus2(true);
    }else{
      handleCancel();
      setCompanyConfigurationId();
      setEditStatus2(false);
    }
  }

  const getCompanyOtherList = async(id)=>{
    const response = await RestAPI.GETLocationsByCompany(id);
    const response3 = await RestAPI.GETCardersByCompany(id);
    if(response.status === 200){
      const allOptions = { value: 'all', label: 'All' };
      const companyOptions = response.data.map(company => ({ value: company._id, label: company.name }));
      companyOptions.unshift(allOptions);
      setLocationData(companyOptions);
    }else{
      setLocationData([]);

    }
    if(response3.status === 200){
      const allOptions = { value: 'all', label: 'All' };
      const companyOptions = response3.data.map(company => ({ value: company._id, label: company.name }));
      companyOptions.unshift(allOptions);
      setCarderData(companyOptions)
    }else{
      setCarderData([])
    }

  }

  useEffect(()=>{
    
    if(props.companyId){
      getCompanyData(props.companyId);
      setEditStatus(true);
      setCompanyId(props.companyId);
      getCompanyOtherList(props.companyId)
    }else{
      setEditStatus(false)
      setCompanyId();
    }
    getCompanyList();
  },[props.tabClicked, props.companyId])

  useEffect(()=>{
    if(companyId){
      getCompanyLocationConfigurationData(companyId);
      getCompanyOtherList(companyId);
    }else{
      setLocationConfigurationData([])
    }
  },[companyId]);

  const getCompanyData = async (id) => {
    if(id){
      const response = await RestAPI.GETCompanyById(id)
      form.setFieldsValue({company_id : response.data._id});
      setCompanyId(response.data._id)
    }

  }

  const handleStartDateChange = (date) => {
    setStartDate(date);
    form.setFieldsValue({ month_end: null });
  };

  const disabledEndDate = (current) => {
    if (!startDate) {
      return true; 
    }
    return current && current < startDate.startOf('day'); 
  };



  return (
    <>
      <div>

    
         
      <strong>Company Configuration</strong>
      <hr/>
            
          <Form form={form}
      layout="vertical" 
      onFinish={handleSubmit} 
      onFinishFailed={handleFailedSubmit}
      initialValues={{
          company_id: null,
          location_id: '',
          carder_id: ''
        }}>
        <Row gutter={20}>
          <Col lg={12} xs={24}>
          <Form.Item Label="Company Name"
          name="company_id"
            rules={[{ required: true, message: 'Please select a company!' }]}
            >
          <Select disabled options={companyData}
              onChange={n=>{
                setCompanyId(n)
              }}
              placeholder="Select a company"
    />
      </Form.Item>
          </Col>
          </Row>
          <Row gutter={20}>
          <Col lg={12} xs={24}>
          <Form.Item label="Location"
          name="location_id"
            rules={[{ required: true, message: 'Please select a location!' }]}
           >
          <Select 
     options={locationData}
      placeholder="Select a Location"
    />
      </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
          <Form.Item label="Carder" 
                name="carder_id"
                  rules={[{ required: true, message: 'Please select a Carder!' }]}
                >
                <Select 
            options={carderData}
            placeholder="Select a Carder"
          />
            </Form.Item>
      </Col>
        </Row>

        <Row gutter={20}> 
          <Col lg={6} xs={24}>
          <Form.Item label="Salary Date" name="salary_date"  rules={[{ required: true, message: 'Please select a Salary Date!' }]}>
          <DatePicker className='full-width'/>

      </Form.Item>

          </Col>
          <Col lg={6} xs={24}>
          Withdrawal Window
            </Col>
            <Col lg={6} xs={24}>
            <Form.Item label="From" name="month_start"  rules={[{ required: true, message: 'Please select a Starting Month!' }]}>
          <DatePicker onChange={handleStartDateChange} className='full-width'/>

      </Form.Item>
</Col>
<Col lg={6} xs={24}>
<Form.Item label="To" name="month_end"  rules={[{ required: true, message: 'Please select a Ending Month!' }]}>
          <DatePicker disabled={startDate === null} className='full-width' disabledDate={disabledEndDate}/>

      </Form.Item>
</Col>
          
        </Row>

        <Row gutter={20}>
  <Col lg={12} xs={24}>
  <Form.Item label="Max Percentage allowed" name="max_percentage_override"
  rules={[{ required: true, message: 'Percentage allowed' }]}>
      <Input placeholder="" />
    </Form.Item>
  </Col>
</Row>
        
          <Row>
            <Col lg={24} xs={24} className='pull-right'>
            <Button type='primary' danger onClick={handleCancel}>Cancel</Button>
            <Button type="primary" className='ml-15' htmlType="submit">Save</Button>
            </Col>
          </Row>
        </Form>
<br/>
<Row>
  <Col lg={24}>
  <Table columns={columns} dataSource={locationConfigurationData} />
  </Col>
</Row>



        
      
        </div> 
    </>
  )
}

export default CompanyLocation
