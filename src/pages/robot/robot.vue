<template>
  <view class="chat">
    <scroll-view
      :style="{ paddingTop: safeAreaInsets?.top + 'px', height: screenHeight + 'px' }"
      id="scrollview"
      scroll-y="true"
      :scroll-with-animation="true"
      class="scroll-view"
    >
      <u-navbar
        title="PetCareRobot"
        :autoBack="false"
      >
      </u-navbar>
      <!-- 聊天主体 -->
      <view class="chat-body msglistview">
        <!-- 聊天记录 -->
        <view v-for="(item, index) in msgList" :key="index">
          <!-- 用户会话框 -->
          <view class="item self" v-if="item.userContent != ''">
            <view class="content right">
              <view class="user-content">
                <image v-if="item.imageUrl!==''" class="catalog-img" :src="item.imageUrl" mode="aspectFill" />
                <!-- <image :src="item.imageUrl" mode="aspectFill" /> -->
                {{ item.userContent }}
              </view>
            </view>
            <view class="avatar">
              <image :src="memberStore.profile.avatar" mode="aspectFill"
            /></view>
          </view>
          <!-- 机器人对话框 -->
          <view class="item Ai">
            <view class="avatar">
              <image src="../../static/images/robot.png" mode="aspectFit" />
            </view>
            <view class="content left">
              <view class="load-6" v-if="item.botContent === ''">
                <view class="letter-holder">
                  <view class="l-1 letter">L</view>
                  <view class="l-2 letter">o</view>
                  <view class="l-3 letter">a</view>
                  <view class="l-4 letter">d</view>
                  <view class="l-5 letter">i</view>
                  <view class="l-6 letter">n</view>
                  <view class="l-7 letter">g</view>
                  <view class="l-8 letter">.</view>
                  <view class="l-9 letter">.</view>
                  <view class="l-10 letter">.</view>
                </view>
              </view>
              <view class="bot-content" v-if="item.botContent !== ''">
                {{ item.botContent }}
              </view>
              <view v-if="item.hasSelest" class="select-section">
                <u-divider text="" textPosition="center"
                style="background-color: #eef4ff;">请选择宠物</u-divider>
                <u-tabs fontSize="22"
                :current="currentPet"
                class="pet-tab" :list="petStore.petsInfo"
                @click="initConservation"></u-tabs>
              </view>
              <view v-if="item.isAnswer">
                <u-line length="80%"></u-line>
                <view class="matter-add-row">
                  <view class="add-matter">
                  将该回答加入宠物事项
                  </view>
                  <checkbox
                  style="border-radius: 50%;"
                    v-if="item.isAnswer"
                    @tap="addToMatters(item.fragmentId)"
                    :value="item.value"
                    :checked="item.checked"
                  />
                </view>
              </view>
            </view>
            <!-- 加入事项 -->
            <!-- <checkbox
              v-if="item.isAnswer"
              @tap="addToMatters(item.fragmentId)"
              :value="item.value"
              :checked="item.checked"
            /> -->
          </view>
        </view>
        <!-- 宠物选择框 -->
        <!-- <view>
          <view class="pets-container" v-if="!chatStore.conservation">
            <view class="pet-bar">
              <view
                class="pet-item"
                v-for="(item, j) in petStore.petsInfo"
                :key="j"
                @tap="initConservation(item.id, item.name)"
              >
                <image class="pet-avator" :src="item.picture" mode="aspectFill" />
              </view>
            </view>
          </view>
        </view> -->
      </view>
    </scroll-view>
    <!-- 底部消息发送栏 -->
    <!-- 用来占位，防止聊天消息被发送框遮挡 -->
    <view class="chat-bottom">
      <view class="send-msg">
        <view class="uni-textarea">
          <input
            v-model="chatMsg"
            maxlength="300"
            :show-confirm-bar="false"
            auto-height
          />
        </view>
        <button @click="handleSend" class="send-btn">
          <image
            class="send-button-pic"
            mode="aspectFill"
            src="../../static/images/send.png"
          ></image>
        </button>
        <image
          @tap="onChoosePhone"
          class="send-picture"
          mode="aspectFill"
          :src="
            !pictureSelected
              ? '../../static/images/ts-picture.png'
              : '../../static/images/picture.png'
          "
        ></image>
      </view>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import {
  initConservationAPI,
  postFragment,
  getStatue,
  getAnswer,
  getPetMatterAdvice,
} from '@/services/chat'
import { getPetMatterAdviceAPI, postPetMatterAPI } from '@/services/pet'
import { useChatStore } from '@/stores/modules/chat'
import { usePetStore } from '@/stores/modules/pet'
import { useMemberStore } from '@/stores'

