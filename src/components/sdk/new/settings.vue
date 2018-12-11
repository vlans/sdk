<template>
    <Card :bordered="false">
        <p slot="title">配置</p>
        <div>
            <Form :label-width="85" :model="settings">
                <FormItem label="数据发送" required>
                    <Input v-model="settings.api.address" placeholder="数据发送地址">
                        <Select v-model="settings.api.protocol" slot="prepend" style="width: 80px">
                            <Option value="http://">http://</Option>
                            <Option value="https://">https://</Option>
                        </Select>
                    </Input>
                </FormItem>
                <FormItem label="发送方式" required>
                    <Select v-model="settings.type" multiple placeholder="发送方式">
                        <Option value="ALL">ALL</Option>
                        <Option value="GET">GET</Option>
                        <Option value="POST">POST</Option>
                        <Option value="PUT">PUT</Option>
                        <Option value="DELETE">DELETE</Option>
                    </Select>
                </FormItem>
                <FormItem label="授信域名">
                    <Row v-for="(item, index) in settings.creditDomain"
                        class="credit-domain"
                        :key="index">
                        <Col span="18">
                            <Input v-model="item.domain" placeholder="授信域名"></Input>
                        </Col>
                        <Col span="5" offset="1">
                            <Button type="error"
                                size="small"
                                @click="delCreditDomain(index)"
                                v-if="index < settings.creditDomain.length
                                    && index !== settings.creditDomain.length - 1">删除</Button>
                            <Button type="primary"
                                size="small"
                                @click="addCreditDomain(item)"
                                v-if="index === settings.creditDomain.length - 1">添加</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="监控方式" required>
                    <CheckboxGroup v-model="settings.mode">
                        <Checkbox label="MutationObserver"></Checkbox>
                        <Checkbox label="事件委托"></Checkbox>
                        <Checkbox label="DOM Attribute"></Checkbox>
                        <Checkbox label="DOM Target"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="监控错误">
                    <CheckboxGroup v-model="settings.error">
                        <Checkbox label="脚本错误"></Checkbox>
                        <Checkbox label="Promise Reject"></Checkbox>
                        <Checkbox label="外部资源"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="时间&性能">
                    <CheckboxGroup v-model="settings.timePerformance">
                        <Checkbox label="Performance API"></Checkbox>
                        <Checkbox label="加载时间"></Checkbox>
                        <Checkbox label="内存信息"></Checkbox>
                        <Checkbox label="AJAX Timing"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="其他">
                    <CheckboxGroup v-model="settings.other">
                        <Checkbox label="断网存储"></Checkbox>
                        <Checkbox label="WebSocket"></Checkbox>
                        <Checkbox label="Authorization"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Form>
        </div>
    </Card>
</template>

<script>
export default {
    data () {
        return {
            settings: {
                api: {
                    address: '',
                    protocol: 'http://'
                },
                type: [],
                creditDomain: [
                    {
                        domain: ''
                    }
                ],
                mode: [],
                error: [],
                timePerformance: [],
                other: []
            }
        }
    },
    watch: {
        settings: {
            deep: true,
            handler (v) {
                this.$emit('settingsChange', v)
            }
        }
    },
    methods: {
        addCreditDomain (item) {
            if (!item.domain) {
                const config = {
                    content: '请填写授信域名',
                    duration: 2.5
                }

                this.$Message.error(config)
                return
            }
            this.settings.creditDomain.push({
                domain: ''
            })
        },
        delCreditDomain (i) {
            this.settings.creditDomain = this.settings.creditDomain.filter((n, index) => index !== i)
        }
    }
}
</script>

<style scoped lang="scss">
.credit-domain {
    margin-bottom: 10px;
}
.credit-domain:last-child {
    margin-bottom: 0;
}
.ivu-form-item:last-child {
    margin-bottom: 0;
}
</style>
