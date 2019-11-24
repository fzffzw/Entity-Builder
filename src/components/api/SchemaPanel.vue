<template>
    <div>
        <div v-if="editing">
            <Schema :schema="schema" :list="list" :showname="showname">
                <span @click="editing=false" class="btn btn-success"> OK </span>
                <span v-if="showx" @click="$emit('remove', schema)" class="btn btn-danger"> X </span>
            </Schema>
        </div>

        <div v-else @click="editing=true">
            <span v-if="showname">{{ schema.name }}: {{ text(schema) }}</span>
            <pre v-else>{{ text(schema) }}</pre>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SchemaPanel',
        beforeCreate() {
            this.$options.components.Schema = require('./Schema').default;
        },
        props: ['schema', 'list', 'showname', 'showx'],
        data() {
            return {
                editing: false
            };
        },
        methods: {
            text(schema) {
                if ('array' === schema.type) {
                    if (schema.isPrimitive) {
                        return schema.itemType + '[]'
                    }
                    return `#${schema.reference.name}[]`
                }
                if ('composition' === schema.type) {
                    const list = schema.SchemaManager.list.map(item => this.text(item))
                    return list.join('\n')
                }
                if ('object' === schema.type) {
                    const list = schema.SchemaManager.list.map(item => `${item.name}: ` + this.text(item))
                    return list.join('\n')
                }
                if ('reference' === schema.type) {
                    return '#' + schema.reference.name
                }
                return schema.type
            }
        }
    };
</script>
