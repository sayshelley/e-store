import data from './data';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePageScreen from './screens/HomePageScreen';
import ProductPageScreen from './screens/ProductPageScreen';
import CartPageScreen from './screens/CartPageScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { Cart } from './Cart';
import Signin from './screens/Signin';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingPageScreen from './screens/ShippingPageScreen';
import Signup from './screens/Signup';
import CheckLogin from './elements/CheckLogin';
import CheckAdmin from "./elements/CheckAdmin";
import SellsReportScreen from "./screens/SellsReportScreen";
import UsageReportScreen from "./screens/UsageReportScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import SearchPageScreen from "./screens/SearchPageScreen";
import CheckoutPageScreen from './screens/CheckoutPageScreen';
import ReviewOrderScreen from './screens/ReviewOrderScreen';
import PayOrderScreen from "./screens/PayOrderScreen";

function App() {
  const { state, dispatch: signoutD } = useContext(Cart);
  const { cart, Info } = state;
  const signout = () => {
    signoutD({ type: 'SIGN_OUT' });
    localStorage.removeItem('Info');
    localStorage.removeItem('shippingAddress');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="" variant="">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Ski Shop</Navbar.Brand>
              </LinkContainer>
              <Nav className="ms-auto">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.Items.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.Items.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {Info && Info.admin ? (
                  <NavDropdown title={Info.name} id="navDropdown">
                    <LinkContainer to="/admin/sellsreport">
                      <NavDropdown.Item>Sells Report</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/usagereport">
                      <NavDropdown.Item>Usage Report</NavDropdown.Item>
                    </LinkContainer>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signout}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : Info ? (
                  <NavDropdown title={Info.name} id="navDropdown">
                    <LinkContainer to="/contactus">
                      <NavDropdown.Item>Contact Us</NavDropdown.Item>
                    </LinkContainer>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signout}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="statusBox">
            <Routes>
              <Route path="/cart" element={<CartPageScreen />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/shipping"
                element={
                  <CheckLogin>
                    <ShippingPageScreen />
                  </CheckLogin>
                }
              />
              <Route path="/payment" element={<CheckoutPageScreen />}></Route>
              <Route path="/placeorder" element={<ReviewOrderScreen />} />
              <Route path="/order/:id" element={<PayOrderScreen />} />
              <Route path="/product/:tag" element={<ProductPageScreen />} />
              <Route path="/search" element={<SearchPageScreen />} />
              <Route path="/contactus" element={<ContactUsScreen />} />
              <Route
                path="/admin/sellsreport"
                element={
                  <CheckAdmin>
                    <SellsReportScreen />
                  </CheckAdmin>
                }
              ></Route>
              <Route
                path="/admin/usagereport"
                element={
                  <CheckAdmin>
                    <UsageReportScreen />
                  </CheckAdmin>
                }
              ></Route>
              <Route path="/" element={<HomePageScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">Powerd By Group Y</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
