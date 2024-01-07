import { Button } from '@hilla/react-components/Button.js';
import { Notification } from '@hilla/react-components/Notification.js';
import { HelloWorldService } from 'Frontend/generated/endpoints';
import { CSSProperties, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const includedFeatures = [
  'Fully equipped learning resources centre',
  'IT suites',
  'Teaching and learning space, equipped with interactive screen technology',
  'Separate male and female health & fitness suites',
  'Prayer rooms, a refectory, student service hub and a range of internal and external student break out zones',
]

const messages: CSSProperties = {
  backgroundColor: 'lightblue',
  fontSize: '20px',
  marginTop: '20px',
};
export default function DefaultView() {
  const [name, setName] = useState('');
  return (
    <>
      <h1 style={{
        fontSize: '40px',
      }}>Not Implemented</h1>
      <div style={messages}>
        Sorry, this feature is not available yet.
      </div >
    </>
  )
}