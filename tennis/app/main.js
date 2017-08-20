import "babel-polyfill"
import { Router, navigateTo } from "sailboat";
import React from "react";
import { render } from "react-dom";

const Game = props =>
  <div>
    <h1>Nadal vs Federer (2008)</h1>
    {React.Children.count(props.children)
      ? props.children
      : <div>The match scores will be in the /game/scores url.</div>}
  </div>;

const Scores = props =>
  <div>
    <p>
      Score: {props.score.split(",").map(s => <span className="set">{s.trim()}</span>)}
    </p>
    {props.ended ? <p>This game has ended.</p> : undefined}
  </div>;

function sleep(ms) {
  return new Promise(res => {
    setTimeout(res, ms);
  });
}

function onStart() {
  const app = {
    game: [
      Game,
      {},
      {
        async *scores() {
          yield <Scores score="6–4" />;
          await sleep(1000);
          yield <Scores score="6–4, 6–4" />;
          await sleep(1000);
          yield <Scores score="6–4, 6–4, 6–7(5–7)" />;
          await sleep(1000);
          yield <Scores score="6–4, 6–4, 6–7(5–7), 6–7(8–10)" />;
          await sleep(1000);
          return (
            <Scores ended={true} score="6–4, 6–4, 6–7(5–7), 6–7(8–10), 9–7" />
          );
        }
      }
    ]
  };
  render(Router(app), document.getElementById("container"));
  navigateTo("/game.scores");
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("loading...");
  onStart();
});
