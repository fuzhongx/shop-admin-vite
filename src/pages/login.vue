<template>
  <el-row class="contair">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div class="title">欢迎光临</div>
        <div class="text-light-900 mt-8">
          欢迎来到若依管理系统、信誉无价、服务至上
        </div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <div>
        <h3 class="title">欢迎回来</h3>
        <div class="menager">
          <span class="line"></span>
          <span class="text">账号密码登录</span>
          <span class="line"></span>
        </div>

        <el-form ref="suFormReF" :model="From" :rules="rules" class="w-[350px]" >
          <el-form-item prop="username">
            <el-input v-model="From.username" class="h-10" placeholder="请输入账号">
              <template #prefix>
                <el-icon>
                  <UserFilled />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="From.password" class="h-10" type="password" show-password placeholder="请输入密码">
              <template #prefix>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button  @click="submitForm()" class="subBtn" :loading='loading'>登
              录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script  setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { toast } from '@/composables/util'

const From = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    // { min: 6, max: 18, message: "请输入6-18位数密码", trigger: "blur" },
  ],
};


const suFormReF = ref(null);
const loading = ref(false)
const router = new useRouter();
const store = useStore()

const submitForm = async () => {
  await suFormReF.value.validate((valid, fields) => {

    if (!valid) return;

    loading.value = true

    store.dispatch('login', From).then(() => {
      toast("登录成功", 'success', 1000);
      router.push("/");
    }).finally(() => {
      loading.value = false//请求结束之后
    })

  })
};

//键盘回车登录
const onKeyup = (e) => {
  if (e.key =='Enter') submitForm()
}

onMounted(() => {
  //监听键盘事件
  document.addEventListener('keyup', onKeyup)
})

//页面卸载之后移除监听
onBeforeUnmount(() => {
  document.removeEventListener('keyup',onKeyup)
})


</script>

<style scoped>
.contair {
  @apply flex h-screen;
}

.contair .left {
  @apply bg-blue-500 flex flex-col justify-center items-center;
}

.contair .left .title {
  @apply font-bold text-6xl text-white;
}

.contair .right {
  @apply flex justify-center items-center flex-col;
}

.contair .right .title {
  @apply font-bold text-4xl text-center;
}

.contair .right .menager {
  @apply flex justify-between items-center text-light-800 mt-8 mb-8;
}

.contair .right .menager .line {
  @apply border-gray-100 border-1 w-[110px];
}

.contair .right .menager .text {
  @apply text-center text-gray-300;
}

.subBtn {
  @apply w-100 h-10 bg-blue-500 text-light-300;
}
</style>