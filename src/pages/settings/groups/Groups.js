import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Badge, Button, Card, Col, Container, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Briefcase, Edit2 } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import * as groupsApi from "@api/groupsApi";
import DynamicTable from "../../../components/ui/DynamicTable";

const Groups = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState("");
  const [groups, setGroups] = useState([]); 
    const tableColumns = [
        {
            Header: "Actions",
            accessor: "actions",
            width: '80px',
            Cell: ({ row }) => {
                return (
                    <>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Edit group</Tooltip>}
                        >
                            <Edit2
                                className="align-middle me-1"
                                size={16}
                                onClick={() => navigate(location.pathname + '/' + row.original.id)}
                            />
                        </OverlayTrigger>
                  
                    </>
                
                );
            },
        },
        {
            Header: "Name",
            accessor: "name"
        },
        {
            Header: "Code",
            accessor: "code"
        },
        {
            Header: "Description",
            accessor: "description",
            width: '200px'

        },
        {
            Header: "Users",
            width: '300px',
            accessor: data =>
                data.users.map((user, index) => (
                    <Badge key={index} className="me-2" bg="secondary">{user.full_name}</Badge>
                ))
        }
    ];

    const getGroups = useCallback(async () => {
        const response = await groupsApi.getGroups();
        setGroups(response.data.data);
    }, []);

    useEffect(() => {
        getGroups();
    }, [getGroups]);
    
    return (
        <React.Fragment>
            <Helmet title="Users" />
            <Container fluid className="p-0">
                <h1 className="h3 mb-3">Groups</h1>
                <Card>
                    <Card.Header className="pb-0">
                        <Row>
                            <Col md={3}>
                                <Form.Control
                                    value={filter || ""}
                                    onChange={(e) => {
                                        setFilter(e.target.value || undefined);
                                    }}
                                    placeholder="Search keyword"
                                    className="d-inline-block"
                                />
                            </Col>
                            <Col md={{ span: 3, offset: 6 }} className="text-end">
                                <Button
                                    variant="primary"
                                    className="me-1 mb-1"
                                    onClick={() => navigate(location.pathname+'/add')}
                                >
                                    <Briefcase className="align-middle me-1" size={15} />
                                    Create new group
                                </Button>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <DynamicTable
                            data={groups}
                            columns={tableColumns}
                            className="table-layout-fixed"
                        />
                    </Card.Body>
                </Card>
            </Container>
           
        </React.Fragment>
    )
    
}

export default Groups;