declare namespace _default {
    const name: string;
    namespace components {
        export { Menu };
        export { MenuButton };
        export { MenuItem };
        export { MenuItems };
        export { Popover };
        export { PopoverButton };
        export { PopoverPanel };
    }
    function setup(): {
        user: import("vue").Ref<{}>;
        menus: import("vue").Ref<null>;
        loading: import("vue").Ref<boolean>;
        t: ((key: string, data?: object | undefined, lang?: string | undefined) => any) | undefined;
        handleLogout: () => void;
    };
    function setup(): {
        user: import("vue").Ref<{}>;
        menus: import("vue").Ref<null>;
        loading: import("vue").Ref<boolean>;
        t: ((key: string, data?: object | undefined, lang?: string | undefined) => any) | undefined;
        handleLogout: () => void;
    };
}
export default _default;
import { Menu } from "@headlessui/vue/dist/components/menu/menu";
import { MenuButton } from "@headlessui/vue/dist/components/menu/menu";
import { MenuItem } from "@headlessui/vue/dist/components/menu/menu";
import { MenuItems } from "@headlessui/vue/dist/components/menu/menu";
import { Popover } from "@headlessui/vue/dist/components/popover/popover";
import { PopoverButton } from "@headlessui/vue/dist/components/popover/popover";
import { PopoverPanel } from "@headlessui/vue/dist/components/popover/popover";
