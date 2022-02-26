/* eslint-disable no-undef */
import React from "react";
import "./styles/App.css";

const datosCalculadora = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: "7" },
  { id: "eight", value: "8" },
  { id: "nine", value: "9" },
  { id: "subtract", value: "-" },
  { id: "four", value: "4" },
  { id: "five", value: "5" },
  { id: "six", value: "6" },
  { id: "add", value: "+" },
  { id: "one", value: "1" },
  { id: "two", value: "2" },
  { id: "three", value: "3" },
  { id: "equals", value: "=" },
  { id: "zero", value: "0" },
  { id: "decimal", value: "." },
];

const operadores = ["AC", "/", "*", "+", "-", "="];

const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {datosCalculadora.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const App = () => {
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [calcularDatos, setCalcularDatos] = React.useState("");

  const handleSubmit = () => {
    console.log({ calcularDatos });

    // eslint-disable-next-line no-eval
    const total = eval(calcularDatos);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalcularDatos(`${total}`);
  };
  const handleClear = () => {
    setInput("0");
    setCalcularDatos("");
  };

  const handleNumbers = (value) => {
    if (!calcularDatos.length) {
      setInput(`${value}`);
      setCalcularDatos(`${value}`);
    } else {
      if (value === 0 && (calcularDatos === "0" || input === "0")) {
        setCalcularDatos(`${calcularDatos}`);
      } else {
        const lastChat = calcularDatos.charAt(calcularDatos.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operadores.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalcularDatos(`${calcularDatos}${value}`);
      }
    }
  };
  const dotOperator = () => {
    const lastChat = calcularDatos.charAt(calcularDatos.length - 1);
    if (!calcularDatos.length) {
      setInput("0.");
      setCalcularDatos("0.");
    } else {
      if (lastChat === "*" || operadores.includes(lastChat)) {
        setInput("0.");
        setCalcularDatos(`${calcularDatos} 0.`);
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formatValue =
          lastChat === "." || input.includes(".")
            ? `${calcularDatos}`
            : `${calcularDatos}.`;
        setCalcularDatos(formatValue);
      }
    }
  };
  const handleOperators = (value) => {
    if (!calcularDatos.length) {
      setInput(`${value}`);
      console.log({ calcularDatos });
      const beforeLastChat = calcularDatos.charAt(calcularDatos.length - 2);

      const beforeLastChatIsOperator =
        operadores.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calcularDatos.charAt(calcularDatos.length - 1);

      const lastChatIsOperator =
        operadores.includes(lastChat) || lastChat === "*";

      const validOp = value === "x" ? "*" : value;

      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const cargarValue = `${calcularDatos.substring(
            0,
            calcularDatos.length - 2
          )}${value}`;
          setCalcularDatos(cargarValue);
        } else {
          setCalcularDatos(
            `${calcularDatos.substring(0, calcularDatos.length - 1)}${validOp}`
          );
        }
      } else {
        setCalcularDatos(`${calcularDatos}${validOp}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = numeros.find((num) => num === value);
    const operator = operadores.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(calcularDatos);
  };

  React.useEffect(() => {
    handleOutput();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcularDatos]);

  return (
    <div className="container">
      <div className="calculadora">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
};


export default App;
