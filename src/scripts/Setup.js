import { Bot, Trader } from "./Trader";
import { Potato, Pig, Carrot, Cash } from "./Resource";

export default function Setup() {
  // Create Player and Bots.
  let player = new Trader("Darien");
  // Starting Values
  player.AddItemToInventory(new Carrot(Math.floor(Math.random() * 500)));
  player.AddItemToInventory(new Cash());
  
  const bots = [];
  const RESOURCES = [Carrot, Potato, Pig]; // Cash is also a resource, but given to trader on instantiation
  let listings = [];
  
  // Initial setup of bots.
  for(let i = 0; i < 10; i++) {
    let bot = new Bot();
    let quantity = Math.floor(Math.random() * 500);
    bot.AddItemToInventory(new RESOURCES[Math.floor(Math.random() * 3)](quantity));
    bots.push(bot);
  }
  
  
  let modal = { 
    showModal: false, modalMessage: "", style: "success",
    toggleModal: function() {
      this.showModal = !this.showModal;
      // shows message for x seconds, than leaves the screen
      window.setTimeout(() => {
        this.showModal = !this.showModal;
      }, 3000)
    },
    updateModalText: function(text, styling = 'success') {  
      this.style = styling;
      this.modalMessage = text;
    }
  };

  let gameData = { player, listings, bots, modal }

  return gameData;
}
