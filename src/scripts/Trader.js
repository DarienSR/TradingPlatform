import Trade from "./Trade";

class Trader {
  constructor(name = "") {
    this.name = name;
    this.id = Math.random(); // replace with uuid
    this.currentTrade = null;
    this.inventory = []; // holds all the resources of the player.
    this.listedTrades = [];
    this.pastTrades = [];
  }

  // item is of type resource
  AddItemToInventory(item) {
    // TO DO: Add Stacking of same typed items / quality
    for(let i = 0; i < this.inventory.length; i++) {
      if(this.inventory[i].resourceType === item.resourceType) {
        this.inventory[i].quantity += item.quantity;
        return;
      }
    }
    this.inventory.push(item);
  }

  NewTrade(type, idxOfItemToBeAdded, quantity) {
    if(this.inventory[idxOfItemToBeAdded].quantity - quantity < 0) return;
    else this.inventory[idxOfItemToBeAdded].quantity -= quantity;
    
    let trade = new Trade(type, this.id);
    // TO DO: take itemsToBeAdded out of inventory
    let item = new this.inventory[idxOfItemToBeAdded].resourceType(quantity);
    
    trade.AddItemsToTrade(item, this.id);
    this.listedTrades.push(trade);
    return trade;
  }

  MoveItemFromInventoryToTrade(item) {
    if(this.currentTrade === null) return; // if there is no active trade, return.
    let quantity = parseInt(prompt()); // TO DO: maybe implement a pop up form to get the quantity??
    if(item.quantity - quantity >= 0) {
      item.quantity -= quantity;

      let offer = new item.resourceType();
      offer.SetQuantity(quantity);

      this.currentTrade.ItemsBeingOffered.push(offer);
    } else {
      // we are trying to trade a quantity we do not have
      return;
    }
  }

  CreateListing() {
    let type = prompt("Buying or Selling?");
    let index = (parseInt(prompt("Index of Inventory Slot"))) - 1;
    let quantity = parseInt(prompt("Quantity"));

    let error = "";
    
    // index is now < 0 (instead of <= 0) because we are dealing with the array directly, instead of the inventory slot
    if(index < 0 || index > this.inventory.length) error += "Invalid Inventory Slot. " ; // trader has entered an inventory slot that does not exist.
    if(quantity <= 0) error += "Invalid Quantity"; // trader has attempted to make a trade with negative or 0 items.

    if(error.length > 0) {
      return error;
    } else {
      return this.NewTrade(type, index, quantity);
    }
  }
}

class Bot extends Trader {
  constructor(favoriteResource = "Iron") {
    super(); // inherit trader variables and methods.
    this.favoriteResource = favoriteResource; 
    [this.negotiationRange, this.greed] = this.DefineBotPersonality(); // determines range in which bot will accept less than asking price for trade.
  }

  CalculateTradeAcceptance(offeringPrice) {
    return Math.random() > 0.5 ? false : true;
  }

  DefineBotPersonality() {
    // generates random numbers to determine bots risk levels, greed, etc. All values are from 0-1.
    let negotiationRange = 2; 
    let greed = 3; // value from 0-1
    return [negotiationRange, greed];
  }

  NewTrade(type, idxOfItemToBeAdded, quantity) {
    let trade = new Trade(type, this.id);
    // TO DO: take itemsToBeAdded out of inventory
    let item = new this.inventory[idxOfItemToBeAdded].resourceType(quantity);
    
    trade.AddItemsToTrade(item, this.id);
    this.listedTrades.push(trade);
    return trade;
  }

  CreateListing(type, itemIdx, quantity) {
    return this.NewTrade(type, itemIdx, quantity);
  }
}

export { Trader, Bot };