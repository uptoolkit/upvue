<template>
  <UpLayout>
    <slot></slot>
  </UpLayout>
</template>

<script>
import UpLayout from "./UpLayout";

export default {
  components: {
    UpLayout
  },
  setup() {
    return {

    }
  },
}
</script>