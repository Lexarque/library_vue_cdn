<template>
      <div>
       <div class="container-fluid px-4">
            <h1 class="mt-4">Students</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                <li class="breadcrumb-item active">Students</li>
            </ol>
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Students

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#students_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Students</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>STUDENTS NAME</th>
                                <th>BIRTH DATE</th>
                                <th>GENDER</th>
                                <th>ADDRESS</th>
                                <th>CLASS</th>
                                <th>MAJOR</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(dt, i) in list_students" :key="i">
                                <td>{{ i+1 }}</td>
                                <td>{{ dt.name_students }}</td>
                                <td>{{ dt.birth_date }}</td>
                                <td>{{ dt.gender }}</td>
                                <td>{{ dt.address }}</td>
                                <td>{{ dt.name_student_class }}</td>
                                <td>{{ dt.group_student_class }}</td>
                                <td>
                                    <button class="btn btn-secondary" @click="Edit(dt)" data-bs-toggle="modal" data-bs-target="#students_photo_modal"><i class="fas fa-solid fa-image"></i></button>
                                    <button class="btn btn-info" @click="Edit(dt)" data-bs-toggle="modal" data-bs-target="#students_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(dt.id_students)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="students_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Please Input The Corresponding Data for {{action}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="name_students" class="form-label">Students Name</label>
                            <input type="text" class="form-control" id="name_students" v-model="name_students" placeholder="Students Name">
                        </div>
                        <div class="mb-3">
                            <label for="birth_date" class="form-label">Date of Birth</label>
                            <input type="date" class="form-control" id="birth_date" v-model="birth_date" placeholder="Date of Birth">
                        </div>
                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender</label>
                            <select class="form-control" id="gender" v-model="gender">
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </div>                        
                        <div class="mb-3">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" v-model="address">
                        </div>
                        <div class="mb-3">
                        <label for="class">Class</label>
                        <select class="form-control" id="class" v-model="id_student_class" required>
                            <option v-for="dt in list_class" :key="dt" :value="dt.id_student_class"> 
                                {{ dt.name_student_class }} => {{ dt.group_student_class}}
                            </option>
                        </select>
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
        <div class="modal fade" id="students_photo_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Student Photo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="student_photo" class="form-label">Student Photo</label>
                            <input type="file" class="form-control" id="student_photo" @change="UploadCover($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(id_students)" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
module.exports = {
    data : function(){
        return {
            id_students: "",
            name_students: "",
            birth_date: "",
            gender: "",
            address: "",
            id_student_class: "",
            photo_students: "",
            action: "",
            list_students: [],
            list_class: []
        }
    },
    methods: {
        getData: function(){
            //token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }
            axios.get(api_url + "/students", token)
            .then( res => {
                this.list_students = res.data.data;
            })
            axios.get(api_url + "/student_class", token)
            .then( res => {
                this.list_class = res.data.data;
            })
        },
        Add: function() {
            this.id_students= '' ,
            this.name_students= '' ,
            this.birth_date= '' ,
            this.gender= '' ,
            this.address = '' ,
            this.id_student_class = '',
            this.action = "insert"
        },
        //lb as in abbr of list students
        Edit: function(lb){
            this.id_students = lb.id_students,
            this.name_students = lb.name_students,
            this.birth_date = lb.birth_date,
            this.gender = lb.gender,
            this.address = lb.gender,
            this.id_student_class = lb.id_student_class
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
                'name_students': this.name_students,
                'birth_date': this.birth_date,
                'gender'    : this.gender,
                'address'   : this.address,
                'id_student_class': this.id_student_class
            }
            if(this.action === 'insert'){ //POST
                axios.post(api_url + '/add_students', form, token)
                .then( res => {
                    Swal.fire(res.data.message, 'Data Added', 'success');
                })
            } else 
            { //PUT
              axios.put(api_url + '/students/' + this.id_students, form, token)
                .then( res => {
                    Swal.fire(res.data.message, 'Data Updated', 'success');
            })}

            this.getData();
        },
         Delete: function(id_students){
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
                        axios.delete(api_url + '/students/' + id_students, token)
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
            this.photo_students=e.target.files[0]
        },
        Upload: function(id_students){
             let token ={
                headers : {"Authorization" : "Bearer " + this.$cookies.get("Authorization"),'Content-Type':'multipart/form-data'}
            }

            //images can only be uploaded through form data
            let form = new FormData()
            form.append('photo_students', this.photo_students)

            axios.post(api_url + '/students/upload_photo/'+ id_students, form, token)
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