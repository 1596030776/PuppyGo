<template>
  <view class="container" :v-if="showForm === false">
    <view class="pet-card">
      <image class="pet-avator" :src="petStore.curPet!.picture" mode="aspectFill" lazy-load />
      <view class="pet-name">{{ petStore.curPet!.name }}</view>
      <view class="pet-kind">{{ petStore.curPet!.kind }}</view>
      <view class="pet-description">{{ petStore.curPet!.description }}</view>
      <view class="aniversary">{{ petStore.curPet!.birthday }}</view>
    </view>
    <button class="form-button" @tap="showForm = true">添加卡片</button>
  </view>
  <view class="input-form" :v-if="showForm">
    <view>
      <view class="title">选择卡片类型</view>
      <checkbox-group>
        <label> <checkbox value="cb" :checked="true" />健康</label>
        <label> <checkbox value="cb" />生活</label>
        <label> <checkbox value="cb" />其它</label>
      </checkbox-group>
    </view>
    <view class="uni-common-mt">
      <view class="uni-form-item uni-column">
        <view class="title">卡片标题</view>
        <input class="uni-input" focus placeholder="请输入卡片标题" />
        <view class="title">卡片内容</view>
        <input class="uni-input" placeholder="请输入卡片内容" />
      </view>
    </view>
    <uni-file-picker
      v-model="imageValue"
      file-mediatype="image"
      mode="grid"
      file-extname="png,jpg"
      :limit="1"
    />
    <button class="form-button" @tap="onSubmit">提交宠物卡片</button>
  </view>
</template>

<script lang="ts" setup>
import { usePetStore } from '../../stores/modules/pet'
import { ref } from 'vue'
const showForm = ref(false)
const petStore = usePetStore()
const imageValue = ref('')

const onSubmit = () => {
  console.log('submit')
  showForm.value = false
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pet-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50rpx;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.pet-avator {
  width: 700rpx;
  height: 700rpx;
}
</style>
