<template>
  <v-list lines="two">
    <v-list-item
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :subtitle="post.content"
      @click="$emit('editPost', post)"
    >
      <template #append>
        <v-list-item-action end>
          <v-btn @click="$emit('deletePost', post)">DELETE</v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "PostsList",
  props: ["posts"],
  emits: ["editPost", "deletePost"],
}
</script>

<style scoped></style>
