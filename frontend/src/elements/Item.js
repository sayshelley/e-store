import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Grading from './Grading';
import Badge from 'react-bootstrap/esm/Badge';
function Item(props) {
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product.tag}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.tag}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Grading grade={product.grade} peopleReviews={product.peopleReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.numLeft > 0 ? (
          <Badge badge="success" className="stock">
            Instock
          </Badge>
        ) : (
          <Badge badge="danger" className="unstock">
            Out Of Stock
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
}
export default Item;
