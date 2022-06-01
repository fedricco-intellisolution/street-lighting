import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { Paperclip, Trash2, ZoomIn } from "react-feather";
import { useEffect, useState } from "react";


const TechnicianForm = (props) => {
    const {
        editable,
        control,
        errors,
        reset,
        fault
    } = props

    const [beforePhotos, setBeforePhotos] = useState([]);
    const [afterPhotos, setAfterPhotos] = useState([]);
    const [beforePhotosURLs, setBeforePhotosURLs] = useState([]);
    const [afterPhotosURLs, setAfterPhotosURLs] = useState([]);
    
    useEffect(() => {   
        reset(fault)
    }, [reset, fault])

    const onChangeBeforePhotos = (e) => {
        setBeforePhotos(prevState => [...prevState, ...e.target.files]);
    }

    useEffect(() => {
        if (beforePhotos.length < 1) return;
        const newBeforePhotosURLs = [];
        beforePhotos.forEach(image => {
            newBeforePhotosURLs.push({
                url: URL.createObjectURL(image),
                name: image.name
            })
        })
        setBeforePhotosURLs(newBeforePhotosURLs)
    }, [beforePhotos])
    
    const onChangeAfterPhotos = (e) => {
        setAfterPhotos(prevState => [...prevState, ...e.target.files]);
    }

    useEffect(() => {
        if (afterPhotos.length < 1) return;
        const newAfterPhotosURLs = [];
        afterPhotos.forEach(image => {
            newAfterPhotosURLs.push({
                url: URL.createObjectURL(image),
                name: image.name
            })
        })
        setAfterPhotosURLs(newAfterPhotosURLs)
    }, [afterPhotos])

    const removeItem = (name) => {
        // const index = beforePhotos.findIndex(item => item.name === name)
        // console.log(index)
        // if (index > -1) {
        //     setBeforePhotos(prevState => prevState.splice(index, 1))
        // }
    }

    return (
        <>
            <Card>
                <Card.Header className="pb-0">
                    <Card.Title className="mb-0">Technician</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Attended date</Form.Label>
                                <Controller
                                    control={control}
                                    name="attended_at"
                                    defaultValue={new Date().toLocaleString()}
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled
                                        />
                                    )}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Asset ID (Optional)</Form.Label>
                                <Controller
                                    control={control}
                                    name="asset_id"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled={!editable}
                                        />
                                    )}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Action taken / Recommendation </Form.Label>
                                <Controller
                                    control={control}
                                    name="action_taken"
                                    defaultValue=""
                                    render={({ field: { value, onChange, onBlur } }) => (
                                        <Form.Control
                                            type="text"
                                            as="textarea"
                                            rows={5}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                             className={(errors.action_taken && 'is-invalid')}
                                            disabled={!editable}
                                        />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="action_taken"
                                    render={({ message }) => <small className="text-danger">{message}</small>}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label>Before photos </Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    name="before_photos"
                                    disabled={!editable}
                                    onChange={onChangeBeforePhotos}
                                />
                            </Form.Group>
                            
                            {beforePhotosURLs.map((image, key) =>
                                <div key={key} className="fault-image-holder mb-2">
                                    <Image src={image.url} />
                                    <small>{image.name}</small>
                                    <div className="text-end mt-2">
                                        <Trash2 size={16} className="cursor-pointer me-1" onClick={()=>removeItem(image.name)}/>
                                        <ZoomIn size={16} className="cursor-pointer" />
                                    </div>
                                </div>
                                
                            )}
                        </Col>
                        <Col md={12}>
                            <Form.Group className="mb-3 mt-4">
                                <Form.Label>After photos </Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    name="before_photos"
                                    disabled={!editable}
                                    onChange={onChangeAfterPhotos}
                                />
                            </Form.Group>
                            {afterPhotosURLs.map((image, key) =>
                                <div key={key} className="fault-image-holder mb-2">
                                    <Image src={image.url} />
                                    <small>{image.name}</small>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header className="pb-0">
                    <Row>
                        <Col  md={6} >
                            <Card.Title className="mb-0">Technical Officer</Card.Title>
                        </Col>
                        <Col md={6} className="text-end">
                            <Button variant="warning">
                                <Paperclip size={16} className="me-1"/>
                                Attach incident report
                            </Button>
                        </Col>
                    </Row>
                   
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Fault case category</Form.Label>
                                <Form.Select
                                    type="text"
                                    disabled={editable}
                                >
                                    <option value="">Choose an option</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                      
                    </Row>
                </Card.Body>
            </Card>    
            <Card>
                <Card.Header>
                    <Card.Title className="mb-0">Signatories</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Supervisor</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Comments</Form.Label>
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    rows={5}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Signature</Form.Label>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>NEA's Authorised</Form.Label>
                                <Form.Control
                                    type="text"
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Comments</Form.Label>
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    rows={5}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Signature</Form.Label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Card.Body>
            </Card> 

             {props.children}
       </>                                 
    )
}

export default TechnicianForm;