import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 40" className="logo">
              <path d="M28.7 22.5H2.4c-1.3 0-2.4 1.1-2.4 2.4 0 1.3 1.1 2.6 2.4 2.6h2.5l.1 8.8c0 2 1.7 3.7 3.8 3.7h20c2.1 0 3.7-1.7 3.7-3.7v-10c0-2.1-1.7-3.8-3.8-3.8zM27.5 0c-3.8 0-7 2.1-8.7 5.3C17.1 2.1 13.8 0 10 0 4.5 0 0 4.5 0 10s4.5 9.9 9.9 9.9l17.6.1c5.5 0 10-4.5 10-10S33 0 27.5 0zM10 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm17.5 0c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zM41 20.5 35 25v10l6 4.5c1.7 1.2 4 .1 4-2v-15c0-2-2.4-3.2-4-2z"/>
            </svg>
            Movie Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    Saved Movies
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login / Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
