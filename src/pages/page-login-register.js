import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { useDispatch } from "react-redux";
import { setUserAuth } from "../redux/slices/userSlice";
import { onSignInSuccess } from "../redux/slices/sessionSlice";
import React, { useState, useEffect, useCallback } from "react";
import { INIT_DATA_LOGIN, INIT_DATA_REGISTER_USER } from "../util/constants";
import { useHttpClient } from "../hooks/useHttpClient";

function Login() {
  const [userLogin, setUserLogin] = useState(INIT_DATA_LOGIN);
  const [userRegister, setUserRegister] = useState(INIT_DATA_REGISTER_USER);
  const [error, setError] = useState(INIT_DATA_LOGIN);
  const router = useRouter();
  const authState = router.query.authState === "true" ? false : true;
  const [showAlert, setShowAlert] = useState(false);
  const [textAlert, setTextAlert] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(authState);
  const { sendRequest } = useHttpClient();

  const dispatch = useDispatch();

  useEffect(() => {
    setShowLoginForm(authState);
  }, [authState]);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const onHandLoginleChange = ({ target: { name, value } }) => {
    setUserLogin({ ...userLogin, [name]: value });
  };

  const onHandRegisterChange = ({ target: { name, value } }) => {
    setUserRegister({ ...userRegister, [name]: value });
  };

  const loginHandler = async (data) => {
    try {
      const url = "/api/Users/LoginUser";
      const res = await sendRequest(url, {
        method: "POST",
        body: data,
      });
      if (res.success) {
        dispatch(onSignInSuccess(res.token));
        dispatch(
          setUserAuth({
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            userName: res.user.userName,
            email: res.user.email,
            role: res.user.role,
          })
        );
        router.push("/");
      } else {
        setShowAlert(true);
      }
    } catch (e) {
      console.log(e)
      setTextAlert(e.message);
      setShowAlert(true);
    }
  };

  const registerHandler = async (data) => {
    try {
      const url = "/api/Users/RegisterUser";
      const res = await sendRequest(url, {
        method: "POST",
        body: data,
      });
      console.log(res);
      if (res.success) {
        dispatch(onSignInSuccess(res.token));
        dispatch(
          setUserAuth({
            firstName: res.user.firstName,
            lastName: res.user.lastName,
            userName: res.user.userName,
            email: res.user.email,
            role: res.user.role,
          })
        );
        router.push("/");
      } else {
        setShowAlert(true);
      }
    } catch (e) {
      console.log(e);
      setTextAlert(e.message);
      setShowAlert(true);
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    // const { hasError, errors } = validate.loginForm(user);
    //if (hasError) {
    //setError(errors);
    //} else {
    //setError(INIT_DATA_LOGIN);
    if (showLoginForm) {
      loginHandler(userLogin);
    } else {
      registerHandler(userRegister);
    }
    // }
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Login & Register">
        <section className="pt-50 pb-50 ">
          <div className="container">
            <div className="row ">
              {showAlert && (
                <div className="alert alert-danger" role="alert">
                 {textAlert}
                </div>
              )}
              <div className="col-lg-10 m-auto">
                <div className="row  d-flex justify-content-center align-items-center">
                  {showLoginForm ? (
                    <div className="col-lg-6 ">
                      <div className=" login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                        <div className="padding_eight_all bg-white">
                          <div className="heading_s1">
                            <h3 className="mb-30">Login</h3>
                          </div>
                          <form onSubmit={onHandleSubmit}>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder="Correo"
                                onChange={onHandLoginleChange}
                                value={userLogin.email}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                required=""
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                onChange={onHandLoginleChange}
                                value={userLogin.password}
                              />
                            </div>
                            <div className="login_footer form-group">
                              <div className="chek-form">
                                <div className="custome-checkbox">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkbox"
                                    id="exampleCheckbox1"
                                    value=""
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleCheckbox1"
                                  >
                                    <span>Recordarme</span>
                                  </label>
                                </div>
                              </div>
                              <a className="text-muted" href="#">
                                Olvidaste tu contraseña?
                              </a>
                            </div>
                            <a onClick={toggleForm}>
                              Aún no tienes cuenta? Regístrate
                            </a>
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-fill-out btn-block hover-up"
                                name="login"
                              >
                                Log in
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="col-lg-6">
                      <div className="login_wrap widget-taber-content p-30 background-white border-radius-5">
                        <div className="padding_eight_all bg-white">
                          <div className="heading_s1">
                            <h3 className="mb-30">Crear cuenta</h3>
                          </div>
                          <p className="mb-50 font-sm">
                            Tus datos personales serán utilizado para apoyar su
                            experiencia a lo largo de este sitio web, para
                            gestionar el acceso a su cuenta y para otros
                            propósitos descritos en nuestra política de
                            privacidad
                          </p>
                          <form onSubmit={onHandleSubmit}>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="firstName"
                                placeholder="Nombre"
                                onChange={onHandRegisterChange}
                                value={userRegister.firstName}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="lastName"
                                placeholder="apellido"
                                onChange={onHandRegisterChange}
                                value={userRegister.lastName}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="userName"
                                placeholder="Username"
                                onChange={onHandRegisterChange}
                                value={userRegister.userName}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="date"
                                required=""
                                name="birthdate"
                                placeholder="Fecha de nacimiento"
                                onChange={onHandRegisterChange}
                                value={userRegister.birthdate}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder="Correo"
                                onChange={onHandRegisterChange}
                                value={userRegister.email}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="phone"
                                placeholder="Telefono"
                                pattern="\d*"
                                maxlength="10"
                                value={userRegister.phone}
                                onChange={(event) => {
                                  if (!event.target.validity.valid) {
                                    event.target.value =
                                      event.target.value.slice(0, -1);
                                  }
                                  onHandRegisterChange(event);
                                }}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                required=""
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                onChange={onHandRegisterChange}
                                value={userRegister.password}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                required=""
                                type="password"
                                name="verifyPassword"
                                placeholder="Confirmar Contraseña"
                                onChange={onHandRegisterChange}
                                value={userRegister.verifyPassword}
                              />
                            </div>
                            <div className="login_footer form-group">
                              <div className="chek-form">
                                <div className="custome-checkbox">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkbox"
                                    id="exampleCheckbox12"
                                    value=""
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="exampleCheckbox12"
                                  >
                                    <span>
                                      Estoy de acuerdo con los Terminos &amp;
                                      Politicas.
                                    </span>
                                  </label>
                                </div>
                              </div>
                              <Link href="/page-privacy-policy">
                                <a>
                                  <i className="fi-rs-book-alt mr-5 text-muted"></i>
                                  Ver más
                                </a>
                              </Link>
                            </div>
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-fill-out btn-block hover-up"
                                name="login"
                              >
                                Registrar
                              </button>
                            </div>
                          </form>
                          <div className="divider-text-center mt-15 mb-15">
                            <span> o</span>
                          </div>
                          <ul className="btn-login list_none text-center mb-15">
                            <li>
                              <a href="#" className="btn btn-google hover-up">
                                Login con Google
                              </a>
                            </li>
                          </ul>
                          <div className="text-muted text-center">
                            <a onClick={toggleForm}>
                              Ya tienes una cuenta? Inicia sesión
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Login;
