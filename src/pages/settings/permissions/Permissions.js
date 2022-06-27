import React, { useState, useCallback, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Key, Edit2, Trash } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicTable from "../../../components/ui/DynamicTable";
import * as permissionApi from "@api/permissionApi";
import DeleteModal from "../users/components/DeleteModal";

const Permissions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState();
  const [permissions, setPermissions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePermission, setDeletePermission] = useState();

  const tableColumns = [
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (cell) => (
        <div>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Edit permission</Tooltip>}
          >
            <Edit2
              className="align-middle me-1"
              size={18}
              onClick={() =>
                navigate(location.pathname + "/" + cell.row.original.id)
              }
            />
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip>Delete permission</Tooltip>}
          >
            <Trash
              className="align-middle me-1"
              size={18}
              onClick={() => {
                setShowDeleteModal(true);
                setDeletePermission(cell.row.original.id);
              }}
            />
          </OverlayTrigger>
        </div>
      ),
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Slug",
      accessor: "slug",
    },
  ];

  //get permission api
  const getPermissionApi = useCallback(async () => {
    const response = await permissionApi.getPermissions(filter);
    setPermissions(response.data.data);
  }, [filter]);

  //use effect
  useEffect(() => {
    getPermissionApi();
  }, [getPermissionApi]);

  return (
    <React.Fragment>
      <Helmet title="Users" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Permissions</h1>
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
                  onClick={() => navigate(location.pathname + "/add")}
                >
                  <Key className="align-middle me-1" size={15} />
                  Create new permission
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DynamicTable data={permissions} columns={tableColumns} />
            <DeleteModal
              show={showDeleteModal}
              title={"Delete permission"}
              body={"Are you sure you want to delete this permission?"}
              module={"permission"}
              id={deletePermission}
              onHide={() => setShowDeleteModal(false)}
              variant="danger"
            />
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Permissions;
