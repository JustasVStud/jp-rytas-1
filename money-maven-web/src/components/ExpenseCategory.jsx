import { useState, useEffect  } from "react";
import ExpenseForm from './ExpenseForm';
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

const expenseTypes = [
  { value: 1, typeName: 'Food' },
  { value: 2, typeName: 'Clothes' },

];

function CategorySelector() {
  const [otherCategory, setOtherCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [expenseTypes, setExpenseTypes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/expenseTypes')
      .then(response => setExpenseTypes(response.data))
      .catch((err) => console.log(err))
  }, []);
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
            <Form.Label>Expense Type</Form.Label>
            <Form.Control
              as="select"
              name="expenseCategory"
              size="sm"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select category</option>
              {expenseTypes.map((expenseType) => (
                <option key={expenseType.value} value={expenseType.value}>
                  {expenseType.typeId}
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
