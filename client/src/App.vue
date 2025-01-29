<template>
  <v-container>
    <v-row>
      <h1>Posts</h1>
    </v-row>

    <!-- 编辑模式 -->
    <v-container v-if="editPost">
      <v-row>
        <h3>Edit</h3>
      </v-row>
      <post-form v-model:post="editPost"></post-form>
      <v-btn-group>
        <v-btn @click="exitEdit">BACK TO NEW</v-btn>
        <v-btn @click="saveEdit">SAVE</v-btn>
      </v-btn-group>
    </v-container>
    <!-- 创建模式 -->
    <v-container v-else>
      <v-row>
        <h3>New</h3>
      </v-row>
      <post-form v-model:post="newPost"></post-form>
      <v-btn-group>
        <v-btn @click="doSaveNewPost">CREATE</v-btn>
      </v-btn-group>
    </v-container>

    <posts-list
      :posts="posts"
      @delete-post="doDeletePost"
      @edit-post="setEditPost"
    ></posts-list>
  </v-container>
</template>

<script>
import PostsList from "./components/PostsList.vue"
import PostForm from "./components/PostForm.vue"
import postsApi from "./api/posts.js"

export default {
  name: "App",
  components: { PostsList, PostForm },
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
      return { title: "", content: "" }
    },
    setEditPost(post) {
      // We copy it so that we don't modify the original one in the list
      this.editPost = { ...post }
    },
    exitEdit() {
      this.editPost = null
    },
    async saveEdit() {
      if (!this.editPost) return
      const updated = await postsApi.update(this.editPost.id, this.editPost)

      // Replace the post in the list
      const index = this.posts.findIndex((p) => p.id === updated.id)
      if (index > -1) this.posts.splice(index, 1, updated)

      this.exitEdit()
    },
    async doSaveNewPost() {
      const created = await postsApi.create(this.newPost)
      this.posts.unshift(created)
      this.newPost = this.defaultNewPost()
    },
    async doDeletePost(post) {
      await postsApi.delete(post.id)
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
  },
  async mounted() {
    await this.fetchPosts()
  },
}
</script>
