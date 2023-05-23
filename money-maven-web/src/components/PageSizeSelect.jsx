import { Col, Form } from 'react-bootstrap';

function PageSizeSelect({ pageSize, onPageSizeChange }) {
  const handlePageSizeChange = (e) => {
    onPageSizeChange(e.target.value);
  };

  return (
    <Col className="table-filter--size">
      <Form.Group>
        <Form.Label>Page size:</Form.Label>
        <Form.Select
          id="pageSizeSelect"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="size--select"
        >
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </Form.Select>
      </Form.Group>
    </Col>
  );
}

export default PageSizeSelect;
