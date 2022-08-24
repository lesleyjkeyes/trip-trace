import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteSingleStop } from '../.husky/api/stopData';
import { useAuth } from '../utils/context/authContext';

export default function StopCard({ stopObj, onUpdate }) {
  const { user } = useAuth;
  const deleteThisStop = () => {
    if (window.confirm('Delete this stop?')) {
      (stopObj.tripFirebaseKey).then(() => {
        deleteSingleStop(stopObj.stopFirebaseKey).then(() => onUpdate());
      });
    }
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{stopObj.stopTitle}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{stopObj.stopCountry} {stopObj.stopCity}</Card.Subtitle>
        <Card.Text>{ stopObj.stopDescription }</Card.Text>
        {user.uid === stopObj.uid && (
        <><Button variant="dark" onClick={deleteThisStop}>Delete</Button><Button variant="dark">Edit</Button></>
        )}
      </Card.Body>
    </Card>
  );
}

StopCard.propTypes = {
  stopObj: PropTypes.shape({
    stopFirebaseKey: PropTypes.string,
    tripFirebaseKey: PropTypes.string,
    photoURL: PropTypes.string,
    stopDescription: PropTypes.string,
    stopCountry: PropTypes.string,
    stopDuration: PropTypes.string,
    stopCity: PropTypes.string,
    stopTitle: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
