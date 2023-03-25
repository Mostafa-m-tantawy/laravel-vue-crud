<template>
    <div class="card">
        <!-- <div class="card-header">
                            <h4 class="card-title">Basic Inputs</h4>
                        </div> -->

        <div class="card-body">
            <div class="row">

                <div class="col-md-12">
                    <form @submit.prevent="UpdateForm()" action="/products" method="POST"  enctype="multipart/form-data">
                        <div class="form-group">
                            <label for="basicInput">Name</label>
                            <input type="text" class="form-control " id="basicInput" placeholder="Name"
                                v-model="form.name" v-bind:class="{ 'is-invalid': erorr.name }">
                            <div v-if="erorr.name" class="invalid-feedback">
                                {{ erorr.name[0]  }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Image</label>
                            <input type="file" class="form-control" ref="file"  v-on:change="onChangeFileUpload()">

                        </div>
                        <div class="form-group">
                            <label>Rating</label>
                            <input type="number" class="form-control"  placeholder="Rating"
                                v-model="form.rating" v-bind:class="{ 'is-invalid': erorr.rating }">
                            <div v-if="erorr.rating" class="invalid-feedback">
                                {{ erorr.rating[0]  }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Price</label>
                            <input type="number" min="0" step="0.01" class="form-control"  placeholder="Rating"
                                v-model="form.price" v-bind:class="{ 'is-invalid': erorr.price }">
                            <div v-if="erorr.price" class="invalid-feedback">
                                {{ erorr.price[0]  }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label >Category</label>
                            <select class="form-control" v-bind:class="{ 'is-invalid': erorr.category_id }" name=""
                                v-model="form.category_id">
                                <option value="">-- Select --</option>
                                <option v-for="options in option" v-bind:value="options.id">
                                    {{ options.name }}</option>
                            </select>
                            <div v-if="erorr.category_id" class="invalid-feedback">
                                {{ erorr.category_id[0]  }}
                            </div>
                        </div>

                        <div class="form-group">
                            <label >Description</label><br>
                            <textarea  class="form-control" v-bind:class="{ 'is-invalid': erorr.description }"
                                rows="3" v-model="form.description"></textarea>
                            <div v-if="erorr.description" class="invalid-feedback">
                                {{ erorr.description[0]  }}
                            </div>
                        </div>
                        <router-link to="/products" class="btn btn-danger">Back</router-link>
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
                    name: '',
                    rating:0,
                    price:0,
                    category_id: '',
                    image: '',
                    description: '',
                },
                option: [],
                erorr: [],
                data: {}
            }
        },
        methods: {
            onChangeFileUpload() {
                this.form.image = this.$refs.file.files[0];
            },
            getCategories() {
                axios.post('/api/get-categories', this.data).then((response) => {
                    this.option = response.data;
                });
            },
            getData() {
                axios.get('/api/products/' + this.id + '/edit').then((response) => {
                    this.form = {
                        name: response.data.name,
                        category_id: response.data.category_id,
                        rating: response.data.rating,
                        price: response.data.price,
                        description: response.data.description,
                        image: '',
                    }
                });
            },

            UpdateForm() {
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                let formDataa = new FormData();
                let data= this.form
                for ( var key in data) {
                    formDataa.append(key, data[key]);
                }

                axios.put('/api/products/'+ this.id,data).then((response) => {
                    if (response.data.status) {
                        this.$noty.success(response.data.messege);
                        this.$router.push({
                            name: 'products',
                        });
                    }
                }).catch((erorr) => {
                    // console.log(erorr.response.data.errors);
                    this.erorr = erorr.response.data.errors
                })
            }
        },
        mounted() {
            this.getCategories(),
            this.getData()
        },
    }

</script>
