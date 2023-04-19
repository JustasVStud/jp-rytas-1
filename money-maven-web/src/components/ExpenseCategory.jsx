import { useState } from "react";
import ExpenseForm from './ExpenseForm';
// import ExpenseTable from './ExpenseTable';
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";

const categories = [
  { value: 1, name: 'Food' },
  { value: 2, name: 'Clothes' },
  { value: 3, name: 'Medicine' },
  { value: 4, name: 'Entertainment' },
  { value: 5, name: 'Other' }
];

function CategorySelector() {
  const [otherCategory, setOtherCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    if (selectedValue === 5) {
      setOtherCategory("");
      setSelectedCategory("Other");
    } else {
      setSelectedCategory(event.target.value);
    }
  };

  const handleOtherCategoryChange = (event) => {
    setOtherCategory(event.target.value);
    setSelectedCategory(event.target.value);
  };

  return (
    <Container className="form-style">
      <Row>
        <h3 className="">Expense</h3>
      </Row>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="expenseCategory"
              size="sm"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        {selectedCategory === "Other" && (
          <Col>
            <Form.Group>
              <Form.Label>Other Category</Form.Label>
              <Form.Control
                type="text"
                name="otherCategory"
                size="sm"
                value={otherCategory}
                onChange={handleOtherCategoryChange}
              />
            </Form.Group>
          </Col>
        )}
      </Row>
      {selectedCategory && <ExpenseForm category={selectedCategory} />}
    </Container>
  );
}

export default CategorySelector;
