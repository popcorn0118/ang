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
                    <div class="btn-group btn-group-toggle" :class="{is_active: is_menu}"  data-toggle="buttons" @click.prevent="categoryUp">
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
            <!-- <Category/> -->
            <div class="container">
                <ul class="row musicalWork align-items-start" >
                    <li
                        class="containerWarp col-xl-4 col-lg-6 col-md-6 col-xs-12"
                        v-for="(item, index) in filterMusicalData"
                        :class="[
                        {'is_active': index === isActive},
                        {'is_hover': item.gsx$分類.$t === '唱別人的歌'}]"
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
                                    <li class="tarckIcon--itunes" v-if="item.gsx$itunes連結.$t !== ''">
                                        <a :href="item.gsx$itunes連結.$t" target="_new"></a>
                                    </li>
                                    <li class="tarckIcon--spotify" v-if="item.gsx$spotify連結.$t !== ''">
                                        <a :href="item.gsx$spotify連結.$t" target="_new"></a>
                                    </li>
                                    <li class="tarckIcon--kkbox" v-if="item.gsx$kkbox連結.$t !== ''">
                                        <a :href="item.gsx$kkbox連結.$t" target="_new"></a>
                                    </li>
                                    <li class="tarckIcon--omusic" v-if="item.gsx$omusic連結.$t !== ''">
                                        <a :href="item.gsx$omusic連結.$t" target="_new"></a>
                                    </li>
                                    <li class="tarckIcon--mymusic" v-if="item.gsx$mymusic連結.$t !== ''">
                                        <a :href="item.gsx$mymusic連結.$t" target="_new"></a>
                                    </li>
                                    <li class="tarckIcon--youtube" v-if="item.gsx$youtube連結.$t !== ''">
                                        <a :href="item.gsx$youtube連結.$t" target="_new"></a>
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
// import Category from 'Category';
export default {
    name: 'MusicalWork',
    data () {
        return {
            searchText: '',
            isActive: false,
            is_menu: false
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
        categoryToggle() {
            !this.is_menu ? this.is_menu = true : this.is_menu = false
        },
        categoryUp() {
            this.is_menu = false;
        }
        
    },
    computed: {
        ...mapGetters('musicalWorkModules', ['musical', 'categories']),
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
    },
    components: {
        // Category
    }
}
</script>

<style lang="scss">
@import '../../assets/css/rotate.css';
</style>
