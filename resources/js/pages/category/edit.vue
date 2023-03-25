<template>
    <div class="card">
        <!-- <div class="card-header">
                            <h4 class="card-title">Basic Inputs</h4>
                        </div> -->

        <div class="card-body">
            <div class="row">

                <div class="col-md-12">
                    <form @submit.prevent="StoreForm()" action="/products" method="POST">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control " id="name" placeholder="name"
                                   v-model="form.name" v-bind:class="{ 'is-invalid': erorr.level }">
                            <div v-if="erorr.name" class="invalid-feedback">
                                {{ erorr.name[0]  }}
                            </div>
                        </div>


                        <router-link to="/categories" class="btn btn-danger">Kembali</router-link>
                        <button type="submit" class="btn btn-success">Submit</button>

                    </form>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props : ['id'],
        data() {
            return {
                form: {
                    name: ' ',
                },
                erorr: [],
                data: {}
            }
        },
        methods: {
            getData() {
                axios.get('/api/categories/' + this.id + '/edit').then((response) => {
                    this.form = {
                        name: response.data.name,
                    }
                });
            },
            StoreForm() {
                console.log(this.form)
                axios.put('/api/categories/' + this.id, this.form).then((response) => {
                    if (response.data.status) {
                        this.$noty.success(response.data.messege);
                        this.$router.push({
                            name: 'categories',
                        });
                    }
                }).catch((erorr) => {
                    this.erorr = erorr.response.data.errors
                })
            }
        },
        mounted() {
            this.getData();
        },
    }

</script>
