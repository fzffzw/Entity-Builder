import Vue from 'vue';

const bus = new Vue({
    data: {
        tool: 'Entity',
        tab: 'Project',
        item: null,
        php: false,
        project: null,
    },
    computed: {
        tabList() {
            if ('Entity' == this.tool) {
                return EntityMenu
            }
            return APIMenu
        },
        itemList() {
            if ('Entity' == this.tool) {
                if ('File' == this.tab) {
                    return this.project.FileTypeManager.list
                }
                return this.project.EntityManager.list
            }

            const map = new Map([
                ['Info', []],
                ['Example', this.project.api.component.ExampleManager.list],
                ['Header', []],
                ['Parameter', []],
                ['Path', this.project.api.PathManager.list],
                ['Request', this.project.api.component.RequestManager.list],
                ['Response', this.project.api.component.ResponseManager.list],
                ['Schema', this.project.api.component.SchemaManager.list],
                ['Security', []],
                ['Server', []],
                ['Tag', []],
            ])
            return map.get(this.tab)
        },
        file() {
            if (this.item) {
                return this.item.FileManager.findByType(this.tab);
            }
            return null
        }
    },
    methods: {
        showTool(tool) {
            this.$set(this, 'tool', tool);
            this.$set(this, 'item', null);

            if ('Entity' == this.tool) {
                this.showTab('Project')
            } else {
                this.showTab('Info')
            }
        },
        showTab(tab) {
            if ('File' == this.tab || 'API' == this.tool) {
                this.$set(this, 'item', null);
            }

            this.$set(this, 'tab', tab);
            this.$emit('TabChanged');
        },
        show(item) {
            // console.log(item)
            this.$set(this, 'item', item);
            this.$emit('ItemChanged');
        },
        select(tab, item) {
            this.showTab(tab)
            this.show(item)
        }
    }
});

class Tab {
    constructor(name, tool, manager) {
        this.name = name
        this.tool = tool
        this.manager = manager
    }

    get list() {
        if (this.manager) {
            return this.manager.list
        }
        return []
    }
}

const EntityMenu = [
    'Project',
    'File',
    'Diagram',
    'Migration',
    'Model',
    'Request',
    'Factory',
    'More',
]

const APIMenu = [
    'Info',
    'Path',
    // 'Example',
    'Header',
    'Parameter',
    'Request',
    'Response',
    'Schema',
    // 'Security',
    'Server',
    'Tag',
]

export default bus;
