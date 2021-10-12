<template>
  <div class="w-full">
    <label for="search" class="sr-only">Search</label>
    <div class="relative">
      <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
        <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input id="search" name="search" class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm" placeholder="Search" type="search" />
    </div>
  </div>
</template>

<script>
import {SearchIcon} from "@heroicons/vue/outline";

export default {
  name: "search",
  components: [
      SearchIcon
  ]
}
</script>

<style scoped>

</style>