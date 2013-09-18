void function(){

    function has(line, point){
        if ( equal(point, line.base) ) return true
        var v = vector_from_points(point, line.base)
        return spread_of_vectors(v, line.vector) == ZERO
    }

    function identical(a, b){
        return has(a, b.base) ? same_direction(a,b) : false
    }

    function same_direction(a, b){
        return spread_of_vectors(a.vector, b.vector) == ZERO
    }

    function parallels(a, b){
        return same_direction(a, b) ? ! has(a, b.base): false
    }

    function skew(a, b){
        if ( a.vector.length < 3 && b.vector.length < 3 ) return false
        return ! same_direction(a, b) &&  ! intersecting(a, b)
    }

    function intersecting(a, b){
        if ( a.vector.length < 3 && b.vector.length < 3 ) return true
        return same_direction(a, b) ? false
                                    : ! M.linearlyDependent([a.vector
                                                           , b.vector
                                                           , vector_from_points(a.base, b.base)])
    }

    function perpendiculars(a, b){
        return V.dot(a.vector, b.vector) == ZERO
    }

    function lineToString(line){
        return '['+line.base+'] + λ('+line.vector+') '
    }

    var R = require('rationals')
        , ZERO = R(0)
        , INF = R(1,0)
        , ORG = R(0,0)
        , u = require('totemizer')
        , viral = require('viral')
        , V = require('momentum')
        , M = require('vatrix')
        , equal = require('deep-equal')
        , vector_from_points = require('./vector_from_points.js')
        , spread_of_vectors = require('./spread_of_vectors.js')
        , line = viral.extend({
            init: function(base, vector){
                this.base = base
                this.vector = vector
            }
            , has: u.enslave(has)
            , parallel: u.enslave(parallels)
            , identical: u.enslave(identical)
            , skewing: u.enslave(skew)
            , perpendicularTo: u.enslave(perpendiculars)
            , intersecting: u.enslave(intersecting)
            , toString: u.enslave(lineToString)

        })

    module.exports = line
}()
