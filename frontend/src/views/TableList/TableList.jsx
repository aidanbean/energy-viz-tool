import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';

import "react-table/react-table.css";
import matchSorter from 'match-sorter';

import Card from '../../components/Card/Card.jsx';

import dataFetcher from './TableDataFetcher.jsx';
import {CSVLink} from 'react-csv';
import DraggableTable from './DraggableTable';


class TableList extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            data: dataFetcher(),
        };
        this.renderEditable = this.renderEditable.bind(this);
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{backgroundColor: "#fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            ></div>
        );
    }
    render() {
        const { data } = this.state;

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <CSVLink data={data}>Download me</CSVLink>
                            <Card
                                title="Air Handler Unit Data"
                                category="AHU"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <DraggableTable
                                        filterable
                                        defaultFilterMethod={(filter, row) =>
                                            String(row[filter.id]).toLocaleLowerCase() === filter.value.toLocaleLowerCase()}
                                        rows={data}
                                        columns={[
                                            {
                                                Header: "Building",
                                                accessor: "building",
                                                filterMethod: (filter, row) =>
                                                    String(row[filter.id]).toLocaleLowerCase().includes(filter.value.toLocaleLowerCase())
                                            },
                                            {
                                                Header: "Equipment Type",
                                                id: "equipmentType",
                                                accessor: d => d.equipmentType,
                                                filterMethod: (filter, rows) =>
                                                    matchSorter(rows, filter.value, {keys: ["equipmentType"]}),
                                                filterAll: true
                                            },
                                            {
                                                Header: "Equipment Number",
                                                accessor: "equipmentNumber",
                                            },
                                            {
                                                Header: "Sensor Type",
                                                accessor: "SensorType",
                                                id: "over",
                                                Cell: ({value}) => (value >= 21 ? "Yes" : "No"),
                                                filterMethod: (filter, row) => {
                                                    if (filter.value === "all") {
                                                        return true;
                                                    }
                                                    if (filter.value === "true") {
                                                        return row[filter.id] >= 21;
                                                    }
                                                    return row[filter.id] < 21;
                                                },
                                                Filter: ({filter, onChange}) =>
                                                    <select
                                                        onChange={event => onChange(event.target.value)}
                                                        style={{width: "100%"}}
                                                        value={filter ? filter.value : "all"}
                                                    >
                                                        <option value="all">Show All</option>
                                                        <option value="true">type1</option>
                                                        <option value="false">type2</option>
                                                    </select>
                                            }
                                        ]}
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                    />
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default TableList;