const memberStore = useMemberStore()
const screenHeight = uni.getSystemInfoSync().windowHeight
const { safeAreaInsets } = uni.getSystemInfoSync()
const petStore = usePetStore()
const filePath = ref('')
const chatStore = useChatStore()
const scrollTop = 0
const userId = ref('')
//发送的消息
const chatMsg = ref('')
const msgList = ref([
  {
    botContent: `我是一个基于大模型的宠物助手机器人，我可以帮助你提供一些建议。你可以这样问我：\n
      "我该如何训练我的狗狗"\n
      "我的狗狗最近食欲不振，有什么办法可以帮助他？"\n
      "我的狗出去玩的时候被划伤了，现在血流不止，我该怎么办？"\n
      你还可以给我传送图片，以帮助我更好的了解宠物的信息。希望能帮到你！\n`,
    fragmentId: 0,
    imageUrl: '',
    userContent: '',
    isAnswer: false,
    hasSelest:false,
  },
  {
    botContent: `请问你要针对哪只宠物进行咨询呢？`,
    fragmentId: 0,
    imageUrl: '',
    userContent: '',
    isAnswer: false,
    hasSelest:true,
  },
])
const pictureSelected = ref(false)
const currentPet = ref(-1)
const data = reactive({
  switch:true
})

const asyncChange = (e) => {
  console.log("这是点",e)
  uni.showModal({
    content: e ? '确定要将此回答加入事项？' : '确定要将此回答从事项中删除？',
    success: (res) => {
      console.log("这是确定的",res.confirm)
      if (res.confirm) {
        data.switch = !e
        console.log("结果",data.switch)
      }
    }
  })
}


const onChoosePhone = () => {
  // 调用拍照/选择图片
  uni.chooseImage({
    // 文件个数
    count: 1,
    // 压缩类型
    sizeType: ['original', 'compressed'],
    // 图片源 相册
    sourceType: ['album', 'camera'],
    success: (res) => {
      // 本地路径
      const tempFilePath = res.tempFiles[0]
      filePath.value = tempFilePath.path
      pictureSelected.value = true
    },
  })
}
const windowHeight = () => {
  return proxy.rpxTopx(uni.getSystemInfoSync().windowHeight)
}

const rpxTopx = (px) => {
  let deviceWidth = wx.getSystemInfoSync().windowWidth
  let rpx = (750 / deviceWidth) * Number(px)
  return Math.floor(rpx)
}

