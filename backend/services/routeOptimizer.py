#!/usr/bin/env python3
"""
Route Optimization Module
- Uses Google OR-Tools to optimize delivery routes for farmers and clusters
- Minimizes total distance/fuel/time
"""
import sys
import json
import numpy as np
from ortools.constraint_solver import pywrapcp, routing_enums_pb2

def compute_euclidean_distance_matrix(locations):
    size = len(locations)
    matrix = np.zeros((size, size))
    for i in range(size):
        for j in range(size):
            lat1, lon1 = locations[i]['lat'], locations[i]['lon']
            lat2, lon2 = locations[j]['lat'], locations[j]['lon']
            matrix[i][j] = np.sqrt((lat1 - lat2)**2 + (lon1 - lon2)**2)
    return matrix


def optimize_route(locations):
    distance_matrix = compute_euclidean_distance_matrix(locations)
    manager = pywrapcp.RoutingIndexManager(len(distance_matrix), 1, 0)
    routing = pywrapcp.RoutingModel(manager)

    def distance_callback(from_index, to_index):
        return int(distance_matrix[manager.IndexToNode(from_index)][manager.IndexToNode(to_index)] * 100000)

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

    solution = routing.SolveWithParameters(search_parameters)
    route = []
    if solution:
        index = routing.Start(0)
        while not routing.IsEnd(index):
            route.append(manager.IndexToNode(index))
            index = solution.Value(routing.NextVar(index))
        route.append(manager.IndexToNode(index))
    return route

def main():
    try:
        if len(sys.argv) < 2:
            raise ValueError("No locations data provided")
        
        locations_json = sys.argv[1]
        locations = json.loads(locations_json)
        
        if not locations or not isinstance(locations, list) or len(locations) < 2:
            raise ValueError("Invalid locations data - need at least 2 locations")
        
        route = optimize_route(locations)
        print(json.dumps(route))
        
    except Exception as e:
        error_response = {"error": str(e)}
        print(json.dumps(error_response))
        sys.exit(1)

if __name__ == "__main__":
    main()
