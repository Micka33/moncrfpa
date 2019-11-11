var ComponentFirebaseAuth = Vue.component('firebase-auth', {
  components: {
    'auth-button': ComponentAuthButton
  },
  data: function() {
    return {
      element_id: 'firebaseui-auth-container',
      is_signed: false
    };
  },
  template: `<auth-button v-on:disconnect="on_disconnect" v-bind:isSigned="is_signed" v-bind:elementId="element_id"></auth-button>`,
  created: function() {
    this.initialize_login_button();
    this.register_to_auth_state_changes();
  },
  methods: {
    on_disconnect: function () {
      firebase.auth().signOut().then(() => {
        this.is_signed = false;
      });
    },
    initialize_login_button: function() {
      var uiConfig = {
        signInSuccessUrl: '/dashboard',
        signInOptions: [
          {
             provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
             scopes: [
               'public_profile',
               'email',
             ]
           }
        ],
        // Terms of service url/callback.
        tosUrl: '<your-tos-url>',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
          window.location.assign('<your-privacy-policy-url>');
        }
      };
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#' + this.element_id, uiConfig);
    },
    register_to_auth_state_changes: function() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          this.is_signed = true;
        }
      });
    }
  }
});
