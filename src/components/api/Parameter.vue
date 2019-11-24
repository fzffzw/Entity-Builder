<template>
    <table class="table">
        <caption>
            <h1 v-if="isheader">Header</h1>
            <h1 v-else>Parameter</h1>
        </caption>
        <thead>
            <tr>
                <th width="130px"></th>
                <th width="88px">required</th>
                <th>name</th>
                <th>in</th>
                <th>description</th>
                <th>Schema</th>
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
                <td><input v-model="item.required" class="checkbox" type="checkbox" /></td>
                <td>
                    <span v-on:click="rename(item)" class="btn btn-default">{{ item.name }}</span>
                </td>
                <td>
                    <span v-if="isheader">header</span>
                    <select v-else v-model="item.location" class="form-control">
                        <option value="cookie">cookie</option>
                        <option value="header">header</option>
                        <option value="path">path</option>
                        <option value="query">query</option>
                    </select>
                </td>
                <td>
                    <input v-model="item.description" type="text" class="form-control" />
                </td>
                <td>
                    <SchemaPanel :schema="item.schema" :list="manager.list"> </SchemaPanel>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td>
                    <span v-on:click="add" class="btn btn-primary plus"> + </span>
                </td>
                <td></td>
                <td></td>
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
        name: 'Parameter',
        components: { SchemaPanel },
        props: ['manager', 'isheader'],
        data() {
            return {
                title: 'Please enter the name'
            };
        },
        methods: {
            add() {
                enter(this.title).then(result => {
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
            rename(item) {
                enter(this.title, item.name).then(result => {
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
