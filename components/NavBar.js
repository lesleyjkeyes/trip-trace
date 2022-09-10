/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="orange" variant="dark">
      <Container>
        <Link passHref href="/">
          Trip Trace
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/yourTrips">
              <Nav.Link>Your Trips</Nav.Link>
            </Link>
            <Link passHref href="/countryFilter">
              <Nav.Link>View Trips by Country</Nav.Link>
            </Link>
            <Link passHref href="/Trip/new">
              <Nav.Link>Add a Trip</Nav.Link>
            </Link>
            <Link passHref href="/favoriteTrips">
              <Nav.Link>Favorites</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Button variant="dark" onClick={signOut}>Sign Out</Button>
            <SearchBar />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
