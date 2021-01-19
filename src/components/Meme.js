import React from "react";

const Meme = (props) => {
  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <img src={`https://ipfs.infura.io/ipfs/${props.memeHash}`} />
              <h2>Change Meme</h2>
              <form onSubmit={props.onSubmit}>
                <input type="file" onChange={props.captureFile} />
                <input type="submit" />
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Meme;
