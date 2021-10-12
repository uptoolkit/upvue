<template>
  <Popover class="relative" v-slot="{ open }">
    <PopoverButton
        :class="[open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500']">
      <span class="sr-only">{{ t("View notifications") }}</span>
      <BellIcon class="h-6 w-6" aria-hidden="true"/>
    </PopoverButton>
    <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
      <div>
        <slot name="header"></slot>
        <slot>
          <PopoverPanel class="absolute z-10 right-0 transform mt-3 w-screen max-w-xs sm:px-0">
            <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                <div v-for="item in items" :key="item.id">
                  <hr v-if="item.element === 'hr'" />
                  <a v-else :href="item.href"
                     class="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                    <p class="text-base font-medium text-gray-900">
                      {{ item.title }}
                    </p>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ item.body }}
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <slot name="footer"></slot>
          </PopoverPanel>
        </slot>
      </div>
    </transition>
  </Popover>
</template>

<script>
import {Popover, PopoverButton, PopoverPanel} from '@headlessui/vue'
import {BellIcon} from '@heroicons/vue/outline'
import {useUp} from "../core/UpVue";
import {ref, reactive} from 'vue'

export default {
  name: 'Notifications',
  components: {
    Popover,
    PopoverButton,
    PopoverPanel,
    BellIcon
  },
  setup() {
    let items = ref([]);
    let loading = ref(true);
    const {api, __} = useUp();

    api.get('notifications').then((res) => {
      loading.value = false;
      items.value = res.data.data;
    });

    return {
      t : __,
      items,
      loading
    }
  },
}
</script>