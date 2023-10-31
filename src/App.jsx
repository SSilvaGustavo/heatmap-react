import { Heatmap } from "./components/Heatmap";
import { data } from "./constants/data";

function App() {
  return (
    <>
      <Heatmap key={data} data={data} />
    </>
  );
}

export default App;
