import React, { useMemo, useState } from "react";

const lumberTypes = ["1x4", "2x4", "2x6", "2x8", "2x10", "2x12"];
const lumberLengths = [8, 10, 12, 14, 16, 20];
const stakeLengths = [12, 18, 24, 30, 36, 42, 48];

function Card({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}

function NumberInput({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border rounded-xl p-3"
      />
    </div>
  );
}

function SelectInput({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-600 mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-xl p-3"
      >
        {options.map((option: any) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function TotalCard({ label, value, color = "green" }: any) {
  const colors: any = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className={`border rounded-xl p-4 ${colors[color]}`}>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold">${value.toFixed(2)}</p>
    </div>
  );
}

export default function ConcreteEstimatorPro() {
  const [slabLength, setSlabLength] = useState(0);
  const [slabWidth, setSlabWidth] = useState(0);
  const [slabDepth, setSlabDepth] = useState(4);
  const [slabPrice, setSlabPrice] = useState(150);
  const [psi, setPsi] = useState("3500 PSI");

  const slabYards =
    (slabLength * slabWidth * (slabDepth / 12)) / 27;

  const slabTotal = slabYards * slabPrice;

  const [footingLength, setFootingLength] = useState(0);
  const [footingWidth, setFootingWidth] = useState(12);
  const [footingDepth, setFootingDepth] = useState(12);
  const [footingPrice, setFootingPrice] = useState(150);

  const footingYards =
    (footingLength * (footingWidth / 12) * (footingDepth / 12)) / 27;

  const footingTotal = footingYards * footingPrice;

  const [dirtLength, setDirtLength] = useState(0);
  const [dirtWidth, setDirtWidth] = useState(0);
  const [dirtDepth, setDirtDepth] = useState(4);
  const [compaction, setCompaction] = useState(10);
  const [dirtPrice, setDirtPrice] = useState(0);

  const dirtYards =
    (dirtLength * dirtWidth * (dirtDepth / 12)) / 27;

  const compactedYards =
    dirtYards * (1 + compaction / 100);

  const dirtTotal = compactedYards * dirtPrice;

  const [lumberQty, setLumberQty] = useState(0);
  const [lumberType, setLumberType] = useState("2x4");
  const [lumberLength, setLumberLength] = useState("12");
  const [lumberPrice, setLumberPrice] = useState(0);

  const lumberTotal = lumberQty * lumberPrice;

  const [stakeQty, setStakeQty] = useState(0);
  const [stakeType, setStakeType] = useState("2x4 Stakes");
  const [stakeLength, setStakeLength] = useState("24");
  const [stakePrice, setStakePrice] = useState(0);

  const stakeTotal = stakeQty * stakePrice;

  const [wireQty, setWireQty] = useState(0);
  const [wireType, setWireType] = useState("5x150 Roll");
  const [wirePrice, setWirePrice] = useState(0);

  const wireTotal = wireQty * wirePrice;

  const [rebarQty, setRebarQty] = useState(0);
  const [rebarSize, setRebarSize] = useState("#4");
  const [rebarLength, setRebarLength] = useState("20 ft");
  const [rebarPrice, setRebarPrice] = useState(0);

  const rebarTotal = rebarQty * rebarPrice;

  const [plasticQty, setPlasticQty] = useState(0);
  const [plasticPrice, setPlasticPrice] = useState(0);

  const plasticTotal = plasticQty * plasticPrice;

  const [fiberQty, setFiberQty] = useState(0);
  const [fiberPrice, setFiberPrice] = useState(0);

  const fiberTotal = fiberQty * fiberPrice;

  const [acceleratorQty, setAcceleratorQty] = useState(0);
  const [acceleratorPrice, setAcceleratorPrice] = useState(0);

  const acceleratorTotal = acceleratorQty * acceleratorPrice;

  const [miniDays, setMiniDays] = useState(0);
  const [miniRate, setMiniRate] = useState(0);
  const [skidDays, setSkidDays] = useState(0);
  const [skidRate, setSkidRate] = useState(0);
  const [pumpDays, setPumpDays] = useState(0);
  const [pumpRate, setPumpRate] = useState(0);

  const miniTotal = miniDays * miniRate;
  const skidTotal = skidDays * skidRate;
  const pumpTotal = pumpDays * pumpRate;

  const [taxRate, setTaxRate] = useState(8.25);

  const subtotal = useMemo(() => {
    return (
      slabTotal +
      footingTotal +
      dirtTotal +
      lumberTotal +
      stakeTotal +
      wireTotal +
      rebarTotal +
      plasticTotal +
      fiberTotal +
      acceleratorTotal +
      miniTotal +
      skidTotal +
      pumpTotal
    );
  }, [
    slabTotal,
    footingTotal,
    dirtTotal,
    lumberTotal,
    stakeTotal,
    wireTotal,
    rebarTotal,
    plasticTotal,
    fiberTotal,
    acceleratorTotal,
    miniTotal,
    skidTotal,
    pumpTotal,
  ]);

  const taxAmount = subtotal * (taxRate / 100);
  const finalCost = subtotal + taxAmount;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-5xl font-black text-gray-900">
          Concrete Estimator Pro
        </h1>

        <Card title="Concrete Slab Calculator">
          <NumberInput label="Length (ft)" value={slabLength} onChange={setSlabLength} />
          <NumberInput label="Width (ft)" value={slabWidth} onChange={setSlabWidth} />
          <NumberInput label="Depth (in)" value={slabDepth} onChange={setSlabDepth} />
          <SelectInput label="PSI" value={psi} onChange={setPsi} options={["3000 PSI", "3500 PSI", "4000 PSI", "4500 PSI", "5000 PSI"]} />
          <NumberInput label="Concrete Price / yd" value={slabPrice} onChange={setSlabPrice} />
          <div className="border rounded-xl p-4 bg-blue-50 border-blue-200">
            <p className="text-sm">Concrete Yards</p>
            <p className="text-3xl font-bold text-blue-700">{slabYards.toFixed(2)}</p>
          </div>
          <TotalCard label="Concrete Total" value={slabTotal} />
        </Card>

        <Card title="Footing Calculator">
          <NumberInput label="Length (ft)" value={footingLength} onChange={setFootingLength} />
          <NumberInput label="Width (in)" value={footingWidth} onChange={setFootingWidth} />
          <NumberInput label="Depth (in)" value={footingDepth} onChange={setFootingDepth} />
          <NumberInput label="Concrete Price / yd" value={footingPrice} onChange={setFootingPrice} />
          <div className="border rounded-xl p-4 bg-blue-50 border-blue-200">
            <p className="text-sm">Footing Yards</p>
            <p className="text-3xl font-bold text-blue-700">{footingYards.toFixed(2)}</p>
          </div>
          <TotalCard label="Footing Total" value={footingTotal} color="orange" />
        </Card>

        <Card title="Dirt / Base Calculator">
          <NumberInput label="Length (ft)" value={dirtLength} onChange={setDirtLength} />
          <NumberInput label="Width (ft)" value={dirtWidth} onChange={setDirtWidth} />
          <NumberInput label="Depth (in)" value={dirtDepth} onChange={setDirtDepth} />
          <NumberInput label="Compaction %" value={compaction} onChange={setCompaction} />
          <NumberInput label="Price / yd" value={dirtPrice} onChange={setDirtPrice} />
          <div className="border rounded-xl p-4 bg-blue-50 border-blue-200">
            <p className="text-sm">Compacted Yards</p>
            <p className="text-3xl font-bold text-blue-700">{compactedYards.toFixed(2)}</p>
          </div>
          <TotalCard label="Dirt Total" value={dirtTotal} color="purple" />
        </Card>

        <Card title="Lumber Calculator">
          <SelectInput label="Lumber Type" value={lumberType} onChange={setLumberType} options={lumberTypes} />
          <SelectInput label="Length" value={lumberLength} onChange={setLumberLength} options={lumberLengths} />
          <NumberInput label="Quantity" value={lumberQty} onChange={setLumberQty} />
          <NumberInput label="Price Each" value={lumberPrice} onChange={setLumberPrice} />
          <TotalCard label="Lumber Total" value={lumberTotal} />
        </Card>

        <Card title="Stakes Calculator">
          <SelectInput label="Stake Type" value={stakeType} onChange={setStakeType} options={["2x4 Stakes", "1x2 Stakes"]} />
          <SelectInput label="Length (in)" value={stakeLength} onChange={setStakeLength} options={stakeLengths} />
          <NumberInput label="Quantity" value={stakeQty} onChange={setStakeQty} />
          <NumberInput label="Price Each" value={stakePrice} onChange={setStakePrice} />
          <TotalCard label="Stake Total" value={stakeTotal} color="orange" />
        </Card>

        <Card title="Wire Mesh Calculator">
          <SelectInput label="Wire Type" value={wireType} onChange={setWireType} options={["5x150 Roll", "6x150 Roll", "8x20 Sheet"]} />
          <NumberInput label="Quantity" value={wireQty} onChange={setWireQty} />
          <NumberInput label="Price Each" value={wirePrice} onChange={setWirePrice} />
          <TotalCard label="Wire Total" value={wireTotal} color="purple" />
        </Card>

        <Card title="Rebar Calculator">
          <SelectInput label="Rebar Size" value={rebarSize} onChange={setRebarSize} options={["#3", "#4", "#5", "#6"]} />
          <SelectInput label="Length" value={rebarLength} onChange={setRebarLength} options={["10 ft", "20 ft"]} />
          <NumberInput label="Quantity" value={rebarQty} onChange={setRebarQty} />
          <NumberInput label="Price Each" value={rebarPrice} onChange={setRebarPrice} />
          <TotalCard label="Rebar Total" value={rebarTotal} />
        </Card>

        <Card title="Plastic Calculator">
          <NumberInput label="Quantity" value={plasticQty} onChange={setPlasticQty} />
          <NumberInput label="Price Each" value={plasticPrice} onChange={setPlasticPrice} />
          <TotalCard label="Plastic Total" value={plasticTotal} color="blue" />
        </Card>

        <Card title="Additives">
          <NumberInput label="Fiber Mesh Quantity" value={fiberQty} onChange={setFiberQty} />
          <NumberInput label="Fiber Mesh Price" value={fiberPrice} onChange={setFiberPrice} />
          <TotalCard label="Fiber Mesh Total" value={fiberTotal} color="orange" />

          <NumberInput label="Accelerator Quantity" value={acceleratorQty} onChange={setAcceleratorQty} />
          <NumberInput label="Accelerator Price" value={acceleratorPrice} onChange={setAcceleratorPrice} />
          <TotalCard label="Accelerator Total" value={acceleratorTotal} color="purple" />
        </Card>

        <Card title="Equipment Rentals">
          <NumberInput label="Mini Excavator Days" value={miniDays} onChange={setMiniDays} />
          <NumberInput label="Mini Excavator Daily Rate" value={miniRate} onChange={setMiniRate} />
          <TotalCard label="Mini Excavator Total" value={miniTotal} />

          <NumberInput label="Skid Steer Days" value={skidDays} onChange={setSkidDays} />
          <NumberInput label="Skid Steer Daily Rate" value={skidRate} onChange={setSkidRate} />
          <TotalCard label="Skid Steer Total" value={skidTotal} color="purple" />

          <NumberInput label="Pump Truck Days" value={pumpDays} onChange={setPumpDays} />
          <NumberInput label="Pump Truck Daily Rate" value={pumpRate} onChange={setPumpRate} />
          <TotalCard label="Pump Truck Total" value={pumpTotal} color="blue" />
        </Card>

        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-white space-y-6">
          <h2 className="text-3xl font-black">Final Cost Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400">Subtotal</p>
              <p className="text-3xl font-bold">${subtotal.toFixed(2)}</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400">Tax Amount</p>
              <p className="text-3xl font-bold">${taxAmount.toFixed(2)}</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400">Final Cost</p>
              <p className="text-3xl font-bold text-green-400">${finalCost.toFixed(2)}</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-4">
              <NumberInput label="Tax Rate %" value={taxRate} onChange={setTaxRate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
