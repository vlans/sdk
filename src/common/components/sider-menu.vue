<template>
    <Sider :style="{
        position: 'fixed',
        height: '100vh',
        left: 0,
        overflow: 'auto'}">
        <Menu :active-name="$route.path"
            theme="dark"
            accordion
            ref="menu"
            :open-names="matched"
            width="auto">
            <Submenu name="/sdk">
                <template slot="title">
                    <Icon type="md-construct" />
                    SDK 管理
                </template>
                <menu-item name="/sdk/new" to="/sdk/new">新建</menu-item>
                <menu-item name="/sdk/template" to="/sdk/template">模板</menu-item>
            </Submenu>
            <Submenu name="/log">
                <template slot="title">
                    <Icon type="md-paper" />
                    日志
                </template>
                <menu-item name="/log/info" to="/log/info">信息</menu-item>
            </Submenu>
            <Submenu name="/dashboard">
                <template slot="title">
                    <Icon type="ios-analytics" />
                    Dashboard
                </template>
                <menu-item name="/dashboard/new" to="/dashboard/new">新建</menu-item>
                <menu-item name="/dashboard/template" to="/dashboard/template">模板</menu-item>
            </Submenu>
            <Submenu name="/alarm">
                <template slot="title">
                    <Icon type="md-alarm" />
                    告警
                </template>
                <menu-item name="/alarm/new" to="/alarm/new">新建</menu-item>
                <menu-item name="/alarm/index" to="/alarm/rule">规则</menu-item>
            </Submenu>
        </Menu>
    </Sider>
</template>

<script>
export default {
    watch: {
        async $route (v) {
            const [matched] = v.matched
            this.matched = [matched.path]
            await this.$nextTick()
            this.$refs.menu.updateOpened()
        }
    },
    data () {
        return {
            matched: []
        }
    }
}
</script>
