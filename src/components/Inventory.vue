<template>
  <div id="inventory">
    <div v-bind:key="slot" v-for="slot in numOfSlots" v-on:click="TradeItem(items[slot-1])">
      <ItemSlot 
        v-bind:item="items[slot-1]"
        v-bind:inventorySlot="true"
      ></ItemSlot>
    </div>
  </div>
</template>

<script>
import ItemSlot from "./ItemSlot";

export default {
  data: function() { // function so independent copies can be made
    return {
      cash: 200,
      numOfSlots: 10, // purchase lower this, and allow user to purchase more inventory slots
    }
  },

  props: ['player', 'name', 'items'],

  methods: {
    TradeItem: function(item) {
      if(item === undefined) return; // return if clicked on empty inventory slot

      this.player.MoveItemFromInventoryToTrade(item);
    }
  },
  components: {
    ItemSlot
  }
}
</script>

<style scoped>
.item-name {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.item-info {
  display: flex;
  justify-content: space-between;
}
</style>