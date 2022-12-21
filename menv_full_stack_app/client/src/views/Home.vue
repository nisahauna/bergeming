<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="date1" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="date1" :events="arrayEvents" event-color="green lighten-1" @click:date="clickDate(date1)"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="8">
        <div class="text-right">
          <v-btn to="/AddJournal" class="my-2" fab dark color="cyan">
            <v-icon light> mdi-pencil </v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible v-if="this.$route.params.message">
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
  methods: {
    calendarToDateCode(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month - 1}${day}${year}`;
    },
    templating(posts) {
      if (posts.length < 3) {
        if (posts.length == 2) {
          posts.push(this.templateDatas[2]);
        } else if (posts.length == 1) {
          posts.push(this.templateDatas[2], this.templateDatas[1]);
        } else if (posts.length == 0) {
          posts.push(this.templateDatas[2], this.templateDatas[1], this.templateDatas[0]);
        }
      }
    },
    async clickDate(date1) {
      console.log(date1);
      this.posts = await API.getPostByDate(this.calendarToDateCode(this.date1));
      this.templating(this.posts);
      console.log(this.posts);
    },
    async clickTemplate(templateId) {},
  },
  data() {
    return {
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
      templateDatas: [
        {
          _id: "1",
          title: "What makes you feel more hapier?",
          category: "General",
          content: "...",
          image: "../cover.jpg",
          dateCode: "",
          createdAt: "",
          updatedAt: "",
          __v: 0,
        },
        {
          _id: "2",
          title: "Three things I am grateful for today",
          category: "Happy",
          content: "...",
          image: "../cover.jpg",
          dateCode: "",
          createdAt: "",
          updatedAt: "",
          __v: 0,
        },
        {
          _id: "3",
          title: "How was my relationship with my friend today?",
          category: "General",
          content: "...",
          image: "../cover.jpg",
          dateCode: "",
          createdAt: "",
          updatedAt: "",
          __v: 0,
        },
      ],
    };
  },
  async created() {
    // console.log(this.calendarToDateCode(this.date1));
    this.posts = await API.getPostByDate(this.calendarToDateCode(this.date1));
    if (this.posts.length < 3) {
      if (this.posts.length == 2) {
        this.posts.push(this.templateDatas[2]);
      } else if (this.posts.length == 1) {
        this.posts.push(this.templateDatas[2], this.templateDatas[1]);
      } else if (this.posts.length == 0) {
        this.posts.push(this.templateDatas[2], this.templateDatas[1], this.templateDatas[0]);
      }
    }
    console.log(this.date1);
    console.log(this.posts);
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
