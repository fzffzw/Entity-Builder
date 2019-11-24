<template>
    <div>
        <div class="btn-group">
            <slot></slot>
            <span v-on:click="rename" class="btn btn-default">{{ path.name }}</span>
        </div>

        <br>

        <div v-if="oGet">
            <Operation :operation="oGet" @remove="remove(oGet)"></Operation>
        </div>
        <div v-else>
            <span v-on:click="add('get')" class="btn btn-default"> + get </span>
        </div>

        <br>

        <div v-if="oDelete">
            <Operation :operation="oDelete" @remove="remove(oDelete)"></Operation>
        </div>
        <div v-else>
            <span v-on:click="add('delete')" class="btn btn-default"> + delete </span>
        </div>

        <br>

        <div v-if="oPatch">
            <Operation :operation="oPatch" @remove="remove(oPatch)"></Operation>
        </div>
        <div v-else>
            <span v-on:click="add('patch')" class="btn btn-default"> + patch </span>
        </div>

        <br>

        <div v-if="oPost">
            <Operation :operation="oPost" @remove="remove(oPost)"></Operation>
        </div>
        <div v-else>
            <span v-on:click="add('post')" class="btn btn-default"> + post </span>
        </div>

        <br>

        <div v-if="oPut">
            <Operation :operation="oPut" @remove="remove(oPut)"></Operation>
        </div>
        <div v-else>
            <span v-on:click="add('put')" class="btn btn-default"> + put </span>
        </div>

        <br>
    </div>
</template>

<script>
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import Operation from './Operation';

    export default {
        name: 'APIPath',
        components: { Operation },
        props: ['path'],
        data() {
            return {};
        },
        computed: {
            manager() {
                return this.path.OperationManager
            },
            oGet() {
                return this.manager.find('get')
            },
            oDelete() {
                return this.manager.find('delete')
            },
            oPatch() {
                return this.manager.find('patch')
            },
            oPost() {
                return this.manager.find('post')
            },
            oPut() {
                return this.manager.find('put')
            },
        },
        methods: {
            add(operation) {
                try {
                    const item = this.manager.make(operation);
                    this.manager.add(item);
                } catch (error) {
                    see(error, 400);
                }
            },
            rename() {
                enter('Please enter the Path', this.path.name).then(result => {
                    if (result.value) {
                        try {
                            this.path.name = result.value;
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
