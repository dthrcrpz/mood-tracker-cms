import Vue from 'vue'

Vue.mixin({
    methods: {
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
        properFormat (value) {
            let newValue = value.split('The ')[1].split(' field')[0].split('.')
            if (newValue.length > 1) {
                newValue = newValue[1].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                }
            } else {
                newValue = value.split('The ')[1].split(' field')[0].split('[]')
                if (newValue.length > 1) {
                    let nextValue = newValue[0].split('_')
                    if (nextValue.length > 1) {
                        newValue = nextValue[0].charAt(0).toUpperCase() + nextValue[0].slice(1) + ' ' + nextValue[1].charAt(0).toUpperCase() + nextValue[1].slice(1)
                    } else {
                        newValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                    }
                } else {
                    newValue = value.split('The ')[1].split(' field')[0].split('_')
                    if (newValue.length > 1) {
                        let firstValue = ''
                        let lastValue = ''
                        if (newValue[0] != 'co' && newValue[0] != 'pa' && newValue[0] != 'ec' && newValue[0] != 'ba') {
                            firstValue = newValue[0].charAt(0).toUpperCase() + newValue[0].slice(1)
                        }
                        for (let i = 1; i < newValue.length; i++) {
                            if (newValue[i] != 'id') {
                                lastValue += ' ' + newValue[i].charAt(0).toUpperCase() + newValue[i].slice(1)
                            }
                        }
                        newValue = firstValue + ' ' + lastValue
                    } else {
                        newValue = value.split('The ')[1].split(' field')[0].charAt(0).toUpperCase() + value.split('The ')[1].split(' field')[0].slice(1)
                    }
                }
            }
            let message = value.split('The ')[1].split(' field')
            if (message.length > 1) {
                message = message[1]
                return `The ${newValue} field${message}`
            } else {
                if (message[0].split('file').length > 1) {
                    message = message[0].split('file')[1]
                    return `The ${newValue} field${message}`
                } else {
                    return `The ${newValue}`
                }
            }
        },
        scrollAnimate (elementNames) {
            elementNames.forEach((elementName, elementIndex) => {
                if (elementName.single) {
                    let element = document.querySelector(elementName.target)
                    if (element && !element.classList.contains('ov')) {
                        let bounding = element.getBoundingClientRect()
                        if (bounding.bottom > 0 &&
                            bounding.right > 0 &&
                            bounding.left < (window.innerWidth || document.documentElement.clientWidth) &&
                            bounding.top < (window.innerHeight || document.documentElement.clientHeight)) {
                            setTimeout(() => {
                                element.classList.add('ov')
                            }, 350 * elementIndex)
                        }
                    }
                } else {
                    let elements = document.querySelectorAll(elementName.target)
                    elements.forEach((element, elementIndex) => {
                        if (element && !element.classList.contains('ov')) {
                            let bounding = element.getBoundingClientRect()
                            if (bounding.bottom > 0 &&
                                bounding.right > 0 &&
                                bounding.left < (window.innerWidth || document.documentElement.clientWidth) &&
                                bounding.top < (window.innerHeight || document.documentElement.clientHeight)) {
                                setTimeout(() => {
                                    element.classList.add('ov')
                                }, 350 * elementIndex)
                            }
                        }
                    })
                }
            })
        },
        sharer (type) {
            let link = location.href
            let shareLink = ''
            switch (type) {
                case 'fb':
                    shareLink = `https://www.facebook.com/sharer/sharer.php?u=${link}`
                    break
                case 'tw':
                    shareLink = `https://twitter.com/home?status=${link}`
                    break
            }
            window.open(shareLink, "shareWindow", "status=1,width=600,height=450")
        },
        randomCode () {
            return Math.random().toString(36).substring(5).toUpperCase()
        },
        randomString () {
            return Math.random().toString(36).substring(2)
        },
        totalItems (value) {
            if (value != 0) {
                return parseFloat(value).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            } else {
                return 0
            }
        },
        totalCount (value) {
            let count = 0
            if (value) {
                count = parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            return count
        },
        notify (action) {
            this.$store.state.notificationMessage = action
            setTimeout( () => {
                this.$store.state.isNotify = true
            }, 500)
            setTimeout( () => {
                this.$store.state.isNotify = false
            }, 2000)
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
        },
        loader (data) {
            this.$store.state.isLoading = data
            if (data) {
                document.body.classList.add('no_click')
            } else {
                document.body.classList.remove('no_click')
            }
        },
        logout () {
            let token = (this.$route.query.token != null) ? this.$route.query.token : this.$cookies.get('70hokc3hhhn5')
            if (token) {
                this.loader(true)
            }
            this.$axios.post('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                // wala
            }).catch(err => {
                this.loader(false)
                console.log(err)
            }).then(() => {
                this.$cookies.remove('70hokc3hhhn5')
                if (this.$store.state.isAuth) {
                    setTimeout(() => {
                        this.loader(false)
                        window.location.assign('/')
                    }, 500)
                } else {
                    this.$store.state.isAuth = false
                }
            })
        },
        validateToken () {
            let token = (this.$route.query.token != null) ? this.$route.query.token : this.$cookies.get('70hokc3hhhn5')
            if (token != null || token != undefined) {
                this.$axios.get('api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(res => {
                    if (res.data != 0) {
                        this.$store.state.isAuth = true
                        this.$store.state.token = token
                        this.$store.state.user = res.data.user
                    } else {
                        this.logout()
                    }
                }).catch(err => {
                    console.log(err)
                    this.logout()
                })
            } else {
                this.logout()
            }
        },
        async fetchData (apiRoute) {
            const me = this
            await me.validateToken()
            let api = await me.$axios.get(apiRoute)
            return api
        },
        async initFB () {
            await FB.init({
                appId            : '3306202862739419',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v3.3'
            })
        }
    }
})
