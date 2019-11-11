var ComponentAuthButton = Vue.component('auth-button', {
  props: {
    'elementId': String,
    'isSigned': Boolean
  },
  template: `
    <a v-if="isSigned" v-on:click="$emit('disconnect')" href="#" class="btn" >Déconnexion</a>
    <div v-else v-bind:id="elementId"></div>
  `
});
