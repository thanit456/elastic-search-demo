import React, { Component, useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-server";
import * as _ from "lodash";

import logo from "./logo.svg";
import "./App.css";

const PRODUCTS = gql`
  {
    products {
      name
    }
  }
`;

function App() {
  return (
    <Query query={PRODUCTS}>
      {({ loading, error, data }) =>
        loading ? (
          <>Loading...</>
        ) : (
          <ul>
            {data.products &&
              _.map(data.products, (item, i) => {
                return (
                  <li key={i}>
                    {_.map(
                      _.keys(item),
                      (key, j) =>
                        key !== "__typename" && <span>{item[key]}</span>
                    )}
                  </li>
                );
              })}
          </ul>
        )
      }
    </Query>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
