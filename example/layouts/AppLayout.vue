<template>
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
                                    <a :href="Logo.url">
                                        <img class="block h-8 w-auto"
                                             :src="Logo.src"
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

                            <slot name="header_notifications" v-if="options.withNotification && notifications">
                                <a href="#"
                                   class="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                                    <span class="sr-only">View notifications</span>
                                    <BellIcon class="h-6 w-6" aria-hidden="true"/>
                                </a>
                            </slot>
                            <slot name="header_user" v-if="user">
                                <Menu as="div" class="flex-shrink-0 relative ml-5">
                                    <div>
                                        <MenuButton
                                            class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                                            <span class="sr-only">Open user menu</span>
                                            <img class="h-8 w-8 rounded-full" :src="user.profile_photo_url" alt=""/>
                                        </MenuButton>
                                    </div>
                                    <transition enter-active-class="transition ease-out duration-100"
                                                enter-from-class="transform opacity-0 scale-95"
                                                enter-to-class="transform opacity-100 scale-100"
                                                leave-active-class="transition ease-in duration-75"
                                                leave-from-class="transform opacity-100 scale-100"
                                                leave-to-class="transform opacity-0 scale-95">
                                        <MenuItems
                                            class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                            <MenuItem v-for="item in navigation.user" :key="item.name"
                                                      v-slot="{ active }">
                                                <a :href="item.href"
                                                   :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700']">{{
                                                        item.name
                                                    }}</a>
                                            </MenuItem>
                                        </MenuItems>
                                    </transition>
                                </Menu>
                            </slot>
                            <slot name="header_right"></slot>
                        </div>
                    </div>
                </div>
            </header>
        </Popover>
        <!--/ Header -->
        <!-- Content -->
        <slot name="content">
            <div class="flex overflow-hidden h-screen bg-white">
                <div class="hidden lg:flex lg:flex-shrink-0">
                    <div class="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4">
                        <div class="h-0 flex-1 flex flex-col overflow-y-auto">
                            <!-- Navigation -->
                            <nav class="px-3 mt-6">
                                <div class="space-y-1">
                                    <a v-for="item in navigation.main" :key="item.name" :href="item.href"
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
                <!--/ Sidebar-->
                <!-- Main -->
                <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">

                </main>
                <!--/ Main -->
                <!-- Aside -->
                <aside v-if="options.withAside">

                </aside>
                <!--/ Aside -->
            </div>
        </slot>
        <!--/ Content -->
        <!-- Footer -->
        <slot name="footer"></slot>
        <!--/ Footer -->
    </div>
</template>

<script>
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
import {defineComponent} from "vue";

export default defineComponent({
    components: {
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
                    withNotification: true,
                    withSearch: true,
                    withAside: true
                }
            }
        },
    },
    provide: () => {
        return {}
    },
    setup() {

        let loading = {
            user: true,
            navigation: true,
            notifications: true,
        }

        let user = null;
        let navigation = [];
        let notifications = [];

        return {
            navigation,
            user,
            notifications,
            Logo: {
                src : '/img/logo.svg',
                url : '/',
            }
        }
    },
});
</script>
