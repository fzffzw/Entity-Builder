<template>
    <div class="btn-group">
        <span v-on:click="add" class="btn btn-default"> + </span>
        <span v-for="item in manager.list" v-on:click="remove(item)" class="btn btn-default">{{ item.name }}</span>
    </div>
</template>

<script>
    import { see, enter, sure } from '../../helper/dialogue';
    import { LDData } from '../ListDialogue';

    export default {
        name: 'ItemList',
        props: ['manager', 'list', 'title'],
        data() {
            return {};
        },
        methods: {
            add() {
                LDData.show(`Select a ${this.title}`, this.list, 'name', null, item => {
                    try {
                        const one = this.manager.make(item.name);
                        this.manager.add(one);
                    } catch (error) {
                        see(error, 400);
                    }
                });
            },
            remove(item) {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.manager.remove(item);
                    }
                });
            }
        }
    }
</script>
