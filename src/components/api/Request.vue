<template>
    <table class="table">
        <thead>
            <tr>
                <th style="width: 88px;">Key</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>name</td>
                <td>
                    <div class="btn-group">
                        <span @click="rename(item)" class="btn btn-default">{{ item.name }}</span>
                        <slot></slot>
                    </div>
                </td>
            </tr>
            <tr>
                <td>description</td>
                <td>
                    <input v-model="item.description" type="text" class="form-control" />
                </td>
            </tr>
            <tr v-if="item.HeaderManager">
                <td>headers</td>
                <td>
                    <ItemList :manager="item.HeaderManager" :list="HeaderManager.list" title="Header"></ItemList>
                </td>
            </tr>
            <tr>
                <td>content</td>
                <td>
                    <MediaType :manager="manager" :list="list"></MediaType>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import ItemList from './ItemList';
    import MediaType from './MediaType';

    export default {
        name: 'Request',
        props: ['item', 'list'],
        components: { ItemList, MediaType },
        data() {
            return {
                HeaderManager: bus.project.api.component.HeaderManager
            };
        },
        computed: {
            manager() {
                return this.item.MediaTypeManager
            }
        },
        methods: {
            rename(item) {
                enter('Please enter the Request name', item.name).then(result => {
                    if (result.value) {
                        try {
                            item.name = result.value;
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
