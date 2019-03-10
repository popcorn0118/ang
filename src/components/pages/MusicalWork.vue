<template>
    <div>
        <div class="container">
            <div class="row category">
                <div class="btn-group btn-group-toggle col-lg-9" data-toggle="buttons" >
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
                <div class="col-lg-3">
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
            <div class="container">
                <!-- <ul class="row musicalWork align-items-start">
                    <li
                        class="col-lg-4 col-md-6 col-xs-12"
                        v-for="(item, index) in filterMusicalData"
                        :key="index"
                    >
                        <div :style="{backgroundImage: `url(${item.gsx$圖片.$t})`}">
                            <h1>{{ item.gsx$專輯名稱.$t }}</h1>
                            <p class="h6">{{ item.gsx$發行日期.$t }}</p>
                            <a href="#">曲目 <i class="fas fa-play-circle"></i></a>
                            <div v-if="item.gsx$曲目">{{ item.gsx$曲目.$t }}</div>
                        </div>
                    </li>
                </ul> -->

                <ul class="row musicalWork align-items-start" >
                    <li
                        class="containerWarp col-lg-4 col-md-6 col-xs-12"
                        v-for="(item, index) in filterMusicalData"
                        :class="{ 'is_active': index === isActive }"
                        :key="index"
                    >
                        <div class="front" :style="{backgroundImage: `url(${item.gsx$圖片.$t})`}">
                            <div class="inner">
                                <h1>{{ item.gsx$專輯名稱.$t }}</h1>
                                <p class="h6">{{ item.gsx$發行日期.$t }}</p>
                                <a href="#" @click.prevent="isActiveClick(index)">曲目 <i class="fas fa-play-circle"></i></a>
                            </div>
                        </div>
                        <div class="back">
                            <div class="inner">
                                <h1>{{ item.gsx$專輯名稱.$t }}</h1>
                                <ol class="track">
                                    <li
                                        v-for="(j, index) in item.gsx$曲目.$t.split('、')"
                                        :key="index"
                                    >
                                        {{ j }}
                                    </li>
                                </ol>
                                <ul class="tarckIcon">
                                    <li v-if="item.gsx$連結1.$t !== ''">
                                        <a :href="item.gsx$連結1.$t" target="_new"></a>
                                    </li>
                                    <li v-if="item.gsx$連結2.$t !== ''">
                                        <a :href="item.gsx$連結2.$t" target="_new"></a>
                                    </li>
                                    <li v-if="item.gsx$連結3.$t !== ''">
                                        <a :href="item.gsx$連結3.$t" target="_new"></a>
                                    </li>
                                    <li v-if="item.gsx$連結4.$t !== ''">
                                        <a :href="item.gsx$連結4.$t" target="_new"></a>
                                    </li>
                                    <li v-if="item.gsx$連結5.$t !== ''">
                                        <a :href="item.gsx$連結5.$t" target="_new"></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'MusicalWork',
    data () {
        return {
            searchText: '',
            isActive: false
        }
    },
    created() {
        this.getMusical();
    },
    methods: {
        ...mapActions('musicalWorkModules', ['getMusical']),
        isActiveClick(index) {
            console.log(index)
            this.isActive = index
        },
        
    },
    computed: {
        ...mapGetters('musicalWorkModules', ['musical', 'categories', 'track']),
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

    }
}
</script>

<style lang="scss">
@import '../../assets/css/rotate.css';
</style>
