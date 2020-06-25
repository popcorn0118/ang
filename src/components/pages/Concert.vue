<template>
<div>
    <div class="container">
		<div class="row category">
			<div class="col-xl-9 col-lg-12 col-md-12">
				<div 
					v-if="searchText === ''" 
					class="categoryBtn"
					:class="{is_active: is_menu}" 
					@click.prevent="categoryToggle">
					ALL
					<i class="fas fa-chevron-up"></i>
				</div>
				<div 
					v-else 
					class="categoryBtn" 
					:class="{is_active: is_menu}" 
					@click.prevent="categoryToggle">
					{{ searchText }}
					<i class="fas fa-chevron-up"></i>
				</div>
				<div class="btn-group btn-group-toggle" :class="{is_active: is_menu}" data-toggle="buttons"  @click.prevent="categoryUp">
					<label class="btn btn-outline-primary" @click.prevent="searchText = ''"
						:class="{ 'active': searchText === ''}">
						<input type="radio" name="options" id="option1" autocomplete="off">ALL
					</label>
					<label class="btn btn-outline-primary" @click.prevent="searchText = item"
						:class="{ 'active': item === searchText}"
						v-for="(item, index) in categories" :key="index">
						<input type="radio" name="options" id="option2" autocomplete="off">{{ item }}
					</label>
				</div>
			</div>
			<div class="col-xl-3 col-lg-12 col-md-12">
				<!-- Search bar -->
				<form class="float-right search">
					<div class="input-group">
						<input class="form-control" type="text" v-model="searchText"
						placeholder="Search" aria-label="Search">
						<div class="input-group-append">
						<button class="btn btn-outline-secondary" type="button"
							@click="searchText = ''">
							<i class="fa fa-times"></i>
						</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div  
			v-if="searchText" 
			class="concerTitle">
			<h1><p>{{ searchText }}</p></h1>
			<p class="concerTitle--data">
				<span>{{ this.filterConcertData[this.filterConcertData.length - 1].gsx$演出日期.$t }}</span> ~ 
				<span>{{ this.filterConcertData[0].gsx$演出日期.$t }}</span>
			</p>
			<p class="concerTitle--total">
				共計 <span>{{ this.filterConcertData.length }}</span> 場
			</p>
		</div>
		<div 
			v-else 
			class="concerTitle">
			<!-- <h1><p v-for="(item, index) in categories" :key="index">{{ item }}</p></h1> -->
			<p class="concerTitle--data">
				<span>{{ this.filterConcertData[this.filterConcertData.length - 1].gsx$演出日期.$t }}</span> ~
				<span>{{ this.filterConcertData[0].gsx$演出日期.$t }}</span>
			</p>
			<p class="concerTitle--total">
				共計 <span>{{ this.filterConcertData.length }}</span> 場
			</p>
		</div>
		<div class="concer">
			<i class="fas fa-map-marker-alt"></i>
			<ul>
				<li
					class="concer-item"
					v-for="(item, index) in filterConcertData"
					:class="{ 'is_active': index === isActive }"
					:key="index">
					<span :style="{'background-color': item.gsx$顏色.$t}"></span>
					<p 
						class="concer-item--data" 
						:style="{'background-color': item.gsx$顏色.$t}">
						{{ item.gsx$演出日期.$t }}
					</p>
					<p class="concer-item--city">{{ item.gsx$演出城市.$t }}</p>
					<p class="concer-item--name">
						<span :style="{'color': item.gsx$顏色.$t}">{{ item.gsx$演唱會名稱.$t }}</span> ‧ 
						<span>{{ item.gsx$場館.$t }}</span>
					</p>
					<p class="concer-item--guest" v-if="item.gsx$嘉賓.$t">嘉賓：{{ item.gsx$嘉賓.$t }}</p>
					<p class="concer-item--people">約 <span>{{ item.gsx$人數.$t }}</span> 人</p>
				</li>
			</ul>
		</div>
		<!-- <div
			style="color: #fff"
			class="containerWarp col-xl-3 col-lg-4 col-md-6 col-xs-12"
			v-for="(item, index) in concertArrData"
			:class="{ 'is_active': index === isActive }"
			:key="index">
			{{ item.concert }}
		</div> -->
		
		<!-- <div
			style="color: #fff"
			class="containerWarp col-xl-3 col-lg-4 col-md-6 col-xs-12"
			v-for="(item, index) in concertData"
			:key="index">
			{{ item }}
		</div> -->
		
		<!-- <div v-for="(item, index) in categories" :key="index">
			
		</div>
		<div v-for="(i, index) in markColor" :key="index">
			<p :style="`color: ${i}`">●</p> {{ item }}
		</div> -->
		
        <!-- <div id="map"></div> -->
    </div>
