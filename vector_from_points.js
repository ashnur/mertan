void function(root){
    var V = require('momentum')
    module.exports = function vector_from_points(A, B){ return V.sub(B,A) }
}(this)
