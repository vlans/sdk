<template>
    <Table :columns="columns" :data="source"></Table>
</template>

<script>
import expandRow from './new-expand.vue'

export default {
    props: ['data', 'storeData'],
    data () {
        return {
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                override: this.source[params.index].override,
                                runError: this.copyData[params.index].runError,
                                overrideCode: this.copyData[params.index].overrideCode
                            },
                            on: {
                                overrideCode: (v) => {
                                    this.copyData[params.index].overrideCode = v
                                }
                            }
                        })
                    }
                },
                {
                    title: '名称',
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Input', {
                                props: {
                                    placeholder: '名称',
                                    value: this.source[params.index].name
                                },
                                on: {
                                    input: (v) => {
                                        this.source[params.index].name = v
                                        this.copyData[params.index].name = v
                                    }
                                }
                            })
                        ])
                    }
                },
                {
                    title: '事件',
                    key: 'event',
                    render: (h, params) => {
                        return h('Select', {
                            props: {
                                placeholder: '事件',
                                value: this.source[params.index].events,
                                multiple: true
                            },
                            on: {
                                'on-change': (v) => {
                                    this.source[params.index].events = v
                                    this.copyData[params.index].events = v
                                }
                            }
                        },
                        params.row.event.map((item) => {
                            return h('Option', {
                                props: {
                                    value: item.value,
                                    label: item.name
                                }
                            })
                        })
                        )
                    }
                },
                {
                    title: '重写事件',
                    key: 'override',
                    render: (h, params) => {
                        return h('Checkbox', {
                            props: {
                                value: this.source[params.index].override
                            },
                            on: {
                                'on-change': (v) => {
                                    this.source[params.index]._disableExpand = !v
                                    this.source[params.index]._expanded = v
                                    this.source[params.index].override = v
                                    this.copyData[params.index].override = v
                                }
                            }
                        })
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                    disabled: !this.source[params.index].override
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.$emit('runCode', params.index)
                                    }
                                }
                            }, '运行'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.$emit('delData', params.index)
                                    }
                                }
                            }, '删除')
                        ])
                    }
                }
            ],
            source: this.data,
            copyData: this.storeData
        }
    },
    watch: {
        data: {
            deep: true,
            handler (v) {
                this.source = v
            }
        },
        storeData (v) {
            this.copyData = v
        },
        copyData: {
            deep: true,
            handler (v) {
                this.$emit('storeDataChange', v)
            }
        }
    },
    methods: {
    },
    components: {
        expandRow
    }
}
</script>
