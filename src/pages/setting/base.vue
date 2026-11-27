<template>
    <div>
        <el-card shadow="never" :body-style="{ padding: '20px' }">
            <el-tabs class="demo-tabs" v-model="changeLayout">
                <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabBars" :key="index"
                    @click="() => changeLayout = item.key"></el-tab-pane>
            </el-tabs>

            <el-form :model="form" ref="formRef" label-width="150px">
                <!-- 注册与访问 -->
                <template v-if="changeLayout == 1">
                    <el-form-item label="是否允许注册会员">
                        <el-radio-group v-model="form.open_reg">
                            <el-radio label="开启" value=1></el-radio>
                            <el-radio label="关闭" value=0></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="注册类型">
                        <el-radio-group v-model="form.reg_method">
                            <el-radio label="普通注册" value="username"></el-radio>
                            <el-radio label="手机注册" value="phone"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="密码最小长度">
                        <el-input v-model="form.password_min" style="width: 30%;"></el-input>
                    </el-form-item>
                    <el-form-item label="强制密码复杂度">
                        <el-checkbox-group v-model="form.password_encrypt">
                            <el-checkbox v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-checkbox-group>
                    </el-form-item>
                </template>
                <!-- 上传设置 -->
                <template v-if="changeLayout == 2">
                    <el-form-item label="默认上传方式" label-width="230px">
                        <el-radio v-model="form.upload_method" label="阿里oss" value="oss"></el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-form :model="form.upload_config" label-width="80px">
                            <el-form-item label="Bucket">
                                <el-input v-model="form.upload_config.Bucket"></el-input>
                            </el-form-item>
                            <el-form-item label="ACCESS_KEY">
                                <el-input v-model="form.upload_config.ACCESS_KEY"></el-input>
                            </el-form-item>
                            <el-form-item label="SECRET_KEY">
                                <el-input v-model="form.upload_config.SECRET_KEY"></el-input>
                            </el-form-item>
                            <el-form-item label="空间域名">
                                <el-input v-model="form.upload_config.http" style="position: relative;">
                                    <template #prefix>http</template>
                                </el-input>
                                <span class="text-gray-400 w-[200px] px-1 text-xs" style="position: absolute; left:100%;">
                                    请补全https://或http://</span>
                            </el-form-item>
                        </el-form>
                    </el-form-item>
                </template>
                <!-- Api安全 -->
                <template v-if="changeLayout == 3">
                    <el-form-item label="是否开启Api安全">
                        <el-radio-group v-model="form.api_safe">
                            <el-radio label="是" value=1></el-radio>
                            <el-radio label="否" value=0></el-radio>
                        </el-radio-group>
                        <span class="ml-2 text-gray-500 text-xs">Api安全功能开启之后，调用前端api需要传输前面串</span>
                    </el-form-item>
                    <el-form-item label="秘钥">
                        <el-input v-model="form.api_secret" style="width: 40%;"></el-input>
                        <p  class=" text-gray-400 text-xs">秘钥设置关系系统中api调用传输签名串的编码规则，以及会员解析，请慎重设置，注意设置之后对应会员要求重新登录获取token</p>
                    </el-form-item>
                </template>
                <el-form-item>
                    <el-button type="primary" @click="submit" v-loading="loading">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { getSysConfig, updateSysConfig } from '@/api/sysConfig'

const formRef = ref(null)
const changeLayout = ref(1)

let tabBars = [
    {
        key: 1,
        name: '注册与访问'
    },
    {
        key: 2,
        name: '上传设置'
    },
    {
        key: 3,
        name: 'Api安全'
    },
]

let options = [{
    label: '数字',
    value: 0
},
{
    label: '小写字母',
    value: 1
},
{
    label: '大写字母',
    value: 2
},
{
    label: '符号',
    value: 3
}]

const form = reactive({
    open_reg: '1',
    reg_method: "username",
    password_min: 7,
    password_encrypt: [0, 1, 2],
    upload_method: "oss",
    upload_config: {
        Bucket: "",
        ACCESS_KEY: "",
        SECRET_KEY: "",
        http: ""
    },
    api_safe: '1',
    api_secret: "",
    close_order_minute: 0,
    auto_received_day: 0,
    after_sale_day: 0,
    alipay: {
        "app_id": "",
        "ali_public_key": "",
        "private_key": ""
    },
    "wxpay": {
        "app_id": "",       // 公众号 APPID
        "miniapp_id": "",   // 小程序 APPID
        "secret": "",       // 小程序secret
        "appid": "",        // appid
        "mch_id": "",       // 商户号
        "key": "",          // API 密钥
        "cert_client": "",
        "cert_key": ""
    }
})

const loading=ref(false)

const submit = () => {
    updateSysConfig(form).then(res => {
    }).finally(()=>{
    })
}
</script>