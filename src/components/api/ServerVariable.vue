<template>
    <table class="table">
        <thead>
            <tr>
                <th width="130px"></th>
                <th>name</th>
                <th>default</th>
                <th>description</th>
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
                <td>
                    <input v-model="item.name" type="text" class="form-control" />
                </td>
                <td>
                    <input v-model="item.default" type="text" class="form-control" />
                </td>
                <td>
                    <input v-model="item.description" type="text" class="form-control" />
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td>
                    <span v-on:click="add" class="btn btn-primary plus"> + </span>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
    import { see, enter, sure } from '../../helper/dialogue';

    export default {
        name: 'ServerVariable',
        props: ['manager'],
        data() {
            return {};
        },
        methods: {
            add() {
                enter('Please enter the Variable name').then(result => {
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
                enter('Please enter the Variable name', item.name).then(result => {
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
