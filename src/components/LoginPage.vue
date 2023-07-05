<template>
  <v-container class="main">
    <v-form v-model="form">
      <v-img cover src="../assets/StreeLogo.svg"></v-img>
      <v-text-field
        v-model="email"
        type="email"
        variant="underlined"
        :rules="[required]"
        label="Email ID"
        required
      ></v-text-field>
      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        variant="underlined"
        :rules="[required]"
        v-model="password"
        label="Password"
        required
        @click:append-inner="visible = !visible"
      ></v-text-field>
      <div class="text-end mt-0">
        <a
          style="color: #ff003d"
          class="text-caption text-decoration-none font-weight-bold"
          href="#"
          target="_blank"
        >
          Forgot password?</a
        >
      </div>
      <v-btn
        :disabled="!form"
        type="submit"
        @click="onSubmit"
        color="#FF003D"
        block
        class="mt-7 text-white"
        >Submit</v-btn
      >
    </v-form>
    <div class="text-center mt-5">
      <p
        class="text-caption text-decoration-none text-black"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Don't have an account?<b
          ><router-link
            style="color: #ff003d; text-decoration: none"
            to="/register"
          >
            Register Now</router-link
          ></b
        >
      </p>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: false,
      visible: false,
      loading: false,
      email: null,
      password: null,
    };
  },
  computed: {
    ...mapGetters(["getIsRegisterd"]),
  },
  methods: {
    onSubmit() {
      if (!this.form) return;
      this.loading = true;
      const savedUsers = localStorage.getItem("users");
      if (savedUsers) {
        const users = JSON.parse(savedUsers);
        const user = users.find(
          (u) => u.email === this.email && u.firstPassword === this.password
        );

        if (user) {
          this.$router.push("/");
        } else {
          alert("Invalid email or password");
        }
      } else {
        alert("No users have been registered yet");
      }

      setTimeout(() => (this.loading = false), 2000);
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>
<styles scoped lang="scss">
@import "../assets/global.scss";
</styles>
