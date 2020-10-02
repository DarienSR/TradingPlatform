<template>
  <div id="app">
    <div id="trading-platform">
      <div id="info-display">
        <h2>{{gameData.player.name}}</h2> 
        <h2>{{gameData.player.currentTrade}}</h2> 
      </div>

      <div id="components">
        <div id="left">
          <Inventory
            id="inventory"
            v-bind:player="gameData.player" v-bind:items="gameData.player.inventory"
          ></Inventory>
        </div>
        <Trading id="trading" 
          v-bind:listings="gameData.listings" 
          v-bind:player="gameData.player"
          v-bind:modal="gameData.modal"
          v-bind:bots="gameData.bots"
        >
        </Trading>
      </div>
      <Modal 
        v-if="gameData.modal.showModal" 
        v-bind:message="gameData.modal.modalMessage"
        v-bind:modal="gameData.modal">
      </Modal>
    </div>
  </div>
</template>

<script>

// JS Files
import Setup from "./scripts/Setup";
import Trade from "./scripts/Trade";
import GameLoop from "./scripts/GameLoop";

// Vue Components
import Inventory from "./components/Inventory";
import Trading from "./components/Trading";
import Modal from "./components/Modal";


let gameData = Setup();

export default {
  name: 'App',
  
  data: function() { // function so independent copies can be made
    return {
      gameData
    }
  },
  created () {
    GameLoop(this._data.gameData);
  },
  components: {
    Inventory,
    Trading,
    Modal
  },
}
</script>

<style>
body {
  margin: 0;
}

#info-display {
  background-color: rgb(99, 100, 99);
  height: 5vh;
  display: flex;
  color: white;
  padding: 0.1rem;
}

h2 {
  margin: 0;
  padding: 2rem;
  align-self: center;
}

#components {
  display: flex;
}

#components #left {
  padding: 1rem;
  background-color: rgb(68, 44, 44);
  display: flex;
  flex-direction: column;
  width: 100%;
}

#inventory {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  background-color: rgb(216, 210, 200);
  justify-content: center;
  align-items: center;
}

#market {
  background-color: rgb(235, 238, 240);
  height: 50%;
}

#trading {
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 95vh;
}

</style>
