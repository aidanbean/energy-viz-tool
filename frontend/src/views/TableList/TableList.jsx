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
                        <Col md={15}>
                            <CSVLink data={data}>Download me</CSVLink>
                            <Card
                                title="Building Statistics"
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
                                                // TODO: Change below to get all data
                                                filterMethod: (filter, row) =>
                                                    String(row[filter.id]).toLocaleLowerCase().includes(filter.value.toLocaleLowerCase())
                                            },
                                            {
                                                // Header: "Equipment Type",
                                                Header: "Maximum",
                                                id: "equipmentType",
                                                // TODO: change this below to get all data
                                                accessor: d => d.equipmentType,
                                                filterMethod: (filter, rows) =>
                                                    matchSorter(rows, filter.value, {keys: ["equipmentType"]}),
                                                filterAll: true
                                            },
                                            {
                                                // Header: "Equipment Number",
                                                Header: "Minimum"
                                                // accessor: "equipmentNumber",
                                            },
                                            {
                                                // Header: "Sensor Type",
                                                Header: "Average"
                                                // id: ""
                                            },
                                            {
                                                Header: "Standard Deviation"
                                                // id: ""
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
