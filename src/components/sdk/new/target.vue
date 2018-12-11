<template>
    <Card :bordered="false">
        <p slot="title">DOM Target</p>
        <a href="javascript:void(0)" @click="addTarget" slot="extra">
            <Icon type="ios-loop-strong"></Icon>
            添加Target
        </a>
        <Alert type="warning">
            自定义代码片段注意事项
            <template slot="desc">
                程序会将您输入的 JavaScript代码 放入函数中并提供两个参数对象（Event，Metrix），请确保输入的代码片段可以正确执行并不会存在安全隐患！
            </template>
        </Alert>
        <NewTable :storeData="storeData"
            @storeDataChange="storeDataChange"
            @runCode="runCode"
            :data="data" @delData="delData"></NewTable>
    </Card>
</template>

<script>
import TargetMixin from '@/mixins/sdk/target'
import NewTable from './new-table'

export default {
    mixins: [TargetMixin],
    components: {
        NewTable
    }
}
</script>

<style scoped lang="scss">
.attribute-content {
    height: 200px;
}
.attribute-split-pane {
    padding: 10px;
}
.delete-attribute-btn {
    margin-left: 12px;
}
.attribute-override-checkbox {
    float: right;
}
</style>
