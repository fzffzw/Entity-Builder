<template>
    <ItemList :manager="manager" :unique="false" :showX="true">
        <template v-slot:title>
            <h1>Server</h1>
        </template>

        <template v-slot:head>
            <th>url</th>
            <th>description</th>
        </template>

        <template v-slot:body="{ item }">
            <td>
                <input v-model="item.url" type="text" class="form-control" />
            </td>
            <td>
                <input v-model="item.description" type="text" class="form-control" />
            </td>
        </template>

        <template v-slot:foot>
            <td></td>
        </template>
    </ItemList>
</template>

<script>
    import bus from '../../helper/event';
    import ItemList from '../ItemList';

    export default {
        name: 'Server',
        components: { ItemList },
        data() {
            return {
                manager: bus.project.api.ServerManager
            };
        },
        methods: {}
    };
</script>
