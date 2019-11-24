<template>
    <File :file="bus.file" :type="bus.tab">
        <Field :manager="bus.item.FieldManager"></Field>
        <Index :manager="bus.item.IndexManager"></Index>
    </File>
</template>

<script>
    import bus from '../helper/event';
    import File from './File';
    import Field from './Field';
    import Index from './Index';

    export default {
        name: 'Migration',
        components: { File, Field, Index },
        data() {
            return {
                bus
            };
        }
    };
</script>
