# rational geometry
Basic geometrical functions

# Support
[![browser support](https://ci.testling.com/ashnur/mertan.png)](https://ci.testling.com/ashnur/mertan)




# Examples
```
var gm = require('mertan')
  , V = require('momentum')
  , R = require('rationals')

var line2D_1 = gm.line(V([2,0]),V([4,2]))
  , point2D_1 = V([0,-1])
  , point2D_2 = [R(-2),R(2)] // this is the same as the above
  , line2D_2 = gm.line([R(0),R(3,2)],[R(6),R(-3)])
  , line2D_3 = gm.line([R(2),R(1)],[R(3),R(0)])
  , line2D_4 = gm.line([R(-3),R(-3)],[R(-20),R(0)])
  , line2D_5 = gm.line([R(3),R(-3)],[R(0),R(20)])
  , line3D_1 = gm.line(V([3,6,1]),V([3,-4,-1]))
  , line3D_2 = gm.line(V([3,6,1]),V([9,-12,-3]))
  , line3D_3 = gm.line(V([-1,2,-3]),V([5,-1,2]))
  , line3D_4 = gm.line(V([6,-5,4]),V([3,-11,-13]))

    line2D_1.has(point2D_1) // true
    line2D_1.has(point2D_2) // false

    line2D_1.parallelTo(line2D_2) // false
    line2D_3.parallelTo(line2D_4) // true
    line3D_1.parallelTo(line3D_2) // true

    line2D_1.perpendicularTo(line2D_2) // false
    line3D_3.perpendicularTo(line3D_4) // true
    line3D_2.perpendicularTo(line3D_4) // false

    // Quadrance between points
    gm.Q([R(3),R(-12)],[R(15),R(4)]) == R(12).times(R(12)).add(R(16).times(R(16))) // R(400)

    // Spread between vectors
    //spread is 1 when perpendicular
    gm.S(line2D_4.vector, line2D_5.vector) // R(1)
    //spread is 0 when parallel
    gm.S(line3D_1.vector, line3D_2.vector) // R(0)


```

# API

#### Points
Points are just regular arrays of rational number objectss.

#### Lines

Lines are represented by one point on them and a direction vector
This `gm.line([R(0),R(3,2)],[R(6),R(-3)])` returns an object with
properties `base` as the point and `vector` as the direction vector.
This is the same line as `x+2y=3`.

#### Quadrance between points
Returns the rational trigonometry definition of the quadrance as a rational number object
(basicaly square of the distance in Euclidean geometry)
`gm.Q([R(3),R(-12)],[R(15),R(4)]) // R(400) `

#### Spread between vectors
Returns the rational trigonometry definition of the spread as a rational number object
(it is a rational alternative to the concept of angle)
`gm.S(line2D_4.vector, line2D_5.vector) // R(1)`

# Install
```
npm install mertan
```

**You can use it in the browser with [browserify](http://browserify.org/)**
