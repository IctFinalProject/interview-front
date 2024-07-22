import React from 'react';
import styles from '../../styles/Header.module.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useDropdownInit } from '../../hooks/headerMenuDropdown';

const Header = () => {
  useDropdownInit();

  return (
    <Navbar bg="light" expand="lg" className={`sticky-top ${styles.header}`}>
      <Navbar.Brand href="#" className={styles.logo}>모의면접</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
        <Nav className="mx-auto">
          <Nav.Link href="#" className={styles.navLink}>소개</Nav.Link>
          <NavDropdown title="회사 검색" id="basic-nav-dropdown" className={styles.navLink}>
            <NavDropdown.Item href="#">회사 상세</NavDropdown.Item>
            <NavDropdown.Item href="#">회사 위치</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="모의 면접" id="basic-nav-dropdown" className={styles.navLink}>
            <NavDropdown.Item href="#">이력서 첨삭</NavDropdown.Item>
            <NavDropdown.Item href="#">모의면접 보기</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#" className={styles.navLink}>게시판</Nav.Link>
          <Nav.Link href="#" className={styles.navLink}>마이페이지</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Item className="d-flex align-items-center">
            <span className={styles.username}>홍길동</span>
          </Nav.Item>
          <Nav.Link href="#" className={styles.loginButton}>로그인</Nav.Link>
          <Nav.Link href="#" className={styles.logoutButton}>로그아웃</Nav.Link>
          <Nav.Link href="#" className={styles.signupButton}>회원가입</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;