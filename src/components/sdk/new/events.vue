<template>
    <Card :bordered="false">
        <p slot="title">事件</p>
        <a href="javascript:void(0)" slot="extra">
            <Icon type="ios-loop-strong"></Icon>
            <Dropdown @on-click="clickDropdownHandle">
                <a href="javascript:void(0)">
                    添加事件
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem name="click">Click</DropdownItem>
                    <DropdownItem name="change">Change</DropdownItem>
                    <DropdownItem name="blur">Blur</DropdownItem>
                    <DropdownItem name="focus">Focus</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </a>
        <Alert type="warning" v-if="customeEvents.length">
            自定义代码片段注意事项
            <template slot="desc">
                程序会将您输入的 JavaScript代码 放入函数中并提供两个参数对象（Event，Metrix），请确保输入的代码片段可以正确执行并不会存在安全隐患！
            </template>
        </Alert>
        <Collapse v-model="collapseName" accordion
            v-if="customeEvents.length">
            <Panel :name="item.name"
                v-for="(item, index) in customeEvents"
                :key="index">
                <span class="event-name">{{ item.name }} 事件</span><Button type="error"
                    class="delete-event-btn"
                    size="small" @click.stop="delEvent(index)">删除</Button>
                <Button type="primary"
                    class="run-event-code-btn"
                    size="small" @click.stop="runCode(item)">运行</Button>
                <div slot="content">
                    <Alert type="success" v-if="item.runError === ''">脚本运行成功</Alert>
                    <Alert type="error" v-if="item.runError">{{ item.runError }}</Alert>
                    <codemirror v-model="item.code"></codemirror>
                </div>
            </Panel>
        </Collapse>
        <div class="custom-event-info" v-show="!customeEvents.length">
            暂无自定义事件
        </div>
    </Card>
</template>

<script>
export default {
    data () {
        return {
            customeEvents: [],
            collapseName: ''
        }
    },
    watch: {
        customeEvents: {
            deep: true,
            handler (v) {
                this.$emit('eventsChange', v)
            }
        }
    },
    methods: {
        runCode (n) {
            try {
                const fn = new Function('events', 'metrix', n.code) // eslint-disable-line
                fn()
                Object.assign(n, {
                    runError: ''
                })
            } catch (e) {
                Object.assign(n, {
                    runError: e.toString()
                })
            }
        },
        async clickDropdownHandle (eventName) {
            const [filter] = this.customeEvents.filter(n => n.name === eventName)

            if (filter) {
                const config = {
                    content: `已经存在事件名为 ${filter.name} 的事件！`,
                    duration: 2.5
                }
                this.$Message.error(config)
                return
            }

            this.customeEvents.push(
                {
                    name: eventName,
                    runError: false,
                    code: `
                    var ev = 1;
var mx = 2;
`
                }
            )

            await this.$nextTick()
            this.collapseName = eventName
        },
        delEvent (i) {
            this.customeEvents = this.customeEvents.filter((n, index) => index !== i)
        }
    }
}
</script>

<style scoped lang="scss">
.delete-event-btn {
    margin-left: 6px;
}
.event-name {
    display: inline-block;
    width: 85px;
}
.custom-event-info {
    text-align: center;
}
.run-event-code-btn {
    float: right;
    margin-right: 16px;
    margin-top: 6px;
}
</style>
