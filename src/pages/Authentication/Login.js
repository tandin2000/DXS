import React, { useState } from 'react';
import { Card, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap';
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../../assets/images/logo-light.png";
import withRouter from "../../Components/Common/withRouter";
import AuthAPI from '../../common/RestServices/AuthAPI';
import { apiError, loginSuccess, logoutUserSuccess  } from '../../store/actions';
const Login = (props) => {
  const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        username: "",
        password: ""
    });
    const [passwordShow, setPasswordShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

    const validate = () => {
        let errors = {};
        if (!userLogin.username) {
            errors.username = "Username is required";
        }
        if (!userLogin.password) {
            errors.password = "Password is required";
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLogin({
            ...userLogin,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});
        setAlertMessage(null);        
        const response = await AuthAPI.login(userLogin);
        if(response.status === 200){

            if( response.data.length === 0 ){
                setAlertMessage('invalid password or username');
                setLoading(false);
                // apiError(response);
                sessionStorage.removeItem("authUser");
            }else{
                setLoading(false);
                // loginSuccess(response.data);
                const singleCompany = response.data[0].company;
                const salcashStatus = singleCompany.name.toLowerCase() === "salcash";
                sessionStorage.setItem("authUser", JSON.stringify(singleCompany));
                sessionStorage.setItem("authAllData", JSON.stringify(response.data));
                sessionStorage.setItem('Layout', salcashStatus)
                if(!salcashStatus){
                    localStorage.setItem("CompanyId", response.data[0].company._id);
                }
                navigate('/dashboard')
            }

        }else{
            setAlertMessage(response.message);
            setLoading(false);
            // apiError(response);
            sessionStorage.removeItem("authUser");
        }
            
    };

    document.title = "Login";

    return (
        <React.Fragment>
            <ParticlesAuth>
                <div className="auth-page-content">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="50" />
                                        </Link>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium"></p>
                                </div>
                            </Col>
                        </Row>

                        <Row className="justify-content-center">
                            <Col md={8} lg={6} xl={5}>
                                <Card className="mt-4">
                                    <div className="p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to SalCash.</p>
                                        </div>
                                        
                                        <div className="p-2 mt-4">
                                            {alertMessage && <Alert color="info">{alertMessage}</Alert>}
                                            <Form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <Label htmlFor="username" className="form-label">Username</Label>
                                                    <Input
                                                        name="username"
                                                        className="form-control"
                                                        placeholder="Enter username"
                                                        type="text"
                                                        value={userLogin.username}
                                                        onChange={handleChange}
                                                        invalid={errors.username ? true : false}
                                                    />
                                                    {errors.username && <FormFeedback>{errors.username}</FormFeedback>}
                                                </div>

                                                <div className="mb-3">
                                                    {/* <div className="float-end">
                                                        <Link to="/ForgetPassword" className="text-muted">Forgot password?</Link>
                                                    </div> */}
                                                    <Label className="form-label" htmlFor="password-input">Password</Label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <Input
                                                            name="password"
                                                            className="form-control pe-5"
                                                            placeholder="Enter Password"
                                                            type={passwordShow ? "text" : "password"}
                                                            value={userLogin.password}
                                                            onChange={handleChange}
                                                            invalid={errors.password ? true : false}
                                                        />
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></button>
                                                        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
                                                    </div>
                                                </div>

                                                <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                </div>

                                                <div className="mt-4">
                                                    <Button color="success" className="btn btn-success w-100" type="submit" disabled={loading}>
                                                        {loading ? <Spinner size="sm" /> : "Sign In"}
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </ParticlesAuth>
        </React.Fragment>
    );
};

export default withRouter(Login);
