import React, { useState } from 'react';
import { Container, Row, Col, Nav, Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ChannelList from './ChannelList';
import UserList from './UserList';

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
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col sm={3} md={10} className="bg-dark text-light sidebar">
          <Nav className="flex-column">
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="type-dropdown">
                {selectedType ? selectedType : 'Select a type'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleChannelFilter('public')}>Public</Dropdown.Item>
                <Dropdown.Item onClick={() => handleChannelFilter('private')}>Private</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ChannelList selectedType={selectedType} />

            <Dropdown>
              <Dropdown.Toggle variant="dark" id="user-dropdown">
                Users
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <UserList onSelectUser={handleSelectUser} />
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
