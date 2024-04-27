<template>
  <scroll-view
    class="viewport"
    scroll-y
    enable-back-to-top
    :style="{ height: screenHeight + 'px' }"
  >
    <view class="container" v-if="showForm === false">
      <image
        class="pet-avator"
        @tap="goBack()"
        :src="petStore.curPet!.picture"
        mode="aspectFill"
        lazy-load
      />
      <view class="pet-info">
        <view class="pet-card">
          <view class="top-bar">
            <image
              :src="petStore.curPet!.kind==='猫'?'../../static/images/mao.png':'../../static/images/dog.png'"
              mode="scaleToFill"
              class="avator"
            />
            <view class="image-info">
              <view class="bar1">
                <view class="name">{{ petStore.curPet!.name }}</view>
                <image
                  class="gender"
                  :src="petStore.curPet!.sex==='男'?'../../static/images/nan.png':'../../static/images/nv.png'"
                  mode="scaleToFill"
                />
              </view>
              <view class="bar2">{{ petStore.curPet!.description }}</view>
            </view>
          </view>
          <view class="biaoqian">
            <view class="pin pin1">{{ petStore.curPet!.birthday }}</view>
            <view class="pin pin2">{{ petStore.curPet!.health }}</view>
          </view>
        </view>
        <view class="detail-cards">
          <view
            class="dedatil-card"
            v-for="(item, j) in petMatterList"
            :key="j"
            :style="getBac(item.classification)"
          >
            <view class="left">
              <view class="time">
                <view class="matter-time"
                  >{{ item.startTime[0] }}.{{ item.startTime[1] }}.{{ item.startTime[2] }}-{{
                    item.finishTime[0]
                  }}.{{ item.finishTime[1] }}.{{ item.finishTime[2] }}</view
                >
                <view class="cishu">{{ item.implementationCycleByDay }}天/次</view>
              </view>
              <view class="matter-name">{{ item.title }}</view>
              <view class="matter-detail">{{ item.content }}</view>
              <view class="type-container">
                <view class="matter-type">{{ item.classification }}</view>
              </view>
            </view>
            <view class="right">
              <image class="matter-picture" :src="getImg(item.classification)" mode="aspectFit" />
            </view>
          </view>
        </view>
      </view>
      <button @tap="showForm = true" class="button-87" role="button" hover-class="button-87-hover">
        + 提交事项
      </button>
      <view class="down-bar"></view>
    </view>
    <view class="input-form" v-if="showForm" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <view class="title">请填写宠物事项</view>
      <view class="form">
        <view class="form-content">
          <view class="form-item">
            <text class="label">事项标题：</text>
            <input class="input item-content" type="text" v-model="matter.title" />
          </view>
          <view class="form-item">
            <text class="label">事项内容：</text>
            <input class="input item-content" type="text" v-model="matter.content" />
          </view>
          <view class="form-item">
            <text class="label">执行周期：</text>
            <input
              class="input item-content"
              type="text"
              v-model="matter.implementationCycleByDay"
            />
          </view>
          <view class="form-item">
            <text class="label">是否只进行一次：</text>
            <radio-group @change="onTimesChange" class="item-content select">
              <label class="radio">
                <radio value="是" color="#27ba" />
                是
              </label>
              <label class="radio">
                <radio value="否" color="#27ba" />
                否
              </label>
            </radio-group>
          </view>
          <view class="form-item">
            <text class="label">开始时间：</text>
            <picker
              class="picker item-content"
              mode="date"
              start="1900-01-01"
              :end="new Date()"
              :value="matter.startTime"
              @change="onStartTimeChange"
            >
              <view v-if="matter.startTime">{{ matter.startTime }}</view>
              <view class="placeholder" v-else>请选择日期</view>
            </picker>
          </view>
          <view class="form-item">
            <text class="label">结束时间：</text>
            <picker
              class="picker item-content"
              mode="date"
              start="1900-01-01"
              end="2500-01-01"
              :value="matter.finishTime"
              @change="onFinishTimeChange"
            >
              <view v-if="matter.finishTime">{{ matter.finishTime }}</view>
              <view class="placeholder" v-else>请选择日期</view>
            </picker>
          </view>
          <!-- 提交按钮 -->

          <button class="btn-grad" hover-class="btn-grad-hover" role="button" @tap="onSubmit">
            + 提交事项
          </button>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { usePetStore } from '../../stores/modules/pet'
