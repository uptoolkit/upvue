<template>
  <a-config-provider>
    <slot></slot>
  </a-config-provider>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {ConfigProvider} from "ant-design-vue";
import {useUp} from "../core/UpVue";

const UpLayout = defineComponent({
  components: [
    ConfigProvider
  ],
  provide() {
    return {
      loading : this.loading,
      api: this.api,
      http: this.http,
      config: this.config,
      i18n: this.i18n,
      t: this.i18n.__.bind(this.i18n),
      choice: this.i18n.choice.bind(this.i18n),
    }
  },
  setup() {
    const loading = ref(false);
    let {config, message, notification, api, http, i18n} = useUp();

    let locale = ref(config.get('locale'));

    return {
      loading,
      locale,
      api,
      http,
      config,
      message,
      notification,
      i18n
    };
  },
});

export default UpLayout
</script>
