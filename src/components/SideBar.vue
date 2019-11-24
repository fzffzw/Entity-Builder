<template>
    <ul v-if="bus.project" class="side-bar">
        <li>
            <h2>{{ bus.project.name }}</h2>
        </li>
        <li v-for="item in bus.itemList" :key="item.name">
            <div :class="{'active':bus.item == item}" @click="bus.show(item)">{{ item.name }}</div>
        </li>
    </ul>
</template>

<script>
    import bus from '../helper/event';

    export default {
        name: 'SideBar',
        data() {
            return {
                bus
            };
        },
        methods: {}
    };
</script>

<style>
    .side-bar {
        position: fixed;
        top: 50px;
        left: 0px;
        bottom: 0px;
        width: 160px;
        padding: 0;
        margin: 0;
        overflow-y: auto;
        border-right: lightgray solid 1px;
    }

    .side-bar h2 {
        text-align: center;
    }

    .side-bar li {
        list-style: none;
        cursor: pointer;
        font-size: 18px;
        border-top: lightgray solid 1px;
    }

    .side-bar li div {
        padding: 11px;
    }

    .side-bar li div.active,
    .side-bar li div.active:hover {
        background-color: DeepSkyBlue;
    }

    .side-bar li div:hover {
        background-color: aliceblue;
    }
</style>
