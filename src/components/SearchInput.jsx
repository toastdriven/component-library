/**
 * <SearchInput
 *   name="input_name"
 *   [value=<any>]
 *   onChange={handlerFunc}
 * />
 */
// This is specific to the library you're using. If React, uncomment this line &
// comment-out/delete the Preact import.
// import { useRef } from 'react';
import { useRef } from 'preact/hooks';

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
      <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clip-rule="evenodd" />
    </svg>
  );
}

export default function SearchInput({ name, value = null, onChange, ...props }) {
  const searchField = useRef(null);

  function focusSearch() {
    searchField.current.focus();
  }

  function handleChange(ev) {
    const newValue = ev.target.value;
    onChange(newValue);
  }

  return (
    <div className="relative p-2 border-solid border-2 border-grey-500 rounded-md w-full">
      <div
        className="absolute t-2 l-2 w-8 h-8"
        onClick={focusSearch}
      >
        <SearchIcon />
      </div>

      <input
        type="text"
        name={name}
        value={value}
        onInput={handleChange}
        className="w-full pl-6 focus:outline-none"
        ref={searchField}
      />
    </div>
  );
}
