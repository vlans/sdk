export default {
    data () {
        return {
            data: [],
            storeData: []
        }
    },
    methods: {
        addTarget () {
            if (this.conditionData()) {
                const config = {
                    content: '请填写完表格中的信息，再次添加',
                    duration: 2.5
                }

                this.$Message.error(config)
                return
            }
            this.dataHandle()
            this.storeDataHandle()
        },
        storeDataHandle () {
            this.storeData.push({
                name: '',
                events: '',
                override: false,
                overrideCode: ''
            })
        },
        dataHandle () {
            this.data.push({
                event: [
                    {
                        value: 'click',
                        name: 'click'
                    },
                    {
                        value: 'change',
                        name: 'change'
                    },
                    {
                        value: 'blur',
                        name: 'blur'
                    },
                    {
                        value: 'focus',
                        name: 'focus'
                    }
                ],
                _disableExpand: true,
                _expanded: false
            })
        },
        delData (index) {
            this.data = this.data.filter((n, i) => i !== index)
            this.storeData = this.storeData.filter((n, i) => i !== index)
        },
        conditionData () {
            const filter = this.storeData.filter((n) => !n.name || !n.events.length || (n.override && !n.overrideCode))
            return filter.length
        },
        storeDataChange (v) {
            this.storeData = v
            this.$emit('attributeChange', v)
        },
        runCode (i) {
            try {
                const { overrideCode } = this.storeData[i]
                const fn = new Function('events', 'metrix', overrideCode) // eslint-disable-line
                fn()
                this.storeData.splice(i, 1, {
                    ...this.storeData[i],
                    runError: ''
                })
            } catch (e) {
                this.storeData.splice(i, 1, {
                    ...this.storeData[i],
                    runError: e.toString()
                })
            }
        }
    }
}
