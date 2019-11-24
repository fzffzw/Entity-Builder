<template>
    <ItemList :manager="manager" :unique="true" :showX="true">
        <template v-slot:title>
            <h1>Tag</h1>
        </template>

        <template v-slot:head>
            <th>description</th>
        </template>

        <template v-slot:body="{ item }">
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
    import { see, enter, sure } from '../../helper/dialogue';
    import ItemList from '../ItemList';

    export default {
        name: 'Tag',
        components: { ItemList },
        data() {
            return {
                title: 'Please enter the Tag name',
                manager: bus.project.api.TagManager
            };
        },
        methods: {}
    };
</script>
