import { useEffect, useRef, useState } from "react";

export const ManuelCalculate = () => {
  const purchaseRef = useRef<HTMLInputElement>(null);

  const [purchasePrice, setPurchasePrice] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(3.35);
  const [brokerCommission, setBrokerCommission] = useState<number>(1.79);
  const [tax, setTax] = useState<number>(6.5);
  const [notaryCosts, setNotaryCosts] = useState<number>(1.5);
  const [registry, setRegistry] = useState<number>(0.5);
  const [duration, setDuration] = useState<number>(30);
  const [capital, setCapital] = useState<number>();

  useEffect(() => {
    purchaseRef.current?.focus();
  }, []);

  useEffect(() => {
    setCapital(purchasePrice * 0.16);
  }, [purchasePrice]);

  const purchase = capital ? purchasePrice - capital : purchasePrice;

  const loan =
    purchase +
    (purchase * brokerCommission) / 100 +
    (purchase * tax) / 100 +
    (purchase * registry) / 100 +
    (purchase * notaryCosts) / 100;

  const monthly_interestRate = (interestRate / 1200) * loan;

  const result = loan / (duration * 12) + monthly_interestRate;

  return (
    <section>
      <div>
        {" "}
        <label htmlFor="purchasePrice">Kauf Preis</label>
        <input
          type="number"
          id="purchasePrice"
          ref={purchaseRef}
          onChange={(e) => setPurchasePrice(parseInt(e.target.value))}
        />
      </div>

      <div>
        {" "}
        <label htmlFor="interestRate">Sinz</label>
        <input
          type="number"
          id="interestRate"
          className="small"
          defaultValue={interestRate}
          onChange={(e) => setInterestRate(parseInt(e.target.value))}
        />
        <span>%</span>
      </div>

      <div>
        {" "}
        <label htmlFor="capital">Eigenkapital</label>
        <input
          type="number"
          id="capital"
          defaultValue={capital}
          onChange={(e) => setCapital(parseInt(e.target.value))}
        />
      </div>

      <div>
        {" "}
        <label htmlFor="duration">Laufzeit (im Jahr)</label>
        <input
          type="number"
          id="duration"
          className="small"
          defaultValue={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
        />
      </div>

      <div>
        {" "}
        <label htmlFor="brokerCommission">Maklerprovision</label>
        <input
          type="number"
          id="brokerCommission"
          className="small"
          defaultValue={brokerCommission}
          onChange={(e) => setBrokerCommission(parseInt(e.target.value))}
        />
        <span>%</span>
      </div>

      <div>
        {" "}
        <label htmlFor="tax">Grunderwerbsteuer</label>
        <input
          type="number"
          id="tax"
          className="small"
          defaultValue={tax}
          onChange={(e) => setTax(parseInt(e.target.value))}
        />
        <span>%</span>
      </div>

      <div>
        {" "}
        <label htmlFor="notaryCosts">Notar kosten</label>
        <input
          type="number"
          id="notaryCosts"
          className="small"
          defaultValue={notaryCosts}
          onChange={(e) => setNotaryCosts(parseInt(e.target.value))}
        />
        <span>%</span>
      </div>
      <div>
        {" "}
        <label htmlFor="registry">Grundbucheintrag</label>
        <input
          type="number"
          id="registry"
          className="small"
          defaultValue={registry}
          onChange={(e) => setRegistry(parseInt(e.target.value))}
        />
        <span>%</span>
      </div>

      {result > 0 && result < Infinity ? (
        <ul>
          <li>
            Monatliche Annuität :
            <span className="green euro">
              {" "}
              {displayNumber(result.toFixed(2))}
            </span>
          </li>

          <li>
            Monatliche Tilgung :
            <span className="euro">
              {" "}
              {displayNumber((loan / (duration * 12)).toFixed(2))}
            </span>
          </li>

          <li>
            Monatliche Sinz :
            <span className="red euro">
              {" "}
              {displayNumber(monthly_interestRate.toFixed(2))}
            </span>
          </li>
          <hr />
          <li>
            Jährlich Sinz :
            <span className="red euro">
              {" "}
              {displayNumber((monthly_interestRate * 12).toFixed(2))}
            </span>
          </li>

          <li>
            Gesamte Sinzen :
            <span className="red euro">
              {" "}
              {displayNumber((monthly_interestRate * 12 * duration).toFixed(2))}
            </span>
          </li>

          <li>
            Gesamte Kosten :
            <span className="euro"> {displayNumber(loan.toFixed(2))}</span>
          </li>
          <li>
            Gesamte Kauf Preis :
            <span className="euro">
              {" "}
              {displayNumber((result * 12 * duration).toFixed(2))}
            </span>
          </li>
        </ul>
      ) : (
        <h3>Bitte füllen sie alle felder aus </h3>
      )}
    </section>
  );
};

const displayNumber = (num: string | number) => {
  const arr = num.toString().split(".")[0].split("").reverse();
  let str = "";
  for (let i = arr.length - 1; 0 <= i; i--) {
    str += arr[i];
    str += i % 3 === 0 && i !== 0 ? "." : "";
  }

  return str + "," + num.toString().split(".")[1];
};
