<template>
    <div>
        <template v-if="'Project' == bus.tab">
            <table class="table">
                <caption>
                    <h3>Property</h3>
                </caption>
                <thead>
                    <tr>
                        <th width="160px">Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>
                            <input v-model="bus.project.name" type="text" class="form-control wa" />
                        </td>
                    </tr>
                    <tr>
                        <td>NameSpace</td>
                        <td>
                            <span @click="setNameSpace" class="btn btn-default">{{ bus.project.NameSpace }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Entity :manager="bus.project.EntityManager"></Entity>
        </template>

        <template v-if="bus.item">
            <Migration v-if="'Migration' == bus.tab"></Migration>

            <Model v-if="'Model' == bus.tab"></Model>

            <Request v-if="'Request' == bus.tab"></Request>

            <Factory v-if="'Factory' == bus.tab"></Factory>

            <FileList v-if="'More' == bus.tab"></FileList>
        </template>
    </div>
</template>

<script>
import bus from '../helper/event'
import { see, enter } from '../helper/dialogue'
import Migration from './Migration'
import Model from './Model'
import Factory from './Factory'
import Entity from './Entity'
import Request from './Request'
import FileList from './FileList'

export default {
    name: 'Project',
    components: {
        Entity,
        Migration,
        Model,
        Factory,
        Request,
        FileList,
    },
    data() {
        return {
            bus,
        }
    },
    methods: {
        setNameSpace() {
            enter('Please enter the NameSpace', bus.project.NameSpace).then(result => {
                if (result.value) {
                    try {
                        bus.project.NameSpace = result.value
                    } catch (error) {
                        see(error, 400)
                    }
                }
            })
        },
    },
}
</script>
