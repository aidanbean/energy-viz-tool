import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';

import Card from '../../components/Card/Card.jsx';

import dataFetcher from './TableDataFetcher.jsx';
import {CSVLink, CSVDownload} from 'react-csv';


class TableList extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            data: dataFetcher()
        };
        this.renderEditable = this.renderEditable.bind(this);
    }
    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
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
            />
        );
    }

    render() {
        const { data } = this.state;
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <CSVLink data={data} >Download me</CSVLink>
                            <Card
                                title="Air Handler Unit Data"
                                category="AHU"

                                ctTableFullWidth ctTableResponsive
                                content={
                                    <ReactTable
                                    data={data}
                                    filterable
                                    defaultFilterMethod={(filter, row) =>
                                        String(row[filter.id]).toLocaleLowerCase() === filter.value.toLocaleLowerCase()}


                                    columns={[
                                        {
                                            Header: "Name",
                                            columns: [
                                                {
                                                    Header: "Building",
                                                    accessor: "building",
                                                    Cell: this.renderEditable,
                                                    filterMethod: (filter, row) =>
                                                        String(row[filter.id]).toLocaleLowerCase().includes(filter.value.toLocaleLowerCase())
                                                        // startsWith(filter.value.toLocaleLowerCase())
                                                        // String(row[filter.id]).toLocaleLowerCase().endsWith(filter.value.toLocaleLowerCase())
                                                },
                                                {
                                                    Header: "Equipment Type",
                                                    id: "equipmentType",
                                                    Cell: this.renderEditable,
                                                    accessor: d => d.equipmentType,
                                                    filterMethod: (filter, rows) =>
                                                        matchSorter(rows, filter.value, { keys: ["equipmentType"] }),
                                                    filterAll: true
                                                }
                                            ]
                                        },
                                        {
                                            Header: "Info",
                                            columns: [
                                                {
                                                    Header: "Equipment Number",
                                                    accessor: "equipmentNumber",
                                                    Cell: this.renderEditable
                                                },
                                                {
                                                    Header: "Sensor Type",
                                                    accessor: "SensorType",
                                                    id: "over",
                                                    Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
                                                    filterMethod: (filter, row) => {
                                                        if (filter.value === "all") {
                                                            return true;
                                                        }
                                                        if (filter.value === "true") {
                                                            return row[filter.id] >= 21;
                                                        }
                                                        return row[filter.id] < 21;
                                                    },
                                                    Filter: ({ filter, onChange }) =>
                                                        <select
                                                            onChange={event => onChange(event.target.value)}
                                                            style={{ width: "100%" }}
                                                            value={filter ? filter.value : "all"}
                                                        >
                                                            <option value="all">Show All</option>
                                                            <option value="true">type1</option>
                                                            <option value="false">type2</option>
                                                        </select>
                                                }
                                            ]
                                        }
                                    ]}
                                    defaultPageSize={10}
                                    className="-striped -highlight"
                                    />


                                }
                            />



                        </Col>


                        {/*<Col md={12}>*/}
                            {/*<Card*/}
                                {/*plain*/}
                                {/*title="Air Handler Unit Data"*/}
                                {/*category="AHU Data"*/}
                                {/*ctTableFullWidth ctTableResponsive*/}
                                {/*content={*/}
                                    {/*<Table hover>*/}
                                        {/*<thead>*/}
                                            {/*<tr>*/}
                                                {/*{*/}
                                                    {/*thArray.map((prop, key) => {*/}
                                                        {/*return (*/}
                                                        {/*<th  key={key}>{prop}</th>*/}
                                                        {/*);*/}
                                                    {/*})*/}
                                                {/*}*/}
                                            {/*</tr>*/}
                                        {/*</thead>*/}
                                        {/*<tbody>*/}
                                            {/*{*/}
                                                {/*tdArray.map((prop,key) => {*/}
                                                    {/*return (*/}
                                                        {/*<tr key={key}>{*/}
                                                            {/*prop.map((prop,key)=> {*/}
                                                                {/*return (*/}
                                                                    {/*<td  key={key}>{prop}</td>*/}
                                                                {/*);*/}
                                                            {/*})*/}
                                                        {/*}</tr>*/}
                                                    {/*)*/}
                                                {/*})*/}
                                            {/*}*/}
                                        {/*</tbody>*/}
                                    {/*</Table>*/}
                                {/*}*/}
                            {/*/>*/}
                        {/*</Col>*/}

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default TableList;
