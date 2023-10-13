import 'preact/debug';
import { render } from 'preact';
import { useState } from 'preact/hooks';

import './style.css';

import Avatar from './components/Avatar';
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
    <div className="mx-auto my-8 p-8 w-3/4 bg-gray-200">
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

        <div className="underline">
          <Header
            label="Avatars"
            size="md"
          />
        </div>

        <div className="my-4 flex flex-row space-x-1">
          <Avatar
            name="DRL"
          />
          <Avatar
            name="AR"
          />
          <Avatar
            name="DL"
            size={12}
          />
          <Avatar
            name="MB"
            color="amber-800"
            size={32}
          />
          <Avatar
            name={username}
            size={20}
            roundingAmount="lg"
          />
          <Avatar
            name={username}
            size={12}
            imageUrl="https://avatars.githubusercontent.com/u/2449?v=4"
          />
        </div>

        <div className="underline">
          <Header
            label="Loading"
            size="md"
          />
        </div>

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

      {/*
        Because Tailwind's JIT is being dumb about dynamic class names, this
        ensures all the classes for the <Avatar /> component are present.
      */}
      <div className="hidden">
        <div className="bg-red-500 h-8 w-8 rounded-none text-white font-bold flex items-center justify-center"></div>
        <div className="bg-pink-500 h-4 w-4 rounded-md"></div>
        <div className="bg-orange-500 h-12 w-12 rounded-lg"></div>
        <div className="bg-yellow-500 h-32 w-32 rounded-full"></div>
        <div className="bg-green-500 h-20 w-20 text-xs"></div>
        <div className="bg-blue-500 text-sm"></div>
        <div className="bg-purple-500 text-md"></div>
        <div className="bg-slate-400 text-lg"></div>
        <div className="bg-amber-800 text-2xl"></div>
      </div>
    </div>
  );
}

render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('app'));
