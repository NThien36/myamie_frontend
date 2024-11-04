import { useGetCities } from "@/services/city.service";
import {
  citiesErrorSelector,
  citiesLoadingSelector,
  citiesSelector,
} from "@/store/city/city.selector";
import { setCities, setError, setLoading } from "@/store/city/city.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCities = () => {
  const dispatch = useDispatch();
  const cities = useSelector(citiesSelector);
  const isLoading = useSelector(citiesLoadingSelector);
  const isError = useSelector(citiesErrorSelector);

  const { data, isLoading: queryLoading, isError: queryError } = useGetCities();

  useEffect(() => {
    if (queryLoading) {
      dispatch(setLoading());
    } else if (queryError) {
      dispatch(setError());
    } else if (data?.data) {
      dispatch(setCities(data.data));
    }
  }, [data, queryLoading, queryError, dispatch]);

  return { cities, isLoading, isError };
};
