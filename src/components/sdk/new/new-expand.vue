<template>
    <Row class="expand-row" v-show="override">
        <Alert type="success" v-if="runError === ''">脚本运行成功</Alert>
        <Alert type="error" v-if="runError">{{ runError }}</Alert>
        <codemirror v-model="code"></codemirror>
    </Row>
</template>
<script>
export default {
    props: ['override', 'runError', 'overrideCode'],
    watch: {
        code (v) {
            this.$emit('overrideCode', v)
        }
    },
    data () {
        return {
            code: ''
        }
    }
}
</script>
