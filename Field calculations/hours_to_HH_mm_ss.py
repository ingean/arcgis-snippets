def calc(decimal_hrs):
    h = int(decimal_hrs)
    m = (decimal_hrs*60) % 60
    s = (decimal_hrs*3600) % 60

    return ("%02dt %02dmin %02ds" % (h, m, s))
