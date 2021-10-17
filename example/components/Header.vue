<template>
  <header>
    <Popover class="relative bg-white">
      <div
          class="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <span class="sr-only">{{ ('project.name') }}</span>
            <img class="h-8 w-auto sm:h-10"
                 src="/img/logo.svg" alt=""/>
          </a>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
              class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true"/>
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <a href="https://upvue.uptoolkit.com" class="text-base font-medium text-gray-500 hover:text-gray-900">
            {{ t("Docs") }}
          </a>
          <a href="https://uptoolkit.com/contact" class="text-base font-medium text-gray-500 hover:text-gray-900">
            {{ t("Contact") }}
          </a>
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <a href="/login" class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
            {{ t("Sign in") }}
          </a>
          <a href="/register"
             class="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-blue-700 hover:to-blue-700">
            {{ t("Register") }}
          </a>
        </div>
      </div>

      <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in"
                  leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
        <PopoverPanel focus
                      class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div
              class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div class="pt-5 pb-6 px-5">
              <div class="flex items-center justify-between">
                <div>
                  <img class="h-8 w-auto"
                       src="/img/logo.svg"
                       alt="Up toolkit"/>
                </div>
                <div class="-mr-2">
                  <PopoverButton
                      class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span class="sr-only">Close menu</span>
                    <XIcon class="h-6 w-6" aria-hidden="true"/>
                  </PopoverButton>
                </div>
              </div>
              <div class="mt-6">
                <nav class="grid grid-cols-1 gap-7">
                  <a v-for="item in solutions" :key="item.name" :href="item.href"
                     class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50">
                    <div
                        class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-blue-600 to-blue-600 text-white">
                      <component :is="item.icon" class="h-6 w-6" aria-hidden="true"/>
                    </div>
                    <div class="ml-4 text-base font-medium text-gray-900">
                      {{ item.name }}
                    </div>
                  </a>
                </nav>
              </div>
            </div>
            <div class="py-6 px-5">
              <div class="grid grid-cols-2 gap-4">
                <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">
                  {{ t("Partners") }}
                </a>
                <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700">
                  {{ t("Company") }}
                </a>
              </div>
              <div class="mt-6">
                <a href="#"
                   class="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-blue-700 hover:to-blue-700">
                  {{ t("Sign up") }}
                </a>
                <p class="mt-6 text-center text-base font-medium text-gray-500">
                  {{ t("Existing customer?") }}
                  <a href="#" class="text-gray-900">
                    {{ t("Sign in") }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </header>
</template>

<script setup>
import {defineComponent} from "vue";
import {Popover, PopoverButton, PopoverGroup, PopoverPanel} from '@headlessui/vue'
import {
  InboxIcon,
  MenuIcon,
  SparklesIcon,
  XIcon,
} from '@heroicons/vue/outline'
import {ChevronDownIcon} from '@heroicons/vue/solid'

import {useUp} from "../../src/core/UpVue";

defineComponent({
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  ChevronDownIcon,
  InboxIcon,
  MenuIcon,
  SparklesIcon,
  XIcon,
})

const {t, config} = useUp();
</script>
