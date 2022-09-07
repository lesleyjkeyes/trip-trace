import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleTrip } from '../.husky/api/tripData';
import { createFavorite, deleteSingleFavorite, getFavorites } from '../.husky/api/favoritesData';

export default function TripCard({ tripObj, onUpdate }) {
  const [favorite, setFavorite] = useState({});
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const checkFavorite = () => {
    const favObj = favorites.find((fav) => fav?.tripFirebaseKey === tripObj?.tripFirebaseKey);
    if (favObj !== undefined) {
      setFavorite(favObj);
    }
  };
  const getAndSetUserFavorites = () => {
    getFavorites(user.uid).then((data) => {
      console.warn(data);
      setFavorites(data);
    });
  };

  useEffect(() => {
    checkFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  useEffect(() => {
    getAndSetUserFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripObj]);

  const deleteThisTrip = () => {
    if (window.confirm(`Delete ${tripObj.title}?`)) {
      deleteSingleTrip(tripObj.tripFirebaseKey).then(() => onUpdate());
    }
  };

  const handleFavorite = (boolean) => {
    if (boolean === true) {
      const favObj = {
        uid: user.uid,
        tripFirebaseKey: tripObj.tripFirebaseKey,
      };
      createFavorite(favObj).then(async () => { await getAndSetUserFavorites(); });
    } else {
      deleteSingleFavorite(favorite.favoriteFirebaseKey);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={tripObj?.imageUrl} alt={tripObj?.title} style={{ height: '400px' }} />
      <Card.Body>
        <Link href={`/Trip/${tripObj?.tripFirebaseKey}`} passHref>
          <Card.Title>{tripObj?.title}</Card.Title>
        </Link>
        <div className="vidCardImageDiv">
          <Link href={`/userProfile/${tripObj?.uid}`} passHref>
            <Image className="tripCardCreatorImage" src={tripObj?.userPhoto} />
          </Link>
        </div>
        <Card.Text>
          {tripObj?.userName}
        </Card.Text>
        <Card.Text>
          Description: {tripObj?.description}
        </Card.Text>
        <Card.Text>
          Country: {tripObj?.country}
        </Card.Text>
        {tripObj?.city && (
          <Card.Text>
            City: {tripObj?.city}
          </Card.Text>
        )}
        <Form>
          <Form.Check
            type="checkbox"
            id={!favorite ? favorite?.favoriteFirebaseKey : 'fav-check'}
            label="Favorite"
            // checked={!!favorite}
            onChange={(e) => handleFavorite(e.target.checked)}
          />
        </Form>
        <Link href={`/Trip/edit/${tripObj?.tripFirebaseKey}`} passHref>
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
    tripFirebaseKey: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    userPhoto: PropTypes.string,
    userName: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
