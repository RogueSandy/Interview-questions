import Shape from "./components/Shape";

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function App() {
  return (
    <div>
      <Shape data={BOX_DATA} />
    </div>
  );
}

export default App;
