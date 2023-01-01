import Input from "./components/Input";
import Map from "./components/Map";
import { useState } from "react";

function App() {
  const [csvData, setCsvData] = useState(null);

  return (
    <>
      {!csvData && <Input setData={setCsvData} />}
      <Map data={csvData} />
    </>
  );
}

export default App;
