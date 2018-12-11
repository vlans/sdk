<template>
    <div class="layout">
        <sider-menu></sider-menu>
        <Layout :style="{
            marginLeft: '200px',
            minWidth: '355px',
            height: '100%' }"
            class="container">
            <Header :style="{
                background: '#fff',
                zIndex: 100,
                boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <user></user>
            </Header>
            <Content :style="{
                    padding: '0 16px 16px',
                    height: 'calc(100% - 64px)',
                    overflow: 'auto'
                }">
                <breadcrumb></breadcrumb>
                <Card :style="{ minHeight: 'calc(100% - 54px)'}">
                    <router-view />
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import User from './user'
import Breadcrumb from './breadcrumb'
import SiderMenu from './sider-menu'

export default {
    components: {
        User,
        Breadcrumb,
        SiderMenu
    }
}
</script>

<style>
html, body, #app {
    height: 100%;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.dropdown-user-container {
    float: right;
    margin-right: -26px;
}
</style>
