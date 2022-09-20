<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <div class="flex">
        <div>
          <q-input
            filled
            v-model="name"
            label="User name *"
            hint="Name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            filled
            v-model="surname"
            label="User surname *"
            hint="Surname"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-input
            filled
            type="email"
            v-model="email"
            label="User email *"
            hint="E-Mail"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
              (val) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
                'Please enter a valid email',
            ]"
          />

          <q-input
            filled
            v-model="phone"
            label="Phone"
            mask="(###) ### - ####"
            hint="User phone number"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your phone number',
            ]"
          />
        </div>
        <div>
          <div>
            <q-checkbox v-model="right" label="Label on Right" />

            <li v-for="role in allRoles" :key="role._id">
              <q-checkbox v-model="right" label="Label on Right" />
              {{ role.name }}
            </li>
          </div>
        </div>
      </div>
      <div>
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>

    <q-card-actions align="right">
      <q-btn flat label="OK" color="primary" v-close-popup />
    </q-card-actions>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
  setup() {
    const $q = useQuasar();

    const name = ref(null);
    const surname = ref(null);
    const phone = ref(null);
    const email = ref(null);
    let allRoles = [];

    return {
      name,
      surname,
      phone,
      email,
      right: ref(false),
      allRoles,

      onSubmit() {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
        name.value = null;
        surname.value = null;
        phone.value = null;
        email.value = null;
      },

      onReset() {
        name.value = null;
        surname.value = null;
        phone.value = null;
        email.value = null;
      },
    };
  },
};
</script>
<style scoped>
.flex {
  display: flex;
}
</style>
