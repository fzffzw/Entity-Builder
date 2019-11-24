<template>
    <span class="btn-group">
        <slot></slot>
        <span v-on:click="choose" class="btn btn-default">#{{ item.name }}</span>
        <span v-on:click="show" class="btn btn-default"> * </span>
    </span>
</template>

<script>
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import { LDData } from '../ListDialogue';

    export default {
        name: 'Reference',
        props: ['item', 'list', 'kind'],
        data() {
            return {};
        },
        methods: {
            choose() {
                let kind = 'Reference';
                if (this.kind) {
                    kind = this.kind;
                }
                LDData.show(`Select a ${kind}`, this.list, 'name', null, item => {
                    try {
                        this.item.name = item.name;
                    } catch (error) {
                        see(error, 400);
                    }
                });
            },
            show() {
                const map = new Map([
                    ['examples', 'Example'],
                    ['headers', 'Header'],
                    ['parameters', 'Parameter'],
                    ['requestBodies', 'Request'],
                    ['responses', 'Response'],
                    ['schemas', 'Schema'],
                ])
                const tab = map.get(this.item.type)
                const found = this.list.find(item => item.name === this.item.name)
                bus.select(tab, found)
            }
        }
    };
</script>
