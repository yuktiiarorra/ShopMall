import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
// import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../assets/logo.png'

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');

        } catch (err) {
            console.log(err);
        }
    };

    const onProfileButtonClick = () => {
        navigate('/profile');
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    {/* <LinkContainer to='/'> */}
                    {/* <Navbar.Brand href='/'> */}
                    <Navbar.Brand as={Link} to='/'>
                        <img src={logo} alt="ShopMall" />
                        ShopMall
                    </Navbar.Brand>
                    {/* </LinkContainer> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <Nav.Link as={Link} to='/cart'>
                                <FaShoppingCart /> Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                                            {cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.qty, 0)}
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                            {userInfo ?
                                (<NavDropdown title={userInfo.name} id="username">
                                    <NavDropdown.Item onClick={onProfileButtonClick}>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                ) : (<Nav.Link as={Link} to='/login'>
                                    <FaUser /> Sign In
                                </Nav.Link>)}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header