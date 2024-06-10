import { useEffect, useState } from "react";

type inputType = "mainCost" | "hasProvision";

export const FamilyCalculate = () => {
  const [input, setInput] = useState({
    mainCost: undefined,
    provision: true,
    summery: 0,
    nrwBank: 189000,
    nrwYears: 30,
    nrwBankInterest: 1,
    remainingCost: 0,
    remainingInterest: 4,
    remainingYears: 30,
  });

  useEffect(() => {
    let sideCost = input.provision ? 0.12 : 0.085;
    typeof input.mainCost == "number" &&
      input.mainCost > 0 &&
      setInput((a) => {
        return {
          ...a,
          summery: a.mainCost! + a.mainCost! * sideCost,
          remainingCost: a.summery - a.nrwBank,
        };
      });
  }, [input.mainCost, input.provision, input.nrwBank]);

  useEffect(() => {
    setInput((a) => {
      return {
        ...a,
        remainingCost: a.summery - a.nrwBank,
      };
    });
  }, [input.summery]);

  const updateInput = (name: inputType, value: any) => {
    setInput((a) => {
      return { ...a, [name]: value };
    });
  };

  console.log(input);

  return (
    <>
      <input
        type="number"
        name="mainCost"
        defaultValue={input.mainCost}
        onChange={(e) =>
          updateInput(e.target.name as inputType, parseInt(e.target.value))
        }
      />
      {typeof input.mainCost == "number" && input.mainCost > 0 && (
        <ul>
          <li>
            <input
              id="tax"
              name="tax"
              defaultChecked
              disabled
              type="checkbox"
            />{" "}
            <label htmlFor="tax">
              <b>
                <i>8.5%</i>
              </b>{" "}
              Grunderwerbsteuer. Notarkosten. Grundbucheintrag{" "}
              {` : ${Math.round(input.mainCost * 0.085)}€`}
            </label>
          </li>
          <li>
            <input
              id="provision"
              name="provision"
              defaultChecked={input.provision}
              type="checkbox"
              onChange={(e) =>
                updateInput(e.target.name as inputType, e.target.checked)
              }
            />{" "}
            <label htmlFor="provision">
              <b>
                <i>3.57%</i>
              </b>{" "}
              Maklerprovision{" "}
              {input.provision && ` : ${Math.round(input.mainCost * 0.035)}€`}
            </label>
          </li>
          <li>
            Gesamte Summe : {<span className="euro red">{input.summery}</span>}
          </li>
          <hr />
          <li>
            <b>
              <input
                className="mediumInput"
                type="number"
                defaultValue={input.nrwBank}
                name="nrwBank"
                onChange={(e) =>
                  updateInput(
                    e.target.name as inputType,
                    parseInt(e.target.value)
                  )
                }
              />
            </b>{" "}
            Kredit von NRW.Bank in{" "}
            <input
              className="smallInput"
              type="number"
              defaultValue={input.nrwYears}
              name="nrwYears"
              onChange={(e) =>
                updateInput(
                  e.target.name as inputType,
                  parseInt(e.target.value)
                )
              }
            />{" "}
            Jahre{" "}
            <span
              className="info"
              title="Familien mit 2 kinder können ein kredit in höhe von 189K mit 1% effect zins
          für 30 Jahre "
            ></span>
            <br />
            =&gt;{" "}
            <input
              className="smallInput"
              defaultValue={input.nrwBankInterest}
              type="number"
              name="nrwBankInterest"
              onChange={(e) =>
                updateInput(
                  e.target.name as inputType,
                  parseFloat(e.target.value)
                )
              }
            />{" "}
            {Math.round((input.nrwBank / 100 / 12) * input.nrwBankInterest)}€
            Zins + {Math.round(input.nrwBank / input.nrwYears / 12)}€ Til. ={" "}
            <b>
              {Math.round(
                input.nrwBank / 100 / 12 + input.nrwBank / input.nrwYears / 12
              )}
              €
            </b>{" "}
            /Monatlich
          </li>
          {input.nrwBank < input.summery && (
            <li>
              rest Zahl {<b>{input.remainingCost}</b>}€ in{" "}
              <input
                className="smallInput"
                type="number"
                defaultValue={input.remainingYears}
                name="remainingYears"
                onChange={(e) =>
                  updateInput(
                    e.target.name as inputType,
                    parseFloat(e.target.value)
                  )
                }
              />
              Jahre <br />
              =&gt;{" "}
              <input
                className="smallInput"
                type="number"
                defaultValue={input.remainingInterest}
                name="remainingInterest"
                onChange={(e) =>
                  updateInput(
                    e.target.name as inputType,
                    parseFloat(e.target.value)
                  )
                }
              />
              % zins{" "}
              {Math.round(
                (input.remainingInterest * input.remainingCost) / 1200
              )}
              € + {Math.round(input.remainingCost / 12 / input.remainingYears)}€
              Til. ={" "}
              <b>
                {Math.round(
                  (input.remainingInterest * input.remainingCost) / 1200 +
                    input.remainingCost / 12 / input.remainingYears
                )}
                €
              </b>{" "}
              /Monatlich
            </li>
          )}
          <h3 className="green">
            {Math.round(
              (input.nrwBank / 100 / 12) * input.nrwBankInterest +
                input.nrwBank / input.nrwYears / 12 +
                ((input.remainingInterest * input.remainingCost) / 1200 +
                  input.remainingCost / 12 / input.remainingYears)
            )}
            € / Monatlich
          </h3>
        </ul>
      )}
    </>
  );
};
