<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Tables</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                <li class="breadcrumb-item active">Book Borrow</li>
            </ol>
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Book Borrow
                    <button v-on:click="addData()" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary btn-sm float-end pt-2 pb-2">Add</button>
                    <div class="dataTable-search float-right mr-4">
                        <input class="dataTable-input" placeholder="Search borrower name..." type="text" v-model="search">
                    </div>
                </div>
                <div class="alert alert-info" role="alert">
                            The date of borrowing will be automatically generated, and the date of returning will be automatically generated the next 7 days after the date of borrowing.
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Student Name</th>
                                <th>Borrow Date</th>
                                <th>Return Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(dt, i) in borrow_list" :key="i">
                                <td> {{ i+1 }} </td>
                                <td> {{ dt.name_students}} </td>
                                <td> {{ dt.date_borrow }} </td>
                                <td> {{ dt.date_due }} </td>
                                 <td>
                                    <button class="btn btn-info" v-on:click="detail(dt.id_borrow)" type="button" data-bs-toggle="modal" data-bs-target="#detailModal"><i class="fas fa-clipboard-list"></i></button>
                                    <button class="btn btn-success" v-on:click="returnBook(dt.id_borrow)" type="button" data-bs-toggle="modal" data-bs-target="#returnModal"><i class="fas fa-check-square"></i></button>
                                    <button class="btn btn-danger" v-on:click="deleteData(dt.id_borrow)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                    <!-- <button class="btn btn-info" v-on:click="editData(dt)" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-pencil-alt fa-fw"></i></button> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- modal  -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> {{ action }} Data </h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="name_students">Student Name</label>
                            <select class="form-select" id="name_students" v-model="students_name">
                                <option v-for="dt in students_list" :key="dt" :value="dt.id_students">{{dt.name_students}}</option>
                            </select>
                        </div>

                    </div>

                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Borrow Details </h5>
                        <button @click="addItem()" class="btn btn-info">+</button>
                    </div>

                    <div class="modal-body">
                        <div class="row" v-for="(dt, counter) in detail_borrow" :key="counter">
                            <div class="input-group mb-3">
                                    <select class="form-select input-sm" id="book_name" v-model="dt.id_book" required aria-placeholder="Book name">
                                    <option value="" disabled>Choose book name</option>
                                    <option v-for="dt in books" :key="dt" :value="dt.id_book"
                                    > 
                                            {{ dt.name_book }} 
                                    </option>
                                </select>
                        
                                <!-- declaration for second field -->
                                <input type="number" class="form-control input-sm" placeholder="Quantity" v-model="dt.qty">

                                <button type="button" @click="deleteItem(counter)" class="btn btn-danger">-</button>
                                
                            </div>
                        </div>
                    </div>
                
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="saveData()" type="button" class="btn btn-primary" data-bs-dismiss="modal">{{this.action}}</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- detail modal  -->
        <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="detailModal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Detail Borrow Book </h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                <th>Book Name</th>
                                <th>Author</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(dt, i) in detail_borrow" :key="i">
                                    <td> {{ dt.name_book }} </td>
                                    <td> {{ dt.author_book }} </td>
                                    <td> <img :src="image_url + 'images/' + dt.image" alt="Book Cover" width="70"></td>
                                    <td> {{ dt.qty }} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

         <!-- modal return -->
        <div class="modal fade" id="returnModal" tabindex="-1" role="dialog" aria-labelledby="detailModal" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Return Book </h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="dt in return_data" :key="dt">
                                    <td> {{ dt.fee }} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Return Book</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data(){
            return{
                borrow_list: [],
                students_list: [],
                details: [],
                books: [],
                detail_borrow: [],
                return_data:[],
                search:'',
                action: '',
                students_name: ''
            }
        },
        methods:{
            addItem(){
                this.detail_borrow.push({
                    id_book: '',
                    qty: '',
                })
            },
            deleteItem(counter){
                this.detail_borrow.splice(counter, 1)
            },
            getData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }
                axios.get(api_url + '/borrow', token)
                .then(res => {
                    console.log(res.data.data)
                    this.borrow_list = res.data.data
                })
                axios.get(api_url + '/students', token)
                .then(res => {
                    console.log(res.data)
                    this.students_list = res.data.data
                })
                axios.get(api_url + '/book', token)
                .then(res => {
                    this.books = res.data
                })
            }, 
            deleteData: function(id_book){
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
                Swal.fire({ 
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                        }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(api_url + '/borrow/' + id_book, token)
                        .then( res => {
                                Swal.fire(
                                    'Deleted!',
                                    res.data.message,
                                    'success'
                        )})
                        this.getData()
                    }else{
                        Swal.fire(
                            'Cancelled',
                            'The process has been cancelled',
                            'error'
                        )
                        this.getData()
                    }
                })    
        },
            addData(){
                // book borrow 
                this.student_id = '',
                this.action = 'Add'
            },
            saveData(){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }
                let form = {
                    'id_students' : this.students_name,
                    'detail' : this.detail_borrow
                }
                axios.post(api_url + '/add_borrow', form, token)
                    .then(res => {
                        swal("Good Job", res.message, "success")
                        location.reload()
                        this.getData()
                })
            },
            detail(id_borrow){ 
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }
                axios.get(api_url + '/borrow/details/'+ id_borrow, token)
                .then(res => {
                    console.log(res.data.data)
                    this.detail_borrow = res.data.data
                })
            },
            returnBook(id_borrow){
                let token = {
                    headers : {
                        'Authorization' : 'Bearer ' + this.$cookies.get('Authorization')
                    }
                }
                axios.get(api_url + '/book_return/' + id_borrow, token)
                .then(res => {
                    // console.log(res.data);
                    this.return_data = res.data.data
                    console.log(this.return_data);
                 
                })
            }
        },
        mounted(){
            this.getData()
            
        }
    }
</script>