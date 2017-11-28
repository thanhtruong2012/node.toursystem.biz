
class Class {
    constructor() {
        
    }
    loadModel(n){
        return new require("../app/models/"+n+"Model")();
    }
}
module.exports = Class;