<template>
  <div id="trading">
    <div id="tabs">
      <p v-on:click="ToggleTab(true)"  v-bind:class="{ 'active-tab': showListings }">Listings</p>
      <p v-if="activeTrade" v-on:click="ToggleTab(false)" v-bind:class="{ 'active-tab': !showListings }">Active Trade</p>
    </div>

    <div v-if="showListings">
      <div class="trade-container" v-bind:key="trade.tradeID" v-for="trade in listings">
        <h3>Trade ID: {{trade.trade}}</h3>
        <h3>{{trade.tradeType}}:</h3>

        <div v-bind:key="resource" v-for="resource in trade.tradeItems"> 
          <p>{{resource.quantity}} {{resource.resourceName}}(s)</p>
        </div>

        <button v-on:click="SetActiveTrade(true, trade)">Make Offer</button>
      </div>
      <button v-on:click="CreateListing">Create Listing</button>
    </div>
      
    <div id="active-trade" v-else>
      <div class="inventory" id="player-trading-section">
        <p> {{this.player.name}}'s Inventory</p>  

        <div class="trading-slot" v-bind:key="resource.resourceName" v-for="resource in currentTrade.ItemsBeingOffered">
          <p> {{resource.quantity}} {{resource.resourceName}} </p>
        </div>
      </div>

      <div class="inventory" id="bot-trading-section">
        <p> {{currentTrade.createdBy}}'s Inventory</p>
        <p> Asking For: ${{currentTrade.askingPrice}} </p>

        <div class="trading-slot" v-bind:key="resource.resourceName" v-for="resource in currentTrade.tradeItems">
          <p> {{resource.quantity}} {{resource.resourceName}} </p>
        </div>
      </div>

      <div id="trade-buttons">
        <button v-on:click="MakeOffer()">Make Offer</button>
        <button v-on:click="CancelTrade">Cancel</button>
      </div>
    </div>
  </div>
</template>


<script>
import Trade from "../scripts/Trade";
let DefaultTrade = new Trade();

export default {
  data: function() {
    return {
      showListings: true,
      activeTrade: false,
      currentTrade: DefaultTrade,
      offeringValue: 0
    }
  },

  props: ['player', 'bots', 'listings', 'modal'],

  methods: {
    SetActiveTrade: function(bool, trade) {
      this.activeTrade = bool;
      this.player.currentTrade = this.currentTrade = trade;
    },

    ToggleTab: function(e) {
      if(this.showListings === e) return;
      this.showListings = !this.showListings;
    },

    CreateListing: function (e) {
      let newListing = this.player.CreateListing();
      console.log("In trading", newListing)
      if(newListing === false) {
        this.modal.updateModalText(error);
        this.modal.toggleModal();
      } else {
        console.log(newListing);
        this.listings.push(newListing);
      }
    },

    // TO DO turn the for loops of returning/exchanging items into one reusable function.
    MakeOffer: function() {
      let total = 0;
      let player = this.player;
      let bots = this.bots;
      let currentTrade = this.currentTrade;
      let listings = this.listings;

      currentTrade.ItemsBeingOffered.forEach(val => total += val.quantity * val.value); // this can be used to calculate whether the bot agrees, (perhaps within x% profit.)
   
      for(let i = 0; i < bots.length; i++) {
        // get the bot who initiated/engaged the trade.

        if(currentTrade.createdBy === bots[i].id) {
          // calculate whether the bot wants to accept trade offering
    
          let acceptedTrade = bots[i].CalculateTradeAcceptance();


          if(acceptedTrade) {

            // Give items from trade to player
            currentTrade.tradeItems.forEach(function(item) {
              for(let j = 0; j < player.inventory.length; j++) {
                if(player.inventory[j] === undefined) break;
                if(player.inventory[j].resourceType === item.resourceType) {
                  player.inventory[j].quantity += item.quantity;
                  return;
                }
              }
              // player does not already have resource.
              player.inventory.push(item)
            });

            // give items from trade to bot
            currentTrade.ItemsBeingOffered.forEach(function(item) {
              for(let j = 0; j < bots[i].inventory.length; j++) {
                if(bots[i].inventory[j] === undefined) break;
      
                if(bots[i].inventory[j].resourceType === item.resourceType) {
                  bots[i].inventory[j].quantity += item.quantity;
                  return;
                }
              }
              // player does not already have resource.
              bots[i].inventory.push(item)
            });
  
            RemoveTradeFromBotsPersonalListings(currentTrade, i, bots);
            RemoveTradeGlobally(currentTrade, listings);
            
            // reset trade 
            this.CancelTrade();
            this.modal.updateModalText("Trade Successful.");
            this.modal.toggleModal();
          } else {
            // bot does not accept your offer...
            
            // give items back to the player
            currentTrade.ItemsBeingOffered.forEach(function(item, i) {
              for(let j = 0; j < player.inventory.length; j++) {
                if(player.inventory[j] === undefined) break;
                if(player.inventory[j].resourceType === item.resourceType) {
                  player.inventory[j].quantity += item.quantity;
                  currentTrade.ItemsBeingOffered.shift(); // TO DO: MAKE SURE THIS IS REMOVING THE CORRECT ITEM.
                  return;
                }
              }
              // player does not already have resource.
              player.inventory.push(item)
            });
            this.CancelTrade();
            this.modal.updateModalText("Failed to come to a trade agreement.", "error");
            this.modal.toggleModal();
          }
        }
      }
    },

    CancelTrade: function () {
      this.player.currentTrade = null;
      this.currentTrade = Trade;
      this.activeTrade = false;
      this.showListings = true;
    }
  }
}

// Helper functions
function RemoveTradeFromBotsPersonalListings(currentTrade, i, bots) {
  // take trade off bots listed trades
  for(let j = 0; j < bots[i].listedTrades.length - 1; j++) {
    if(currentTrade.tradeID === bots[i].listedTrades[j].tradeID) {
      bots[i].listedTrades.splice(j, 1);
      break
    }
  }
}

// take trade off global market
function RemoveTradeGlobally(currentTrade, listings) {
  for(let j = 0; j < listings.length; j++) {
    if(currentTrade.tradeID === listings[j].tradeID) {
      listings.splice(j, 1);
      break;
    }
  }
}
</script>

<style scoped>
#trading {
  width: 50%;
}

#tabs {
  display: flex;
  border-bottom: 5px solid black;
}

#tabs p {
  width: 50%;
  text-align: center;
  margin: 0;
  font-size: 2rem;
}

.active-tab {
  background-color: rgb(0, 255, 136);
}

/* Listings Tab */
.trade-container {
  background-color: rgb(34, 30, 30);
  margin: 1rem;
  color: white;
  padding: 1rem;
}

/* Active Trade Tab */
#active-trade {
  background-color: rgb(253, 253, 253);
  height: 100%;
  padding: 1rem;
  color: white;
  font-size: 1.5rem;
}

#active-trade .inventory {
  background-color: rgb(26, 24, 24);
  padding: 1rem;
  height: 40%;
  margin: 1rem;
}

#bot-trading-section .trading-slot, #player-trading-section .trading-slot {
  color: black;
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.87);
  width: 30%;
  height: 20%;
  margin: 0.5rem;
}

#trade-buttons {
  display: flex;
  width: 95%;
  margin: 0 auto;
}

#trade-buttons button {
  background-color: white;
  width: 50%;
  font-size: 2rem;
  height: 4rem;
  background-color: rgb(16, 195, 16);
}

#trade-buttons button:last-child {
  background-color: rgb(231, 0, 0);
}
</style>