<template>
  <UpLayout>
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </UpLayout>
</template>

<script setup>
import UpLayout from "./UpLayout";
</script>