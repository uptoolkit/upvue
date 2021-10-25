declare namespace _default {
    namespace components {
        export { Notifications };
        export { UserMenu };
        export { UpLayout };
        export { Menu };
        export { MenuButton };
        export { MenuItem };
        export { MenuItems };
        export { Popover };
        export { PopoverButton };
        export { PopoverPanel };
        export { BellIcon };
        export { XIcon };
        export { MenuIcon };
        export { Disclosure };
        export { DisclosureButton };
        export { DisclosurePanel };
    }
    namespace props {
        namespace options {
            export const type: ObjectConstructor;
            function _default(): {
                withUser: boolean;
                withNotifications: boolean;
                withSearch: boolean;
                withAside: boolean;
            };
            export { _default as default };
        }
        namespace logo {
            const type_1: ObjectConstructor;
            export { type_1 as type };
            function _default_1(): {
                src: string;
                srcset: string;
                sizes: string;
                url: string;
            };
            export { _default_1 as default };
        }
    }
    function setup(props: any, context: any): {
        loading: import("vue").Ref<{
            user: boolean;
            menus: boolean;
            notifications: boolean;
        }>;
        menus: import("vue").Ref<never[]>;
        user: import("vue").Ref<null>;
        notifications: import("vue").Ref<never[]>;
        options: any;
        logo: any;
        project: any;
    };
    function setup(props: any, context: any): {
        loading: import("vue").Ref<{
            user: boolean;
            menus: boolean;
            notifications: boolean;
        }>;
        menus: import("vue").Ref<never[]>;
        user: import("vue").Ref<null>;
        notifications: import("vue").Ref<never[]>;
        options: any;
        logo: any;
        project: any;
    };
}
export default _default;
import Notifications from "../notifications/Notifications.vue";
import UserMenu from "../usermenu/UserMenu.vue";
import UpLayout from "./UpLayout.vue";
import { Menu } from "@headlessui/vue/dist/components/menu/menu";
import { MenuButton } from "@headlessui/vue/dist/components/menu/menu";
import { MenuItem } from "@headlessui/vue/dist/components/menu/menu";
import { MenuItems } from "@headlessui/vue/dist/components/menu/menu";
import { Popover } from "@headlessui/vue/dist/components/popover/popover";
import { PopoverButton } from "@headlessui/vue/dist/components/popover/popover";
import { PopoverPanel } from "@headlessui/vue/dist/components/popover/popover";
import { BellIcon } from "@heroicons/vue/outline";
import { XIcon } from "@heroicons/vue/outline";
import { MenuIcon } from "@heroicons/vue/outline";
import { Disclosure } from "@headlessui/vue/dist/components/disclosure/disclosure";
import { DisclosureButton } from "@headlessui/vue/dist/components/disclosure/disclosure";
import { DisclosurePanel } from "@headlessui/vue/dist/components/disclosure/disclosure";
