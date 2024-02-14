import { useState } from "react";
import "./index.css";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [numberPeople, setNumberPeople] = useState(1);
  const [activeTipButton, setActiveTipButton] = useState(null);

  const tipAmount = (bill * tip) / 100 / numberPeople;
  const tipTotal = bill / numberPeople + tipAmount;

  function handleClick(value) {
    setTip(value);
    setActiveTipButton(value);
  }

  function handleInputChange() {
    console.log("Input value changed");
    setActiveTipButton(null);
  }

  return (
    <div>
      <h3 className="header-text">SPLITTER</h3>
      <div className="bill-container">
        <Bill
          bill={bill}
          setBill={setBill}
          tip={tip}
          setTip={setTip}
          onClick={handleClick}
          numberPeople={numberPeople}
          setNumberPeople={setNumberPeople}
          activeTipButton={activeTipButton}
          onInputChange={handleInputChange}
        />
        <TotalBill
          bill={bill}
          setBill={setBill}
          tipAmount={tipAmount}
          tipTotal={tipTotal}
        />
      </div>
      <Footer />
    </div>
  );
}

function Bill({
  bill,
  setBill,
  tip,
  setTip,
  numberPeople,
  setNumberPeople,
  onClick,
  activeTipButton,
  onInputChange,
}) {
  return (
    <div className="bill-input-container">
      <p className="bill-header">Bill</p>
      <input
        className="bill-input-box"
        type="text"
        placeholder="$0"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <p className="bill-header">Select Tip %</p>
      <div className="grid-container">
        <button
          className={activeTipButton === 5 ? "active-btn" : ""}
          onClick={() => onClick(5)}
        >
          5%
        </button>
        <button
          className={activeTipButton === 10 ? "active-btn" : ""}
          onClick={() => onClick(10)}
        >
          10%
        </button>
        <button
          className={activeTipButton === 15 ? "active-btn" : ""}
          onClick={() => onClick(15)}
        >
          15%
        </button>
        <button
          className={activeTipButton === 25 ? "active-btn" : ""}
          onClick={() => onClick(25)}
        >
          25%
        </button>
        <button
          className={activeTipButton === 50 ? "active-btn" : ""}
          onClick={() => onClick(50)}
        >
          50%
        </button>
        <input
          type="text"
          placeholder="Custom"
          value={tip}
          onChange={(e) => {
            setTip(Number(e.target.value));
            onInputChange();
          }}
        />
      </div>
      <p className="bill-header">Number of People</p>
      <input
        className="bill-input-box"
        type="text"
        placeholder="1"
        value={numberPeople}
        onChange={(e) => {
          const newValue =
            e.target.value === "" ? null : Number(e.target.value);
          (newValue === null || newValue > 0) && setNumberPeople(newValue);
        }}
      ></input>
      {numberPeople === null && (
        <p className="bill-input-notice">Can't be zero or empty</p>
      )}
    </div>
  );
}

function TotalBill({ tipAmount, tipTotal }) {
  return (
    <div className="total-bill-container">
      <div className="total-bill-area">
        <div className="total-bill-area-flex ">
          <div>
            <p className="total-bill-text">Tip Amount</p>
            <p className="total-bill-text-explain">/ person</p>
          </div>
          <p className="pay-bill-text">{`$${tipAmount}`}</p>
        </div>
        <div className="total-bill-area-flex ">
          <div>
            <p className="total-bill-text">Total</p>
            <p className="total-bill-text-explain">/ person</p>
          </div>
          <p className="pay-bill-text">{`$${tipTotal}`}</p>
        </div>
        <div className="reset-flex">
          <button className="reset-btn">RESET</button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer>
      <p class="copyright">
        Copyright &copy; <span class="current-year">{`${currentYear}`}</span> by
        Mustafa Ceylan, All rights reserved.
      </p>
    </footer>
  );
}
