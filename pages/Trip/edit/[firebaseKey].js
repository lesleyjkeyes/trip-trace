import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTrip } from '../../../.husky/api/tripData';
import TripForm from '../../../components/Forms/TripForm';

export default function EditTrip() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTrip(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<TripForm obj={editItem} />);
}
