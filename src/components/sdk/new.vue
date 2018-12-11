<template>
    <div>
        <div class="settings-container">
            <settings @settingsChange="settingsChange"></settings>
            <Divider />
        </div>
        <div class="events-container">
            <events @eventsChange="eventsChange"></events>
            <Divider />
        </div>
        <div class="attribute-container" v-show="attribute">
            <attribute @attributeChange="attributeChange"></attribute>
            <Divider />
        </div>
        <div class="target-container" v-show="target">
            <target @targetChange="targetChange"></target>
            <Divider />
        </div>
        <div class="websocket-container" v-show="websocket">
            <websocket></websocket>
            <Divider />
        </div>
        <div class="create-sdk-btn-container">
            <Button type="success" @click="createSDK" long size="large">添加模板并生成 SDK</Button>
        </div>
    </div>
</template>

<script>
import newComponents from './new/index'
import xss from 'xss'

export default {
    data () {
        return {
            attribute: false,
            target: false,
            websocket: false,
            customSDK: {}
        }
    },
    methods: {
        async createSDK () {
            const invalid = this.invalidSdkOptions()
            if (invalid) {
                return
            }

            await this.$q.sendSDKConfig(this.customSDK)
            this.$Message.success('操作成功')
        },
        invalidSdkOptions () {
            const { api, mode, type, events } = this.customSDK

            if (!api || !api.address) {
                const config = {
                    content: '请填写数据发送地址',
                    duration: 2.5
                }
                this.$Message.error(config)
                return true
            }

            if (!type || !type.length) {
                const config = {
                    content: '请选择发送方式',
                    duration: 2.5
                }
                this.$Message.error(config)
                return true
            }

            if (!mode || !mode.length) {
                const config = {
                    content: '请选择监控方式',
                    duration: 2.5
                }
                this.$Message.error(config)
                return true
            }

            if (events) {
                const keys = Object.keys(events)
                if (!keys.length) {
                    const config = {
                        content: '请确保事件中的代码可以正常运行',
                        duration: 2.5
                    }
                    this.$Message.error(config)

                    return true
                }
            }

            const attributeInvalid = this.commonInvalidTable('DOM Attribute', 'attribute')
            const targetInvalid = this.commonInvalidTable('DOM Target', 'target')

            if (attributeInvalid || targetInvalid) {
                return true
            }

            return false
        },
        commonInvalidTable (str, f) {
            const { mode } = this.customSDK
            const attr = mode.filter(n => n === str)

            if (!attr.length) {
                return false
            }

            const customeSDK = this.customSDK
            if (!customeSDK[f]) {
                const config = {
                    content: `请添加${f}`,
                    duration: 2.5
                }
                this.$Message.error(config)

                return true
            }

            const keys = Object.keys(customeSDK[f])
            const keysEmpty = keys.filter(n => !n)
            const values = Object.values(customeSDK[f])
            const valuesEmpty = values.filter(n => !n.events || !n.events.length)
            if (!keys.length || keysEmpty.length || valuesEmpty.length) {
                const config = {
                    content: `请检查${str}表格信息是否填写完整!`,
                    duration: 2.5
                }

                this.$Message.error(config)
                return true
            }
        },
        targetChange (v) {
            const target = this.filterChange(v)
            Object.assign(this.customSDK, {
                target
            })
        },
        attributeChange (v) {
            const attribute = this.filterChange(v)
            Object.assign(this.customSDK, {
                attribute
            })
            console.log(attribute)
        },
        eventsChange (v) {
            let events = {}
            if (!v.length) {
                Object.assign(this.customSDK, {
                    events
                })
                return
            }

            v.forEach(({ name, code }) => {
                try {
                    const fn = new Function('events', 'metrix', xss(code)) // eslint-disable-line
                    fn()

                    events = {
                        ...events,
                        [name]: fn + ''
                    }
                } catch (e) {}
            })

            Object.assign(this.customSDK, {
                events
            })
        },
        filterChange (v) {
            let data = {}

            if (!v.length) {
                return data
            }

            v.forEach(({ name, events, override, overrideCode, runError }) => {
                if (!runError) {
                    try {
                        const fn = new Function('events', 'metrix', xss(overrideCode)) // eslint-disable-line
                        fn()
                        data = {
                            ...data,
                            [name]: {
                                events,
                                override,
                                overrideCode,
                                fn: fn + ''
                            }
                        }
                    } catch (e) {}
                }
            })

            return data
        },
        settingsChange (v) {
            Object.assign(this.customSDK, v)

            this.showModeCard(v)
            this.showOtherCard(v)
        },
        showModeCard (v) {
            const { mode } = v

            if (!mode.length) {
                this.resetModeCard()
                return
            }

            const [attribute] = mode.filter(n => n === 'DOM Attribute')
            const [target] = mode.filter(n => n === 'DOM Target')

            this.attribute = attribute
            this.target = target
        },
        showOtherCard (v) {
            const { other } = v

            if (!other.length) {
                this.resetOhterCard()
                return
            }

            const [websocket] = other.filter(n => n === 'WebSocket')

            this.websocket = websocket
        },
        resetModeCard () {
            if (this.attribute || this.target) {
                this.attribute = false
                this.target = false
            }
        },
        resetOhterCard () {
            this.websocket = false
        }
    },
    components: newComponents
}
</script>
