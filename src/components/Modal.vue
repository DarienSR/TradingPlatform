<template>
  <div id="modal-container" v-if="this.modal.showModal">
    <div class="modal">
      <div>
        <p v-bind:class="[isActive]"> {{ message }} </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function() { // function so independent copies can be made
    return {
      isActive: this.modal.style   
    }
  },

  props: ['message', 'modal', 'modalStyle'],
}
</script>

<style scoped>
.modal {
  position: absolute;
  bottom: 89.5%;
  left: 35%;
  height: 10%;
  min-width: 30%;
  color: black;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  border: 10px solid rgb(12, 189, 174);
  box-shadow: 0px 10px 50px -1px rgba(46, 49, 49, 0.972);
}

.modal p {
  font-size: 2rem;
  width: 100%;;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>