<template>
    <div class="card">
        <div class="card-body">
            <!-- button atas -->
            <template>
                <v-toolbar flat>
                    <v-toolbar-title>Products</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click.prevent="tambahRoute()" dark class="mb-2">
                        Create +
                    </v-btn>
                </v-toolbar>
            </template>
            <!-- end button atas -->
            <!-- header -->
            <v-card-title>
                <v-spacer></v-spacer>
                <!-- search engine -->
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <!-- end header -->
            <!-- table -->
            <!-- data table yang ini jadi make v-data-table jangan lupa iimport nya di app -->
            <!-- :header untuk header , : items untuk data , :search untuk search dan perpage untuk pagination -->
            <v-data-table :headers="headers" :items="data" :search="search" :items-per-page="50" class="elevation-2">
                <!-- header table -->

                <!--  action icon di json nya -->
                <template v-slot:item.action="{ item }">
                    <!-- icon menggunaka  v icon -->
                    <v-icon @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon color="error" @click="deleteItem(item)"> mdi-delete</v-icon>
                </template>
                <!-- end -->
            </v-data-table>

        </div>

    </div>
</template>


<script>
    export default {
        data() {
            return {
                headers: [{
                        text: 'Name',
                        value: 'name'
                    },

                    {
                        text: 'Category',
                        value: 'category.name'
                    },
                    {
                        text: 'Price',
                        value: 'price'
                    },
                    {
                        text: 'Rating',
                        value: 'rating'
                    },
                    {
                        text: 'Actions',
                        value: 'action',
                        sortable: false,
                        align: 'center'
                    },
                ],
                data: [],
                search: '',
                modelDelete: false
            }
        },
        methods: {
            GetData() {
                axios.get('/api/products').then((response) => {
                    this.data = response.data
                    // console.log(response.data); // data
                }).catch((eror) => {
                    console.log(eror);
                })
            },
            tambahRoute() {
                this.$router.push('/products/create')
            },
            deleteItem(item) {
                console.log(item.id);
                Swal.fire({
                    title: 'Are you sure ?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete('/api/products/' + item.id).then((response) => {
                           const idx = this.data.indexOf(item)
                            this.data.splice(idx, 1)

                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        })

                    }
                })

            },
            editItem(item) {
                this.$router.push('/products/' + item.id);
            }
        },

        mounted() {
            this.GetData()
        },
    }

</script>
