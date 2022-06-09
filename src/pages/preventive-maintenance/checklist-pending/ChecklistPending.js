import React, { useCallback, useEffect } from "react";

import { Helmet } from "react-helmet-async";
import { Card, Col, Form, Row } from "react-bootstrap";

import { tableColumns, tableData } from "./tableColumns";
import DynamicTable from "@components/ui/DynamicTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";

export const ChecklistPending = () => {
	// const navigate = useNavigate();

	//
	// States
	//

	const {
		control,
	} = useForm({
		mode: "onTouched",
	});

	//
	// Functions
	//

	const getWorkSchedule = useCallback(async () => {
		// const response = await preventiveMaintenanceApi.getChecklistTypes();
		// setTableData(response.data.data);
	}, []);

	//
	// UseEffects
	//

	useEffect(() => {
		getWorkSchedule();
	}, [getWorkSchedule]);

	return (
		<>
			<React.Fragment>
				<Helmet title="Settings" />
				<h1 className="h3 mb-3">Pending checklist</h1>
				<Card className="p-0">
					<Card.Header className="pb-0">
						<Row>
							<Col md={3}>
								<Form.Control
									className="d-inline-block"
									placeholder="Search keyword"
								/>
							</Col>
							<Col md={3}>
								<Controller
									control={control}
									defaultValue=""
									name="frequency"
									render={({
										field: { onChange, value },
									}) => (
										<DatePicker
											// selected={value}
											// onChange={onChange}
											className="form-control"
											placeholderText="Checklist month / year"
											showMonthYearPicker
											showFullMonthYearPicker
										/>
									)}
								/>{" "}
							</Col>
						</Row>
					</Card.Header>
					<Card.Body>
						{tableData && (
							<DynamicTable
								columns={tableColumns}
								data={tableData}
							/>
						)}
					</Card.Body>
				</Card>
			</React.Fragment>
		</>
	);
};
