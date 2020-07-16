import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from '../components/RestaurantDetail';
import RestaurantReviewForm from '../components/RestaurantReviewForm';

import {
  loadRestaurant,
  setReviewFields,
} from '../modules/actions';

import { get } from '../utils';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const restaurant = useSelector(get('restaurant'));
  const accessToken = useSelector(get('accessToken'));
  const { score, reviewContent } = useSelector(get('reviewFields'));

  const handleSubmit = () => {
    // TODO: dispatch(requestAddReview());
  };
  const handleChange = ({ name, value }) => {
    dispatch(setReviewFields({ name, value }));
  };

  if (!restaurant) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      {accessToken
      && (
        <RestaurantReviewForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          fields={{ score, reviewContent }}
        />
      )}
    </>
  );
}
