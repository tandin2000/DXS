import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//SalCash
import CompanySearch from "../pages/Salcash/CompanySearch/CompanySearch";
import CompanyAdministration from "../pages/Salcash/companyadministration/Index";
import CompanyDetails from "../pages/Salcash/companyadministration/CompanyDetails";
import Settings from "../pages/Salcash/settings/Settings";
import CompanyStatus from "../pages/Salcash/companystatus/CompanyStatus";
import CompanyLocation from "../pages/Salcash/companylocation/CompanyLocations";
import CompanyConfiguration from "../pages/Salcash/companyconfiguration/CompanyConfiguration";
import CompanyUsers from "../pages/Salcash/companyusers/CompanyUsers";
import CompanyContact from "../pages/Salcash/companycontact/CompanyContact";
import DataMapping from "../pages/Salcash/datamapping/DataMapping";
import CompanyAging from "../pages/Salcash/companyaging/CompanyAging"; 


//Company
import MyCompanySearch from "../pages/Company/CompanySearch/CompanySearch";
import Employee from "../pages/Company/Employee/Index";
import AdvanceRequest from '../pages/Company/AdvanceRequest/AdvanceRequest';
import BankAccount from '../pages/Company/BankAccount/BankAccount';
import BankPaymentIndex from '../pages/Company/BankPayment/Index';
import EmployeeList from "../pages/Company/BankPayment/EmployeeList";
import Upload from "../pages/Company/BankPayment/Upload";
import Approval from "../pages/Company/BankPayment/Approval";
import MonthEnd from '../pages/Company/MonthEnd/Index';
import EmployeeAproval from '../pages/Company/EmployeeApproval/Index';
import AdvanceApproval from '../pages/Company/AdvanceApproval/Index';
import CompanyOverview from '../pages/Company/CompanyOverview/Index';

//pages
import Starter from "../pages/Pages/Starter/Starter";



//login
import Login from "../pages/Authentication/Login";
import ForgetPassword from "../pages/Authentication/ForgetPassword";


const authProtectedRoutes = [

  { path: "/dashboard", component: <DashboardEcommerce /> },
  //Pages
  { path: "/pages-starter", component: <Starter /> },
  { path: "/company-search", component: <CompanySearch /> },
  { path: "/CompanyAdministration", component: <CompanyAdministration /> },
  { path: "/CompanyDetails", component: <CompanyDetails /> },
  { path: "/Settings", component: <Settings /> },
  { path: "/CompanyStatus", component: <CompanyStatus /> },
  { path: "/CompanyLocation", component: <CompanyLocation /> },
  { path: "/CompanyConfiguration", component: <CompanyConfiguration /> },
  { path: "/CompanyUsers", component: <CompanyUsers /> },
  { path: "/CompanyContact", component: <CompanyContact /> },
  { path: "/DataMapping", component: <DataMapping /> },
  { path: "/CompanyAging", component: <CompanyAging /> },
  { path: "/mycompany-search", component: <MyCompanySearch />},
  { path: "/employee", component: <Employee />},
  { path: "/advancerequest", component: <AdvanceRequest />},
  { path: "/bankaccount", component: <BankAccount />},
  { path: "/bankpaymentindex", component: <BankPaymentIndex />},
  { path: "/employeelist", component: <EmployeeList />},
  { path: "/upload", component: <Upload />},
  { path: "/approval", component: <Approval />},
  { path: "/monthend", component: <MonthEnd />},
  { path: "/employeeaproval", component: <EmployeeAproval />},
  { path: "/advanceapproval", component: <AdvanceApproval />},
  { path: "/companyoverview", component: <CompanyOverview />},


  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "*", component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/ForgetPassword", component: <ForgetPassword /> },
];

export { authProtectedRoutes, publicRoutes };
