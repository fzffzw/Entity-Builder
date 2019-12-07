<template>
    <div>
        <div v-for="file in fileWithoutTab" :key="file.name">
            <File :file="find(file.name)" :type="file.name"></File>
            <hr>
        </div>
    </div>
</template>

<script>
    import bus from '../helper/event';
    import File from './File';

    const TabList = ['Migration', 'Model', 'Request', 'Factory',]

    export default {
        name: 'FileList',
        components: { File },
        data() {
            return {
                bus
            };
        },
        computed: {
            fileWithoutTab() {
                return bus.project.FileTypeManager.list.filter(file => TabList.indexOf(file.name) == -1);
            }
        },
        methods: {
            find(type) {
                return bus.item.FileManager.findByType(type);
            }
        }
    };
</script>
