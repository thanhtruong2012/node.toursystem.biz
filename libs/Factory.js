
class Factory {
    constructor() {

    }
    loadModel(n){
        return new require("../app/models/"+n+"Model")();
    }
}
module.exports = Factory;