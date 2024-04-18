import Link from "next/link";
import Layout from "../components/layout/Layout";


function Login() {
    return (
        <>
            <Layout parent="Home" sub="Pages" subChild="Login & Register">
                <section className="pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="login_wrap widget-taber-content p-30 background-white border-radius-10 mb-md-5 mb-lg-0 mb-sm-5">
                                            <div className="padding_eight_all bg-white">
                                                <div className="heading_s1">
                                                    <h3 className="mb-30">
                                                        Login
                                                    </h3>
                                                </div>
                                                <form method="post">
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
                                                                    <span>
                                                                        Recordarme
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <a
                                                            className="text-muted"
                                                            href="#"
                                                        >
                                                            Olvidaste tu contraseña?
                                                        </a>
                                                    </div>
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
                                    <div className="col-lg-1"></div>
                                    <div className="col-lg-6">
                                        <div className="login_wrap widget-taber-content p-30 background-white border-radius-5">
                                            <div className="padding_eight_all bg-white">
                                                <div className="heading_s1">
                                                    <h3 className="mb-30">
                                                        Crear cuenta
                                                    </h3>
                                                </div>
                                                <p className="mb-50 font-sm">
                                                     Tus datos personales serán
                                                     utilizado para apoyar su
                                                     experiencia a lo largo de este
                                                     sitio web, para gestionar el acceso a
                                                     su cuenta y para otros
                                                     propósitos descritos en nuestra
                                                     política de privacidad
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
                                                                        Estoy de acuerdo
                                                                        con los Terminos
                                                                        &amp;
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
                                                        <a
                                                            href="#"
                                                            className="btn btn-google hover-up"
                                                        >
                                                            Login con Google
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="text-muted text-center">
                                                    Ya tienes una cuenta?{" "}
                                                    <a href="#">Sign in now</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
