<template>
    <div>
        <span v-on:click="add" class="btn btn-default"> + </span>
        <div v-for="item in manager.list" :key="item.name">
            <Reference :item="item" :kind="kind" :list="list">
                <span v-on:click="remove(item)" class="btn btn-default"> - </span>
            </Reference>
        </div>
    </div>
</template>

<script>
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import Reference from './Reference';
    import { LDData } from '../ListDialogue';

    export default {
        name: 'ReferenceList',
        components: { Reference },
        props: ['manager', 'list', 'kind'],
        data() {
            return {};
        },
        methods: {
            add() {
                let kind = 'Reference';
                if (this.kind) {
                    kind = this.kind;
                }
                LDData.show(`Select a ${kind}`, this.list, 'name', null, item => {
                    try {
                        const one = this.manager.make(item.name);
                        this.manager.add(one);
                    } catch (error) {
                        see(error, 400);
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
