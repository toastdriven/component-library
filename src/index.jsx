import { render } from 'preact';
import { useState } from 'preact/hooks';

import './style.css';

import Button from './components/Button';
import Errors from './components/Errors';
import {
  Form,
  InlineFormRow,
  StackedFormRow,
} from './components/Form';
import Header from './components/Header';
import Input from './components/Input';
import Loading from './components/Loading';
import Select from './components/Select';

export function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [preferredComms, setPreferredComms] = useState("email");

  function fakeSubmit() {
    const data = {
      "username": username,
      "password": password,
      "preferred_comms": preferredComms,
    }
    console.log(`Faking a submit!`);
    console.log(data);
  }

  function changeUsername(newName) {
    setUsername(newName);
  }

  function changePassword(newPassword) {
    setPassword(newPassword);
  }

  function changeComms(newComms) {
    setPreferredComms(newComms);
  }

  function handleClear() {
    setUsername('');
    setPassword('');
    setPreferredComms('email');
  }

  return (
    <div className="mx-auto my-8 w-3/4">
      <Header
        label="My Component Library"
      />

      <Errors
        messages={[
          'Your feet smell.',
          "You didn't fill out the form right.",
        ]}
      />

      <Form onSubmit={fakeSubmit}>
        <div className="underline">
          <Header
            label="Inline Form Elements"
            size="md"
          />
        </div>

        <InlineFormRow name="username" label="Username:">
          <Input
            name="username"
            value={username}
            onChange={changeUsername}
          />
        </InlineFormRow>

        <div className="text-black mx-auto my-4 w-5">
          <Loading />
        </div>

        <div className="underline">
          <Header
            label="Stacked Form Elements"
            size="md"
          />
        </div>

        <StackedFormRow name="password" label="Password:">
          <Input
            type="password"
            name="password"
            value={password}
            onChange={changePassword}
          />
        </StackedFormRow>

        <StackedFormRow name="preferred-comms" label="Preferred Communications:">
          <Select
            name="preferred-comms"
            value={preferredComms}
            options={[
              { name: 'Email', value: 'email' },
              { name: 'Text', value: 'text' },
              { name: 'Smoke Signals', value: 'smoke', disabled: true },
            ]}
            onChange={changeComms}
          />
        </StackedFormRow>

        <div class="flex flex-row mt-4">
          <Button
            type="submit"
            label="Send!"
            className="border-blue-600 bg-blue-400 text-white"
          />
          <span
            className="mx-4 my-2 text-gray-500 inline-block"
          >...or...</span>
          <Button
            type="button"
            label="Clear"
            className="border-red-600 bg-red-300 text-white"
            onClick={handleClear}
          />
        </div>
      </Form>
    </div>
  );
}

render(<App />, document.getElementById('app'));
