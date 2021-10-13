<template>
  <UpLayout>
    <div class="relative h-screen">
      <!-- Header -->
      <Popover as="template" v-slot="{ open }">
        <header
            :class="[open ? 'fixed inset-0 z-40 overflow-y-auto' : '', 'bg-white shadow-sm sticky inset-0 z-40 py-2']">
          <div class="max-w mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div class="flex-shrink-0 flex items-center">
                  <slot name="logo">
                    <a :href="logo.url">
                      <img class="block h-8 w-auto"
                           :src="logo.src"
                           :srcset="logo.srcset"
                           :sizes="logo.sizes"
                           alt=""/>
                    </a>
                  </slot>
                </div>
              </div>
              <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <slot name="header_center">
                  <div
                      class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div class="w-full">

                    </div>
                  </div>
                </slot>
              </div>
              <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                <PopoverButton
                    class="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                  <span class="sr-only">Open menu</span>
                  <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
                  <XIcon v-else class="block h-6 w-6" aria-hidden="true"/>
                </PopoverButton>
              </div>
              <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">

                <slot name="header_actions"></slot>

                <slot name="header_notifications" v-if="options.withNotifications && notifications">
                  <Notifications></Notifications>
                </slot>
                <slot name="header_user" v-if="options.withUser">
                  <UserMenu />
                </slot>
                <slot name="header_right"></slot>
              </div>
            </div>
          </div>

          <PopoverPanel as="nav" class="lg:hidden" aria-label="Global">
            <div class="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
              <a v-for="item in menus.main" :key="item.name" :href="item.href" :aria-current="item.current ? 'page' : undefined" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50', 'block rounded-md py-2 px-3 text-base font-medium']">{{ item.name }}</a>
            </div>
            <div class="border-t border-gray-200 pt-4">
              <div class="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                <div class="flex-shrink-0">
                  <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-gray-800">{{ user.name }}</div>
                  <div class="text-sm font-medium text-gray-500">{{ user.email }}</div>
                </div>
                <button type="button" class="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                <a v-for="item in menus.user" :key="item.name" :href="item.href" class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">{{ item.name }}</a>
              </div>
            </div>
          </PopoverPanel>
        </header>
      </Popover>
      <!--/ Header -->
      <!-- Content -->
      <slot name="content">
        <div class="flex overflow-hidden h-screen bg-white">
          <!-- Sidebar-->
          <slot name="sidebar">
            <div class="hidden lg:flex lg:flex-shrink-0">
              <div class="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4">
                <div class="h-0 flex-1 flex flex-col overflow-y-auto">
                  <!-- Navigation -->
                  <nav class="px-3 mt-6">
                    <div class="space-y-1">
                      <a-skeleton active v-if="loading.menus"></a-skeleton>
                      <a v-else v-for="item in menus.main" :key="item.name" :href="item.href"
                         :class="[item.current ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']"
                         :aria-current="item.current ? 'page' : undefined">
                        <component :is="item.icon"
                                   :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']"
                                   aria-hidden="true"/>
                        {{ item.name }}
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </slot>
          <!--/ Sidebar-->
          <!-- Main -->
          <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <slot name="main"></slot>
          </main>
          <!--/ Main -->
          <!-- Aside -->
          <aside v-if="options.withAside">
            <slot name="aside"></slot>
          </aside>
          <!--/ Aside -->
        </div>
      </slot>
      <!--/ Content -->
      <!-- Footer -->
      <slot name="footer"></slot>
      <!--/ Footer -->
    </div>
  </UpLayout>
</template>

<script>
import UpLayout from './UpLayout.vue';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'
import {BellIcon, MenuIcon, XIcon} from "@heroicons/vue/outline";
import {ref, inject, toRefs} from "vue";
import Notifications from "../notifications/Notifications.vue";
import UserMenu from "../usermenu/UserMenu.vue";
import {useUp} from "../core/UpVue";

export default {
  components: {
    Notifications,
    UserMenu,
    UpLayout,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverPanel,
    BellIcon,
    XIcon,
    MenuIcon,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          withUser: true,
          withNotifications: true,
          withSearch: true,
          withAside: false,
        }
      }
    },
    logo: {
      type: Object,
      default: () => {
        return {
          src: '/img/logo.svg',
          srcset: '/img/logo.svg 480w, /img/logo_with_text.svg 800w',
          sizes: '(max-width: 480px) 50px, 800px"',
          url: '/',
        }
      }
    }
  },
  setup(props, context) {

    const {options, logo} = toRefs(props);

    let loading = ref({
      user: true,
      menus: true,
      notifications: true,
    })

    let user = ref(null);
    let menus = ref([]);
    let notifications = ref([]);

    const {__, api, config} = useUp();

    api.get('user').then((res) => {
      loading.value.user = false;
      user.value = res.data;
    }).catch((res) => {
      loading.user = false;
    });

    api.get('menus').then((res) => {
      loading.value.menus = false;
      menus.value = res.data.data;
    }).catch((res) => {

    });

    api.get('notifications').then((res) => {
      loading.value.notifications = false;
      notifications.value = res.data.data;
    }).catch((res) => {

    });

    return {
      loading,
      menus,
      user,
      notifications,
      options,
      logo,
      project: config.get('project')
    }
  },
};
</script>
