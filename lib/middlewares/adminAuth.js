import {useStorage} from "@vueuse/core";

export default function adminAuth(to, from) {

  const token = useStorage('admin_token', null);

  // If no token => we must redirect to login
  if (!token.value) {
    return '/admin/login';
  }

  return true;
}