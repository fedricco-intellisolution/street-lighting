import React, { useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';

import * as yup from "yup";
import * as preventiveMaintenanceApi from "@api/preventiveMaintenanceApi";
import * as usersApi from "@api/usersApi";
import NotyfContext from "@contexts/NotyfContext";
import DynamicTable from "@components/ui/DynamicTable";
import SearchForm from "./components/SearchForm";

const tableColumns = [
    {
        Header   : "ID",
        accessor: "id",
    },
    {
        Header   : "Reported date",
        accessor : "reported_at",
    },
    {
        Header   : "Sector",
        accessor : "sector.name",
    },
    {
        Header   : "Site",
        accessor : "site.name",
    },
    {
        Header   : "Level",
        accessor : "level.name",
    },
    {
        Header   : "Area",
        accessor : "area.name",
    },
    {
        Header   : "Defect",
        accessor : "defect",
    },
    {
        Header   : "Job type",
        accessor : "job_type.name",
    },
    {
        Header   : "Reported by",
        accessor : "reported_by.full_name",
    },
    
]

const schema = yup.object().shape({
    technician_id: yup
        .string()
        .required('This field is required'),
    place_manager_id: yup
        .string()
        .required('This field is required'),
    inspection_time_from: yup
        .string()
        .required('This field is required'),
    inspection_time_to: yup
        .string()
        .required('This field is required')
});

const AssignToTechnician = () => {
    const notyf = useContext(NotyfContext)

    const [defects, setDefects] = useState([])
    const [users, setUsers] = useState([])
    const [selectedFlatRows, setSelectedFlatRows] = useState([])
    const [tempFilter, setTempFilter] = useState({})
    const [filter, setFilter] = useState({
        search: {
            status: 'NEW'
        }
    });
    
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });
    
     const getUsers = useCallback(async () => {
        const response = await usersApi.getUsers()
        setUsers(response.data.data)
    },[])

    useEffect(() => {
        getUsers()
    },[getUsers])

    const getDefects = useCallback(async () => {
        const response = await preventiveMaintenanceApi.getDefects(filter)
        setDefects(response.data.data)
    }, [filter])

    useEffect(() => {
        getDefects()
    },[getDefects])
    
    const submitHandler = async (data) => {
        
        if (selectedFlatRows.length < 1) {
            notyf.open({
                type: 'danger',
                message: 'No selected defects',
            })
        } else {
                
            data.defect_ids = selectedFlatRows.map(defect => defect.values.id)
       
            try {
                const response = await preventiveMaintenanceApi.assignTechnician(data)
                if (response.data.status === 'SUCCESS') {
                    notyf.open({
                        type: 'success',
                        message: response.data.message,
                    })
                    reset()
                    getDefects()
                }
            } catch (error) {
            }
        }
    }
    
    const searchHandler = () => {
        setFilter(prevState => ({
            search: {
                ...prevState.search,
                job_type  : tempFilter.job_type,
                sector_id : tempFilter.sector_id,
                site_id   : tempFilter.site_id,
                level_id  : tempFilter.level_id,
                area_id: tempFilter.area_id,
                reported_date_from : tempFilter.reported_date_from,
                reported_date_to : tempFilter.reported_date_to,
            }
        }));
    }

    const resetHandler = () => {
        setFilter({
            search: {
                status: 'NEW'
            }
        });
    }

    return (
       <React.Fragment>
            <Helmet title="Assign Technician" />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">Assign technician</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                           
                        </Breadcrumb>
                    </Col>
                </Row>
                <SearchForm
                    onSearch={searchHandler}
                    onReset={resetHandler}
                    setTempFilter={setTempFilter}
                    tempFilter={tempFilter}
                />
                <Form> 
                    <Card>
                        <Card.Header className="pb-0">
                            <Card.Title className="mb-0">Select Defect(s)</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <DynamicTable
                                data={defects}
                                columns={tableColumns}
                                withCheckbox={true}
                                setSelectedFlatRows={setSelectedFlatRows}
                                hiddenColumns={['id']}
                            />                                     
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Header className="pb-0">
                            <Card.Title className="mb-0">Officer In Charge</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Place manager</Form.Label>
                                        <Controller
                                            control={control}
                                            name="place_manager_id"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Select
                                                    name="place_manager_id"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    className={(errors.place_manager_id && 'is-invalid')}
                                                    
                                                >
                                                    <option value="">Choose an option</option>
                                                    {users.map((user, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={user.id}
                                                                >
                                                                    {user.full_name}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Form.Select>
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="place_manager_id"
                                            render={({ message }) => <small className="text-danger">{message}</small>}
                                        />
                                    </Form.Group>   
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Inspection time from</Form.Label>
                                        <Controller
                                            control={control}
                                            name="inspection_time_from"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Control
                                                    type="time"
                                                    name="inspection_time_from"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    className={(errors.inspection_time_from && 'is-invalid')}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="inspection_time_from"
                                            render={({ message }) => <small className="text-danger">{message}</small>}
                                        />
                                    </Form.Group>   
                                </Col>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Inspection time to</Form.Label>
                                        <Controller
                                            control={control}
                                            name="inspection_time_to"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Control
                                                    type="time"
                                                    name="inspection_time_to"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    className={(errors.inspection_time_to && 'is-invalid')}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="inspection_time_to"
                                            render={({ message }) => <small className="text-danger">{message}</small>}
                                        />
                                    </Form.Group>   
                                </Col>            
                            </Row>                            
                                        
                        </Card.Body>
                    </Card>
                    
                    <Card>
                        <Card.Header className="pb-0">
                            <Card.Title className="mb-0">Assign To</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>    
                                    <Form.Group className="mb-3">
                                        <Form.Label>Technician</Form.Label>
                                        <Controller
                                            control={control}
                                            name="technician_id"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Select
                                                    name="technician_id"
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    value={value}
                                                    className={(errors.technician_id && 'is-invalid')}
                                                    
                                                >
                                                    <option value="">Choose an option</option>
                                                    {users.map((user, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={user.id}
                                                                >
                                                                    {user.full_name}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </Form.Select>
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="technician_id"
                                            render={({ message }) => <small className="text-danger">{message}</small>}
                                        />
                                    </Form.Group>  
                                </Col>
                                
                            </Row>
                            <Row>
                                <Col className="text-end">
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit(submitHandler)}
                                    >
                                        Assign
                                    </Button>
                                </Col> 
                            </Row>    
                        </Card.Body>
                    </Card>
                </Form>                                        

            </Container>
        </React.Fragment>    
    );
}

export default AssignToTechnician;