import { getPetMattersAPI, postPetMatterAPI } from '@/services/pet'
import type { PetMatter, PetMatterList } from '@/types/pet'
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

/**HEALTH,DIET,TRAIN,SPORT,OTHERS */
// background-image: linear-gradient(to right, #9db3d3, #a0c9d9, #b6dbd9, #d5ebde, #f5f9eb);
//background-image: linear-gradient(to right, #96e7c4, #b6ebc7, #d0efce, #e5f4db, #f5f9eb);
//background-image: linear-gradient(to right, #e3ff87, #e7fea2, #ecfdbb, #f0fbd3, #f5f9eb);
//background-image: linear-gradient(to right, #f2a2e4, #ffb2c2, #ffccb7, #f9e6c9, #f5f9eb);
//background-image: linear-gradient(to right, #ee7b4f, #e9a364, #e4c48a, #e6e1ba, #f5f9eb);
const { safeAreaInsets } = uni.getSystemInfoSync()
const screenHeight = uni.getSystemInfoSync().windowHeight
const showForm = ref(false)
const petStore = usePetStore()
const imageValue = ref('')
const matter = ref<PetMatter>({} as PetMatter)
matter.value.petId = petStore.curPet!.id
const petMatterList = ref<PetMatterList>([])

const getImg = (type: string) => {
  switch (type) {
    case 'HEALTH': {
      return '../../static/images/1.png'
    }
    case 'DIET': {
      return '../../static/images/2.png'
    }
    case 'TRAIN': {
      return '../../static/images/3.png'
    }
    case 'SPORT': {
      return '../../static/images/4.png'
    }
    case 'OTHERS': {
      return '../../static/images/5.png'
    }
  }
}
const getBac = (type: string) => {
  switch (type) {
    case 'HEALTH': {
      return 'background-image: linear-gradient(to right, #9db3d3, #a0c9d9, #b6dbd9, #d5ebde, #f5f9eb);'
    }
    case 'DIET': {
      return 'background-image: linear-gradient(to right, #96e7c4, #b6ebc7, #d0efce, #e5f4db, #f5f9eb);'
    }
    case 'TRAIN': {
      return 'background-image: linear-gradient(to right, #e3ff87, #e7fea2, #ecfdbb, #f0fbd3, #f5f9eb);'
    }
    case 'SPORT': {
      return 'background-image: linear-gradient(to right, #ee7b4f, #e9a364, #e4c48a, #e6e1ba, #f5f9eb);'
    }
    case 'OTHERS': {
      return 'background-image: linear-gradient(to right, #f2a2e4, #ffb2c2, #ffccb7, #f9e6c9, #f5f9eb);'
    }
  }
}

const onTimesChange: UniHelper.RadioGroupOnChange = (ev) => {
  matter.value.onlyOnce = ev.detail.value === 'true'
}
const onFinishTimeChange: UniHelper.DatePickerOnChange = (ev) => {
  matter.value.finishTime = ev.detail.value
}
const onStartTimeChange: UniHelper.DatePickerOnChange = (ev) => {
  matter.value.startTime = ev.detail.value
}
const onSubmit = () => {
  const result = postPetMatterAPI({
    finishTime: matter.value.finishTime,
    content: matter.value.content,
    implementationCycleByDay: parseInt(matter.value.implementationCycleByDay),
    onlyOnce: matter.value.onlyOnce,
    petId: matter.value.petId,
    startTime: matter.value.startTime,
    title: matter.value.title,
  })
  showForm.value = false
  goBack()
}
onLoad(() => {
  getList()
})
const getList = async () => {
  const result = await getPetMattersAPI(petStore.curPet!.id)
  petMatterList.value = result.result
}
const goBack = () => {
  uni.navigateBack({
    delta: 1, //返回层数，2则上上页
  })
}
</script>

