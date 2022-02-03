"""
  Finner gjennomsnittsretning

  Baserer seg et gjennomsnitt av u- og v-komponentene
  til retningene det skal beregnes et snitt for.

  For å beregne u-komponenten fra retning (grader):
  retning_u = -1 * math.sin(math.pi/180*retning)

  For å beregne v-komponenten fra retning (grader)
  retning_v = -1 * math.cos(math.pi/180*retning)
"""

import math

def calc(avg_u, avg_v):
  if avg_u > 0:
    return (90-180/math.pi*math.atan(avg_v/avg_u)+180)
  elif avg_u < 0:
    return (90-180/math.pi*math.atan(avg_v/avg_u))
  elif avg_u == 0:
    if avg_v < 0:
      return 360
    elif avg_v > 0:
      return 180
    else:
      return 0

def direction_u(degrees):
  return -1 * math.sin(math.pi/180*degrees)

def direction_v(degrees):
  return -1 * math.cos(math.pi/180*degrees)