
export default class Trade {
  constructor(type, createdBy) {
    this.tradeID = Math.random(); 
    this.tradeType = type; // either "Buy or Sell"
    this.createdBy = createdBy; // id of trade creator
    this.activeTrade = true;
    this.tradeItems = []; // push items up for trade 
    
    this.askingPrice = 0;

    this.tradedWith = null;
    this.ItemsBeingOffered = [];
  }

  // Called by trade creator
  AddItemsToTrade(item, id) {
    if(id != this.createdBy || item == null) return; // prevent anyone BUT listing creator from adding.
    this.tradeItems.push(item);
    
    this.askingPrice += (item.value * item.quantity) + 50;
  }

  // Called by trader who is on the opposite end of the trade.
  AddToOfferedItems(items, traderID) {
    if(traderID == this.createdBy) return; // prevent creator from adding

    this.ItemsBeingOffered(items);
  }

  CloseListing() {
    this.activeTrade = false;
  }
} 