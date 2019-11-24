import Vue from 'vue';

const bus = new Vue({
    data: {
        tab: 'Project',
        item: null,
        php: false,
        project: null,
        tabList: [
            'Project',
            'File',
            'Diagram',
            'Migration',
            'Model',
            'Request',
            'Factory',
            'More',
        ]
    },
    computed: {
        itemList() {
            if ('File' == this.tab) {
                return this.project.FileTypeManager.list
            }
            return this.project.EntityManager.list
        },
        file() {
            if (this.item) {
                return this.item.FileManager.findByType(this.tab);
            }
            return null
        }
    },
    methods: {
        showTab(tab) {
            if ('File' == this.tab) {
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

export default bus;
