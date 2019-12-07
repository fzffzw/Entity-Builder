<template>
    <div>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <span class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                        <span class="sr-only">Toggle</span>
                        <span class="icon-bar"></span>
                    </span>
                    <span class="navbar-brand">Entity</span>
                </div>
                <div class="collapse navbar-collapse">
                    <ul v-if="bus.project" class="nav navbar-nav">
                        <li v-for="tab in bus.tabList" :key="tab" :class="{ active: tab == bus.tab }">
                            <a @click="bus.showTab(tab)" href="javascript:void(0);">{{ tab }}</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="https://github.com/GooGee/Entity-Builder">GitHub</a></li>
                    </ul>
                </div>
                <!-- /.nav-collapse -->
            </div>
            <!-- /.container -->
        </nav>
        <!-- /.navbar -->

        <div style="margin-top:55px"></div>
    </div>
</template>

<script>
import bus from '../helper/event'

export default {
    name: 'Bar',
    data() {
        return {
            bus,
        }
    },
}
</script>
