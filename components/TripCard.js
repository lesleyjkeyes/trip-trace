import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { deleteSingleTrip } from '../.husky/api/tripData';

export default function TripCard({ tripObj, onUpdate }) {
  const deleteThisTrip = () => {
    if (window.confirm(`Delete ${tripObj.title}?`)) {
      deleteSingleTrip(tripObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={tripObj?.imageUrl} alt={tripObj?.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{tripObj?.title}</Card.Title>
        <Card.Text>
          Description: {tripObj?.description}
        </Card.Text>
        <Card.Text>
          Country: {tripObj?.country}
        </Card.Text>
        <Card.Text>
          City: {tripObj?.city}
        </Card.Text>
        <Link href={`/trip/edit/${tripObj?.firebaseKey}`} passHref>
          <Button variant="info" style={{ margin: '5px' }}>EDIT</Button>
        </Link>
        <Button variant="danger" style={{ margin: '5px' }} onClick={deleteThisTrip}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

TripCard.propTypes = {
  tripObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
