import {useQuery} from '@tanstack/react-query';
import {getCabins} from '../../services/apiCabin';

const useCabins = () => {
  const {
    data: cabins,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return {cabins, isLoading, error};
};

export default useCabins;
