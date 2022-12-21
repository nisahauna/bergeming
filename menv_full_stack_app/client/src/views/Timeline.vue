<template>
    <v-timeline
      align-top
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item
        v-for="n in 6"
        :key="n"
        color="cyan lighten-2"
        medium
      >
        <v-card class="tl-1">
          <v-card-title class="text-h6">
            Lorem Ipsum Dolor
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</p>
            <v-btn
              color="cyan lighten-2"
              class="mx-0"
              outlined
              to = "/"
            >
              Read More
            </v-btn>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </template>

<script>
import API from "../api.js";
export default {
  name: "Timeline",
  data: () => ({
    posts: [],
  }),
  async created() {
    this.posts = await API.getPosts();
  },
};
</script>
