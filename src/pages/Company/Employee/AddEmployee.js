import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import CIcon from '@coreui/icons-react';
import { cilPeople, cilUser, cilUserFemale } from '@coreui/icons';
import { CardBody, Nav, NavItem, NavLink, TabContent, TabPane, Progress } from 'reactstrap';
import { Button, Divider, Row, Col, Form, Input, Select, DatePicker, notification } from 'antd';
import classnames from 'classnames';
import RestAPI from '../../../common/RestServices/RestAPI';

const AddEmployee = (props) => {
  const [activeTab, setActiveTab] = useState(1);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [tabDisableStatus, setTabDisableStatus] = useState({
    0 : false,
    1 : true,
    2 : true
  })
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [employeeDetailsID, setEmployeeDetailsID] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [companyLocation, setCompanyLocation] = useState([]);
  const [companyCarder, setCompanyCarder] = useState([]);
  const [companyDepartment, setCompanyDepartment] = useState([]);
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const toggleTab = (tab, value) => {
    if (activeTab !== tab) {
      const modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 4) {
        setActiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }

    setProgressBarValue(value);
  };

  const { TextArea } = Input;

  const getCompanyLocation = async(id) => {
    const response = await RestAPI.GETLocationsByCompany(id);
    const payload =  response.data.map(item => ({
      value: item._id,
      label: item.name
    }));
    setCompanyLocation(payload)
  }

  const getCompanyDepartment = async(id) => {
    const response = await RestAPI.GETDepartmentsByCompany(id);
    const payload =  response.data.map(item => ({
      value: item._id,
      label: item.name
    }));
    setCompanyDepartment(payload)
  }

  const getCompanyCarder = async(id) => {
    const response = await RestAPI.GETCardersByCompany(id);
    const payload =  response.data.map(item => ({
      value: item._id,
      label: item.name
    }));
    setCompanyCarder(payload)
  }

  useEffect(()=>{
    const storedRecord = localStorage.getItem('CompanyId');
    const companyData = JSON.parse(sessionStorage.getItem('authUser'))
    if(companyData){
      setCompanyName(companyData.name);
      setCompanyId(storedRecord); 
      getCompanyLocation(storedRecord);
      getCompanyDepartment(storedRecord);
      getCompanyCarder(storedRecord);
    }
  },[])
  return (
    <>
      <div>
        <CardBody>
          <div className="progress-nav mb-4">
            <Progress value={progressBarValue}  style={{ height: '1px' }} />
            <Nav className="nav-pills progress-bar-tab custom-nav" role="tablist">
              {[1, 2, 3].map((tab, index) => (
                <NavItem key={tab}>
                  <NavLink
                    // disabled={tabDisableStatus[index]}
                    disabled={true}
                    to="#"
                    className={classnames({
                      active: activeTab === tab,
                      done: activeTab >= tab,
                    }, 'rounded-pill')}
                    onClick={() => toggleTab(tab, (tab - 1) * 50)}
                    tag="button"
                  >
                    {tab}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </div>

          <TabContent activeTab={activeTab}>
            <TabPane tabId={1}>
              <Form form={form1} layout="vertical" className="form-steps">
                <Divider>Personal Information</Divider>
                <Row gutter={20}>
                  <Col lg={12} xs={24}>
                    <Form.Item label="Company Name">
                      <Input placeholder="" value={companyName} disabled/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col lg={8} xs={24}>
                    <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please enter first name' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please enter last name' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="NIC" name="nic" rules={[{ required: true, message: 'Please enter NIC' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col lg={4} xs={24}>
                    <Form.Item label="Date of Birth" name="date_of_birth" rules={[{ required: true, message: 'Please select date of birth' }]}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col lg={4} xs={24}>
                    <Form.Item label="Date Join" name="date_of_join" rules={[{ required: true, message: 'Please select joining date' }]}>
                      <DatePicker />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Phone" name="contact_number" rules={[{ required: true, message: 'Please enter phone number' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="EMP No" name="employee_number" rules={[{ required: true, message: 'Please enter employee number' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  {/* <Col lg={8} xs={24}>
                    <Form.Item label="EMP No" name="empNo" rules={[{ required: true, message: 'Please enter employee number' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col> */}
                  {/* <Col lg={8} xs={24}>
                    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select status' }]}>
                      <Select options={[{ value: 'A', label: 'A' }]} />
                    </Form.Item>
                  </Col> */}
                </Row>
                <div className="d-flex align-items-start gap-3 mt-4">
                  <Button type="button" className="btn btn-success btn-label right ms-auto nexttab" onClick={async() => {
                    try{
                    await form1.validateFields();
                    const payload = form1.getFieldsValue();
                    payload.date_of_join = payload.date_of_join.format('YYYY-MM-DD')
                    payload.date_of_birth = payload.date_of_birth.format('YYYY-MM-DD')
                    payload.role = 'employee';
                    payload.username = payload.nic;
                    delete payload.employee_number;
                    const res = await RestAPI.POSTEmployee(payload)
                    if(res.status === 200){
                      setEmployeeId(res.data);
                      toggleTab(activeTab + 1, 50);
                      setTabDisableStatus({
                        0 : false,
                        1 : false,
                        2 : true
                      })
                      notification.success({ message: 'Employee added successfully!' });
                      
                    }else{
                      notification.error({ message: 'Employee Failed!' });
                    }
                    
                    }catch(err){
                      console.log(err)
                      notification.error({ message: err });

                    }
                    }}>
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go to Bank/Salary Information
                  </Button>
                </div>
              </Form>
            </TabPane>

            <TabPane tabId={2}>
              <Form form={form2} layout="vertical" className="form-steps">
                <Divider>Salary Information</Divider>
                <Row gutter={20}>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Basic Salary" name="basic_salary" rules={[{ required: true, message: 'Please enter basic salary' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Net Salary" name="net_salary" rules={[{ required: true, message: 'Please enter net salary' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider>Bank Information</Divider>
                <Row gutter={20}>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Bank Name" name="bank_name" rules={[{ required: true, message: 'Please select bank name' }]}>
                      <Select options={[{ value: 'A', label: 'A' }]} />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Branch" name="bank_branch" rules={[{ required: true, message: 'Please enter branch' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Account No" name="account_number" rules={[{ required: true, message: 'Please enter account number' }]}>
                      <Input placeholder="" />
                    </Form.Item>
                  </Col>
                </Row>
                <Divider>Notes</Divider>
                <Row gutter={20}>
                  <Col lg={24} xs={24}>
                    <Form.Item label="Notes" name="notes">
                      <TextArea
                        showCount
                        maxLength={100}
                        placeholder="Any additional note or comments"
                        style={{ height: 150, resize: 'none' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="d-flex align-items-start gap-3 mt-4">
                  {/* <Button type="button" className="btn btn-link text-decoration-none btn-label previestab" onClick={() => toggleTab(activeTab - 1, 0)}>
                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to Personal Information
                  </Button> */}
                  <Button type="button" className="btn btn-success btn-label right ms-auto nexttab" onClick={async() => {
                    try{
                    await form2.validateFields();
                    console.log(form2.getFieldsValue());
                    const payload0 = form1.getFieldValue();
                    const payload = form2.getFieldValue();
                    payload.employee_number = payload0.employee_number;
                    payload.employee_id = employeeId;
                    payload.company_id = companyId;
                    const res = await RestAPI.POSTEmployeeDetails(payload)
                    if(res.status === 200){
                      setEmployeeDetailsID(res.data)
                      toggleTab(activeTab + 1, 100)
                      setTabDisableStatus({
                        0 : false,
                        1 : false,
                        2 : false
                      })
                      notification.success({ message: 'Employee Details added successfully!' });
                    }else{
                      notification.error({ message: 'Employee Details Failed!' });

                    }
                    
                    }catch(err){
                      notification.error({ message: err });
                    }
                    }}>
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Go to Location Information
                  </Button>
                </div>
              </Form>
            </TabPane>

            <TabPane tabId={3}>
              <Form form={form3} layout="vertical" className="form-steps">
                <Divider>Location Information</Divider>
                <Row gutter={20}>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Location" name="location_id" rules={[{ required: true, message: 'Please select location' }]}>
                      <Select options={companyLocation} />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Carder" name="carder_id" rules={[{ required: true, message: 'Please select carder' }]}>
                      <Select options={companyCarder} />
                    </Form.Item>
                  </Col>
                  <Col lg={8} xs={24}>
                    <Form.Item label="Department" name="department_id" rules={[{ required: true, message: 'Please select department' }]}>
                      <Select options={companyDepartment} />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="d-flex align-items-start gap-3 mt-4">
                  {/* <Button type="button" className="btn btn-link text-decoration-none btn-label previestab" onClick={() => toggleTab(activeTab - 1, 0)}>
                    <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>Back to Salary/Bank Information
                  </Button> */}
                  <Button type="button" className="btn btn-success btn-label right ms-auto nexttab" onClick={async() => {
                    try{
                    await form3.validateFields();
                    const payload = form3.getFieldValue();
                    payload.company_id = parseInt(companyId);
                    delete payload.carder;
                    delete payload.location;
                    delete payload.department;


                    
                    const res = await RestAPI.POSTCLDCUser(payload)
                    if(res.status === 200){
                      form1.resetFields();
                      form2.resetFields();
                      form3.resetFields();
                      toggleTab(activeTab - 2, 0)
                      props.setjustifyPillsTab('1');
                      notification.success({ message: 'Configuration added successfully!' });
                      
                    }else{
                      notification.error({ message: 'Configuration Failed!' });

                    }
                    }catch(err){
                      console.log(err)
                    }
                    
                    }}>
                    <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Submit
                  </Button>
                </div>
              </Form>
            </TabPane>
          </TabContent>
        </CardBody>
      </div>
    </>
  );
};

export default AddEmployee;
