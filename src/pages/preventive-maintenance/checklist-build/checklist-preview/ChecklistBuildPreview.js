import React from "react";

import { Card, Col, Row } from "react-bootstrap";

import { ChecklistPreviewTable } from "./ChecklistPreviewTable";
import { tableColumns, tableData } from "./tableColumnsPreview";

export const ChecklistBuildPreview = () => {
    return (
        <Card>
            <Card.Body>
                <Row className="mb-2">
                    <Col md={4}>
                        <h6>Checklist name</h6>
                        <p>Electical system - Generator (Monthly)</p>
                    </Col>
                    <Col md={3}>
                        <h6>Checklist type</h6>
                        <p>ELECTRICAL SYSTEM</p>
                    </Col>
                    <Col md={3}>
                        <h6>Checklist item</h6>
                        <p>GENERATOR</p>
                    </Col>
                    <Col md={2}>
                        <h6>Active</h6>
                        <p>Yes</p>
                    </Col>
                </Row>
                <ChecklistPreviewTable
                    columns={tableColumns}
                    rawData={tableData}
                />
            </Card.Body>
        </Card>
    );
};
