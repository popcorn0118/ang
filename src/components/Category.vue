<template>
    <div class="row category">
        <div class="col-lg-9 col-md-12">
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
        <div class="col-lg-3 col-md-12">
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
</template>
<script>
export default {
    name: 'Category',
    data () {
        return {
            searchText: '',
            isActive: false,
            is_menu: false
        }
    },
    methods: {
        categoryToggle() {
            !this.is_menu ? this.is_menu = true : this.is_menu = false
        },
        categoryUp() {
            this.is_menu = false;
        }
        
    }
}
</script>