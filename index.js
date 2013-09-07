void function(){


    function lineFromPoints(A, B){
        var l = line.make(A, V.sub(B,A))
        return l
    }

    function pointFromLines(a, b){
        return null
    }

    function pointFromLinePlane(a, b){
        return null
    }

    function meetPlanes(){
        var planes = u.slice(arguments)
        return null
    }

    function has(line, point){
        var q = lineFromPoints(line.base, point)
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
        , joinLines: lineFromPoints
        , meetLines: pointFromLines
        , meetLinePlane: pointFromLinePlane
        , meetPlanes: meetPlanes
    }
}()
