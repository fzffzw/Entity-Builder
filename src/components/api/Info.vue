<template>
    <div>
        <div class="title">
            <h1>{{ api.info.title }}</h1>
            <span @click="download" class="btn btn-success">Download</span>
        </div>

        <table class="table">
            <caption class="title">
                <h3>Info</h3>
            </caption>
            <thead>
                <tr>
                    <th width="160px">Name</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>title</td>
                    <td>
                        <input v-model="api.info.title" type="text" class="form-control wa" />
                    </td>
                </tr>
                <tr>
                    <td>version</td>
                    <td>
                        <input v-model="api.info.version" type="text" class="form-control wa" />
                    </td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>
                        <input v-model="api.info.description" type="text" class="form-control" />
                    </td>
                </tr>
                <tr>
                    <td>termsOfService</td>
                    <td>
                        <input v-model="api.info.termsOfService" type="text" class="form-control" />
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table">
            <caption>
                <h3>Contact</h3>
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
                        <input v-model="api.info.contact.name" type="text" class="form-control" />
                    </td>
                </tr>
                <tr>
                    <td>url</td>
                    <td>
                        <input v-model="api.info.contact.url" type="text" class="form-control" />
                    </td>
                </tr>
                <tr>
                    <td>email</td>
                    <td>
                        <input v-model="api.info.contact.email" type="text" class="form-control" />
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table">
            <caption>
                <h3>License</h3>
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
                        <input v-model="api.info.license.name" type="text" class="form-control" />
                    </td>
                </tr>
                <tr>
                    <td>url</td>
                    <td>
                        <input v-model="api.info.license.url" type="text" class="form-control" />
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table">
            <caption>
                <h3>External Document</h3>
            </caption>
            <thead>
                <tr>
                    <th width="160px">Name</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>url</td>
                    <td>
                        <input v-model="api.externalDocs.url" type="text" class="form-control" />
                    </td>
                </tr>
                <tr>
                    <td>description</td>
                    <td>
                        <input v-model="api.externalDocs.description" type="text" class="form-control" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import FileSaver from 'file-saver';
    import bus from '../../helper/event';

    export default {
        name: 'Info',
        data() {
            return {
                api: bus.project.api
            };
        },
        methods: {
            download() {
                const api = bus.project.api.toAPI()
                const result = JSON.stringify(api);
                // console.log(result)
                const blob = new Blob([result], { type: 'text/plain;charset=utf-8' });
                FileSaver.saveAs(blob, 'openapi.json');
            }
        }
    };
</script>
