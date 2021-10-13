<template>
  <Menu v-if="menus && user" as="div" class="flex-shrink-0 relative ml-5">
    <slot>
      <MenuButton
          class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
        <span class="sr-only">{{ t("Open user menu") }}</span>
        <a-skeleton :loading="loading" v-if="loading" avatar></a-skeleton>
        <img v-if="user" class="h-8 w-8 rounded-full" :src="user.profile_photo_path" alt=""/>
      </MenuButton>
    </slot>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <slot name="dropdown_header"></slot>
        <slot name="dropdown_main">
          <MenuItem v-for="item in menus.user" :key="item.name" v-slot="{ active }">
            <hr v-if="item.element === 'hr'"/>
            <a v-else :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
              {{ item.name }}
            </a>
          </MenuItem>
          <hr />
          <MenuItem @click="handleLogout">
            <a :class="['block px-4 py-2 text-sm text-gray-700']">{{ t("Logout") }}</a>
          </MenuItem>
        </slot>
        <slot name="dropdown_footer"></slot>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import {Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel} from '@headlessui/vue'
import {useUp} from "../core/UpVue";
import {ref} from 'vue'

export default {
  name: 'UserMenu',
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverPanel,
  },
  setup() {
    let user = ref({});
    let menus = ref(null);
    let loading = ref(true);
    const {api, t, store, config} = useUp();

    api.get('user').then((res) => {
      loading.value = false;
      user.value = res.data;
    });

    api.get('menus').then((res) => {
      loading.value = false;
      menus.value = res.data.data;
    });

    const handleLogout = () =>{
      store.dispatch('logout').then(() => {
        window.location.href = config.get('project.url', '/');
      });
    }

    return {
      user,
      menus,
      loading,
      t,
      handleLogout
    }
  },
}
</script>