// 发送消息
const handleSend = async () => {
  if (!chatStore.conservation) {
    uni.showToast({ icon: 'error', title: '请先选择宠物' })
    return
  }

  if (chatMsg.value === '') {
    uni.showToast({ icon: 'error', title: '不可发送空消息' })
    return
  }
  //如果消息不为空
  if (chatMsg.value !== '' || !/^\s+$/.test(chatMsg.value)) {
    let obj = ref({
      botContent: '',
      fragmentId: 0,
      userContent: chatMsg.value,
      imageUrl: '',
      isAnswer: false,
    })
    if (filePath.value !== '') {
      console.log('发送图片',filePath.value)
      uni.uploadFile({
        //conversationId=${chatStore.conservation.id}&question=${chatMsg.value}
        url: `http://39.105.177.99:28081/puppygo/conversation/fragment`,
        name: 'file', // 后端数据字段名
        filePath: filePath.value, // 宠物图片
        formData: {
          conversationId: chatStore.conservation.id,
          question: chatMsg.value,
        },
        success: (res) => {
          // 判断状态码是否上传成功
          if (res.statusCode === 200) {
            const fragmentId = JSON.parse(res.data).result
            uni.showToast({ icon: 'success', title: '发送成功' })
            obj.value.fragmentId = fragmentId
            obj.value.imageUrl = filePath.value
            msgList.value.push(obj.value)
            const intervalId = setInterval(async () => {
              const statueResult = await getStatue(fragmentId)
              if (statueResult.result === 'GPT_FINISHED') {
                const answerResult = await getAnswer(obj.value.fragmentId)
                clearInterval(intervalId)
                // obj.value.botContent = answerResult.result.answer
                setTimeout(() => {
                  uni.pageScrollTo({
                    scrollTop: 9999, //滚动到页面的目标位置（单位px）
                    duration: 0, //滚动动画的时长，默认300ms，单位 ms
                  })
                }, 100)
                let i=0;
                const charInterval=setInterval(async ()=>{
                  if(i===answerResult.result.answer.length-1){
                    clearInterval(charInterval)
                  }
                  obj.value.botContent+=answerResult.result.answer[i]
                  i += 1
                  obj.value.isAnswer=true
                }, 100)

              } else if (statueResult.result === 'GPT_TIMEOUT') {
                clearInterval(intervalId)
                obj.value.botContent = '搜索专业知识超时'
              } else if (statueResult.result === 'DB_INSERT_FAILED') {
                clearInterval(intervalId)
                obj.value.botContent = '图像识别超时'
              }
            }, 2000)
            pictureSelected.value = false
            filePath.value = ''
            chatMsg.value = ''
          } else {
            uni.showToast({ icon: 'error', title: '出现错误' })
            console.log('出现错误的返回信息为：')
            console.log(res)
          }
        },
      })
    } else {
      const sentenceResult = await postFragment(chatStore.conservation.id, chatMsg.value)
      obj.value.fragmentId = sentenceResult.result
      msgList.value.push(obj.value)
      const intervalId = setInterval(async () => {
        const statueResult = await getStatue(sentenceResult.result)
        if (statueResult.result === 'GPT_FINISHED') {
          const answerResult = await getAnswer(obj.value.fragmentId)
          clearInterval(intervalId)
          // obj.value.botContent = answerResult.result.answer
          obj.value.botContent=''
          let i=0;
          console.log(answerResult.result.answer)
          const charInterval=setInterval(async ()=>{
            if(i===answerResult.result.answer.length-1){
              clearInterval(charInterval)
            }
            obj.value.botContent+=answerResult.result.answer[i]
            i += 1
            obj.value.isAnswer=true
          },100)
        }
      }, 2000)
      chatMsg.value = ''
    }
  } else {
    showToast('不能发送空白消息')
  }
}

const addToMatters = async (id) => {
  const result = await getPetMatterAdviceAPI(id)
  postPetMatterAPI({
    finishTime: result.result.finishTime,
    content: result.result.content,
    implementationCycleByDay: result.result.implementationCycleByDay,
    onlyOnce: result.result.onlyOnce,
    petId: petStore.curPet.id,
    startTime: result.result.startTime,
    title: result.result.title,
  })
  uni.showToast({ icon: 'success', title: '加入成功' })
  console.log('加入事项')
}
const initConservation = async (item) => {
  const index = item.target.id[11]
  currentPet.value = index
  petStore.curPet.id = petStore.petsInfo[index].id
  const result = await initConservationAPI(petStore.petsInfo[index].id)
  chatStore.conservation = result.result
  msgList.value.push({
    botContent: `你选择的宠物是${petStore.petsInfo[index].name}。`,
    fragmentId: 0,
    imageUrl: '',
    userContent: '',
    isAnswer: false,
    hasSelect: false
  })
}
</script>
<style lang="scss" scoped>
$chatContentbgc: #c2dcff;
$sendBtnbgc: #4f7df5;

