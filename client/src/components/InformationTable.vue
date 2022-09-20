<template>
  <div class="q-pa-md">
    <div class="w-full">
      <div></div>
      <q-btn label="Add User" color="primary" @click="addUser = true" />
      <q-dialog v-model="addUser" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Add User</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <AddUserForm />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <q-table
      :loading="loading"
      :rows="users"
      :columns="columns"
      v-model:pagination="pagination"
      @request="handleRequest"
    >
      <template #body-cell-action="props">
        <q-td :props="props">
          <q-btn
            dense
            flat
            round
            color="blue"
            field="edit"
            icon="edit"
            @click="alert = true"
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import AddUserForm from "./AddUserForm.vue";

export default defineComponent({
  setup() {
    const loading = ref(true);
    const users = ref([]);
    const pagination = ref({
      page: 0,
      rowsPerPage: 5,
      rowsNumber: 0,
    });
    const columns = [
      {
        name: "firstName",
        label: "Firstname",
        align: "left",
        field: "firstName",
      },
      {
        name: "lastName",
        label: "Lastname",
        align: "left",
        field: "lastName",
      },
      {
        name: "eMail",
        label: "E-Mail",
        align: "left",
        field: "eMail",
      },
      {
        name: "phone",
        label: "Phone Number",
        align: "left",
        field: "phone",
      },
      {
        name: "roles",
        label: "Roles",
        align: "left",
        field: "roles",
      },
      {
        name: "action",
        align: "center",
        label: "Action",
        field: "",
      },
    ];

    const fetchUsers = (page = 1, rowsPerPage = 5) => {
      axios
        .post("http://localhost:5000/user/list", {
          pagination: {
            pageSize: rowsPerPage,
            pageNumber: page,
          },
        })
        .then((res) => {
          users.value = res.data.data;
          for (let i = 0; i < users.value.length; i++) {
            if (users.value[i].roles && users.value[i].roles !== []) {
              users.value[i].roles = users.value[i].roles
                .map((x) => x.name)
                .join(", ");
            }
          }
          //users.value.roles = res.data.roles.join(", ");
          const totalElements = res.data.totalElements;
          pagination.value.page = page;
          pagination.value.rowsPerPage = rowsPerPage;
          pagination.value.rowsNumber = totalElements;
        })
        .finally(() => {
          loading.value = false;
        })
        .catch((err) => console.log(err));
    };
    fetchUsers();
    const handleRequest = (props) => {
      const { page, rowsPerPage } = props.pagination;
      fetchUsers(page, rowsPerPage);
    };
    return {
      loading,
      users,
      columns,
      pagination,
      handleRequest,
      addUser: ref(false),
    };
  },
  components: { AddUserForm },
});
</script>

<style scoped>
.w-full {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
}
</style>
