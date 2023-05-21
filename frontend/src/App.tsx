import { AppRouter } from "./router";

function App() {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="title">
            <a href="/">Molkky</a>
          </h1>
          <AppRouter />
        </div>
      </section>
    </>
  );
}

export default App;
