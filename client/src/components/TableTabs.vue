<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="users" label="Users" />
          <q-tab name="roles" label="Roles" />
          <q-tab name="rights" label="Rights" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="users">
            <InformationTable />
          </q-tab-panel>

          <q-tab-panel name="roles"> TODO </q-tab-panel>

          <q-tab-panel name="rights"> TODO </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import InformationTable from "./InformationTable.vue";
export default {
  setup() {
    return {
      tab: ref("users"),
    };
  },
  components: { InformationTable },
};
</script>
