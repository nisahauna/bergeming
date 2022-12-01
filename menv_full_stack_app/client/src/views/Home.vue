<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
          min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="date1" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date1" :events="arrayEvents" event-color="green lighten-1"
            @change="clickDate(date1)"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="8">
        <div class="text-right">
          <v-btn to="/AddJournal" class="my-2" fab dark color="cyan">
            <v-icon light>
              mdi-pencil
            </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>


    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
      v-if="this.$route.params.message">
      {{ this.$route.params.message }}
    </v-alert>

    <v-row no-gutters>
      <v-col sm="4" class="pa-3" v-for="post in posts" :key="post._id">
        <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
          <v-img height="250" :src="`/${post.image}`"></v-img>
          <v-btn class="ml-4 mt-3" small outlined color="indigo">
            {{ post.category }}
          </v-btn>
          <v-card-title class="headline">
            {{ post.title }}
          </v-card-title>
          <v-card-text class="py-0">
            <p>{{ post.content.substring(0, 100) + "..." }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
export default {
  name: "Home",
  data() {
    return {
      dummyPost: [{
        _id: "1",
        title: "What makes you feel more hapier?",
        category: "General",
        content: "...",
        image: "../cover.jpg",
      },
      {
        _id: "2",
        title: "Three things I am grateful for today",
        category: "Happy",
        content: "...",
        image: "../cover.jpg",
      },
      {
        _id: "3",
        title: "How was my relationship with my friend today?",
        category: "General",
        content: "...",
        image: "../cover.jpg",
      },
      ],
      //date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu2: false,
      arrayEvents: null,
      date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),

      mounted() {
        this.arrayEvents = [...Array(6)].map(() => {
          const day = Math.floor(Math.random() * 30);
          const d = new Date();
          d.setDate(day);
          return d.toISOString().substr(0, 10);
        });
      },
      posts: [],
    };
  },
  methods: {
    calendarToDateCode(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      // if (day <= 9) {
      //   day = `0${day}`;
      // }
      return `${month - 1}${day}${year}`;
    },
    async clickDate(date1) {
      const response = await API.getPostByDate(this.calendarToDateCode(this.date1));
      // console.log(response);
      if (response.length == 0) {
        this.posts = this.dummyPost;
        // console.log(1);
      }
      else {
        this.posts = response;
        // console.log(2);
      }
    },
  },
  async created() {
    // console.log(this.calendarToDateCode(this.date1));
    const response = await API.getPostByDate(this.calendarToDateCode(this.date1));
    console.log(response);
    if (response.length == 0) {
      this.posts = this.dummyPost;
      console.log(1);
    }
    else {
      this.posts = response;
      console.log(2);
    }
    // console.log(this.date1);
    // console.log(this.posts);
    // if ( response.length !== 0) {
    //   this.post = response;
    // console.log(response);}
    // else {
    // this.post = []
    // }
    // console.log(this.posts);
  },
};
</script>
