import abbreviations from "../data/abbreviations.json";

const CsvToJson = (csv) => {
  const lines = csv.split("\n");
  const keys = lines[0].split(",");
  return lines.slice(1).map((line) => {
    return line.split(",").reduce((acc, cur, i) => {
      const toAdd = {};
      toAdd[keys[i]] = cur;
      return { ...acc, ...toAdd };
    }, {});
  });
};

const Input = ({ setData }) => {
  const parseCsv = () => {
    const reader = new FileReader();
    reader.readAsBinaryString(document.getElementById("csvInput").files[0]);
    reader.onload = () => {
      const json = CsvToJson(reader.result);
      const states = new Map();
      let totalOrders = 0;

      json.forEach((order) => {
        const shipCountryKey = Object.keys(order).find((key) =>
          key.includes("Ship Country")
        );
        const shipCountry = order[shipCountryKey];

        const shipStateKey = Object.keys(order).find((key) =>
          key.includes("Ship State")
        );
        const shipState = order[shipStateKey];

        if (shipCountry.includes("United States")) {
          totalOrders++;
          const stateAbbrev = abbreviations[shipState];
          states.set(stateAbbrev, states.get(stateAbbrev) + 1 || 1);
        }
      });

      setData({ states, totalOrders });
    };
  };

  return (
    <div className="absolute z-[9999] w-[100vw] h-[100vh] grid place-items-center bg-blue-900 bg-opacity-80">
      <div className="p-6 rounded-lg text-white flex flex-col items-center gap-4">
        <p className="font-bold text-xl">Upload CSV</p>
        <input
          accept=".csv"
          type="file"
          id="csvInput"
          onChange={parseCsv}
          className="border-2 border-white border-dashed rounded-md p-2"
        />
      </div>
    </div>
  );
};

export default Input;
