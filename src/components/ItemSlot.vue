<template>
  <div v-if="inventorySlot">
    <div v-if="item" class="inventory-slot">
      <p class="item-name">{{item.resourceName}}</p>

      <p class="item-quantity">Quantity: {{item.quantity}}</p>
      <p class="item-value">Item Value: {{item.value}}</p>

      <p class="items-total-value">Total Value: $ {{Math.round((item.quantity * item.value) * 100) / 100}}</p>
    </div>

    <div v-else class="inventory-slot-disabled">
      
    </div>
  </div>

  <div v-else>
    <div v-if="item" class="inventory-slot">
      <p>{{ item.quantity }} {{ item.resource }}</p>
    </div>

    <div v-else class="inventory-slot-disabled">
      
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'inventorySlot'],
}
</script>

<style scoped>
.inventory-slot, .inventory-slot-disabled {
  background-color: rgb(255, 255, 255);
  height: 10rem;
  width: 10rem;
  margin: 1rem;
  padding: 0.5rem;
}

.inventory-slot-disabled {
  background-color: rgba(255, 255, 255, 0.452);
}
</style>