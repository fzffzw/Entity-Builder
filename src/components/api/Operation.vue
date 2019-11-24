<template>
    <table class="table">
        <caption>
            <div class="title">
                <h1>{{ operation.name }}</h1>
                <span @click="$emit('remove')" class="btn btn-danger"> X </span>
            </div>
        </caption>
        <tbody>
            <tr>
                <td>summary</td>
                <td>
                    <input v-model="operation.summary" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <td>description</td>
                <td>
                    <input v-model="operation.description" type="text" class="form-control" />
                </td>
            </tr>
            <tr>
                <td>tags</td>
                <td>
                    <ItemList :manager="operation.TagManager" :list="TagManager.list" title="Tag"></ItemList>
                </td>
            </tr>
            <tr>
                <td>parameters</td>
                <td>
                    <ReferenceList :manager="operation.ParameterManager" kind="Parameter" :list="component.ParameterManager.list"></ReferenceList>
                </td>
            </tr>
            <tr v-if="'get'!=operation.type && 'delete'!=operation.type">
                <td>requestBody</td>
                <td>
                    <Reference :item="operation.requestBody" kind="Request" :list="component.RequestManager.list"></Reference>
                </td>
            </tr>
            <tr>
                <td>response</td>
                <td>
                    <Status :manager="operation.StatusManager" :list="component.ResponseManager.list"></Status>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import bus from '../../helper/event';
    import { see, enter, sure } from '../../helper/dialogue';
    import ItemList from './ItemList';
    import Reference from './Reference';
    import ReferenceList from './ReferenceList';
    import Status from './Status';

    export default {
        name: 'Operation',
        components: { ItemList, Reference, ReferenceList, Status },
        props: ['operation'],
        data() {
            return {
                component: bus.project.api.component,
                TagManager: bus.project.api.TagManager
            };
        },
        methods: {}
    };
</script>
