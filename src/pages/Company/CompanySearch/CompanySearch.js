import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames'


import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'
import Highlighter from 'react-highlight-words';
import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Card, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, message, Dropdown, Menu } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EyeOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import RestAPI from '../../../common/RestServices/RestAPI'
import { useNavigate } from 'react-router-dom';
const items = [
  {
    key: '1',
    label: 'View',
  },
  {
    key: '2',
    label: 'Edit',
  },
  // {
  //   key: '3',
  //   label: 'Upload Employees',
  // },
  // {
  //   key: '4',
  //   label: 'Add / Edit Bank Accounts',
  // },
  // {
  //   key: '5',
  //   label: 'Approvels',
  // },
];
const CompanyLocation = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const[companyData, setCompanyData] = useState([]);

  const handleMenuClick = (e, record) => {
    switch(e.key){
      case "1" :
        break;
      case "2" :
          localStorage.setItem('edit', JSON.stringify(1));
          navigate('/CompanyAdministration');
        break;
      default :
        break;
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Industry',
      dataIndex: 'industry',
      key: 'industry',
    },


    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
        <Dropdown
          overlay={(
            <Menu onClick={(e) => handleMenuClick(e, record)}>
              {items.map((item) => (
                <Menu.Item key={item.key}>
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          )}
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

  const getCompany = async(id) =>{
    const response = await RestAPI.GETCompanyById(id)
    if(response.status === 200){
      setCompanyData([response.data])
    }else{
      notification.error({ message: 'Company Searching Failed' });
    }
  }

  useEffect(()=>{
    const storedRecord = localStorage.getItem('CompanyId');
    const companyData = JSON.parse(sessionStorage.getItem('authUser'))
    if(companyData){
      setCompanyName(companyData.name);
      setCompanyId(storedRecord);
      getCompany(storedRecord)
    }
  },[])
  
  return (
    <>
      <div>

        <Card className="mb-4">
          <div>
            <h4>Company Search</h4>
            <hr/>
          </div>
          <div>


            <Form layout="vertical">
              <Row gutter={20}>
                <Col lg={6} xs={24}>
                  <Form.Item label="Company Name">
                    <Input placeholder="Company Name in Full as per BRC" value={companyName} disabled/>
                  </Form.Item>
                </Col>
                {/* <Col lg={6} xs={24}>
                  <Form.Item label="Industry">
                    <Select
                      defaultValue="Select"

                      options={[{ value: 'A', label: 'A' }]}
                    />
                  </Form.Item>
                </Col> */}
              </Row>


              {/* <Row gutter={20}>
                <Col lg={6} xs={24}>
                  <Form.Item label="Company Nick Name">
                    <Input placeholder="Short company Name as Identifier" />

                  </Form.Item>

                </Col>
                <Col lg={6} xs={24}>
                  <Form.Item label="Business Registration Number">
                    <Input placeholder="" />

                  </Form.Item>
                </Col>



              </Row>


              <Row>
                <Col lg={12} className='pull-right button-col'>
                  <Button warning>Cancel</Button>
                  <Button type="primary" className='ml-15'>Search</Button>
                </Col>
              </Row> */}
            </Form>
            <br />
            <Row>
              <Col lg={24}>
                <Table columns={columns} dataSource={companyData} />
              </Col>
            </Row>

          </div>
        </Card>



      </div>
    </>
  )
}

export default CompanyLocation
