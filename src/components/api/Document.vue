<template>
    <div>
        <Info v-if="'Info'==bus.tab"></Info>

        <Parameter v-if="'Header'==bus.tab" :manager="HeaderManager" :isheader="true"></Parameter>
        <Parameter v-if="'Parameter'==bus.tab" :manager="ParameterManager" :isheader="false"></Parameter>

        <PathList v-if="'Path'==bus.tab"></PathList>

        <RequestList v-if="'Request'==bus.tab"></RequestList>

        <ResponseList v-if="'Response'==bus.tab"></ResponseList>

        <SchemaList v-if="'Schema'==bus.tab"></SchemaList>

        <Server v-if="'Server'==bus.tab"></Server>

        <Tag v-if="'Tag'==bus.tab"></Tag>
    </div>
</template>

<script>
    import bus from '../../helper/event';
    import Info from './Info';
    import Parameter from './Parameter';
    import PathList from './PathList';
    import RequestList from './RequestList';
    import ResponseList from './ResponseList';
    import SchemaList from './SchemaList';
    import Server from './Server';
    import Tag from './Tag';

    export default {
        name: 'Document',
        components: {
            Info,
            Parameter,
            PathList,
            RequestList,
            ResponseList,
            SchemaList,
            Server,
            Tag
        },
        data() {
            return {
                bus,
                HeaderManager: bus.project.api.component.HeaderManager,
                ParameterManager: bus.project.api.component.ParameterManager
            };
        },
        methods: {
        }
    };
</script>
