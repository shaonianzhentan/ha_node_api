const fetch = require('node-fetch')

module.exports = class {
    constructor(config) {
        this.config = config
        this.http = async (params) => {
            let res = await fetch(config.url, {
                method: 'POST',
                body: JSON.stringify({
                    key: config.key,
                    ...params
                })
            }).then(res => res.json())
            this.log(res)
            return res
        }
    }

    log() {
        console.log(new Date().toLocaleString(), ...arguments)
    }

    set_state(entity_id, state) {
        return this.http({ type: 'set_state', entity_id, state })
    }

    fire(event_type, event_data) {
        return this.http({ type: 'fire_event', event_type, event_data })
    }
}