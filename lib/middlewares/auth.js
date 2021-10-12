import {useStorage} from "@vueuse/core";
import {useUp} from "../core/UpVue";

export default function auth(to, from) {

  const token = useStorage('token', null);

  // If no token => we must redirect to login
  if (!token.value) {
    return '/login';
  }

  // Define bearer token
  const {api} = useUp();
  api.defaults.headers.common['Authorization'] = 'Bearer '+token.value;

  return true;
}