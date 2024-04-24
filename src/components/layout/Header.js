import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Search from "../ecommerce/Search";
import { userLoggedOut } from "../../redux/slices/userSlice";
import { onSignOutSuccess } from "../../redux/slices/sessionSlice";

const Header = ({ toggleClick, headerStyle }) => {
  const [isToggled, setToggled] = useState(false);
  const [scroll, setScroll] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const totalCartItems = useSelector((state) => state.cart.length);
  const totalCompareItems = useSelector((state) => state.compare.items.length);
  const totalWishlistItems = useSelector(
    (state) => state.wishlist.items.length
  );
  const signedIn = useSelector((state) => state.session.signedIn);
  const userName = useSelector((state) => state.user.userName);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY >= 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });

  const handleLogout = () => {
    dispatch(onSignOutSuccess());
    dispatch(userLoggedOut());
    router.push("/");
  };

  const handleToggle = () => setToggled(!isToggled);

  return (
    <>
      <header className={`header-area ${headerStyle} header-height-2`}>
        <div className="header-top header-top-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-4">
                <div className="header-info">
                  <ul>
                    <li>
                      <i className="fi-rs-smartphone"></i>
                      <Link href="/#">
                        <a>(+52) 565 - 509 2383</a>
                      </Link>
                    </li>
                    <li>
                      <i className="fi-rs-marker"></i>
                      <Link href="/page-contact">
                        <a>Nuestra ubicación</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-4">
                <div className="text-center">
                  <div id="news-flash" className="d-inline-block">
                    <ul>
                      <li>
                        Obtenga fantásticos descuento de hasta el 50%
                        <Link href="/products/shop-grid-right">
                          <a> Ver detalles</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4">
                <div className="header-info header-info-right">
                  <ul>
                    <li>
                      <i className="fi-rs-user"></i>
                      {!signedIn && (
                        <div>
                          <Link
                            href={{
                              pathname: "/page-login-register",
                              query: { authState: "false" },
                            }}
                          >
                            <a>Log In </a>
                          </Link>
                          <Link
                            href={{
                              pathname: "/page-login-register",
                              query: { authState: "true" },
                            }}
                          >
                            <a>/ Registrarse</a>
                          </Link>
                        </div>
                      )}
                      {signedIn && (
                        <div>
                          <Link href="/page-account">
                            <a>{userName}</a>
                          </Link>

                          <a onClick={handleLogout}> / Logout</a>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
          <div className="container">
            <div className="header-wrap">
              <div className="logo logo-width-1">
                <Link href="/">
                  <a>
                    <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                  </a>
                </Link>
              </div>
              <div className="header-right">
                <div className="search-style-2">
                  <Search />
                </div>
                <div className="header-action-right">
                  <div className="header-action-2">
                    <div className="header-action-icon-2">
                      <Link href="/shop-compare">
                        <a>
                          <img
                            className="svgInject"
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-compare.svg"
                          />
                          <span className="pro-count blue">
                            {totalCompareItems}
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div className="header-action-icon-2">
                      <Link href="/shop-wishlist">
                        <a>
                          <img
                            className="svgInject"
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-heart.svg"
                          />
                          <span className="pro-count blue">
                            {totalWishlistItems}
                          </span>
                        </a>
                      </Link>
                    </div>
                    <div className="header-action-icon-2">
                      <Link href="/shop-cart">
                        <a className="mini-cart-icon">
                          <img
                            alt="Evara"
                            src="/assets/imgs/theme/icons/icon-cart.svg"
                          />
                          <span className="pro-count blue">
                            {totalCartItems}
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            scroll
              ? "header-bottom header-bottom-bg-color sticky-bar stick"
              : "header-bottom header-bottom-bg-color sticky-bar"
          }
        >
          <div className="container">
            <div className="header-wrap header-space-between position-relative">
              <div className="logo logo-width-1 d-block d-lg-none">
                <Link href="/">
                  <a>
                    <img src="/assets/imgs/theme/logo.svg" alt="logo" />
                  </a>
                </Link>
              </div>
              <div className="header-nav d-none d-lg-flex">
                <div className="main-categori-wrap d-none d-lg-block">
                  <a className="categori-button-active" onClick={handleToggle}>
                    <span className="fi-rs-apps"></span>
                    Categorías
                  </a>
                  <div
                    className={
                      isToggled
                        ? "categori-dropdown-wrap categori-dropdown-active-large open"
                        : "categori-dropdown-wrap categori-dropdown-active-large"
                    }
                  >
                    <ul>
                      <li className="has-children">
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-dress"></i>
                            Ropa de Mujer
                          </a>
                        </Link>
                        <div className="dropdown-menu">
                          <ul className="mega-menu d-lg-flex">
                            <li className="mega-menu-col col-lg-7">
                              <ul className="d-lg-flex">
                                <li className="mega-menu-col col-lg-6">
                                  <ul>
                                    <li>
                                      <span className="submenu-title">
                                        Tendencias
                                      </span>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Vestidos
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Blusas y Camisas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Sudaderas con Capucha y Sudaderas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Conjuntos de Mujer
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Trajes y Blazers
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Body
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Tanques y Camis
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Abrigos y Chaquetas
                                        </a>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li className="mega-menu-col col-lg-6">
                                  <ul>
                                    <li>
                                      <span className="submenu-title">
                                        Inferiores
                                      </span>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Mallas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Faldas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Pantalones Cortos
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Jeans
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Pantalones y Capris
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Bikini Sets
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Encubrimientos
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Trajes de Baño
                                        </a>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li className="mega-menu-col col-lg-5">
                              <div className="header-banner2">
                                <img
                                  src="/assets/imgs/banner/menu-banner-2.jpg"
                                  alt="menu_banner1"
                                />
                                <div className="banne_info">
                                  <h6>10% de Descuento</h6>
                                  <h4>Nueva Colección</h4>
                                  <Link href="/#">
                                    <a>Comprar ahora</a>
                                  </Link>
                                </div>
                              </div>
                              <div className="header-banner2">
                                <img
                                  src="/assets/imgs/banner/menu-banner-3.jpg"
                                  alt="menu_banner2"
                                />
                                <div className="banne_info">
                                  <h6>15% de Descuento</h6>
                                  <h4>Ofertas Calientes</h4>
                                  <Link href="/#">
                                    <a>Comprar ahora</a>
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="has-children">
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-tshirt"></i>
                            Ropa de Hombre
                          </a>
                        </Link>
                        <div className="dropdown-menu">
                          <ul className="mega-menu d-lg-flex">
                            <li className="mega-menu-col col-lg-7">
                              <ul className="d-lg-flex">
                                <li className="mega-menu-col col-lg-6">
                                  <ul>
                                    <li>
                                      <span className="submenu-title">
                                        Chaquetas y Abrigos
                                      </span>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Chaquetas Acolchadas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Chaquetas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Parkas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Abrigos de Cuero Sintético
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Gabardinas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Lana y Mezclas
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Chalecos
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Abrigos de Cuero
                                        </a>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li className="mega-menu-col col-lg-6">
                                  <ul>
                                    <li>
                                      <span className="submenu-title">
                                        Trajes y Blazers
                                      </span>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Blazers
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Chaquetas de Traje
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Pantalones de Traje
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Trajes
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Chalecos
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Trajes a Medida
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Encubrimientos
                                        </a>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li className="mega-menu-col col-lg-5">
                              <div className="header-banner2">
                                <img
                                  src="/assets/imgs/banner/menu-banner-4.jpg"
                                  alt="menu_banner1"
                                />
                                <div className="banne_info">
                                  <h6>10% de Descuento</h6>
                                  <h4>Nueva Colección</h4>
                                  <Link href="/#">
                                    <a>Comprar ahora</a>
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="has-children">
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-smartphone"></i>
                            Teléfonos Celulares
                          </a>
                        </Link>
                        <div className="dropdown-menu">
                          <ul className="mega-menu d-lg-flex">
                            <li className="mega-menu-col col-lg-7">
                              <ul className="d-lg-flex">
                                <li className="mega-menu-col col-lg-6">
                                  <ul>
                                    <li>
                                      <span className="submenu-title">
                                        Más vendidos
                                      </span>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Teléfonos Celulares
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          iPhones
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Teléfonos Reacondicionados
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Teléfono Móvil
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Piezas de Teléfonos Móviles
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Bolsos y Fundas para Teléfonos
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Equipos de Comunicación
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Walkie Talkie
                                        </a>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                                <li className="mega-menu-col col-lg-6">
                                  <ul>
                                    <li>
                                      <span className="submenu-title">
                                        Accesorios
                                      </span>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Protectores de Pantalla
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Cargadores de Cable
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Cargadores Inalámbricos
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Cargadores de Coche
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Power Bank
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Brazaletes
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Tapones de Polvo
                                        </a>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link href="/#">
                                        <a className="dropdown-item nav-link nav_item">
                                          Amplificadores de Señal
                                        </a>
                                      </Link>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li className="mega-menu-col col-lg-5">
                              <div className="header-banner2">
                                <img
                                  src="/assets/imgs/banner/menu-banner-5.jpg"
                                  alt="menu_banner1"
                                />
                                <div className="banne_info">
                                  <h6>10% de Descuento</h6>
                                  <h4>Nueva Colección</h4>
                                  <Link href="/#">
                                    <a>Comprar ahora</a>
                                  </Link>
                                </div>
                              </div>
                              <div className="header-banner2">
                                <img
                                  src="/assets/imgs/banner/menu-banner-6.jpg"
                                  alt="menu_banner2"
                                />
                                <div className="banne_info">
                                  <h6>15% de Descuento</h6>
                                  <h4>Ofertas Calientes</h4>
                                  <Link href="/#">
                                    <a>Comprar ahora</a>
                                  </Link>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-desktop"></i>
                            Computadoras y Oficina
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-cpu"></i>
                            Electrónica de Consumo
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-diamond"></i>
                            Joyería y Accesorios
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-home"></i>
                            Hogar y Jardín
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-high-heels"></i>
                            Zapatos
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-teddy-bear"></i>
                            Mamá y Bebés
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-grid-right">
                          <a>
                            <i className="evara-font-kite"></i>
                            Diversión al Aire Libre
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                ;
                <div className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block">
                  <nav>
                    <ul>
                      <li>
                        <Link href="/">
                          <a>Inicio</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/products/shop-grid-right">
                          <a>
                            Tienda
                            <i className="fi-rs-angle-down"></i>
                          </a>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link href="/products/">
                              <a>Productos</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/products/shop-list-right">
                              <a>Productos Detalles</a>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/page-about">
                          <a>Nosotros</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/page-contact">
                          <a>Contacto</a>
                        </Link>
                      </li>
                      <li>
                      <Link href="/page-purchase-guide">
                              <a>Ayuda</a>
                            </Link>
                        <ul className="sub-menu">
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <p className="mobile-promotion">
                Grandes
                <span className="text-brand">Ofertas</span>. de hasta el 40%
              </p>
              <div className="header-action-right d-block d-lg-none">
                <div className="header-action-2">
                  <div className="header-action-icon-2">
                    <Link href="/shop-wishlist">
                      <a>
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-compare.svg"
                        />
                        <span className="pro-count white">
                          {totalCompareItems}
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="header-action-icon-2">
                    <Link href="/shop-wishlist">
                      <a>
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-heart.svg"
                        />
                        <span className="pro-count white">
                          {totalWishlistItems}
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="header-action-icon-2">
                    <Link href="/shop-cart">
                      <a className="mini-cart-icon">
                        <img
                          alt="Evara"
                          src="/assets/imgs/theme/icons/icon-cart.svg"
                        />
                        <span className="pro-count white">
                          {totalCartItems}
                        </span>
                      </a>
                    </Link>
                    <div className="cart-dropdown-wrap cart-dropdown-hm2">
                      <ul>
                        <li>
                          <div className="shopping-cart-img">
                            <Link href="/products/shop-grid-right">
                              <a>
                                <img
                                  alt="Evara"
                                  src="/assets/imgs/shop/thumbnail-3.jpg"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <Link href="/products/shop-grid-right">
                                <a>Plain Striola Shirts</a>
                              </Link>
                            </h4>
                            <h3>
                              <span>1 × </span>
                              $800.00
                            </h3>
                          </div>
                          <div className="shopping-cart-delete">
                            <Link href="/#">
                              <a>
                                <i className="fi-rs-cross-small"></i>
                              </a>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <div className="shopping-cart-img">
                            <Link href="/products/shop-grid-right">
                              <a>
                                <img
                                  alt="Evara"
                                  src="/assets/imgs/shop/thumbnail-4.jpg"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="shopping-cart-title">
                            <h4>
                              <Link href="/products/shop-grid-right">
                                <a>Macbook Pro 2022</a>
                              </Link>
                            </h4>
                            <h3>
                              <span>1 × </span>
                              $3500.00
                            </h3>
                          </div>
                          <div className="shopping-cart-delete">
                            <Link href="/#">
                              <a>
                                <i className="fi-rs-cross-small"></i>
                              </a>
                            </Link>
                          </div>
                        </li>
                      </ul>
                      <div className="shopping-cart-footer">
                        <div className="shopping-cart-total">
                          <h4>
                            Total
                            <span>$383.00</span>
                          </h4>
                        </div>
                        <div className="shopping-cart-button">
                          <Link href="/shop-cart">
                            <a>View cart</a>
                          </Link>
                          <Link href="/shop-checkout">
                            <a>Checkout</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="header-action-icon-2 d-block d-lg-none">
                    <div
                      className="burger-icon burger-icon-white"
                      onClick={toggleClick}
                    >
                      <span className="burger-icon-top"></span>
                      <span className="burger-icon-mid"></span>
                      <span className="burger-icon-bottom"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
