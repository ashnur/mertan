void function(root){

    var V = require('momentum')
      , R = require('rationals')
      , quadrance_of_vector = require('./quadrance_of_vector.js')

    module.exports = function spread_of_vectors(v,w){
        var a = V.dot(v,w)
        return R(1).sub(a.times(a).div(quadrance_of_vector(v).times(quadrance_of_vector(w))))
    }

}(this)
