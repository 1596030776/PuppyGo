<template>
	<view class="commnent-content">
<!-- 		<view class="comment-item">
			<view class="user-info">
				<view class="portrait">
					<image :src="detail.portrait" mode="aspectFill" />
				</view>
				<view class="info">
					<view class="name">
						{{detail.userName}}
					</view>
					<view class="comment">
						{{detail.content}}
					</view>
					<view class="image-list" v-if="detail.imageList && detail.imageList.length">
						<view class="image-item" @click="preview(index)" v-for="(image, index) in detail.imageList"
							:key="item">
							<image :src="image" mode="aspectFill" />
						</view>
					</view>
					<view class="footer">
						<view class="time">
							{{detail.time}}
						</view>
						<view class="function" @click="trigger">
							..
							<view v-if="showFunction" class="function-button">
								<view class="button-item" @click="comment">
									评论
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="comment-list">
			<view class="comment-item" v-for="item in detail.commentList" :key="item.id" @click="reply(item)">
				<view class="user-info">
					<view class="portrait">
						<image :src=item.portrait mode="aspectFill"></image>
					</view>
					<view class="info">
						<view class="name">
							{{item.userName}}
							<view class="time">
								{{item.time}}
							</view>
						</view>

						<view class="comment">
							<span v-if="item.toUserName">回复<span
									style="color: #f3cd34;font-weight: 600;">{{item.toUserName}}</span>：</span>
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 评论数据
			detail: {
				type: Object,
				default: {},
			}
		},
		name: "comment-list",
		data() {
			return {
				showFunction: false
			};
		},
		methods: {
			/**
			 * 显示/隐藏功能键
			 */
			trigger() {
				this.showFunction = !this.showFunction;
			},
			/**
			 * 点击回复
			 * @param {Object} item
			 */
			reply(item) {
				this.$emit("reply", item);
			},
			/**
			 * 点击评论
			 */
			comment() {
				this.$emit("comment");
			},
			/**
			 * 图片预览
			 * @param {Object} index
			 */
			preview(index) {
				uni.previewImage({
					urls: this.detail.imageList,
					current: index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commnent-content {
		font-size: 28rpx;
		color: rgba(0, 0, 0, 0.8);

		.comment-item {
			padding: 18rpx 32rpx;

			.user-info {
				display: flex;
				font-size: 28rpx;

				.portrait {
					border-radius: 50%;

					image {
						border-radius: 50%;
						width: 80rpx;
						height: 80rpx;
					}
				}

				.info {
					margin-left: 24rpx;

					.name {
						display: flex;
						justify-content: flex-start;
						margin-bottom: 6rpx;
						color: #f3cd34;
						font-weight: 600;

						.time {
              margin-top: 4rpx;
							font-weight: normal;
							font-size: 24rpx;
							color: rgba(180, 180, 180, 1);

						}
					}

					.comment {
						line-height: 40rpx;
					}

					.image-list {
						margin-top: 12rpx;
						display: flex;
						flex-wrap: wrap;

						.image-item {
							width: 186rpx;
							height: 186rpx;
							margin: 0 12rpx 12rpx 0;

							image {
								border-radius: 4rpx;
								width: 186rpx;
								height: 186rpx;
							}
						}


						.image-item:nth-of-type(3n) {
							margin-right: 0;
						}
					}

					.footer {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.time {
							margin-bottom: 4rpx;
							font-size: 24rpx;
							color: rgba(180, 180, 180, 1);
						}

						.function {
							padding: 0rpx 14rpx 10rpx 14rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 8rpx;
							background: rgba(0, 0, 0, 0.02);
							position: relative;

							.function-button {
								display: flex;
								justify-content: center;
								position: absolute;
								right: 58rpx;
								width: 60rpx;
								font-size: 26rpx;
								padding: 8rpx 12rpx;
								border-radius: 8rpx;
								color: #fff;
								background: rgba(0, 0, 0, 0.6);
							}
						}
					}

					.reply {
						margin-top: 12rpx;
						background: rgba(180, 180, 180, 0.4);
						display: inline-block;
						padding: 0 12rpx;
						font-size: 24rpx;
						height: 44rpx;
						line-height: 44rpx;
						border-radius: 44rpx;
					}
				}
			}
		}

		.comment-list {
			padding: 12rpx 0;
			margin: 32rpx;
			background: rgba(0, 0, 0, 0.03);
			border-radius: 8rpx;

			.comment-item {
				.user-info {
					.portrait {
						image {
							width: 64rpx;
							height: 64rpx;
						}
					}

					.info {
						.comment {
							line-height: 32rpx;
						}
					}
				}
			}
		}
	}
</style>
