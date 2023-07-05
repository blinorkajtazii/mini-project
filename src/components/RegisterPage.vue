<template>
  <v-container class="main">
    <v-form v-model="formFill">
      <div style="display: flex; align-items: center">
        <router-link to="/login" style="color: black"
          ><v-icon start icon="mdi-arrow-left"></v-icon
        ></router-link>
        <p class="text-h4 font-weight-bold">Register to Stree</p>
      </div>
      <v-text-field
        type="text"
        class="mt-7"
        variant="underlined"
        :rules="[required, rules.textOnly]"
        v-model="form.fullName"
        label="Full Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.email"
        type="email"
        variant="underlined"
        :rules="[required, rules.email]"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.phone"
        type="number"
        variant="underlined"
        :rules="[required, rules.minPhone]"
        label="Mobile Number"
        required
      ></v-text-field>
      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        variant="underlined"
        :rules="[required]"
        v-model="form.firstPassword"
        label="Password"
        required
        @click:append-inner="visible = !visible"
      ></v-text-field>
      <password v-model="form.firstPassword" :strength-meter-only="true" />
      <v-text-field
        :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible1 ? 'text' : 'password'"
        variant="underlined"
        :rules="[required]"
        v-model="form.secondPassword"
        label="Confirm Password"
        required
        @click:append-inner="visible1 = !visible1"
      ></v-text-field>
      <!-- <p style="color: ">Password and confirmation password must match</p> -->
      <v-alert
        v-if="ShowPasswordError"
        color="error"
        text="Confirmation password and password must match"
      ></v-alert>
      <v-btn
        :disabled="!formFill || ShowPasswordError"
        type="submit"
        @click="onSubmit"
        color="#FF003D"
        block
        class="mt-7 text-white"
        >Register</v-btn
      >
    </v-form>
    <div class="text-center mt-5">
      <a
        class="text-caption text-decoration-none text-black"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        By registering u agree to<b style="color: #ff003d">
          Terms & Conditions <br
        /></b>
        and <b style="color: #ff003d"> Privacy Policy</b> of Stree</a
      >
    </div>
  </v-container>
</template>

<script>
import Password from "vue3-password-strength-meter";
import { mapActions } from "vuex";
export default {
  components: { Password },
  data() {
    return {
      form: {
        fullName: null,
        email: null,
        phone: null,
        firstPassword: null,
        secondPassword: null,
      },
      rules: {
        required: (value) => !!value || "Required.",
        textOnly: (value) => {
          const regex = /^[a-zA-Z ]+$/;
          return regex.test(value) || "Only text characters are allowed";
        },
        minPhone: (value) => value.length >= 9 || "Min 9 Numbers",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      formFill: false,
      visible: false,
      visible1: false,
      loading: false,
      ShowPasswordError: false,
    };
  },
  watch: {
    "form.secondPassword": function (value) {
      if (value !== this.form.firstPassword) {
        this.ShowPasswordError = true;
      } else {
        this.ShowPasswordError = false;
      }
    },
  },
  methods: {
    ...mapActions(["setUser"]),
    onSubmit() {
      if (!this.formFill) return;
      const savedUsers = localStorage.getItem("users");
      let users = [];
      if (savedUsers) {
        users = JSON.parse(savedUsers);
      }
      users.push(this.form);
      localStorage.setItem("users", JSON.stringify(users));
      this.$router.push("/login");
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>
<styles lang="scss">
@import "../assets/global.scss";
</styles>
