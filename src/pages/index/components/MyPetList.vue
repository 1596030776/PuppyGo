<!-- 瀑布流布局 -->
<template>
  <view class="container">
    <view
      :id="`cont_${index + 1}`"
      class="cont-box"
      :style="{ width: widthCalc, 'margin-left': index === 0 ? 0 : marginCalc }"
      v-for="(numVal, index) in flowData.column"
      :key="numVal"
    >
      <navigator url="/pagesMember/petDetail/petDetail" hover-class="none">
        <view
          class="item-box"
          v-for="(item, j) in flowData[`column_${index + 1}`]"
          :key="j"
          @tap="petStore.curPet = item"
        >
          <image
            class="img-tip"
            :src="item.picture"
            mode="widthFix"
            lazy-load
            @load="imgLoad(item)"
            @error="imgError(item)"
          />
          <view class="tit-tip multi-line-omit">{{ item.name }}</view>
          <view class="desc-tip multi-line-omit">{{ item.description }}</view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<script setup>
import { reactive, computed, getCurrentInstance, onMounted } from 'vue'
import { usePetStore } from '@/stores/modules/pet'

const petStore = usePetStore()
const _this = getCurrentInstance()
const flowData = reactive({
  list: [], // 数据值
  column: 2, // 瀑布列数
  columnSpace: 2, // 瀑布列宽间距
})
/* 数据赋值 */
flowData.list = petStore.petsInfo
/* 初始化每一列的数据 */
for (let i = 1; i <= flowData.column; i++) {
  flowData[`column_${i}`] = []
}
/* 生命周期函数-实例被挂载后调用 */
onMounted(() => {
  initValue(0)
})
/* 计算列宽 */
const widthCalc = computed(() => {
  return `${100 / flowData.column - flowData.columnSpace}%`
})
/* 计算 margin 外边距 */
const marginCalc = computed(() => {
  const columnWidth = 100 / flowData.column - flowData.columnSpace
  return `${(100 - columnWidth.toFixed(5) * flowData.column) / (flowData.column - 1)}%`
})
/* 获取最小值的对象 */
const getMinObj = (a, s) => {
  let m = a[0][s]
  let mo = a[0]
  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i][s] < m) m = a[i][s]
  }
  mo = a.filter((i) => i[s] === m)
  return mo[0]
}
/* 计算每列的高度 */
function getMinColumnHeight() {
  return new Promise((resolve) => {
    const heightArr = []
    for (let i = 1; i <= flowData.column; i++) {
      uni
        .createSelectorQuery()
        .in(_this)
        .select(`#cont_${i}`)
        .boundingClientRect((res) => {
          heightArr.push({ column: i, height: res.height })
        })
        .exec(() => {
          if (flowData.column <= heightArr.length) {
            resolve(getMinObj(heightArr, 'height'))
          }
        })
    }
  })
}
/* 初始化瀑布流数据 */
async function initValue(i) {
  if (i >= flowData.list.length) return false
  const minHeightRes = await getMinColumnHeight()
  flowData[`column_${minHeightRes.column}`].push({
    ...flowData.list[i],
    index: i,
  })
}
/* 图片加载完成 */
function imgLoad(item) {
  const i = item.index
  initValue(i + 1) // 加载下一条数据
}
/* 图片加载失败 */
function imgError(item) {
  const i = item.index
  initValue(i + 1) // 加载下一条数据
}
</script>

<style lang="scss" scoped>
.container {
  background-color: rgb(248, 248, 248);
  padding: 20rpx;
  border-radius: 10rpx;

  .cont-box {
    $borderRadius: 12rpx;
    float: left;
    .item-box {
      width: 100%;
      padding-bottom: 20rpx;
      margin-bottom: 30rpx;
      border-radius: $borderRadius;
      box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
      .img-tip {
        width: 100%;
        border-radius: $borderRadius $borderRadius 0 0;
      }
      .tit-tip {
        text-align: justify;
        font-size: 30rpx;
        padding: 10rpx 20rpx 0;
        font-weight: 900;
      }
      .desc-tip {
        text-align: justify;
        font-size: 26rpx;
        padding: 5rpx 20rpx 0;
        margin-top: 10rpx;
      }
    }
  }
}
/* 多行省略 */
.multi-line-omit {
  word-break: break-all; // 允许单词内自动换行，如果一个单词很长的话
  text-overflow: ellipsis; // 溢出用省略号显示
  overflow: hidden; // 超出的文本隐藏
  display: -webkit-box; // 作为弹性伸缩盒子模型显示
  -webkit-line-clamp: 2; // 显示的行
  -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式--从上到下垂直排列
}
/* 单行省略 */
.one-line-omit {
  width: 100%; // 宽度100%：1vw等于视口宽度的1%；1vh等于视口高度的1%
  white-space: nowrap; // 溢出不换行
  overflow: hidden; // 超出的文本隐藏
  text-overflow: ellipsis; // 溢出用省略号显示
}
</style>
