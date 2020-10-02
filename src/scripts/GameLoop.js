

const UPDATE_TIME = 10000; // time in ms

export default function GameLoop(gameData) {
  setInterval(function() {
    let bots = gameData.bots;
    let listings = gameData.listings;

    DetermineNewListings(listings, bots);
  }, UPDATE_TIME);
}

function DetermineNewListings(listings, bots) {
  const ListingCap = 2;
  let count = 0;
  // Have all bots determine if they want to put up a listing
  for(let i = 0; i < bots.length; i++) {
    if(Math.random() > 0.96) {
      if(count == ListingCap) return;
      count++;
      // Choose a item at random for the bot to put up for trade.
      let itemIdx = Math.floor(Math.random(0, 1) * bots[i].inventory.length);
      
      listings.push(bots[i].CreateListing("Selling", itemIdx, Math.floor(bots[i].inventory[itemIdx].quantity / 25)));
    }
  }
}

function BotTrade(listings, bots, selectedBot) {
  // check each listing to see if bot wants that item
  listings.forEach(function(trade) {
    // if(trade.tradeItems.includes(selectedBot.favoriteResource)) {
    //   trade.ItemsBeingOffered.push(selectedBot.inventory[0]);

    // } 
    // TO DO: OFFER TRADE IF BOT DOES NOT HAVE WHAT IS BEING OFFERED.
  });
  // make an offer

  // decide offer

  // trade items, or give items back (if offer is declined)
}