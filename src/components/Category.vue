<template>
<div>
    <div class="container">
        <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
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


        <div class="btn-group btn-group-toggle category" data-toggle="buttons" >
            <label class="btn btn-outline-primary" @click.prevent="searchText = ''"
                :class="{ 'active': searchText === ''}">
                <input type="radio" name="options" id="option1" autocomplete="off">ALL
            </label>
            <label class="btn btn-outline-primary" @click.prevent="searchText = item"
                :class="{ 'active': item === searchText}"
                v-for="(item, index) in categories" :key="index">
                <input type="radio" name="options" id="option2" autocomplete="off" >{{ item }}
            </label>
        </div>
        
        <ul style="color: #fff">
            <li
                v-for="(item, index) in filterMusicalData" 
                :key="index"
            >  
                {{ item.gsx$發行日期.$t }} {{ item.gsx$專輯名稱.$t }}
                <span v-if="item.gsx$曲目">{{ item.gsx$曲目.$t }}</span>
            </li>
        </ul>
    </div>
</div>  
</template>

<script>
import axios from 'axios'
// https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/od6/public/values?alt=json
// 範例 https://spreadsheets.google.com/feeds/cells/文件KEY/第幾張工作表/public/values?alt=json
// 'https://spreadsheets.google.com/feeds/cells/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/1/public/values?alt=json'
// 'https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/1/public/values?alt=json'
export default {
    name: 'Concert',
    data () {
        return {
            musical: [],
            searchText: '',
            categories: []
        }
    },
    created() {
        this.getMusical()
        this.gettoo()
    },
    methods: {
        gettoo() {
            axios.get('https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/2/public/values?alt=json').then((response) => {
                console.log('gettoo', response)
            })
        },
        getMusical() {
            axios.get('https://spreadsheets.google.com/feeds/list/1MNnwEfRRl0lzKWCkTqm-_lG7d5G_TNs7eD3qo1hoAEM/1/public/values?alt=json').then((response) => {
                this.musical = response.data.feed.entry
                this.getUnique();
                console.log(this.musical)
            })
        },
        getUnique() {
            const vm = this;
            const categories = new Set();
            vm.musical.forEach((item) => {
                console.log(item.gsx$分類.$t)
                categories.add(item.gsx$分類.$t);
            });
            vm.categories = Array.from(categories);
        },
    },
    computed: {
        filterMusicalData() {
            const vm = this;
            if (vm.searchText) {
                    return vm.musical.filter((item) => {
                    const data = item.gsx$分類.$t.toLowerCase().includes(vm.searchText.toLowerCase());
                    return data;
                });
            }
            return this.musical;
        },
    }
}
</script>
