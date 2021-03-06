import React from "react";
import "./Meme.scss";

const Meme = (props) => {
  return (
    <div>
      <div className="container">
        {props.memeHash && (
          <img
            src={`https://ipfs.infura.io/ipfs/${props.memeHash}`}
            alt="memeHash"
            className="img"
          />
        )}
        <h2>Change Meme</h2>
        <input type="file" onChange={props.captureFile} />
        <div>
          <button className="button" onClick={props.onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meme;
