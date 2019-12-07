<template>
    <File :file="bus.file" :type="bus.tab">
        <Validation :manager="bus.item.FieldManager" :entity="bus.item"></Validation>
    </File>
</template>

<script>
import bus from '../helper/event'
import File from './File'
import Validation from './Validation'

export default {
    name: 'Request',
    components: { File, Validation },
    data() {
        return {
            bus,
        }
    },
}
</script>
