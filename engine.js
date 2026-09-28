/* ClayMath engine - pure functions, no DOM. Honest pottery math.
   Constants stated in the UI: stoneware shrinks about 12% wet-to-glaze-fired,
   a mug takes 0.75 lb of wet clay, bisque fires to cone 06 (~999C), glaze to
   cone 6 (~1222C), kiln at 7 kW average draw over a firing. */
var ClayMath = (function () {
  function throwSize(firedSize, shrinkPct) {
    return firedSize / (1 - shrinkPct / 100);
  }
  function firedSize(throwSize, shrinkPct) {
    return throwSize * (1 - shrinkPct / 100);
  }
  function shrinkVerdict(pct) {
    if (pct <= 6) return 'Low-shrink body - porcelain-ish predictability; lids might even fit.';
    if (pct <= 12) return 'Standard stoneware - plan every dimension around the 10-12% it steals.';
    return 'High-shrink body - test tiles first or every mug becomes an espresso cup.';
  }
  function piecesPerBag(bagLb, lbPerPiece, trimLossPct) {
    return bagLb * (1 - trimLossPct / 100) / lbPerPiece;
  }
  function bagVerdict(pieces) {
    if (pieces < 10) return 'Under ten pieces a bag - big pots eat clay; reclaim every trimming.';
    if (pieces <= 25) return 'A fair bag - the studio standard; pug the scraps and it stretches further.';
    return 'Production rate - production throwing; your wedging arm knows it.';
  }
  function coneTemp(cone) {
    var table = { '06': 999, '04': 1060, '6': 1222, '10': 1305 };
    return table[cone] || null;
  }
  function firingVerdict(cone, kilnMax) {
    var t = coneTemp(cone);
    if (!t) return 'Unknown cone - check the chart; pyrometric cones are not interchangeable decoration.';
    if (t > kilnMax) return 'Cone ' + cone + ' wants ' + t + 'C and this kiln tops at ' + kilnMax + 'C - do not try; relays die expensive deaths.';
    if (kilnMax - t < 30) return 'Cone ' + cone + ' at ' + t + 'C is right at the kiln limit - the last hundred degrees take forever and eat elements.';
    return 'Cone ' + cone + ' at ' + t + 'C is comfortably in range - fire away.';
  }
  function firingCost(kw, hours, kwhPrice) {
    return kw * hours * kwhPrice;
  }
  function costPerPiece(clayLb, clayCostLb, glazeCost, firingShare) {
    return clayLb * clayCostLb + glazeCost + firingShare;
  }
  function costVerdict(perPiece) {
    if (perPiece <= 3) return 'Under $3 a piece in materials - the mug costs less than the coffee going in it.';
    if (perPiece <= 8) return 'Craft-fair economics - materials are fine; your hourly rate is the real question.';
    return 'Gallery costs - fine for gallery prices, painful for gifts.';
  }
  return {
    throwSize: throwSize, firedSize: firedSize, shrinkVerdict: shrinkVerdict, piecesPerBag: piecesPerBag,
    bagVerdict: bagVerdict, coneTemp: coneTemp, firingVerdict: firingVerdict, firingCost: firingCost,
    costPerPiece: costPerPiece, costVerdict: costVerdict
  };
})();
if (typeof module !== 'undefined') module.exports = ClayMath;
