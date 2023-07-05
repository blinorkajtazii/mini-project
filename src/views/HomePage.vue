<template>
  <v-container class="main">
    <h1 class="mt-16">You're now Home</h1>
    <h4 class="mt-5">All u can do here is log out</h4>
    <v-btn
      type="submit"
      @click="onSubmit"
      color="#FF003D"
      block
      class="mt-16 text-white"
      >Logout</v-btn
    >
  </v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    onSubmit() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss"></style>
