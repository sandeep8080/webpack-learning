const ENV = process.env.APP_ENV;
const App = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>This is a simple React application.</p>
      {ENV === "dev" && <p>This is Development Env</p>}
    </div>
  );
};

export default App;
