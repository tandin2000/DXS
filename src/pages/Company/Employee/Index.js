import React, { useState } from 'react';



import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, Card } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { Nav, NavItem, NavLink, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";

 import EmployeeSearch from '../Employee/EmployeeSearch'
import AddEmployee from "../Employee/AddEmployee"
import Upload from "../Employee/Upload"

const CompanyDetails = () => {

  const [justifyPillsTab, setjustifyPillsTab] = useState("1");
  const justifyPillsToggle = (tab) => {
      if (justifyPillsTab !== tab) {
          setjustifyPillsTab(tab);
      }
  };
  const { TextArea } = Input;
  return (
    <>
      <div>

      <Card className="mb-4">
          <h4>
            <strong>Employee Managment</strong>
          </h4>
          <div>
<br/>
          <Nav pills className="nav-justified mb-3">
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyPillsTab === "1", })} onClick={() => { justifyPillsToggle("1"); }} >
                                            Employee Search
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyPillsTab === "2", })} onClick={() => { justifyPillsToggle("2"); }} >
                                            Add/Edit Employees
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }} className={classnames({ active: justifyPillsTab === "3", })} onClick={() => { justifyPillsToggle("3"); }} >
                                            Upload
                                            </NavLink>
                                        </NavItem>
                                      
                                    </Nav>

                                    <TabContent activeTab={justifyPillsTab} className="text-muted">
                                        <TabPane tabId="1" id="pill-justified-home-1">
                                       <EmployeeSearch/>

                                        </TabPane>

                                        <TabPane tabId="2" id="pill-justified-profile-1">
                                       <AddEmployee setjustifyPillsTab={setjustifyPillsTab}/>
                                        </TabPane>

                                        <TabPane tabId="3" id="pill-justified-messages-1" >
                                        <Upload/>
                                        </TabPane>

                                      
                                    </TabContent>


          {/* <Tabs className="card-tabs main-tabs" >
          <Tabs.TabPane tab="Create Company" key='create'>
            <CompanyCretate/>
       
          </Tabs.TabPane>
          <Tabs.TabPane tab="Locations" key='locations'>
            <CompanyLocation/>
       
          </Tabs.TabPane>

          <Tabs.TabPane tab="Configurations" key='configurations'>
           <Companyconfiguration/>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key='users'>
            <Companyusers/>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Contact" key='contact'>
            <Companycontact/>
            </Tabs.TabPane>
        </Tabs> */}
          </div>
        </Card>

      
        </div> 
    </>
  )
}

export default CompanyDetails
