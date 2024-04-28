<template>
  <view class="card" :style="{ paddingTop: safeAreaInsets!.top + 'px' }">
    <h4 class="title">即刻登录!</h4>
    <form>
      <view style="text-align: left; color: white;">
        <view>账号</view>
        <view class="field">
          <input v-model="account" autocomplete="off" placeholder="请输入账号" class="input-field">
        </view>
      </view>

      <view style="text-align: left; color: white;">
        <view>密码</view>
        <view class="field">
          <input v-model="password" autocomplete="off" placeholder="请输入密码" class="input-field" type="password">
        </view>
      </view>

      <button class="btn" type="submit" @click="submit">登录/注册</button>
      <a href="#" class="btn-link">忘记密码?</a>
    </form>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { loginByAccount } from '@/services/login'
  import { useMemberStore } from '@/stores'
  import { getPetInfoAPI } from '@/services/pet'
  import { usePetStore } from '@/stores/modules/pet'
  import { getPetNewsAPI } from '@/services/pet'
  const { safeAreaInsets } = uni.getSystemInfoSync()

  const account = ref("")
  const password = ref("")

  const submit = async () => {
    const result = await loginByAccount(account.value, password.value)
    console.log(result)
    uni.showToast({ icon: 'none', title: '登录成功' })
    const memberStore = useMemberStore()
    memberStore.setProfile(result.result)
    const result2 = await getPetInfoAPI()
    const petStore = usePetStore()
    petStore.setPetsInfo(result2.result.pets)
    const result3 = await getPetNewsAPI()
    petStore.newsList = result3.result.splice(0, 3)
    setTimeout(() => {
      // 页面跳转
      uni.switchTab({ url: '/pages/my/my' })
    }, 500)
  }
</script>

<style scoped>
  .card {
    width: 100%;
    height: 100%;
    padding: 1.9rem 1.2rem;
    text-align: center;
    background: #518dfd;
  }

  /*Inputs*/
  .field {
    margin-top: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5em;
    background-color: white;
    border-radius: 4px;
    padding: .5em 1em;
    margin-bottom: 20px;
    height: 60px;
  }

  .input-icon {
    height: 1em;
    width: 1em;
    fill: #ffeba7;
  }

  .input-field {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    color: #303030;
  }

  /*Text*/
  .title {
    margin-top: 45%;
    margin-bottom: 1rem;
    font-size: 1.5em;
    font-weight: 500;
    color: #f5f5f5;
  }

  /*Buttons*/
  .btn {
    margin: 1rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    font-size: .8em;
    text-transform: uppercase;
    padding: 0.6em 1.2em;
    background-color: #ffeba7;
    color: #5e6681;
    box-shadow: 0 8px 24px 0 rgb(255 235 167 / 20%);
    transition: all .3s ease-in-out;
  }

  .btn-link {
    color: #f5f5f5;
    display: block;
    font-size: .75em;
    transition: color .3s ease-out;
  }

  /*Hover & focus*/
  .field input:focus::placeholder {
    opacity: 0;
    transition: opacity .3s;
  }

  .btn:hover {
    background-color: #5e6681;
    color: #ffeba7;
    box-shadow: 0 8px 24px 0 rgb(16 39 112 / 20%);
  }

  .btn-link:hover {
    color: #ffeba7;
  }
</style>