.top-bar {
  font-family: sans-serif;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90rpx;
}
view,
button,
text,
input {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 聊天消息 */
.chat {
  padding-bottom: 30rpx;
  background-color: white;
  margin-bottom: 50rpx;
  .scroll-view {
    margin-bottom: 40rpx;

    .catalog-img{
      width: 444rpx;
      height:470rpx;
      border-radius: 8rpx;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    }

    .chat-body {
      display: flex;
      flex-direction: column;

      .self {
        justify-content: flex-end;
      }
      .item {
        display: flex;
        padding: 23rpx 30rpx;
        // background-color: greenyellow;

        .right {
          background-color: #8ebfff;
          padding: 12rpx;
        }
        .left {
          background-color: #eef4ff;
          color: white;
        }
        // 聊天消息的三角形
        .right::after {
          position: absolute;
          display: inline-block;
          content: '';
          width: 0;
          height: 0;
          left: 100%;
          top: 10px;
          border: 12rpx solid transparent;
          border-left: 12rpx solid #8ebfff;
        }

        .left::after {
          position: absolute;
          display: inline-block;
          content: '';
          width: 0;
          height: 0;
          top: 10px;
          right: 100%;
          border: 12rpx solid transparent;
          border-right: 12rpx solid #f1f1f1;
        }

        .content {
          position: relative;
          max-width: 486rpx;
          border-radius: 8rpx;
          word-wrap: break-word;
          padding: 24rpx 24rpx;
          margin: 0 24rpx;
          border-radius: 5px;
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: 500;
          line-height: 42rpx;
          color:black;
        }

        .avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 82rpx;
          height: 82rpx;
          border-radius: 50%;
          overflow: hidden;

          image {
            align-self: center;
          }
        }
      }
    }
  }

  /* 底部聊天发送栏 */
  .chat-bottom {
    width: 100%;
    height: 100%;

    .send-msg {
      display: flex;
      align-items: center;
      padding: 16rpx 30rpx;
      width: 100%;
      min-height: 120rpx;
      position: fixed;
      bottom: 0;
      box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
      background-color: white;
    }

    .uni-textarea {
      display: flex;
      align-items: center;
      input {
        width: 500rpx;
        min-height: 68rpx;
        max-height: 500rpx;
        background: rgb(241, 241, 241);
        border-radius: 26rpx;
        font-size: 32rpx;
        font-family: PingFang SC;
        color: #333333;
        line-height: 43rpx;
        padding: 5rpx 8rpx;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
        display: flex;
        align-items: center;
      }
    }

    .send-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 25rpx;
      width: 62rpx;
      height: 62rpx;
      background: $sendBtnbgc;
      border-radius: 50%;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 28rpx;
      padding: 10rpx;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    }
    .send-button-pic{
      padding: 5rpx;
    }
    .send-picture{
      width: 44rpx;
      height: 44rpx;
      margin-left: auto;
      margin-right: 28rpx;
    }

    .add-picture {
      margin-left: 15rpx;
      height: 50rpx;
      width: 50rpx;
    }
  }
  .load-6 .letter {
    animation-name: loadingF;
    animation-duration: 1.6s;
    animation-iteration-count: infinite;
    animation-direction: linear;
  }

  @keyframes loadingF {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .l-1 {
    animation-delay: 0.48s;
  }
  .l-2 {
    animation-delay: 0.6s;
  }
  .l-3 {
    animation-delay: 0.72s;
  }
  .l-4 {
    animation-delay: 0.84s;
  }
  .l-5 {
    animation-delay: 0.96s;
  }
  .l-6 {
    animation-delay: 1.08s;
  }
  .l-7 {
    animation-delay: 1.2s;
  }
  .l-8 {
    animation-delay: 1.32s;
  }
  .l-9 {
    animation-delay: 1.44s;
  }
  .l-10 {
    animation-delay: 1.56s;
  }
  .letter-holder {
    padding-left: 16rpx;
    padding-right: 16rpx;
    display: flex;
  }
}

.pets-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pet-bar {
  display: flex;
  justify-content: space-around;
  width: 80%;
  padding: 10rpx;
  border-radius: 20rpx;
  background-color: white;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
}
.pet-avator {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
}
.msglistview {
  padding-bottom: 130rpx;
}

/* 选择对话的宠物 */
.select-section{
  height: 100rpx;
}
.pet-tab{
  background-color: #eef4ff !important;
}

/* 加入事项部分 */
.matter-add-row{
  margin-top: 12rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 28rpx;
  color:#5a5656;
}
</style>
