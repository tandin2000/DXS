import React, { useEffect, useRef, useState } from 'react';
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
import RestAPI from '../../../common/RestServices/RestAPI';
import moment from 'moment';


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
  
  const [companyId, setCompanyId] = useState('');
  const [userAdvanceValue, setUserAdvanceValue] = useState();
  const [advanceData, setAdvanceData] = useState([]);

  const showModal = (value) => {
    const pendingApprovals = advanceData.filter(item => item.employee_id === value.employee_id && item.transfer_status === 'CompanyPending').reduce((total, item) => total + item.request_amount, 0)
    const totalItemsForEmployee = advanceData.filter(item => item.employee_id === value.employee_id).length;

    value.pendingApprovalsAmount = pendingApprovals;
    value.totalItemsForEmployee = totalItemsForEmployee;
    setUserAdvanceValue(value)
    setIsModalOpen(true);
  };
  
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
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

  const confirm2 = async(value)=>{
    const currentDateTime = new Date();
    const payload = {
      approve_date:moment(currentDateTime).format('YYYY-MM-DD HH:mm:ss'),
      transfer_status: 'CompanyApproved'
    }
    const res = await RestAPI.PUTAdvanceRequestApprove(payload, value.advance_request_id)
    if(res.status === 200){
      notification.success({ message: 'Approved' });
      getAdvanceData(companyId);

    }else{  
      notification.error({ message: 'Server Error' });
    }
  }

  const getMenuItems = (record) => {
    const items = [
      {
        key: '1',
        label: <span onClick={() => showModal(record)}>View Details</span>,
      },
    ];
  
    if (record.transfer_status === "CompanyPending") {
      items.push({
        key: '2',
        label: (
          <Popconfirm
            title="Approve"
            description="Approve this Employee Advance Request?"
            onConfirm={() => confirm2(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            Approve
          </Popconfirm>
        ),
      });
    }
  
    return items;
  };
  

  const columns = [
    {
      title: 'ID',
      dataIndex: 'advance_request_id',
      key: 'advance_request_id',
      width: 200,
    },
    {
      title: 'EMP Code',
      dataIndex: 'employee_number',
      key: 'employee_number',

      ...getColumnSearchProps('employee_number'),
      sorter: (a, b) => a.id - b.id,
      width: 200,
    },
    {
      title: 'Name',
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

          <Dropdown
            menu={{
              items: getMenuItems(record),
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

  const getAdvanceData = async(id)=>{
    const res = await RestAPI.GETAdvanceRequestDataCompany(id);
    if(res.status === 200){
      setAdvanceData(res.data)
      // setAdvanceData(response.data.filter(item => item.role === 'employee'))
    }else{  
      setAdvanceData([])    
    }
  }
  useEffect(()=>{
    const storedRecord = localStorage.getItem('CompanyId');
    const companyData = JSON.parse(sessionStorage.getItem('authUser'))
    if(companyData){
      setCompanyId(storedRecord); 
      getAdvanceData(storedRecord)
    }
  },[])

  const { TextArea } = Input;
  return (
    <>
      <div>

        <Card className="mb-4">
          <div>
            <h4>Advance Aproval</h4>
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
                <Table columns={columns} dataSource={advanceData} />
              </Col>
            </Row>

          </div>
        </Card>

        <Modal title="Employee Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <table className="table table-striped">
                    <thead>
                      <tr>
                        <th >ID</th>
                        <td>{userAdvanceValue?._id}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th >EMP Code</th>
                        <td>{userAdvanceValue?.employee_number}</td>
                      </tr>
                      <tr>
                        <th >EMP Name</th>
                        <td>{userAdvanceValue?.first_name} {userAdvanceValue?.last_name}</td>
                      </tr>
                      <tr>
                        <th >Phone</th>
                        <td colSpan={2}>{userAdvanceValue?.contact_number}</td>
                      </tr>
                      <tr>
                        <th >NIC</th>
                        <td colSpan={1}>{userAdvanceValue?.nic}</td>
                      </tr>
                      <tr>
                        <th >Requested Date</th>
                        <td colSpan={2}>{moment(userAdvanceValue?.request_date).format('DD MMMM YYYY')}</td>
                      </tr>
                      <tr>
                        <th >Amount Requested</th>
                        <td colSpan={2}>{userAdvanceValue?.request_amount}</td>
                      </tr>
                      <tr>
                        <th >Total Pending Approvels</th>
                        <td colSpan={2}>{userAdvanceValue?.pendingApprovalsAmount}</td>
                      </tr>
                      <tr>
                        <th >Net Salary</th>
                        <td colSpan={2}>{userAdvanceValue?.net_salary}</td>
                      </tr>
                      <tr>
                        <th >Approved Amount</th>
                        <td colSpan={2}>{userAdvanceValue?.approved_amount}</td>
                      </tr>
                      <tr>
                        <th >No of Time Requested</th>
                        <td colSpan={2}>{userAdvanceValue?.totalItemsForEmployee}</td>
                      </tr>
                      <tr>
                        <th >Actions</th>
                        <td colSpan={2}>{userAdvanceValue?.transfer_status === "CompanyPending" ? 'Pending Approval': 'Approved'}</td>
                      </tr>
                    </tbody>
                  </table>
      </Modal>

      </div>
    </>
  )
}

export default EmployeeList
