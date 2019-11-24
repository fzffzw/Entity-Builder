<template>
    <table class="table">
        <caption>
            <slot name="title"></slot>
        </caption>
        <thead>
            <tr>
                <th width="130px"></th>
                <th v-if="unique">name</th>
                <slot name="head"></slot>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in manager.list">
                <td class="button-cell">
                    <div class="btn-group">
                        <span v-if="showX" v-on:click="remove(item)" class="btn btn-danger"> X </span>
                        <span v-on:click="manager.moveUp(item)" class="btn btn-default"> ↑ </span>
                        <span v-on:click="manager.moveDown(item)" class="btn btn-default"> ↓ </span>
                    </div>
                </td>
                <td v-if="unique">
                    <span v-on:click="rename(item)" class="btn btn-default">{{ item.name }}</span>
                </td>
                <slot name="body" v-bind:item="item"></slot>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td>
                    <span v-on:click="add" class="btn btn-primary plus"> + </span>
                </td>
                <slot name="foot"></slot>
            </tr>
        </tfoot>
    </table>
</template>

<script>
    import { see, enter, sure } from '../helper/dialogue';

    export default {
        name: 'ItemList',
        props: ['manager', 'unique', 'showX'],
        data() {
            return {
                title: 'Please enter the name'
            };
        },
        methods: {
            add() {
                if (this.unique) {
                    enter(this.title).then(result => {
                        if (result.value) {
                            this.make(result.value);
                        }
                    });
                    return;
                }

                this.make('name');
            },
            make(name) {
                try {
                    const item = this.manager.make(name);
                    this.manager.add(item);
                } catch (error) {
                    see(error, 400);
                }
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
    }
</script>
