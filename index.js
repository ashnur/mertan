void function(){

    function vector_from_points(A, B){ return V.sub(B,A) }

    function Q_between_points(A,B){
        var v = vector_from_points(A,B)
        return Q_of_vector(v)
    }

    function Q_of_vector(v){ return V.dot(v,v) }

    function S_between_vectors(v,w){
        var a = V.dot(v,w)
        return R(1).sub(a.times(a).div(Q_of_vector(v).times(Q_of_vector(w))))
    }

    function line_from_points(A, B){
        return line.make(A, vector_from_points(A, B))
    }

    function meet_of_lines(a, b){
        if ( equal(a.base, b.base) ) return a.base

        return null
    }

    function meet_of_line_with_plane(a, b){
        return null
    }

    function meet_of_planes(){
        var planes = u.slice(arguments)
        return null
    }

    function has(line, point){
        var q = line_from_points(line.base, point)
            , d = q.vector.map(function(coeff, idx){
                    return coeff.div(line.vector[idx])
                  })

        return same_direction(d) === false ? false : true

    }

    function same_direction(d){
        return d.reduce(function(c,v){
            return v == INF || v == ORG ? c
                 : c == undefined       ? v
                 : v != c               ? false
                 :                        c
        }, undefined)
    }

    function parallels(a, b){
        var d = a.vector.map(function(coeff, idx){
                return coeff.div(b.vector[idx])
              })

        return same_direction(d) === false ? false : true
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
        , line = viral.extend({
            init: function(base, vector){
                this.base = base
                this.vector = vector
            }
            , has: u.enslave(has)
            , parallelTo: u.enslave(parallels)
            , perpendicularTo: u.enslave(perpendiculars)
            , toString: u.enslave(lineToString)
        })

    module.exports = {
        line: function(){ return line.make.apply(line, arguments) }
        , joinLines: line_from_points
        , meetLines: meet_of_lines
        , meetLinePlane: meet_of_line_with_plane
        , meetPlanes: meet_of_planes
        , Q: Q_between_points
        , S: S_between_vectors
    }
}()
