import { render } from 'preact';
import { useState } from 'preact/hooks';

import './style.css';

import Button from './components/Button';
import ErrorBoundary from './components/ErrorBoundary';
import Errors from './components/Errors';
import Form from './components/Form';
import {
  InlineFormRow,
  StackedFormRow,
} from './components/FormRows';
import Header from './components/Header';
import Input from './components/Input';
import Loading from './components/Loading';
import Select from './components/Select';

export function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('1999-01-01');
  const [preferredComms, setPreferredComms] = useState('email');

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

  function changeBirthday(newBirthday) {
    setBirthday(newBirthday);
  }

  function changeComms(newComms) {
    setPreferredComms(newComms);
  }

  function handleReset() {
    setUsername('');
    setPassword('');
    setBirthday('1999-01-01');
    setPreferredComms('email');
  }

  return (
    <div className="mx-auto my-8 w-3/4">
      <Header
        label="My Component Library"
      />

      <Errors
        messages={[
          'These are example errors.',
          "You didn't fill out the form right.",
          'Your feet smell.',
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

        <InlineFormRow name="password" label="Password:">
          <Input
            type="password"
            name="password"
            value={password}
            onChange={changePassword}
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

        <StackedFormRow name="birthday" label="Birthday:">
          <Input
            type="date"
            name="birthday"
            value={birthday}
            onChange={changeBirthday}
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
            label="Reset"
            className="border-red-600 bg-red-300 text-white"
            onClick={handleReset}
          />
        </div>
      </Form>
    </div>
  );
}

render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('app'));
