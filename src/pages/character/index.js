import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../assects/img/logo.png";
import "./index.css";

const Character = (props) => {
  const [charData, setCharData] = useState([]);
  const [status, setStatus] = useState([]);
  const [quote, setQuote] = useState([]);
  const loadData = async (id) => {
    const breakingbad = await axios(
      `https://www.breakingbadapi.com/api/characters/${id}`
    );
    setCharData(breakingbad.data[0]);
    const getstatus = await axios(
      `https://www.breakingbadapi.com/api/death?name=${breakingbad.data[0].name}`
    );
    setStatus(getstatus.data[0]);
    const getquotes = await axios(
      `https://www.breakingbadapi.com/api/quote?author=${breakingbad.data[0].name}`
    );
    setQuote(getquotes.data);
  };

  useEffect(() => {
    const char_id = props.match.params.characterId;
    loadData(char_id);
  }, [props]);

  return (
    <div>
      <div className="App-header">
        <img src={Logo} alt="" width="100" height="100" />
      </div>
      <div className="char-card-container">
        <div className="char-card">
          <img src={charData.img} />
        </div>
        <div className="char-card">
          <div className="card-details">
            <div className="header">{charData.name}</div>
            <div className="char-content">
            <span>D.O.B</span>
              <p>{charData.birthday}</p>
            </div>
            <span>Occupation</span>
            <p>{charData.occupation}</p>
            <span>Status</span>
            {status && <p>Dead</p>}
            {!status && <p>Alive</p>}
            <span>Nickname</span>
            <p>{charData.nickname}</p>
            <span>Portrays</span>
            <p>{charData.portrayed}</p>
            <span>Appearance</span>
            <p>Season {charData.appearance && charData.appearance[0]}</p>
          </div>
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  All Quotes by the {charData.name}
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <ul>
                  <div class="accordion-body">
                    {quote.map((quo, i) => {
                      return <li>{quo.quote}</li>;
                    })}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
