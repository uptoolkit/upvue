declare namespace _default {
    const name: string;
    namespace components {
        export { Popover };
        export { PopoverButton };
        export { PopoverPanel };
        export { BellIcon };
    }
    function setup(): {
        t: ((key: string, data?: object | undefined, lang?: string | undefined) => any) | undefined;
        items: import("vue").Ref<never[]>;
        loading: import("vue").Ref<boolean>;
    };
    function setup(): {
        t: ((key: string, data?: object | undefined, lang?: string | undefined) => any) | undefined;
        items: import("vue").Ref<never[]>;
        loading: import("vue").Ref<boolean>;
    };
}
export default _default;
import { Popover } from "@headlessui/vue/dist/components/popover/popover";
import { PopoverButton } from "@headlessui/vue/dist/components/popover/popover";
import { PopoverPanel } from "@headlessui/vue/dist/components/popover/popover";
import { BellIcon } from "@heroicons/vue/outline";