</div>  
</template>
<style lang="scss">
@import '~@CSS/jquery-jvectormap-1.2.2.css';
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import { setTimeout } from 'timers';
window.jQuery = require('jquery');
var $ = window.jQuery;
require('jvectormap');
require('../../../static/js/jquery-jvectormap-1.2.2.min.js');
require('../../../static/js/jquery-jvectormap-world-mill.js');
// import jquery191 from '../../../static/js/jquery-1.9.1.min.js' 
// import jvectormap from '../../../static/js/jquery-jvectormap-1.2.2.min.js' 
// import jvectormapWorld from '../../../static/js/jquery-jvectormap-world-mill.js' 
// var mapId = document.getElementById('map');
export default {
    name: 'Concert',
    data () {
        return {
			searchText: '',
			isActive: false,
			// concertArrData: [],
			is_menu: false
        }
	},
	created() {
		this.concertArrData;
	},
	beforeMount() {
		
	},
    mounted() {
		this.getConcert();
		this.concertArrData;
		this.drawMap;
	},
	updated() {
	
	},
    methods: {
		...mapActions('concertModules', ['getConcert']),
		isActiveClick(index) {
            // console.log(index)
            this.isActive = index
		},
        categoryToggle() {
            !this.is_menu ? this.is_menu = true : this.is_menu = false
        },
        categoryUp() {
            this.is_menu = false;
        }
	},
	computed: {
		...mapGetters('concertModules', ['concert', 'categories', 'concertArr', 'markColor']),
		filterConcertData() {
			const vm = this;
            if (vm.searchText) {
                    return vm.concert.filter((item) => {
                    const data = item.gsx$演唱會名稱.$t.includes(vm.searchText) ||
                                item.gsx$演出城市.$t.includes(vm.searchText)
					return data;
					// console.log(data)
                });
            }
			return this.concert;
		},
		concertArrData() {
			const vm = this;
            if (vm.searchText) {
                    return vm.concertArr.filter((item) => {
                    const data = item.concert.includes(vm.searchText)
					return data;
					// console.log(data)
                });
            }
			return this.concertArr
		},
		// drawMap() {
		// 	$('#map').vectorMap({
		// 		// 此处更改地图
		// 		map: 'world_mill', // 世界地图
		// 		backgroundColor: 'transparent',
		// 		zoomMin: 0.5, // 鼠标缩放时的最小比例
		// 		zoomMax: 4, // 鼠标缩放时的最大比例
		// 		focusOn: {
		// 			x: 0.55,
		// 			y: 2,
		// 			scale: 0.9
		// 		},
		// 		regionStyle: {
		// 			initial: {
		// 				fill: '#e5e5e5',   // 地图颜色
		// 				"fill-opacity": 1, // 省份（州）是否隐藏，鼠标滑动时显示; 1：显示，2：隐藏。
		// 				stroke: 'none',
		// 				"stroke-width": 0,
		// 				"stroke-opacity": 1
		// 			},
		// 			hover: {
		// 				fill: '#cccccc',  // 鼠标滑动至某省份的高亮颜色。
		// 				"fill-opacity": 0.8
		// 			},
		// 			selected: {
		// 				fill: 'yellow'
		// 			},
		// 			selectedHover: {}
		// 		},
		// 		markerStyle: {
		// 			initial: {
		// 				fill: '#fd8888', // 足迹位置的填充颜色
		// 				stroke: '#fff',   // 足迹位置的描边颜色
		// 				size: 20
		// 			},
		// 			hover: {
		// 				fill: '#fd2020', // 鼠标滑动至足迹位置后的填充颜色
		// 				stroke: '#fff',  // 鼠标滑动至足迹位置后的描边颜色
		// 				"fill-opacity": 0.8
		// 			},
		// 		},
		// 		markers: this.concertArrData
		// 		// [ // 足迹位置
		// 		// 	// {latLng: [经度（保留两位小数）, 纬度（保留两位小数）], name: '城市名称'},
		// 		// 	// 推荐查询经纬度网站：http://www.gpsspg.com/maps.htm
		// 		// 	{latLng: [39.90, 116.41], name: '北京'},
		// 		// 	{latLng: [31.24, 121.50], name: '上海'},
		// 		// 	{latLng: [25.03, 121.59], name: '臺北 1028/12/14-15', style: { fill: '#e91e63'},},
		// 		// 	{latLng: [22.19, 113.54], name: '澳門'}
		// 		// ]
		// 	});
		// },
		// concertData() {
		// 	const concertArr = new Set();
        //     this.concert.forEach((item) => {
		// 		const data = {
		// 			latLng: [item.gsx$經緯度.$t], 
		// 			name: item.gsx$演出城市.$t, 
		// 			style: { fill: item.gsx$顏色.$t},
		// 		}
        //         concertArr.add(data);
        //     });
        //     return this.concertArr = Array.from(concertArr);
		// }
	},
}
</script>
