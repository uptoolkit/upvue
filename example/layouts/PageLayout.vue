<template>
  <div class="bg-white">
    <Header/>
    <slot></slot>
    <Footer/>
  </div>
</template>

<script>
import {Popover, PopoverButton, PopoverGroup, PopoverPanel} from '@headlessui/vue'
import {
  InboxIcon,
  MenuIcon,
  SparklesIcon,
  XIcon,
} from '@heroicons/vue/outline'
import {ChevronDownIcon} from '@heroicons/vue/solid'
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ChevronDownIcon,
    InboxIcon,
    MenuIcon,
    SparklesIcon,
    XIcon,
  },
  setup() {
    return {}
  },
}
</script>