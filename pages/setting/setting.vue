<template>
	<view class="content">
		<view class="list">
			<view class="uni-form-item uni-column">
				<view class="title">最大值</view>
				<input class="uni-input" v-model="max" type="number" placeholder="最大值" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">最小值</view>
				<input class="uni-input" v-model="min" type="number" placeholder="最小值" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">时间间隔(ms)</view>
				<input class="uni-input" v-model="interval" type="number" placeholder="时间间隔" />
			</view>
		</view>
		<view class="button-area">
			<button @click="onSave">保存</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue'
	const min = ref(0)
	const max = ref(100)
	const interval = ref(100)
	onMounted(() => {
		let data = uni.getStorageSync('data') || {
			max: 100,
			min: 0,
			interval: 100
		}
		min.value = data.min
		max.value = data.max
		interval.value = data.interval
	})
	const onSave = () => {
		let data = {
			max: max.value,
			min: min.value,
			interval: interval.value
		}
		uni.setStorageSync('data', data);
	}
</script>

<style lang="scss">
	.content {
		padding: 40rpx;
	}

	.uni-form-item {
		margin-top: 20rpx;
	}

	.uni-input {
		border-bottom: 1rpx solid $uni-border-color;
		font-size: 26rpx;
		margin-top: 16rpx;
	}


	.button-area {
		margin-top: 120rpx;
		display: flex;
		justify-content: center;

		button {
			width: 400rpx;
		}
	}
</style>
