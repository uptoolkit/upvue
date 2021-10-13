<template>
  <UpLayout>
    <router-view></router-view>
  </UpLayout>
</template>

<script>
import UpLayout from "../src/layouts/UpLayout.vue";

export default {
  name: 'App',
  components: {
    UpLayout
  }
}
</script>
