import { Card, Image } from 'react-bootstrap';
import { useState, React, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleTrip } from '../../.husky/api/tripData';

function SingleTripView() {
  const [trip, setTrip] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getTheTrip = () => {
    getSingleTrip(firebaseKey).then(setTrip);
  };

  useEffect(() => {
    getTheTrip();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card style={{ width: '36rem' }}>
      <Card.Body>
        <Card.Title>{trip.title}</Card.Title>
        <Image className="userPhoto" src={trip.userPhoto} />
        <Card.Subtitle className="mb-2 text-muted">Created by: {trip.userName}</Card.Subtitle>
        <Card.Text>
          Country: {trip.country}
        </Card.Text>
        {trip.city && (
          <Card.Text>
            City: {trip.city}
          </Card.Text>
        )}
        <Card.Text>
          Description: {trip.description}
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default SingleTripView;
