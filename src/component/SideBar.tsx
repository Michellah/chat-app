import React, { useState } from 'react';
import { Container, Row, Col, Nav, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ChannelList from './ChannelList';
import UserList from './UserList';
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectUser = (user: any) => {
    setSelectedUser(user);
  };

  const handleSelectType = (type: string | null) => {
    setSelectedType(type);
  };

  const handleChannelFilter = (type: string | null) => {
    setSelectedType(type);
  };

  return (
    <div className={styles.sidebar}>
      <Container fluid className="h-100 ">
      <Row className="h-100" >
        <Col md={2}  className="bg-dark text-light sidebar">
          <Nav className="flex-column">
            <Dropdown>
              <Link href={'/channel'}>Channel</Link>
              <Dropdown.Toggle variant="dark" id="type-dropdown">
                {selectedType ? selectedType : 'Select type'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleChannelFilter('public')}>Public</Dropdown.Item>
                <Dropdown.Item onClick={() => handleChannelFilter('private')}>Private</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ChannelList selectedType={selectedType} />

            <Dropdown>
            Users
              <Dropdown.Toggle variant="dark" id="user-dropdown">
               
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <UserList onSelectUser={handleSelectUser} />
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Col>
        <Col >
        </Col>
      </Row>
    </Container>
    </div>
    
  );
};

export default Sidebar;
