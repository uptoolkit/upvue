<template>
  <a-config-provider>
    <slot></slot>
  </a-config-provider>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {ConfigProvider} from "ant-design-vue";
import {api, http, i18n, useUp} from "../core/UpVue";

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
      t: i18n.__.bind(i18n),
      choice: i18n.choice.bind(i18n),
    }
  },
  setup() {
    const loading = ref(false);
    let {config, message, notification} = useUp();

    let locale = ref(config.get('locale'));

    return {
      loading,
      locale,
      api,
      http,
      config,
      message,
      notification
    };
  },
});

export default UpLayout
</script>
