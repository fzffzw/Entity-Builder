<template>
    <div>
        <div class="title">
            <h1>Response</h1>
            <span v-on:click="add" class="btn btn-primary"> + </span>
        </div>

        <Request v-if="bus.item" :item="bus.item" :list="list">
            <span @click="remove(bus.item)" class="btn btn-danger"> X </span>
        </Request>
    </div>
</template>

<script>
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import Request from './Request';

    export default {
        name: 'ResponseList',
        components: { Request },
        data() {
            return {
                bus,
                manager: bus.project.api.component.ResponseManager,
                list: bus.project.api.component.SchemaManager.list
            };
        },
        methods: {
            add() {
                enter('Please enter the Response name').then(result => {
                    if (result.value) {
                        try {
                            const item = this.manager.make(result.value);
                            this.manager.add(item);
                        } catch (error) {
                            see(error, 400);
                        }
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
    };
</script>
