/**
 * <AutoCompleteInput
 *   name="input_name"
 *   value=<string>
 *   handleSearch={searchFunc}
 *   onChange={handlerFunc}
 *   resultComponent={AutoCompleteResult | compatible-component}
 *   [minChars={3}]
 * />
 */
// This is specific to the library you're using. If React, uncomment this line &
// comment-out/delete the Preact import.
// import { useState } from 'react';
import { useState } from 'preact/hooks';

import Loading from './Loading';
import SearchInput from './SearchInput';

/**
 * Example `searchFunc`.
 * You should provide your own.
 */
/*
async function handleSearch(query) {
  const url = `/api/meals/search/?q=${query}`;
  const resp = await fetch(url, { method: 'GET' });
  const data = await resp.json();
  return data["meals"];
}
*/

/**
 * Ideally, this lives in `hooks/useAutoComplete.js`.
 * But to ship a functional example, it's here.
 */
function useAutoComplete(searchFunc, query, minChars = 1) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // TODO: This could use a debounce-ing.
  async function handleSearch(query) {
    if (query.length < minChars) {
      return;
    }

    setIsLoading(true);
    setIsError(false);
    setShowDropdown(true);
    setResults([]);

    try {
      const data = await searchFunc(query);
      setResults(data);
    } catch (err) {
      console.error(err);
      setIsError(true);
    }

    setIsLoading(false);
    return;
  }

  function handleSelect() {
    setShowDropdown(false);
    setIsLoading(false);
    setIsError(false);
  }

  return {
    showDropdown,
    results,
    isLoading,
    isError,
    handleSearch,
    handleSelect,
  };
}

/**
 * This component is mostly for demonstration, & assumes that there will be a
 * `result.name` value.
 *
 * You can create your own result component(s), customize the
 * display/styling/behavior, then pass them to the `resultComponent` prop on
 * `AutoCompleteInput`.
 */
export function AutoCompleteResult({ result, onSelect, ...props }) {
  function handleClick(result) {
    onSelect(result.name);
  }

  return (
    <button
      type="button"
      className="w-full p-2 border last:border-0 border-b-gray-800 bg-white text-left"
      onClick={() => handleClick(result)}
    >
      {result.name}
    </button>
  );
}

export function AutoCompleteInput({ name, value, handleSearch, onChange, resultComponent, minChars = 3, ...props }) {
  const autocomplete = useAutoComplete(handleSearch, value, minChars);
  const ResultComponent = resultComponent;

  function handleChange(newQuery) {
    onChange(newQuery);
    autocomplete.handleSearch(newQuery)
  }

  function handleSelect(resultData) {
    onChange(resultData.name);
    autocomplete.handleSelect();
  }

  return (
    <div className="relative">
      <SearchInput
        name={name}
        value={value}
        onChange={handleChange}
      />

      {autocomplete.showDropdown && (
        <div className="absolute t-0 l-0 border border-gray-800 bg-white w-64">
          {autocomplete.isLoading && (
            <div class="mx-auto my-2 w-6">
              <Loading />
            </div>
          )}
          {autocomplete.isError && (
            <div class="border border-red-600 bg-red-200 text-red-600 px-4 py-2 mt-2">
              <span className="font-bold">Failed to load results.</span>
            </div>
          )}
          {autocomplete.results.map((resultData) => (
            <ResultComponent
              result={resultData}
              onSelect={() => handleSelect(resultData)}
              key={resultData.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
