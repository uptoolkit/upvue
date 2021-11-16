<template>
  <UpLayout>
    <PageLayout>
      <main>
        <!-- Hero section -->
        <div class="relative">
          <div class="absolute bottom-0"/>
          <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div class="absolute inset-0">
                <div class="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-700 mix-blend-multiply"/>
              </div>
              <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span class="block text-white">Up Vue</span>
                  <span class="block text-blue-200">Web Toolkit for changemakers</span>
                </h1>
                <p class="mt-6 max-w-lg mx-auto text-center text-xl text-blue-200 sm:max-w-3xl">
                  This is a fully functionnal example that you can use as boilerplate.
                </p>
                <div class="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div class="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-3 sm:gap-5">
                    <a href="https://upvue.uptoolkit.com"
                       class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 sm:px-8">
                      Read the docs
                    </a>
                    <a href="/login"
                       class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8">
                      Live demo
                    </a>
                    <a @click="handleAlert" href="#"
                       class="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8">
                      Notification example
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  </UpLayout>
</template>

<script setup>
import {defineComponent} from "vue";
import UpLayout from "../../src/layouts/UpLayout.vue";
import PageLayout from "./../layouts/PageLayout.vue";
import {useUp} from "../../src";
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

defineComponent({
  UpLayout,
  PageLayout
});

// You can also have access to config through useUp()
const {config, message, notification, t, graphqlQuery} = useUp();

const handleAlert = () => {
  message.info('This is a normal message');
  notification.info('This is a normal message');
}

const { result, loading } = graphqlQuery(gql`
      query getUsers {
        users {
          id
          firstname
          lastname
          email
        }
      }
    `)
</script>

<style scoped>

</style>