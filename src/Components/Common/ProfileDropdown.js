import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import {jwtDecode} from 'jwt-decode';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

// Import images
import avatar1 from "../../assets/images/users/avatar-3.jpg";
import AuthAPI from '../../common/RestServices/AuthAPI';

const ProfileDropdown = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState("Admin");
    const [companyName, setCompanyName] = useState("Company User");
    const [companyList, setCompanyList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const getData = () =>{
        if (sessionStorage.getItem("authUser")) {
            const obj = JSON.parse(sessionStorage.getItem("authUser"));
            const obj2 = JSON.parse(sessionStorage.getItem("authAllData"));
            const companyList = obj2.map(item => ({
                label: item.company.name,
                value: item.company._id
            }));
            setCompanyList(companyList);
            const decodedToken = jwtDecode(obj.jwt.access_token);
            setUserName(decodedToken.name ? decodedToken.name : "Admin");
            setSelectedCompany(obj._id ? obj._id : null);
            setCompanyName(obj.name ? obj.name : "Company User");
        }
    }

    const removeCacheStorage = () => {
        sessionStorage.removeItem("authUser");
        sessionStorage.removeItem("authAllData");
        localStorage.removeItem('CompanyId');
        localStorage.removeItem('edit');
    }

    useEffect(() => {
        getData(); 
    }, []);

    // Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };

    const selectedCompanyFunction = (value) => {
        setSelectedCompany(value);
        const obj2 = JSON.parse(sessionStorage.getItem("authAllData"));
        
        const index = obj2.findIndex(companyData => companyData.company._id === value);
        const singleCompany = obj2[index].company
        const salcashStatus = singleCompany.name.toLowerCase() === "salcash";

        if(!salcashStatus){
            localStorage.setItem("CompanyId", singleCompany._id);
        }else{
            localStorage.removeItem('CompanyId');
        }
        sessionStorage.setItem('Layout', salcashStatus)
        sessionStorage.setItem("authUser", JSON.stringify(singleCompany));
        localStorage.removeItem('edit');

        getData(); 
        navigate('/dashboard')
    };

    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{userName}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{companyName}</span>
                        </span>
                    </span>
                    
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    <h6 className="dropdown-header">Welcome {userName}!</h6>
                    <DropdownItem href={process.env.PUBLIC_URL + "/profile"}>
                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Profile</span>
                    </DropdownItem>
                    <DropdownItem onClick={async () => {
                        if (sessionStorage.getItem("authAllData")) {
                            const obj = JSON.parse(sessionStorage.getItem("authAllData"));
                            const payloads = obj.map(company => {
                                return {
                                    companyId: company.company._id,
                                    refreshToken: company.company.jwt.refresh_token
                                };
                            });
                            const res = await AuthAPI.logout({'data': payloads});
                            if (res.status === 200) {
                                navigate('/login');
                                sessionStorage.removeItem("authUser");
                                sessionStorage.removeItem("authAllData");
                                sessionStorage.removeItem("Layout");
                                localStorage.removeItem('CompanyId');
                                localStorage.removeItem('edit');
                            }
                        }
                    }}>
                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle" data-key="t-logout">Logout</span>
                    </DropdownItem>
                   
                </DropdownMenu>
            </Dropdown>
            <div style={{ padding: '10px' }}>
                        <Select
                            placeholder="Select a Company"
                            value={selectedCompany}
                            options={companyList}
                            onSelect={selectedCompanyFunction}
                            style={{ width: '100%' }}
                        />
                    </div>
        </React.Fragment>
    );
};

export default ProfileDropdown;
