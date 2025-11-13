import React from 'react';
import Select from './Select';
import {useSearchParams} from 'react-router';

const SortBy = ({options}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get('sortBy') || '';
  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={initialValue}
      onChange={handleChange}
      type="white"
    />
  );
};

export default SortBy;
