<template>
    <table class="table">
        <thead>
            <tr>
                <th width="130px"></th>
                <th>Status</th>
                <th>Response</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list" :key="item.name">
                <td class="button-cell">
                    <div class="btn-group">
                        <span v-on:click="remove(item)" class="btn btn-danger"> X </span>
                        <span v-on:click="manager.moveUp(item)" class="btn btn-default"> ↑ </span>
                        <span v-on:click="manager.moveDown(item)" class="btn btn-default"> ↓ </span>
                    </div>
                </td>
                <td>{{ item.name }}</td>
                <td>
                    <Reference :item="item.data" kind="Response" :list="list"></Reference>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td>
                    <select @change="add($event.target.value)" class="form-control wa">
                        <option selected="true" disabled="disabled" value="">...</option>
                        <option v-for="item in StatusList" :value="item" :key="item">{{ item }}</option>
                    </select>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import Reference from './Reference';

    export default {
        name: 'Status',
        components: { Reference },
        props: ['manager', 'list'],
        data() {
            return {
                StatusList: ['200', '400', '401', '403', '404', '422', '429']
            };
        },
        methods: {
            add(status) {
                try {
                    const item = this.manager.make(status);
                    this.manager.add(item);
                } catch (error) {
                    see(error, 400);
                }
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
