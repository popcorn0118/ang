<template>
<div>
    <div class="container">
        <div class="row category">
            <div class="btn-group btn-group-toggle col-lg-6" data-toggle="buttons" >
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
            <div class="col-lg-6">
                <!-- Search bar -->
                <form class="form-inline float-right search">
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
import { mapGetters, mapActions } from 'vuex';
// import axios from 'axios';
export default {
    name: 'Concert',
    data () {
        return {
            searchText: ''
        }
    },
    created() {
        this.getMusical();
    },
    methods: {
        // ...mapActions('getMusical'),
        getMusical() {
            const vm = this;
            vm.$store.dispatch('getMusical', '')
        }
    },
    computed: {
        // ...mapGetters('musical', 'categories'),
        filterMusicalData() {
            const vm = this;
            if (vm.searchText) {
                    return vm.musical.filter((item) => {
                    const data = item.gsx$分類.$t.toLowerCase().includes(vm.searchText.toLowerCase()) ||
                                 item.gsx$專輯名稱.$t.toLowerCase().includes(vm.searchText.toLowerCase()) ||
                                 item.gsx$曲目.$t.toLowerCase().includes(vm.searchText.toLowerCase())
                    return data;
                });
            }
            return this.musical;
        },
        musical() {
            return this.$store.state.musical
        },
        categories() {
            return this.$store.state.categories
        }
    }
}
</script>
