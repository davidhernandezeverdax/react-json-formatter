import React, { MutableRefObject, useRef, useState } from 'react';
import './style.css';

const handleCopyToClipboard = (textEl: MutableRefObject<Node>) => {
  try {
    const wdsl = window.getSelection().removeAllRanges();
    var range = document.createRange();
    range.selectNode(textEl.current);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
  } catch (e) {
    console.log('Error copy', e);
  }
};

export const App = () => {
  const [input, setInput] = useState('');
  const textEl = useRef(null);
  const [formattedJSON, setFormattedJSON] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInput(event.target.value);
    formatJSON(event.target.value as string);
  };

  const formatJSON = (jsonString: string) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      setFormattedJSON(JSON.stringify(jsonObject, null, 4));
      setError('');
    } catch (err) {
      setFormattedJSON('');
      setError('JSON inválido.');
    }
  };

  return (
    <div className="json-formatter-container">
      <article className="json-formatter-article">
        <label htmlFor="jsonInput" className="label">
          Entrada JSON
        </label>
        <textarea
          id="jsonInput"
          className="json-formatter-textarea"
          placeholder="Pega tu JSON aquí..."
          value={input}
          onChange={handleInputChange}
        ></textarea>
        {error && <div className="json-formatter-error">{error}</div>}
      </article>
      <article className="json-formatter-article">
        <span className="label">JSON Formateado</span>
        <div className="absolute-container">
          <pre className="json-formatter-pre" ref={textEl}>
            {formattedJSON}
          </pre>
          <div className="button-container">
            <button
              onClick={() => {
                handleCopyToClipboard(textEl);
              }}
              className="json-formatter-button"
            >
              Copiar
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
