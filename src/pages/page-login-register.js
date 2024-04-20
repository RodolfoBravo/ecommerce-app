import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import { setUserAuth, initialState } from "../redux/slices/userSlice";
import { onSignInSuccess } from "../redux/slices/sessionSlice";
import React, { useState, useEffect, useCallback } from "react";
import { INIT_DATA_LOGIN } from "../util/constants";
import { useHttpClient } from "../hooks/useHttpClient";

function Login() {
  const [user, setUser] = useState(INIT_DATA_LOGIN);
  const [error, setError] = useState(INIT_DATA_LOGIN);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const { sendRequest } = useHttpClient();
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const onHandleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
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
            role:res.user.role,
            }
          )
        );
        Cookies.set("token", res.token);      
      } else {
        setShowAlert(true);
      }
    } catch (e) {
      //console.log(e)
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
    loginHandler(user);
    // }
  };

  return (
    <>
      <Layout parent="Home" sub="Pages" subChild="Login & Register">
        <section className="pt-50 pb-50 ">
          <div className="container">
            <div className="row ">
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
                                onChange={onHandleChange}
                                value={user.email}
                              />
                            </div>
                            <div className="form-group">
                              <input
                                required=""
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                onChange={onHandleChange}
                                value={user.password}
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
                          <form method="post">
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="username"
                                placeholder="Username"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                required=""
                                name="email"
                                placeholder="Correo"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                required=""
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                required=""
                                type="password"
                                name="password"
                                placeholder="Confirmar Contraseña"
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
