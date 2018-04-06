import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import React from 'react';
import DatetimeRangePicker from 'react-bootstrap-datetimerangepicker';
import moment from 'moment';

class PredefinedRanges extends React.Component {

    constructor(props) {
        super(props);

        this.handleEvent = this.handleEvent.bind(this);

        this.state = {
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            },
        };
    }

    handleEvent(event, picker) {
        this.setState({
            startDate: picker.startDate,
            endDate: picker.endDate,
        });
        console.log("here");
    }

    render() {
        let start = this.state.startDate.format('MMMM D, YYYY');
        let end = this.state.endDate.format('MMMM D, YYYY');
        let label = start + ' - ' + end;
        if (start === end) {
            label = start;
        }

        let buttonStyle = { width: '100%' };

        return (
            <FormGroup>
                  <DatetimeRangePicker
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      ranges={this.state.ranges}
                      onEvent={this.handleEvent}
                  >
                      <Button className="selected-date-range-btn" style={buttonStyle}>
                          <div className="pull-left">
                              <i className="fa fa-calendar"/>
                              &nbsp;
                              <span>
                {label}
              </span>
                          </div>
                          <div className="pull-right">
                              <i className="fa fa-angle-down"/>
                          </div>
                      </Button>
                  </DatetimeRangePicker>
            </FormGroup>
        );
    }

}

export default PredefinedRanges;

// class StartForm extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//
//     this.handleChange = this.handleChange.bind(this);
//
//     this.state = {
//       value: ''
//     };
//   }
//
//   getValidationState() {
//     const length = this.state.value.length;
//     if (length == 14 || length == 15) return 'success';
//     else if (length > 0) return 'warning';
//     return null;
//   }
//
//   handleChange(e) {
//     this.setState({ value: e.target.value }, () => {
//         this.props.callback(this.state.value);
//     });
//   }
//
//   render() {
//     return (
//
//         <FormGroup
//           controlId="formBasicText"
//           validationState={this.getValidationState()}
//         >
//           <FormControl
//             type="text"
//             value={this.state.value}
//             placeholder="12-11-2017-6am"
//             onChange={this.handleChange}
//           />
//           <FormControl.Feedback />
//         </FormGroup>
//
//     );
//   }
// }
//
// export default StartForm;
