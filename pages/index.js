import React from "react";
import Canvas from "./components/Canvas";

export default function index() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="topnav">
          <ul>
            <li>
              <a href="https://silvia-odwyer.github.io/photon/docs/photon/index.html">
                Docs
              </a>
            </li>
            <li>
              <a href="https://github.com/silvia-odwyer/photon">GitHub</a>
            </li>
          </ul>
        </nav>

        <Canvas />
      </header>
    </div>
  );
}
