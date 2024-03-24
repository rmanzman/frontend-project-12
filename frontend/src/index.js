import { createRoot } from 'react-dom/client';
import init from './init.jsx';

const app = async () => {
  const DOMNode = document.getElementById('chat');
  const root = createRoot(DOMNode);
  root.render(await init());
};

app();
