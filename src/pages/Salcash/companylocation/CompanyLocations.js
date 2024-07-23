import React, { useState } from 'react'
import classNames from 'classnames'


import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs } from 'antd';
import Locations from './Locatins';
import Departments from './Departments';
import Carders from './Carders';

const CompanyLocation = (props) => {
  const [tab, setTab] = useState('Locations')
  const handleTabChange = (key) => {
    setTab(key)
  };

  return (
    <>
      <div>
        <Tabs className="card-tabs" onChange={handleTabChange}>
          <Tabs.TabPane tab="Locations" key='locations'>
            <Locations tabClicked={tab === "locations"} companyId={props.companyId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Departments" key='departments'>
            <Departments tabClicked={tab === "departments"} companyId={props.companyId}/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Carders" key='carders'>
            <Carders tabClicked={tab === "carders"} companyId={props.companyId}/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  )
}

export default CompanyLocation
