<template>
    <div>
        <div class="title">
            <h1>Path</h1>
            <span class="btn-group">
                <span v-on:click="add" class="btn btn-primary"> + </span>
                <span v-on:click="load" class="btn btn-info">+ Entity</span>
            </span>
        </div>

        <APIPath v-if="bus.item" :path="bus.item">
            <span @click="remove" class="btn btn-danger"> X </span>
        </APIPath>
    </div>
</template>

<script>
    import * as api from '../../helper/api';
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import APIPath from './Path';
    import { LDData } from '../ListDialogue';

    export default {
        name: 'PathList',
        components: { APIPath },
        data() {
            return {
                bus,
                manager: bus.project.api.PathManager
            };
        },
        methods: {
            add() {
                enter('Please enter the Path').then(result => {
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
            load() {
                LDData.show('Select a Entity', bus.project.EntityManager.list, 'name', null, entity => {
                    try {
                        api.addEntity(entity, bus.project.api);
                    } catch (error) {
                        see(error, 400);
                    }
                });
            },
            remove() {
                sure('Are you sure?').then(result => {
                    if (result.value) {
                        this.manager.remove(bus.item);
                    }
                });
            }
        }
    };
</script>
