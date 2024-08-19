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
// import {
//   useEffect,
//   useState,
// } from 'react';
import {
  useEffect,
  useState,
} from 'preact/hooks';

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
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    // Within useEffect, you need an extra wrapper for async functions.
    async function doSearch() {
      const data = await searchFunc(query);
      setResults(data);
      setShowResults(true);
      setIsLoading(false);
      setIsError(false);
    }

    // First, reset state.
    resetState();

    if (query.length < minChars) {
      return;
    }

    // Show that we're loading results.
    setIsLoading(true);

    doSearch()
      .catch((err) => {
        console.error(err);

        // In the event of an error, reset state.
        resetState();
        setIsError(true);
      });
  }, [query]);

  function resetState() {
    setIsError(false);
    setIsLoading(false);
    setShowResults(false);
    setResults([]);
  }

  return {
    showResults,
    results,
    isLoading,
    isError,
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
      className="w-64 p-2 border-2 border-gray-200 bg-white text-left"
      onClick={() => handleClick(result)}
    >
      {result.name}
    </button>
  );
}

export function AutoCompleteInput({ name, value, handleSearch, onChange, resultComponent, minChars = 3, ...props }) {
  const autocomplete = useAutoComplete(handleSearch, value, minChars);
  const ResultComponent = resultComponent;

  return (
    <div className="relative">
      <SearchInput
        name={name}
        value={value}
        onChange={onChange}
      />

      {autocomplete.showResults && (
        <div className="absolute t-0 l-0 border-2 border-gray-200">
          {autocomplete.isLoading && (
            <Loading />
          )}
          {!autocomplete.isLoading && (
            autocomplete.results.map((resultData) => (
              <ResultComponent
                result={resultData}
                onSelect={() => onChange(resultData)}
                key={resultData.id}
              />
            ))
          )}
        </div>
      )}
      {autocomplete.isError && (
        <div class="border-2 border-red-600 bg-red-200 text-red-600 px-4 py-2 rounded-md mt-2">
          <span className="font-bold">Failed to load results.</span>
        </div>
      )}
    </div>
  );
}
