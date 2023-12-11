<template>
  <view class="chat">
    <scroll-view
      :style="{ height: `${windowHeight}rpx` }"
      id="scrollview"
      scroll-y="true"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      class="scroll-view"
    >
      <!-- 聊天主体 -->
      <view id="msglistview" class="chat-body">
        <!-- 聊天记录 -->
        <view v-for="(item, index) in msgList" :key="index">
          <view class="item self" v-if="item.userContent != ''">
            <view class="content right">
              {{ item.userContent }}
            </view>
            <view class="avatar"> </view>
          </view>
          <view class="item Ai" v-if="item.botContent != ''">
            <view class="avatar"> </view>
            <view class="content left">
              {{ item.botContent }}
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- 底部消息发送栏 -->
    <!-- 用来占位，防止聊天消息被发送框遮挡 -->
    <view class="chat-bottom">
      <view class="send-msg">
        <view class="uni-textarea">
          <textarea
            v-model="chatMsg"
            maxlength="300"
            :show-confirm-bar="false"
            auto-height
          ></textarea>
        </view>
        <button @click="handleSend" class="send-btn">发送</button>
        <image
          @tap="onChoosePhone"
          class="add-picture"
          mode="aspectFill"
          src="../../static/images/ts-picture.png"
        ></image>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { initConservationAPI, postFragment, getStatue } from '@/services/chat'
import { useChatStore } from '@/stores/modules/chat'

const filePath = ref('')
const chatStore = useChatStore()
const scrollTop = 0
const userId = ref('')
//发送的消息
const chatMsg = ref('')
const msgList = ref([
  {
    botContent: 'hello，请问我有什么可以帮助你的吗？',
    recordId: 0,
    titleId: 0,
    userContent: '999',
    userId: 0,
  },
  {
    botContent: '6666',
    recordId: 0,
    titleId: 0,
    userContent: '你好呀我想问你一件事',
    userId: 0,
  },
])

onLoad(async () => {
  const result = await initConservationAPI()
  chatStore.conservation = result.result
})

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
  //如果消息不为空
  if (!chatMsg.value || !/^\s+$/.test(chatMsg.value)) {
    let obj = {
      botContent: '',
      recordId: 0,
      titleId: 0,
      userContent: chatMsg.value,
      userId: 0,
    }
    msgList.value.push(obj)
    const sentenceResult = await postFragment(chatStore.conservation.id, chatMsg.value)
    setInterval(async () => {
      const statueResult = await getStatue(sentenceResult.result)
      console.log(statueResult.result)
    }, 2000)
    chatMsg.value = ''
  } else {
    showToast('不能发送空白消息')
  }
}
</script>
<style lang="scss" scoped>
$chatContentbgc: #c2dcff;
$sendBtnbgc: #4f7df5;

view,
button,
text,
input,
textarea {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 聊天消息 */
.chat {
  .scroll-view {
    ::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      background: transparent;
      color: transparent;
    }

    // background-color: orange;
    background-color: #f6f6f6;

    .chat-body {
      display: flex;
      flex-direction: column;
      padding-top: 23rpx;
      // background-color:skyblue;

      .self {
        justify-content: flex-end;
      }
      .item {
        display: flex;
        padding: 23rpx 30rpx;
        // background-color: greenyellow;

        .right {
          background-color: $chatContentbgc;
        }
        .left {
          background-color: #ffffff;
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
          border-left: 12rpx solid $chatContentbgc;
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
          border-right: 12rpx solid #ffffff;
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
          color: #333333;
          line-height: 42rpx;
        }

        .avatar {
          display: flex;
          justify-content: center;
          width: 78rpx;
          height: 78rpx;
          background: $sendBtnbgc;
          border-radius: 8rpx;
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
    background: #f4f5f7;

    .send-msg {
      display: flex;
      align-items: center;
      padding: 16rpx 30rpx;
      width: 100%;
      min-height: 120rpx;
      position: fixed;
      bottom: 0;
      background: #ededed;
    }

    .uni-textarea {
      textarea {
        width: 500rpx;
        min-height: 75rpx;
        max-height: 500rpx;
        background: #ffffff;
        border-radius: 8rpx;
        font-size: 32rpx;
        font-family: PingFang SC;
        color: #333333;
        line-height: 43rpx;
        padding: 5rpx 8rpx;
      }
    }

    .send-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 25rpx;
      width: 100rpx;
      height: 70rpx;
      background: $sendBtnbgc;
      border-radius: 8rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 28rpx;
    }

    .add-picture {
      margin-left: 15rpx;
      height: 50rpx;
      width: 50rpx;
    }
  }
}
</style>
