<template>
  <h1>Posts</h1>

  <!-- 编辑模式 -->
  <div v-if="editPost">
    <h3>Edit</h3>
    <post-form v-model:post="editPost"></post-form>
    <v-btn-group>
      <v-btn @click="exitEdit">BACK TO NEW</v-btn>
      <v-btn @click="saveEdit">SAVE</v-btn>
    </v-btn-group>
  </div>
  <!-- 创建模式 -->
  <div v-else>
    <h3>New</h3>
    <post-form v-model:post="newPost"></post-form>
    <v-btn-group>
      <v-btn @click="doSaveNewPost">CREATE</v-btn>
    </v-btn-group>
  </div>

  <posts-list
    :posts="posts"
    @delete-post="doDeletePost"
    @edit-post="setEditPost"
  ></posts-list>
</template>

<script>
import PostsList from "./components/PostsList.vue"
import PostForm from "./components/PostForm.vue"
import postsApi from "./api/posts.js"

export default {
  name: "App",
  components: {
    PostsList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      newPost: this.defaultNewPost(),
      editPost: null,
    }
  },
  methods: {
    async fetchPosts() {
      this.posts = await postsApi.all()
    },
    defaultNewPost() {
      return {
        title: "",
        content: "",
      }
    },
    setEditPost(post) {
      this.editPost = post
    },
    exitEdit() {
      this.editPost = null
      this.newPost = this.defaultNewPost()
    },
    async saveEdit() {
      if (!this.editPost) return
      await postsApi.update(this.editPost.id, this.editPost)
      await this.fetchPosts()
    },
    async doSaveNewPost() {
      await postsApi.create(this.newPost)
      await this.fetchPosts()
      this.newPost = this.defaultNewPost()
    },
    async doDeletePost(post) {
      await postsApi.delete(post.id)
      await this.fetchPosts()
    },
  },
  async mounted() {
    await this.fetchPosts()
  },
}
</script>

<style scoped></style>
