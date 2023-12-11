<template>
  <view>录入宠物信息</view>
  <view class="form">
    <view class="form-content">
      <uni-file-picker
        v-model="filePath"
        file-mediatype="image"
        mode="grid"
        file-extname="png,jpg"
        :limit="1"
      />
      <!-- <view class="avatar">
        <view class="avatar-content" @tap="onChoosePhone">
          <text class="text">宠物照片</text>
          <image class="image" :src="filePath" mode="aspectFill" />
        </view>
      </view> -->
      <view class="form-item">
        <text class="label">宠物名：</text>
        <input class="input" type="text" placeholder="请填写宠物名" v-model="petInfo!.name" />
      </view>
      <view class="form-item">
        <text class="label">宠物种类：</text>
        <input class="input" type="text" placeholder="请填写宠物种类" v-model="petInfo!.kind" />
      </view>
      <view class="form-item">
        <text class="label">宠物品种：</text>
        <input
          class="input"
          type="text"
          placeholder="请填写宠物品种"
          v-model="petInfo.description"
        />
      </view>
      <view class="form-item">
        <text class="label">宠物性别：</text>
        <radio-group @change="onSexChange">
          <label class="radio">
            <radio value="公" color="#27ba" :checked="petInfo.sex === '公'" />
            公
          </label>
          <label class="radio">
            <radio value="母" color="#27ba" :checked="petInfo.sex === '母'" />
            母
          </label>
        </radio-group>
      </view>
      <view class="form-item">
        <text class="label">领养日期：</text>
        <picker
          class="picker"
          mode="date"
          start="1900-01-01"
          :end="new Date()"
          :value="petInfo.adoptDate"
          @change="onAdoptDateChange"
        >
          <view v-if="petInfo.adoptDate">{{ petInfo.adoptDate }}</view>
          <view class="placeholder" v-else>请选择日期</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">出生日期：</text>
        <picker
          class="picker"
          mode="date"
          start="1900-01-01"
          :end="new Date()"
          :value="petInfo.birthDate"
          @change="onBirthDateChange"
        >
          <view v-if="petInfo.birthDate">{{ petInfo.birthDate }}</view>
          <view class="placeholder" v-else>请选择日期</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">宠物体重：</text>
        <input class="input" type="text" placeholder="请填写宠物体重" v-model="petInfo.weight" />
      </view>
    </view>
    <view class="form-item">
      <text class="label">是否接种狂犬疫苗：</text>
      <radio-group @change="onInoculationChange">
        <label class="radio">
          <radio value="是" color="#27ba" :checked="petInfo.inoculation === '是'" />
          是
        </label>
        <label class="radio">
          <radio value="否" color="#27ba" :checked="petInfo.inoculation === '否'" />
          否
        </label>
      </radio-group>
    </view>
    <view class="form-item">
      <text class="label">是否绝育：</text>
      <radio-group>
        <label class="radio">
          <radio value="是" color="#27ba" :checked="petInfo.sterilization === '是'" />
          是
        </label>
        <label class="radio">
          <radio value="否" color="#27ba" :checked="petInfo.sterilization === '否'" />
          否
        </label>
      </radio-group>
    </view>
  </view>
  <view class="form-item">
    <text class="label">日常活动水平：</text>
    <input
      class="input"
      type="text"
      placeholder="请填写日常活动时间"
      v-model="petInfo.activityTime"
    />
  </view>
  <view class="form-item">
    <text class="label">近期食物过敏或不适反应：</text>
    <input
      class="input"
      type="text"
      placeholder="请填写食物过敏或不适情况"
      v-model="petInfo.allergy"
    />
  </view>
  <view class="form-item">
    <text class="label">近期健康状况：</text>
    <input class="input" type="text" placeholder="请填写健康状况" v-model="petInfo.health" />
  </view>
  <view class="form-item">
    <text class="label">上次除虫时间：</text>
    <picker
      class="picker"
      mode="date"
      start="1900-01-01"
      :end="new Date()"
      :value="petInfo.disinfectTime"
      @change="onDisinfectTimeChange"
    >
      <view v-if="petInfo.disinfectTime">{{ petInfo.disinfectTime }}</view>
      <view class="placeholder" v-else>请选择日期</view>
    </picker>
  </view>
  <!-- 提交按钮 -->
  <button class="form-button" @tap="onSubmit">提交宠物信息</button>
</template>

<script lang="ts" setup>
import { getMemberProfileAPI, putMemberProfileAPI } from '@/services/profile'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { ProfileDetail } from '@/types/member'
import type { PetParams } from '@/types/pet'
import { usePetStore } from '@/stores/modules/pet'
//获取个人信息
const profile = ref<ProfileDetail>({} as ProfileDetail)
const getMemberProfileData = async () => {
  const result = await getMemberProfileAPI()
  profile.value = result.result
}
const petStore = usePetStore()
const filePath = ref('')
const petInfo = ref<PetParams>({} as PetParams)

const onChoosePhone = () => {
  // 调用拍照/选择图片
  uni.chooseMedia({
    // 文件个数
    count: 1,
    // 文件类型
    mediaType: ['image'],
    success: (res) => {
      // 本地路径
      const { tempFilePath } = res.tempFiles[0]
      filePath.value = tempFilePath
    },
  })
}

const onBirthDateChange: UniHelper.DatePickerOnChange = (ev) => {
  petInfo.value.birthDate = ev.detail.value
}

const onAdoptDateChange: UniHelper.DatePickerOnChange = (ev) => {
  petInfo.value.adoptDate = ev.detail.value
}

const onDisinfectTimeChange: UniHelper.DatePickerOnChange = (ev) => {
  petInfo.value.disinfectTime = ev.detail.value
}

// 修改性别
const onSexChange: UniHelper.RadioGroupOnChange = (ev) => {
  petInfo.value.sex = ev.detail.value
}
// 修改性别
const onInoculationChange: UniHelper.RadioGroupOnChange = (ev) => {
  petInfo.value.inoculation = ev.detail.value
}

const onSubmit = () => {
  // 创建宠物
  uni.uploadFile({
    url: 'http://8.140.57.220:8889/puppygo/pet',
    name: 'file', // 后端数据字段名
    filePath: filePath.value, // 宠物图片
    formData: {
      name: petInfo.value.name,
      description: petInfo.value.description,
      sex: petInfo.value.sex,
      adoptDate: petInfo.value.adoptDate,
      birthDate: petInfo.value.birthDate,
      weight: petInfo.value.weight,
      kind: petInfo.value.kind,
      inoculation: petInfo.value.inoculation,
      sterilization: petInfo.value.sterilization,
      activityTime: petInfo.value.activityTime,
      allergy: petInfo.value.allergy,
      health: petInfo.value.health,
      disinfectTime: petInfo.value.disinfectTime,
    },
    success: (res) => {
      // 判断状态码是否上传成功
      if (res.statusCode === 200) {
        uni.showToast({ icon: 'success', title: '更新成功' })
        console.log('更新成功返回的信息为')
        petStore.petsInfo = JSON.parse(res.data).result.pets
        console.log(petStore.petsInfo)
        console.log(res)
      } else {
        uni.showToast({ icon: 'error', title: '出现错误' })
        console.log('出现错误的返回信息为：')
        console.log(res)
      }
    },
  })
}

onLoad(() => {
  getMemberProfileData()
})
</script>

<style scoped>
.form-item {
  display: flex;
}
.image {
  height: 100rpx;
  width: 100rpx;
  border-radius: 10rpx;
}
</style>
