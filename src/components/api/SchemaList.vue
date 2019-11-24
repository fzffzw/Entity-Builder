<template>
    <div>
        <div class="title">
            <h1>Schema</h1>
            <span class="btn-group">
                <span v-on:click="add" class="btn btn-primary"> + </span>
                <span v-on:click="load" class="btn btn-info">+ Entity</span>
            </span>
        </div>

        <Schema v-if="bus.item" :schema="bus.item" :list="manager.list" :showname="true">
            <span @click="remove(bus.item)" class="btn btn-danger"> X </span>
        </Schema>
    </div>
</template>

<script>
    import * as api from '../../helper/api';
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import Schema from './Schema';
    import { LDData } from '../ListDialogue';

    export default {
        name: 'SchemaList',
        components: { Schema },
        data() {
            return {
                bus,
                manager: bus.project.api.component.SchemaManager
            };
        },
        methods: {
            add() {
                enter('Please enter the Schema name').then(result => {
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
            },
            load() {
                LDData.show('Select a Entity', bus.project.EntityManager.list, 'name', null, entity => {
                    try {
                        api.makeSchema(entity, bus.project.api.component.SchemaManager);
                    } catch (error) {
                        see(error, 400);
                    }
                });
            }
        }
    };
</script>
