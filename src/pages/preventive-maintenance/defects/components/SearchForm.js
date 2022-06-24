import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import * as propertyManagementApi from "@api/propertyManagementApi";
import * as lookUpApi from "@api/lookUpApi";
import { RefreshCcw, Search } from "react-feather";

const SearchForm = (props) => {

    const {
        onSearch,
        onReset,
        setTempFilter,
        tempFilter
    } = props;

    const [sectors, setSectors] = useState([])
    const [sites, setSites] = useState([])
    const [levels, setLevels] = useState([])
    const [areas, setAreas] = useState([])
    const [jobTypes, setJobTypes] = useState([])

    const getSectors = useCallback(async () => {
        const response = await propertyManagementApi.getSectors()
        setSectors(response.data.data)
    }, [])

    const getSites = useCallback(async () => {
        const response = await propertyManagementApi.getSites()
        setSites(response.data.data)
    }, [])

    const getLevels = useCallback(async () => {
        const response = await propertyManagementApi.getLevels()
        setLevels(response.data.data)
    }, [])

    const getAreas = useCallback(async () => {
        const response = await propertyManagementApi.getAreas()
        setAreas(response.data.data)
    }, [])

    const getJobTypes = useCallback(async () => {
        const response = await lookUpApi.getLookUp({search: { category: 'JOB_TYPE' }})
        setJobTypes(response.data.data)
    }, [])

    useEffect(() => {
        getSectors()
        getSites()
        getLevels()
        getAreas()
        getJobTypes()
    }, [
        getSectors,
        getSites,
        getLevels,
        getAreas,
        getJobTypes
    ])
    
    const resetHandler = () => {
        setTempFilter({
            job_type: '',
            sector_id: '',
            site_id: '',
            level_id: '',
            area_id: '',
            reported_date_from : '',
            reported_date_to : '',
        })
        onReset()
    }

    return (
          <Card>
                <Card.Body>
                    <Form>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Reported date from</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="reported_date_from"
                                        value={tempFilter.reported_date_from}
                                        onChange={
                                            (e) => setTempFilter(prevState => ({
                                                    ...prevState,
                                                    reported_date_from: e.target.value,
                                            }))
                                        }
                                    />
                                </Form.Group>    
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Reported date to</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="reported_date_to"
                                        value={tempFilter.reported_date_to}
                                        onChange={
                                            (e) => setTempFilter(prevState => ({
                                                    ...prevState,
                                                    reported_date_to: e.target.value,
                                            }))
                                        }
                                    />
                                </Form.Group>    
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job type</Form.Label>
                                    <Form.Select
                                        name="job_type"
                                        value={tempFilter.job_type}
                                        onChange={
                                            (e) => setTempFilter(prevState => ({
                                                    ...prevState,
                                                    job_type: e.target.value,
                                            }))
                                        }
                                        >
                                        <option value="">Choose an option</option>
                                        {jobTypes.map((job_type, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={job_type.code}
                                                    >
                                                        {job_type.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </Form.Select>
                                </Form.Group>    
                            </Col>
                        </Row>    
                        <Row>    
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sector</Form.Label>
                                    <Form.Select
                                        name="sector_id"
                                        value={tempFilter.sector_id}
                                        onChange={
                                            (e) => setTempFilter(prevState => ({
                                                    ...prevState,
                                                    sector_id: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="">Choose an option</option>
                                        {sectors.map((sector, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={sector.id}
                                                    >
                                                        {sector.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                                <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Site</Form.Label>
                                    <Form.Select
                                        name="site_id"
                                        value={tempFilter.site_id}
                                        onChange={
                                            (e) => setTempFilter(prevState => ({
                                                    ...prevState,
                                                    site_id: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="">Choose an option</option>
                                        {sites.map((site, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={site.id}
                                                    >
                                                        {site.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Level</Form.Label>
                                    <Form.Select
                                        name="level_id"
                                        value={tempFilter.level_id}
                                        onChange={
                                            (e) => setTempFilter(prevState => ({
                                                    ...prevState,
                                                    level_id: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="">Choose an option</option>
                                        {levels.map((level, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={level.id}
                                                    >
                                                        {level.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Area</Form.Label>
                                    <Form.Select
                                        name="area_id"
                                        value={tempFilter.area_id}
                                        onChange={
                                            (e) => setTempFilter(prevState => ({
                                                    ...prevState,
                                                    area_id: e.target.value,
                                            }))
                                        }
                                    >
                                        <option value="">Choose an option</option>
                                        {areas.map((area, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={area.id}
                                                    >
                                                        {area.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="pt-4">
                            <Col className="text-end">
                                <Button
                                    variant="secondary"
                                    onClick={() => resetHandler()}
                                    className="me-2"
                                >
                                    <RefreshCcw className="me-2" size={16}/>
                                    Reset
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={onSearch}
                                >
                                    <Search className="me-2" size={16}/>
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
    );
}

export default SearchForm;