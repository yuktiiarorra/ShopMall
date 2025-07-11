import React from 'react'
import { Badge, Navbar, Nav, Container } from 'react-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
// import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png'

const Header = () => {

    const { cartItems } = useSelector((state) => state.cart);

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
                            <Nav.Link as={Link} to='/login'>
                                <FaUser /> Sign In
                            </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header