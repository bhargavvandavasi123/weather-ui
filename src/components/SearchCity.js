import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {
  GEO_LOCATION_API,
  geoApiOptions,
} from "../services/geoLocationsService";

const SearchCity = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_LOCATION_API}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.name} `,
              label: `${city.name}, ${city.country}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      className="w-96 "
      loadOptions={loadOptions}
    />
  );
};

export default SearchCity;
