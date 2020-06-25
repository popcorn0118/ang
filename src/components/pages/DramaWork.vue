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
            <div class="container">
                    <ul class="row dramaWork align-items-start" >
                        <li
                            class="containerWarp col-xl-3 col-lg-4 col-md-6 col-xs-12"
                            v-for="(item, index) in filterDramaData"
                            :class="{ 'is_active': index === isActive }"
                            :key="index"
                        >
                            <div class="dramaWork--img">
                                <div>
                                    <div class="dramaWork--img--left">{{ item.gsx$劇名.$t }}</div>
                                    <div class="dramaWork--img--front" :style="{backgroundImage: `url(../static/img/drama/${item.gsx$圖片.$t})`}"></div>
                                </div>
                            </div>
                            <ul>
                                <li>{{ item.gsx$性質.$t }}</li>
                                <li>{{ item.gsx$首播日期.$t }}</li>
                                <li>{{ item.gsx$劇名.$t }}</li>
                                <li><span>飾</span>{{ item.gsx$飾演.$t }}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'DramaWork',
    data () {
        return {
            searchText: '',
            isActive: false,
            is_menu: false
        }
    },
    created() {
        this.getDrama();
    },
    methods: {
        ...mapActions('dramaWorkModules', ['getDrama']),
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
        ...mapGetters('dramaWorkModules', ['drama', 'categories']),
        filterDramaData() {
            const vm = this;
            if (vm.searchText) {
                    return vm.drama.filter((item) => {
                    const data = item.gsx$劇名.$t.toLowerCase().includes(vm.searchText.toLowerCase()) ||
                                 item.gsx$分類.$t.toLowerCase().includes(vm.searchText.toLowerCase())
                    return data;
                });
            }
            return this.drama;
        },
    }
}
</script>
