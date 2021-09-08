import Message from "./components/Message/Message";

const App = () => {
  const textMsg = 'This is text from props';
  return (
    <div className="App">
      <Message message={textMsg} />
    </div>
  );
}

export default App;
