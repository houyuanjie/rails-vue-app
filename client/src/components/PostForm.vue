<template>
  <v-form>
    <v-text-field v-model="post.title" label="Title"></v-text-field>
    <v-textarea v-model="post.content" label="Content"></v-textarea>
  </v-form>
</template>

<script>
export default {
  name: "PostForm",
  props: ["post"],
  emits: ["update:post"],
}
</script>
