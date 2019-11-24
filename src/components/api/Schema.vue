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
                        <span v-if="showname" @click="rename(schema)" class="btn btn-default">{{ schema.name }}</span>
                        <slot></slot>
                    </div>
                </td>
            </tr>
            <tr>
                <td>description</td>
                <td>
                    <input v-model="schema.description" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <td>type</td>
                <td>
                    <span v-if="schema.entity">Entity</span>
                    <select v-else v-model="schema.type" class="form-control wa">
                        <option value="array">array</option>
                        <option value="boolean">boolean</option>
                        <option value="composition">composition</option>
                        <option value="integer">integer</option>
                        <option value="number">number</option>
                        <option value="object">object</option>
                        <option value="reference">reference</option>
                        <option value="string">string</option>
                    </select>
                </td>
            </tr>
            <tr v-if="'array'===schema.type">
                <td>items</td>
                <td>
                    <label>
                        <input v-model="schema.isPrimitive" class="checkbox" type="checkbox" /> primitive
                    </label>
                    <select v-if="schema.isPrimitive" v-model="schema.itemType" class="form-control wa">
                        <option value="boolean">boolean</option>
                        <option value="integer">integer</option>
                        <option value="number">number</option>
                        <option value="string">string</option>
                    </select>
                    <Reference v-else :item="schema.reference" kind="Schema" :list="list"></Reference>
                </td>
            </tr>
            <tr v-if="'composition'===schema.type || 'object'===schema.type">
                <td>
                    <span v-if="'composition'===schema.type">allOf</span>
                    <span v-else>properties</span>
                </td>
                <td>
                    <div v-if="schema.entity">
                        <div v-for="item in publicList">{{ item.name }}</div>
                    </div>
                    <div v-else>
                        <span v-on:click="add" class="btn btn-default"> + </span>
                    </div>
                    <div v-for="item in manager.list" :key="item.name">
                        <SchemaPanel :schema="item" :list="list" :showname="'object'===schema.type" :showx="true" @remove="remove"></SchemaPanel>
                    </div>
                </td>
            </tr>
            <tr v-if="'reference'===schema.type">
                <td>$ref</td>
                <td>
                    <Reference :item="schema.reference" kind="Schema" :list="list"></Reference>
                </td>
            </tr>
            <tr v-if="'string'===schema.type">
                <td>format</td>
                <td>
                    <select v-model="schema.format" class="form-control wa">
                        <option value="">''</option>
                        <option value="binary">binary</option>
                        <option value="byte">byte</option>
                        <option value="date">date</option>
                        <option value="date-time">date-time</option>
                        <option value="password">password</option>
                    </select>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import { see, enter, sure } from '../../helper/dialogue';
    import Reference from './Reference';
    import SchemaPanel from './SchemaPanel';

    export default {
        name: 'Schema',
        components: { Reference, SchemaPanel },
        props: ['schema', 'list', 'showname'],
        data() {
            return {};
        },
        computed: {
            manager() {
                return this.schema.SchemaManager
            },
            publicList() {
                return this.schema.entity.FieldManager.list.filter(field => field.included)
            }
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
            rename(item) {
                enter('Please enter the Schema name', item.name).then(result => {
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
