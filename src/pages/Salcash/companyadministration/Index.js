import React, { useEffect, useState } from 'react';



import { Button, Drawer, Flex, Form, Input, Popconfirm, Space, Table, Tag, notification, Row, Col, Checkbox, Select, Radio, DatePicker, Tabs, Card } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import { Nav, NavItem, NavLink, TabContent, TabPane, UncontrolledTooltip } from "reactstrap";
import classnames from "classnames";

import CompanyLocation from '../companylocation/CompanyLocations'
import Companyconfiguration from '../companyconfiguration/CompanyConfiguration'
import Companyusers from '../companyusers/CompanyUsers'
import Companycontact from '../companycontact/CompanyContact'
import CompanyCretate from '../companyadministration/CompanyDetails'

const CompanyDetails = () => {
 
  const [justifyPillsTab, setjustifyPillsTab] = useState("1");
  const [companyId, setCompanyId]= useState()
  const [disabled, setDisabled] = useState(false);
  const [disabled2, setDisabled2] = useState(false);

  const justifyPillsToggle = (tab) => {
      if (justifyPillsTab !== tab) {
          setjustifyPillsTab(tab);
      }
  };

  const getDataFromChild = (value) => {
    setCompanyId(value)
    setDisabled(false)
    setjustifyPillsTab("2")
  }
  
  useEffect(()=>{
    const storedRecord = localStorage.getItem('CompanyId');
    const Layout = sessionStorage.getItem('Layout');
    if(Layout.toLowerCase() === "true"){
      if(storedRecord){
        setCompanyId(JSON.parse(storedRecord));
        localStorage.removeItem('CompanyId');
        setDisabled(false)
      }else{
        setCompanyId()
        setjustifyPillsTab('1')
        setDisabled(true)
      }
    }else{
      setCompanyId(JSON.parse(storedRecord));
      setjustifyPillsTab('5')
      setDisabled2(true)
    }    
  },[])
  return (
    <>
      <div>

      <Card className="mb-4">
          <h4>
            <strong>Company Administration</strong>
          </h4>
          <div>
<br/>
          <Nav pills className="nav-justified mb-3">
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }} disabled={disabled2} className={classnames({ active: justifyPillsTab === "1", })} onClick={() => { justifyPillsToggle("1"); }} >
                                            Create Company
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }}  disabled={disabled || disabled2} className={classnames({ active: justifyPillsTab === "2", })} onClick={() => { justifyPillsToggle("2"); }} >
                                            Locations
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }}  disabled={disabled} className={classnames({ active: justifyPillsTab === "3", })} onClick={() => { justifyPillsToggle("3"); }} >
                                            Configurations
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink style={{ cursor: "pointer" }} disabled={disabled || disabled2} className={classnames({ active: justifyPillsTab === "4", })} onClick={() => { justifyPillsToggle("4"); }} >
                                            Users
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} disabled={disabled} className={classnames({ active: justifyPillsTab === "5", })} onClick={() => { justifyPillsToggle("5"); }} >
                                            Contact
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={justifyPillsTab} className="text-muted">
                                        <TabPane tabId="1" id="pill-justified-home-1">
                                        <CompanyCretate tabClicked={justifyPillsTab === "1"} getDataFromChild={getDataFromChild} companyId={companyId}/>

                                        </TabPane>

                                        <TabPane tabId="2" id="pill-justified-profile-1">
                                        <CompanyLocation tabClicked={justifyPillsTab === "2"} companyId={companyId}/>
                                        </TabPane>

                                        <TabPane tabId="3" id="pill-justified-messages-1" >
                                        <Companyconfiguration tabClicked={justifyPillsTab === "3"}  cameFromCompany={disabled2} companyId={companyId}/>
                                        </TabPane>

                                        <TabPane tabId="4" id="pill-justified-settings-1">
                                        <Companyusers tabClicked={justifyPillsTab === "4"} companyId={companyId}/>
                                        </TabPane>
                                        <TabPane tabId="5" id="pill-justified-settings-1">
                                        <Companycontact tabClicked={justifyPillsTab === "5"} cameFromCompany={disabled2} companyId={companyId}/>
                                        </TabPane>
                                    </TabContent>
          </div>
        </Card>

      
        </div> 
    </>
  )
}

export default CompanyDetails
