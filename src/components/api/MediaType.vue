<template>
    <table class="table">
        <thead>
            <tr>
                <th width="130px"></th>
                <th width="300px">name</th>
                <th>schema</th>
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
                    <SchemaPanel :schema="item.schema" :list="list"></SchemaPanel>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td>
                    <select @change="add($event.target.value)" class="form-control">
                        <option selected="true" disabled="disabled" value="">...</option>
                        <option value="application/json">application/json</option>
                        <option value="application/octet-stream">application/octet-stream</option>
                        <option value="application/x-www-form-urlencoded">application/x-www-form-urlencoded</option>
                        <option value="multipart/form-data">multipart/form-data</option>
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
    import SchemaPanel from './SchemaPanel';

    export default {
        name: 'MediaType',
        components: { SchemaPanel },
        props: ['manager', 'list'],
        data() {
            return {};
        },
        methods: {
            add(type) {
                try {
                    const item = this.manager.make(type);
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
