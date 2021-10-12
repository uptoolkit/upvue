<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Register
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <a-form
            class="form"
            ref="formRef"
            :model="formState"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
        >
          Example using daisyUI and antD
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
            </label>
            <a-form-item ref="name" name="name">
              <a-input v-model:value="formState.name" class="input input-bordered" />
            </a-form-item>
          </div>
          <a-form-item label="Activity zone" name="region">
            <a-select v-model:value="formState.region" placeholder="please select your zone">
              <a-select-option value="shanghai">Zone one</a-select-option>
              <a-select-option value="beijing">Zone two</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Activity time" required name="date1">
            <a-date-picker
                v-model:value="formState.date1"
                show-time
                type="date"
                placeholder="Pick a date"
                style="width: 100%"
            />
          </a-form-item>
          <a-form-item label="Instant delivery" name="delivery">
            <a-switch v-model:checked="formState.delivery" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="onSubmit">Create</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRaw } from 'vue';
export default defineComponent({
  setup() {
    const formRef = ref();
    const formState = reactive({
      name: '',
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    });
    const rules = {
      name: [
        {
          required: true,
          message: 'Please input Activity name',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 5,
          message: 'Length should be 3 to 5',
          trigger: 'blur',
        },
      ],
      region: [
        {
          required: true,
          message: 'Please select Activity zone',
          trigger: 'change',
        },
      ],
      date1: [
        {
          required: true,
          message: 'Please pick a date',
          trigger: 'change',
          type: 'object',
        },
      ],
      type: [
        {
          type: 'array',
          required: true,
          message: 'Please select at least one activity type',
          trigger: 'change',
        },
      ],
      resource: [
        {
          required: true,
          message: 'Please select activity resource',
          trigger: 'change',
        },
      ],
      desc: [
        {
          required: true,
          message: 'Please input activity form',
          trigger: 'blur',
        },
      ],
    };

    const onSubmit = () => {
      formRef.value
          .validate()
          .then(() => {
            console.log('values', formState, toRaw(formState));
          })
          .catch(error => {
            console.log('error', error);
          });
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      other: '',
      formState,
      rules,
      onSubmit,
      resetForm,
    };
  },
});
</script>