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
        if ( ! intersecting(a,b) ) return undefined
        if ( equal(a.base, b.base) ) return a.base
        var m = a.base.map(function(P1, i){
            return [
                    a.vector[i]
                  , ZERO.sub(b.vector[i])
                ]
        })
        var inv = M.pinv(m)
        //console.log('inv\n', M.drawMatrix(inv))
        var c = a.base.map(function(p1, i){ return b.base[i].sub(p1) })
        //console.log('c\n', c+'')
        var p = M.mm(inv, c)
        //console.log('p\n', p+'')
        var r = a.base.map(function(p1,i){
            return p1.add(p[0].times(a.vector[i]))
        })

        return r
    }

    function meet_of_line_with_plane(a, b){
        return null
    }

    function meet_of_planes(){
        var planes = u.slice(arguments)
        return null
    }

    function has(line, point){
        if ( equal(point, line.base) ) return true
        var v = vector_from_points(point, line.base)
        return S_between_vectors(v, line.vector) == ZERO
    }

    function identical(a, b){
        return has(a, b.base) ? same_direction(a,b) : false
    }

    function same_direction(a, b){
        return S_between_vectors(a.vector, b.vector) == ZERO
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

    module.exports = {
        line: function(){ return line.make.apply(line, arguments) }
        , joinPoints: line_from_points
        , meetLines: meet_of_lines
        , meetLinePlane: meet_of_line_with_plane
        , meetPlanes: meet_of_planes
        , Q: Q_between_points
        , S: S_between_vectors
    }
}()
