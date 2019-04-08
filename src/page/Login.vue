<template>
    <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户" prop="username" :clearable="clearable">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" :clearable="clearable" show-password></el-input>
            </el-form-item>

            <el-form-item label="记住密码" prop="remember">
                <el-switch v-model="ruleForm.remember"></el-switch>
            </el-form-item>


            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    mounted(){
        //console.log(tool);
        this.check();
    },
    data(){
        return {
            clearable: true,
            ruleForm: {
                username: '',
                password: '',
                remember: false,
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 256, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                
            }
        };
    },
    methods: {
        
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    tool.patch('login',{username: this.ruleForm.username, password: this.ruleForm.password,remember:this.ruleForm.remember});
                } 
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        check(){
            if(tool.auth.getToken()){
                rt.push('/');
            }
        }
    }
}
</script>

<style>

    .login{
        width: 350px;
        padding: 15px 10px;
        margin: 50px auto;
        border:1px solid #ccc;
        border-radius:10px;
    }
</style>
