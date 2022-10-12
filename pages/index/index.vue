<template>
	<view class="content">
		<view class="container">
			<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}"
				:collection="collectionList" field="title,photo">
				<view v-if="error">{{error.message}}</view>
				<view v-else-if="data">
					<uni-list>
						<uni-list-item v-for="(item, index) in data" :key="index" :class="{ active: num===index}">
							<template v-slot:body>
								<view class="item">
									<view>
										<image :src="item.photo.url" mode="aspectFill"></image>
									</view>
									<view>{{item.title}}</view>
								</view>
							</template>
						</uni-list-item>
					</uni-list>
				</view>
				<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
			</unicloud-db>
		</view>
		<view class="button-area">
			<button v-show="isOver" @click="start">开始</button>
			<button v-show="!isOver" @click="stop">结束</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		reactive
	} from 'vue'
	const db = uniCloud.database();
	const dbCollectionName = 'lottery';
	const length = ref(0)
	const num = ref(0)
	const isOver = ref(true)
	const min = ref(0)
	const max = ref(100)
	const interval = ref(100)
	const clock = ref(null)
	const collectionList = dbCollectionName
	const loadMore = reactive({
		contentdown: '',
		contentrefresh: '',
		contentnomore: ''
	})

	onMounted(() => {
		let data = uni.getStorageSync('data') || {
			max: 100,
			min: 0,
			interval: 100
		}
		max.value = data.max
		min.value = data.min
		interval.value = data.interval
		db.collection(dbCollectionName)
			.get()
			.then((res) => {
				// res 为数据库查询结果
				max.value = res.result.data.length
			})
	})
	const start = () => {
		isOver.value = false
		clock.value = setInterval(() => {
			num.value = getRandomNum()
		}, interval.value)
	}

	const getRandomNum = () => {
		return Math.floor(Math.random() * max.value)
	}
	const stop = () => {
		clearInterval(clock.value)
		isOver.value = true
	}
</script>

<style lang="scss">
	.content {
		.uni-list {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
		}

		.uni-list-item {
			border: 4rpx solid transparent;
		}

		.active {
			border-color: #e5e6ea;
		}
	}

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.button-area {
		margin-top: 180rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