<style scoped>
.viewport {
  position: absolute;
}
.container {
  width: 100%;
}
.pet-info {
  background-color: white;
  position: relative;
  border-radius: 90rpx;
  transform: translateY(-100rpx);
}
.pet-card {
  border-radius: 12%;
  padding-left: 30%;
}
.pet-avator {
  width: 100%;
  height: 900rpx;
}
.top-bar {
  display: flex;
  align-items: center;
}
.image-info {
  padding: 20rpx;
}
.avator {
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
}
.name {
  font-family: sans-serif;
  font-weight: bold;
  padding: 10rpx;
}
.gender {
  width: 50rpx;
  height: 50rpx;
}
.bar1 {
  display: flex;
  align-items: center;
}
.bar2 {
  padding: 10rpx;
  color: rgb(177, 190, 202);
}
.biaoqian {
  display: flex;
  padding: 10rpx;
}
.pin {
  padding: 10rpx;
  margin-right: 10rpx;
  border-radius: 15rpx;
  background-color: aliceblue;
}

/**事项卡片 */
.time {
  display: flex;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 24rpx;
}
.cishu {
  margin-left: 20rpx;
}
.matter-detail {
  font-size: 24rpx;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}
.type-container {
  display: flex;
}
.matter-type {
  font-size: 16rpx;
  color: white;
  padding: 12rpx;
  border-radius: 20rpx;
  background-color: rgba(107, 143, 143, 0.374);
}
.dedatil-card {
  display: flex;
  margin: 30rpx;
  padding: 30rpx;
  border-radius: 30rpx;
  justify-content: space-between;
  background-image: linear-gradient(to right, #9db3d3, #a0c9d9, #b6dbd9, #d5ebde, #f5f9eb);
}
.matter-picture {
  width: 200rpx;
}

/* 按钮CSS */
.button-87 {
  margin: 40rpx;
  padding: 15rpx 200rpx;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  box-shadow: 0px 0px 14px -7px #f09819;
  background-image: linear-gradient(45deg, #ff512f 0%, #f09819 51%, #ff512f 100%);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  height: 120rpx;
}

.button-87-hover {
  background-position: right center;
  /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

.button-87:active {
  transform: scale(0.95);
}
.down-bar {
  height: 30rpx;
}

/***************************************form css ******************************/

.title {
  margin: 40rpx;
  font-family: sans-serif;
  color: rgb(183, 183, 183);
}
.viewport {
  height: 100%;
  background-repeat: no-repeat;
  background-size: auto;
  display: flex;
  background-color: rgb(248, 248, 248);
}
.form {
  padding: 40rpx;
  margin: 40rpx;
  background-color: white;
  border-radius: 30rpx;
}
.item-content {
  margin-top: 18rpx;
  background-color: rgb(248, 248, 248);
  border-radius: 20rpx;
  height: 70rpx;
  display: flex;
  align-items: center;
  padding: 20rpx;
}
.form-item {
  font-family: sans-serif;
  font-weight: bold;
  margin-bottom: 30rpx;
}
.image {
  height: 100rpx;
  width: 100rpx;
  border-radius: 10rpx;
}
.select {
  display: flex;
  justify-content: space-around;
}
.btn-grad {
  background-image: linear-gradient(to right, #fdfc47 0%, #24fe41 51%, #fdfc47 100%);
  padding: 12px 25px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
  font-family: sans-serif;
  font-size: 32rpx;
  font-weight: bold;
}

.btn-grad-hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>
