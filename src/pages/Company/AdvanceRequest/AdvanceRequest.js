import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Modal, Space, Table, Card, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, Dropdown } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI';
import moment from 'moment';

const AdvanceRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [userData, setUserData] = useState('');
  const [userDataSelected, setUserDataSelected] = useState();
  const [userAdvanceData, setUserAdvanceData] = useState();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
    setUserDataSelected();
    setUserAdvanceData();
    form2.resetFields();

  };

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
      title: 'EMP Name',
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

<Button onClick={async()=>{
  showModal()
  setUserDataSelected(record);
  const payload = {
    employee_id:record.employee_id,
    company_id: companyId
  }
  const res = await RestAPI.GETAdvanceRequestData(payload)
  if(res.data.length > 0){
    const payload = {
    approvedAdvanceRequest: 0,
    amount: 0,
    PendingApprovalAdvanceRequest: 0,
    Amount2: 0,
    };
  
    res.data.forEach(request => {
        if (request.transfer_status === "CompanyPending") {
          payload.PendingApprovalAdvanceRequest += 1;
          payload.Amount2 += request.request_amount;
        } else if (request.approve_date) {
          payload.approvedAdvanceRequest += 1;
          payload.amount += request.approved_amount;
        }
    });

    payload.EarnedSalary = 10000
    setUserAdvanceData(payload)
  }else{
    setUserAdvanceData({
      "approvedAdvanceRequest": 0,
      "amount":0,
      "PendingApprovalAdvanceRequest":0,
      "Amount2":0,
      "EarnedSalary":10000,
    })
  }

  }} warning>Advance Request</Button>
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

  const handleCancelSearch2 = () => {
    form2.resetFields();
  };

  const handleSubmit = async(values) => {
   getUserSearch(companyId, values)
  };

  const handleSubmit2 = async(values) => {
    // company_id
    // employee_id
    // employee_details_id
    // request_amount
    // approved_amount
    // requested_dates
    // company_comment
    // bank_comment
    // transfer_statuss

    const currentDateTime = new Date();

    const payload = {
      ...values,
      company_id: companyId,
      employee_id: userDataSelected?.employee_id,
      employee_details_id: userDataSelected?._id,
      request_date: moment(currentDateTime).format('YYYY-MM-DD HH:mm:ss'),
      transfer_status: 'CompanyPending'
    }

    const res = await RestAPI.POSTAdvanceRequestData(payload);
    if(res.status === 200){
      
      notification.success({ message: 'Approval Send' });
      handleCancel();
    }else{     
      notification.error({ message: 'Server Error' });
    }
   };

  useEffect(()=>{
    const storedRecord = localStorage.getItem('CompanyId');
    const companyData = JSON.parse(sessionStorage.getItem('authUser'))
    if(companyData){
      setCompanyId(storedRecord); 
      getUserSearch(storedRecord,{})
    }
},[])
  return (
    <>
      <div>

        <Card className="mb-4">
          <div>
            <h4>Advance Request</h4>
            <hr/>
          </div>
          <div>


            <Form layout="vertical"
            form={form} 
                  onFinish={handleSubmit} 
                  >
              <Row gutter={20}>
                <Col lg={6} xs={24}>
                <Form.Item label="Employee Code" name="employee_number">
                    <Input placeholder="Sort by Employee Code" />

                  </Form.Item>
                </Col>
                <Col lg={6} xs={24}>
                <Form.Item label="NIC" name="nic">
                    <Input placeholder="Sort by  NIC" />

                  </Form.Item>
                </Col>
              </Row>


              <Row gutter={20}>
                <Col lg={6} xs={24}>
                <Form.Item label="Phone No" name="contact_number">
                    <Input placeholder="Sort by Phone Number" />

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
        </Card>

        <Modal title="Advance Request" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
      <Form 
      form={form2} 
      onFinish={handleSubmit2} 
      layout="vertical">
              <Row gutter={20}>
                <Col lg={12} xs={24}>
                  <Form.Item label="First Name">
                    <Input placeholder="" disabled value={userDataSelected?.first_name}/>
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item label="Last Name">
                  <Input placeholder="" disabled value={userDataSelected?.last_name} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col lg={12} xs={24}>
                  <Form.Item label="NIC">
                    <Input placeholder="" disabled value={userDataSelected?.nic}/>
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item label="Date of Joining" >
                  <Input placeholder="" disabled value={moment(userDataSelected?.date_of_join).format('DD MMMM YYYY')}/>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col lg={12} xs={24}>
                  <Form.Item label="Employee Code">
                    <Input placeholder="" disabled value={userDataSelected?.employee_number}/>
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
<Row gutter={20}>
  <Col xl={12}>
  
  <Form.Item label="Approved Advance Requests">
                  <Input placeholder=""  disabled value={userAdvanceData?.approvedAdvanceRequest}/>
                  </Form.Item>
  </Col>
  
  <Col xl={12}>
  <Form.Item label="Amount">
                  <Input placeholder=""  disabled value={userAdvanceData?.amount}/>
                  </Form.Item>
  </Col>
</Row>
      </Col>         

              </Row>
              <Row gutter={20}>
                <Col lg={12} xs={24}>
                <Row gutter={20}>
  <Col xl={12}>
  
  <Form.Item label="Pending Approved Advance Req.">
                  <Input placeholder=""  disabled value={userAdvanceData?.PendingApprovalAdvanceRequest}/>
                  </Form.Item>
  </Col>
  
  <Col xl={12}>
  <Form.Item label="Amount">
                  <Input placeholder=""  disabled value={userAdvanceData?.Amount2}/>
                  </Form.Item>
  </Col>
</Row>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item label="Earned Salary">
                  <Input placeholder=""  disabled value={userAdvanceData?.EarnedSalary}/>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col lg={12} xs={24}>
                  <Form.Item label="Amount Approved"  name="approved_amount"
                    rules={[
                        { required: true, message: 'Please enter the Approved Amount!' },
                        {
                          validator: (_, value) => 
                            value && value > userAdvanceData?.EarnedSalary 
                            ? Promise.reject(`Amount cannot be more than ${userAdvanceData?.EarnedSalary}`) 
                            : Promise.resolve(),
                        },
                      ]}                  
                  >
                    <Input placeholder=""/>
                  </Form.Item>
                </Col>
                <Col lg={12} xs={24}>
                  <Form.Item label="Requested Amount"
                   name="request_amount" 
                   rules={[{ required: true, message: 'Please enter the Requested Amount!' }]}
                  >
                  <Input placeholder=""/>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col lg={12} className='pull-right button-col'>
                <Button type='primary' danger onClick={handleCancelSearch2}>Cancel</Button>

                  <Button type="primary" className='ml-15' htmlType="submit">Send Approval</Button>

                </Col>
              </Row>
            </Form>
      </Modal>

      </div>
    </>
  )
}

export default AdvanceRequest
