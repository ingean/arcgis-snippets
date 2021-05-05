###############################################################################
##        Select random value from list                                      ##
##        Each value has a probability for selection                         ##
##                                                                           ##
##        ArcGIS Pro 2.7.3                                                   ##        
##                                                                           ## 
##        May 2021                                                           ##
##        inge.anundskas@geodata.no                                          ##
###############################################################################

import numpy

def random_distributed():
    lst = ['Ingen', 'Lav', 'Middels', 'Høy', 'Kritisk']
    dist = [0.2, 0.42, 0.28, 0.07, 0.03] ## Sum must be 1

    sample = numpy.random.choice(lst,1,p=dist)       
    return sample[0]