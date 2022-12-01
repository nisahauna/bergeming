<template>
    <v-container>
        <v-row no-gutters> 
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <v-img :src="`/${post.image}`"></v-img>
                    <v-card-action class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                <v-btn small outlined color="primary">{{ post.category}}</v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-btn color="success" text :to="{ name: 'edit-post', params: { id: post._id }}">Edit</v-btn>
                                <v-btn color="red" text @click="removePost(post._id)">Delete</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-action>
                    <v-card-subtitle class="headline">
                        <h3>{{ post.title }}</h3>
                    </v-card-subtitle>
                    <v-card-text class="grey--text">
                        <p>{{ post.content }}</p>
                        <!-- <p>{{ post.created }}</p> -->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api';
export default {
    data() {
        return {
        //     dummyPost: [{
        //         _id : "1",
        //         title : "What is the best thing that happened today?",
        //         category : "Happy",
        //         content : "...",
        //         image : "../assets/cover.jpg",
        //     },
        //     {
        //         _id : "2",
        //         title : "What is the best thing that happened today?",
        //         category : "Happy",
        //         content : "...",
        //         image : "../assets/cover.jpg",
        //     },
        //     {
        //         _id : "3",
        //         title : "What is the best thing that happened today?",
        //         category : "Happy",
        //         content : "...",
        //         image : "../assets/cover.jpg",
        //     },
        //     {
        //         _id : "4",
        //         title : "What is the best thing that happened today?",
        //         category : "Happy",
        //         content : "...",
        //         image : "../assets/cover.jpg",
        //     },
        // ],
            post: {},
        };
    },
    async created(){
        const response = await API.getPostByID(this.$route.params.id);
        if(response.length==0){
            this.post=this.dummyPost;
        console.log(1);
        }
        else {
        this.post = response;
            console.log(2);
        }
    },
    methods: {
        async removePost(id) {
           const response = await API.deletePost(id) ;
           this.$router.push({ name: 'home', params: {message: response.message}});
        },
    },
};
</script>