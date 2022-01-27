# Calculates the row and column number based on the OID / OBJECTID / FID
# Assumes an ordered grid of polygons


COL_COUNT = 744 # Number of columns in grid

def calc(id):
    id -= 1
    i = divmod(id, COL_COUNT)
    return f'r{i[0]}c{i[1]}'
