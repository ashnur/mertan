var gm = require('../')
    , expect = require('expect.js')
    , R = require('rationals')
    , V = require('momentum')

describe('Lines', function() {
    var line2D_1 = gm.line(V([2,0]),V([4,2]))
      , point2D_1 = V([0,-1])
      , point2D_2 = [R(3,4),R(-5,8)]
      , point2D_3 = [R(5),R(3,2)]
      , point2D_4 = [R(-2),R(2)]
      , line2D_2 = gm.line([R(0),R(3,2)],[R(6),R(-3)])
      , point2D_5 = [R(5),R(-1)]
      , point2D_6 = [R(-1),R(2)]
      , point2D_7 = [R(-5),R(4)]
      , point2D_8 = [R(1),R(1)]
      , point2D_9 = [R(-3),R(-21)]
      , line2D_3 = gm.line([R(2),R(1)],[R(3),R(0)])
      , point2D_10 = [R(-10),R(1)]
      , line2D_4 = gm.line([R(-3),R(-3)],[R(-20),R(0)])

    it('checks if point lies on line', function() {
        // check for data mismatch ?
        expect(line2D_1.has(point2D_1)).to.be(true)
        expect(line2D_1.has(point2D_2)).to.be(true)
        expect(line2D_1.has(point2D_3)).to.be(true)
        expect(line2D_1.has(point2D_4)).to.be(false)
        expect(line2D_2.has(point2D_5)).to.be(true)
        expect(line2D_2.has(point2D_6)).to.be(true)
        expect(line2D_2.has(point2D_7)).to.be(true)
        expect(line2D_2.has(point2D_8)).to.be(true)
        expect(line2D_2.has(point2D_9)).to.be(false)
        expect(line2D_3.has(point2D_10)).to.be(true)
    })

    it('checks if line is parallel to another line', function() {
        // check for data mismatch ?
        expect(line2D_1.parallelTo(line2D_2)).to.be(false)
        expect(line2D_3.parallelTo(line2D_4)).to.be(true)
    })
})
