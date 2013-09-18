void function(){

    function meet_of_lines(a, b){
        if ( ! a.intersecting(b) ) return undefined
        if ( equal(a.base, b.base) ) return a.base
        var m = a.base.map(function(P1, i){
            return [
                    a.vector[i]
                  , ZERO.sub(b.vector[i])
                ]
        })
        var inv = M.pinv(m)
        var c = a.base.map(function(p1, i){ return b.base[i].sub(p1) })
        var p = M.mm(inv, c)
        var r = a.base.map(function(p1,i){
            return p1.add(p[0].times(a.vector[i]))
        })

        return r
    }

    function line_from_points(A, B){
        return line.make(A, vector_from_points(A, B))
    }

    function Q_between_points(A,B){
        var v = vector_from_points(A,B)
        return quadrance_of_vector(v)
    }

    function meet_of_line_with_plane(a, b){
        return null
    }

    function meet_of_planes(){
        var planes = u.slice(arguments)
        return null
    }

    function collinear(A, B, C){
        return line_from_points(A, B).has(C)
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
        , quadrance_of_vector = require('./quadrance_of_vector.js')
        , line = require('./lines.js')

    module.exports = {
        line: function(){ return line.make.apply(line, arguments) }
        , joinPoints: line_from_points
        , meetLines: meet_of_lines
        , meetLinePlane: meet_of_line_with_plane
        , meetPlanes: meet_of_planes
        , Q: Q_between_points
        , S: spread_of_vectors
        , collinear: collinear
    }
}()
