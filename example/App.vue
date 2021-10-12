<template>
  <UpLayout>
    <router-view></router-view>
  </UpLayout>
</template>

<script>
import UpLayout from "../lib/layouts/UpLayout.vue";

export default {
  name: 'App',
  components: {
    UpLayout
  }
}
</script>
