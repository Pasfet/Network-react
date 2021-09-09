import Message from "./components/Message/Message";
import { useState } from 'react';

const App = () => {
  const [messagelist, setMessageList] = useState([]);
  const textMsg = 'This is text from props';
  return (
    <div className="App">
      <Message message={textMsg} />
    </div>
  );
}

export default App;
