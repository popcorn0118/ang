<template>
    <div class="row category">
        <div class="col-lg-9">
            <div class="btn-group btn-group-toggle" data-toggle="buttons" >
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
</template>
<script>
export default {
    name: 'Category'
}
</script>