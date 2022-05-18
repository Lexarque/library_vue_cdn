<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Book Return</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li class="breadcrumb-item active">Book Return</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                        List Book Return
                        <button v-on:click="addData()" type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary btn-sm float-right">Add</button>
                        <div class="dataTable-search float-right mr-4">
                            <input class="dataTable-input" placeholder="Search member name..." type="text" v-model="search">
                        </div>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Students Name</th>
                                <th>Students Class</th>
                                <th>Return Date</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in book_return" :key="index">
                                <td> {{ index+1 }} </td>
                                <td> {{ data.student_name }} </td>
                                <td> {{ data.class_name }} </td>
                                <td> {{ data.date_of_returning }} </td>
                                <td> Rp.{{ data.late_fee }} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data(){
            return{
                search: '',
                book_return: [],
            }
        },
        methods: {
            getData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }
                axios.get(api_url + '/BookReturn', token)
                .then(res => {
                    this.book_return = res.data
                    // console.log(this.book_return));
                });
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>