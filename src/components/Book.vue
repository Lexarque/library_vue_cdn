<template>
    <div>
       <div class="container-fluid px-4">
            <h1 class="mt-4">Book</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active">Book</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Book

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#book_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Book</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>BOOK ID</th>
                                <th>BOOK NAME</th>
                                <th>AUTHOR</th>
                                <th>DESC</th>
                                <th>COVER</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(lb, i) in list_book" :key="i">
                                <td>{{ i+1 }}</td>
                                <td>{{ lb.name_book }}</td>
                                <td>{{ lb.author_book }}</td>
                                <td>{{ lb.desc_book | snippet}}</td>
                                <td> <img :src="image_url + 'images/' + lb.image" alt="Book Cover" width="70"></td>
                                <td>
                                    <button class="btn btn-secondary" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#bookcover_modal"><i class="fas fa-solid fa-image"></i></button>
                                    <button class="btn btn-info" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#book_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(lb.id_book)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="book_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Please Input The Corresponding Data for {{action}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="name_book" class="form-label">Book Name</label>
                            <input type="text" class="form-control" id="name_book" v-model="name_book" placeholder="Book Name">
                        </div>

                        <div class="mb-3">
                            <label for="author" class="form-label">Author</label>
                            <input type="text" class="form-control" id="author" v-model="author_book" placeholder="Author">
                        </div>

                        <div class="mb-3">
                            <label for="desc" class="form-label">Description</label>
                            <textarea class="form-control" id="desc" v-model="desc_book" rows="3"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="Save()">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cover Upload Modal -->
        <div class="modal fade" id="bookcover_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Cover</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="book_cover" class="form-label">Book Cover</label>
                            <input type="file" class="form-control" id="book_cover" @change="UploadCover($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(id_book)" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
module.exports = {
    //state
    data : function(){
        return {
            id_book: "",
            name_book: "",
            author_book: "",
            desc_book: "",
            book_cover: "",
            action: "",
            list_book: [],
        }
    },
    methods: {
        getData: function(){
            //token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            axios.get(api_url + "/book", token)
            .then( res => {
                this.list_book = res.data;
            })
        },
        Add: function() {
            this.id_book= '' ,
            this.name_book= '' ,
            this.author_book= '' ,
            this.desc_book= '' ,
            this.action = "insert"
        },
        //lb as in abbr of list book
        Edit: function(lb){
            this.id_book = lb.id_book
            this.name_book = lb.name_book
            this.author_book = lb.author_book
            this.desc_book = lb.desc_book
            this.action = "update"
        },
        Save: function() {
            //mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            //mapping data
            let form  = {
                //backend       //state
                'name_book': this.name_book,
                'author_book': this.author_book,
                'desc_book': this.desc_book
            }
            if(this.action === 'insert'){ //POST
                axios.post(api_url + '/add_book', form, token)
                .then( res => {
                    Swal.fire(res.data.message, 'Data Added', 'success');
                })
            } else 
            { //PUT
              axios.put(api_url + '/book/' + this.id_book, form, token)
                .then( res => {
                    Swal.fire(res.data.message, 'Data Updated', 'success');
            })}

            this.getData();
        },
         Delete: function(id_book){
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
                        axios.delete(api_url + '/book/' + id_book, token)
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
        UploadCover: function(e){
            //why index 0? because it's only one file
            this.book_cover=e.target.files[0]
        },
        Upload: function(id_book){
             let token ={
                headers : {"Authorization" : "Bearer " + this.$cookies.get("Authorization"),'Content-Type':'multipart/form-data'}
            }

            //images can only be uploaded through form data
            let form = new FormData()
            form.append('book_cover', this.book_cover)

            axios.post(api_url + '/book/upload_cover/'+ id_book, form, token)
                .then(response => {
                    alert(response.data.message)
                })
                this.getData()
        },
    },
    
    mounted() {
        this.getData()
    },
}
</script>