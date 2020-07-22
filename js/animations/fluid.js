export class Fluid {

    constructor() {
        this.init()
        this.listen()
    }

    // setup required data
    init() {
        this.shouldUpdate = false
    }

    // setup event listeners
    listen() {

    }

    // check in animation is complete
    // default case is false
    animComplete() {
        return false
    }

    step() {
        // extend to perform update
    }

    update() {
        if (!this.shouldUpdate && this.animComplete()) return
        this.step()
        this.shouldUpdate = false
    }
}