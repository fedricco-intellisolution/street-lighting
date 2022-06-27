import React, { useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import * as groupsApi from "@api/groupsApi";
import * as usersApi from "@api/usersApi";
import NotyfContext from "@contexts/NotyfContext";
import Select from "react-select";

const schema = yup.object().shape({
    name: yup
        .string()
        .required("This field is required"),
    code: yup
        .string()
        .required("This field is required"),
    description: yup
        .string()
        .required("This field is required"),
});

const AddEditGroup = () => {
    const navigate = useNavigate()
    const notyf = useContext(NotyfContext)
    const { id } = useParams();
    const add_page = id === 'add' ? true : false;
    const [users, setUsers] = useState([])

    const {
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
    });

    const createHandler = async (data) => {
        if (data.user_ids) {
            let users = data.user_ids?.map(user => user.value)
            data.user_ids = users
        }

        try {
            const response = await groupsApi.createGroup(data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
                navigate('/settings/groups')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getGroup = useCallback(async () => {
        const response = await groupsApi.getGroup(id);
        reset(response.data.data)
        const users = response.data.data.users?.map((user) => {
            return { value: user.id, label: user.full_name };
        });
        setValue('user_ids', users)
    }, [id])

    useEffect(() => {
        if (!add_page) getGroup()
    }, [getGroup, add_page])

    const updateHandler = async (data) => {
        if (data.user_ids) {
            let users = data.user_ids?.map(user => user.value)
            data.user_ids = users
        }
        try {
            const response = await groupsApi.updateGroup(id, data)
            if (response.data.status === 'SUCCESS') {
                notyf.open({
                    type: 'success',
                    message: response.data.message,
                })
                navigate('/settings/groups')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = useCallback(async () => {
        const response = await usersApi.getUsers(id);
        const users = response.data.data?.map((user) => {
            return { value: user.id, label: user.full_name };
        });
        setUsers(users)
    }, [id])

    useEffect(() => {
       getUsers()
    }, [getUsers])

    return (
        <React.Fragment>
            <Helmet title={ add_page ? 'Create group' : 'Edit group'} />
            <Container fluid className="p-0">
                <Row>
                    <Col md={6}>
                        <h1 className="h3 mb-3">{ add_page ? 'Create group' : 'Edit group'}</h1>
                    </Col>
                    <Col md={6}>
                        <Breadcrumb>
                            <Breadcrumb.Item onClick={ () => navigate('/settings/groups')}>Groups</Breadcrumb.Item>
                            <Breadcrumb.Item active>{add_page ? 'Create' : 'Edit'}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Card>
                    <Card.Body>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Controller
                                            control={control}
                                            name="name"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Control
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    className={(errors.name && 'is-invalid')}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="name"
                                            render={({ message }) => <small className="text-danger">{message}</small>}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Code <small><em>(Ex: GROUP_CODE)</em></small></Form.Label>
                                        <Controller
                                            control={control}
                                            name="code"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Control
                                                    type="text"
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    className={(errors.code && 'is-invalid')}
                                                    disabled={!add_page}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="code"
                                            render={({ message }) => <small className="text-danger">{message}</small>}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Controller
                                            control={control}
                                            name="description"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                <Form.Control
                                                    type="text"
                                                    as="textarea"
                                                    rows={3}
                                                    value={value}
                                                    onChange={onChange}
                                                    onBlur={onBlur}
                                                    className={(errors.description && 'is-invalid')}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="description"
                                            render={({ message }) => <small className="text-danger">{message}</small>}
                                        />
                                       
                                    </Form.Group>
                                </Col>
                                <Col md={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Users</Form.Label>
                                        <Controller
                                            control={control}
                                            name="user_ids"
                                            defaultValue=""
                                            render={({ field: { value, onChange, onBlur } }) => (
                                                 <Select
                                                    className="is-invalid react-select-container"
                                                    classNamePrefix="react-select "
                                                    options={users}
                                                    isSearchable={true}
                                                    isClearable={true}
                                                    isMulti={true}
                                                    value={value}
                                                    onChange={onChange}
                                                    defaultValue=""
                                                />
                                            )}
                                        />
                                       
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="pt-4">
                                <Col className="text-end">
                                    <Button variant="secondary" className="me-2" onClick={ () => navigate('/settings/groups')}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        onClick={
                                            add_page
                                            ? handleSubmit(createHandler)
                                            : handleSubmit(updateHandler)
                                        }
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row> 
                            
                        </Form>
                    </Card.Body>
                </Card>
             
            </Container>
        </React.Fragment>    
    )
}

export default AddEditGroup;