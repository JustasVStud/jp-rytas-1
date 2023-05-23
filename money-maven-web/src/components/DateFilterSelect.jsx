
import { Form, Col, Row} from 'react-bootstrap';
import { FaCalendarAlt } from 'react-icons/fa';
import DateTimePicker from 'react-datetime-picker';
function DateFilterSelect({ startDate, endDate, onStartDateChange, onEndDateChange }) {
    return ( 
        <Row className="table-filter">
          <Col>
            <Form.Label>Date from:</Form.Label>
            <DateTimePicker
              value={startDate}
              name="startDate"
              format="yyyy-MM-dd"
              calendarIcon={<FaCalendarAlt />}
              className="table-filter--date"
              disableClock={true}
              yearPlaceholder="YYYY"
              monthPlaceholder="MM"
              dayPlaceholder="DD"
              onChange={onStartDateChange}
            />
          </Col>
          <Col>
            <Form.Label>Date until:</Form.Label>
            <DateTimePicker
              value={endDate}
              name="endDate"
              format="yyyy-MM-dd"
              calendarIcon={<FaCalendarAlt />}
              className="table-filter--date"
              disableClock={true}
              yearPlaceholder="YYYY"
              monthPlaceholder="MM"
              dayPlaceholder="DD"
              onChange={onEndDateChange}
            />
          </Col>
        </Row>
     );
}

export default DateFilterSelect;