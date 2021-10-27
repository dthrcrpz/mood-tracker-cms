import Vue from 'vue'
import { mapMutations } from 'vuex'

Vue.mixin({
    methods: {
        ...mapMutations({
            toggleModalStatus: 'global/modal/toggleModalStatus'
        }),
        validateWysiwyg (page, wysiwygs) {
            wysiwygs.forEach((wysiwyg, key) => {
                page.validation[wysiwyg] = (page.form_data[wysiwyg].length <= 0) ? true : false
            })
        },
        /**
         * check if the input field has value
         * which is the length is greater the 0
         * @param  {[object]} event [input event]
         */
        checkValue (event) {
            const me = this
            let target = event.target
            if (target.value.length > 0) {
                target.classList.add('filled')
            } else {
                target.classList.remove('filled')
            }
        },
        parseInputToDate (target) {
            const me = this
            let lastValue = ''
            let value = target.split('-').join('')
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join('-')
                let valueArrayChecker = value.split('-')
                if (valueArrayChecker[1]) {
                    if (valueArrayChecker[1].length > 0) {
                        value = value.split('-')
                        lastValue = `${value[0]}-`
                        lastValue += value[1].match(new RegExp('.{1,2}', 'g')).join('-')
                    }
                } else {
                    lastValue = value
                }
            }
            return lastValue
        },
        randomCode () {
            return Math.random().toString(36).substring(5).toUpperCase()
        },
        randomString () {
            return Math.random().toString(36).substring(2)
        },
        totalCount (value, decimal = false) {
            let count = 0
            if (value) {
                count = (decimal) ? parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : parseFloat(value).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            return count
        },
        toJSON (data) {
            if (data) {
                return JSON.parse(JSON.stringify(Object.fromEntries(data)))
            }
        },
        parser (data) {
            if (data) {
                return JSON.parse(data)
            }
        },
        replacer (data) {
            if (data) {
                return data.replace(/\-/g, ' ')
            }
        },
        convertToSlug (data) {
            let slug = ''
            if (data.match(/[!@#$%^&*(){}:;"’'<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g)) {
                slug = data.toLowerCase().replace(/[!@#$%^&*(){}:;"'’<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g, '').replace(/\s/g, '-')
            } else {
                slug = data.toLowerCase().replace(/\s/g, '-')
            }
            return slug
        }
    }
})
